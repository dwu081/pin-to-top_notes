const { app, BrowserWindow, ipcMain, Menu } = require('electron');
const path = require('path');
const fs = require('fs');

let mainWindow;

const defaultSettings = {
    fontFamily: 'Microsoft YaHei',
    fontWeight: '600'
};

function getNotePath() {
    return path.join(app.getPath('userData'), 'note.txt');
}

function getSettingsPath() {
    return path.join(app.getPath('userData'), 'settings.json');
}

function ensureNoteFile() {
    const p = getNotePath();
    if (!fs.existsSync(p)) fs.writeFileSync(p, '', 'utf8');
}

function readSettings() {
    const p = getSettingsPath();
    if (!fs.existsSync(p)) return { ...defaultSettings };
    try {
        const raw = fs.readFileSync(p, 'utf8');
        const parsed = JSON.parse(raw);
        return { ...defaultSettings, ...parsed };
    } catch (err) {
        return { ...defaultSettings };
    }
}

function writeSettings(settings) {
    const p = getSettingsPath();
    fs.writeFileSync(p, JSON.stringify(settings, null, 2), 'utf8');
}

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 420,
        height: 520,
        minWidth: 260,
        minHeight: 220,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            nodeIntegration: false
        },
    });

    mainWindow.loadFile(path.join(__dirname, 'index.html'));

    const menu = Menu.buildFromTemplate([
        {
            label: 'View',
            submenu: [
                {
                    label: 'Pin to Top (Always on Top)',
                    type: 'checkbox',
                    checked: mainWindow.isAlwaysOnTop(),
                    click: (item) => {
                        mainWindow.setAlwaysOnTop(item.checked);
                        mainWindow.webContents.send('alwaysOnTopChanged', item.checked);
                    }
                }
            ]
        }
    ]);
    Menu.setApplicationMenu(menu);

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

app.whenReady().then(() => {
    ensureNoteFile();
    writeSettings(readSettings());
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

ipcMain.handle('toggleAlwaysOnTop', () => {
    const next = !mainWindow.isAlwaysOnTop();
    mainWindow.setAlwaysOnTop(next);
    return next;
});

ipcMain.handle('getAlwaysOnTop', () => {
    return mainWindow.isAlwaysOnTop();
});

ipcMain.handle('loadNote', async () => {
    const p = getNotePath();
    return fs.readFileSync(p, 'utf8');
});

ipcMain.handle('saveNote', async (_evt, text) => {
    const p = getNotePath();
    fs.writeFileSync(p, text ?? '', 'utf8');
    return true;
});

ipcMain.handle('loadSettings', async () => {
    return readSettings();
});

ipcMain.handle('saveSettings', async (_evt, settings) => {
    const next = { ...defaultSettings, ...(settings ?? {}) };
    writeSettings(next);
    return next;
});