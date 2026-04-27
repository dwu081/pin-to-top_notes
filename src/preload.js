const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('topNote', {
	toggleAlwaysOnTop: () => ipcRenderer.invoke('toggleAlwaysOnTop'),
	getAlwaysOnTop: () => ipcRenderer.invoke('getAlwaysOnTop'),
	loadNote: () => ipcRenderer.invoke('loadNote'),
	saveNote: (text) => ipcRenderer.invoke('saveNote', text),
	onAlwaysOnTopChanged: (cb) => {
		ipcRenderer.on('alwaysOnTopChanged', (_e, value) => cb(value));
	}
});