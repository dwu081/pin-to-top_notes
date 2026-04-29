const editor = document.getElementById('editor');
const pinBtn = document.getElementById('pinBtn');
const status = document.getElementById('status');
const fontFamilySelect = document.getElementById('fontFamily');
const fontWeightSelect = document.getElementById('fontWeight');

function setPinnedUI(pinned) {
    pinBtn.classList.toggle('pinned', pinned);
    pinBtn.textContent = pinned ? 'Pinned' : 'Pin';
    status.textContent = pinned ? 'Pinned (Always on Top)' : 'Not pinned';
}

let saveTimer = null;
function scheduleSave() {
    clearTimeout(saveTimer);
    saveTimer = setTimeout(() => {
        window.topNote.saveNote(editor.value);
    }, 500);
}

function applyEditorStyle(settings) {
    if (settings?.fontFamily) editor.style.fontFamily = settings.fontFamily;
    if (settings?.fontWeight) editor.style.fontWeight = settings.fontWeight;
}

function getSelectedSettings() {
    return {
        fontFamily: fontFamilySelect.value,
        fontWeight: fontWeightSelect.value
    };
}

async function saveSettings() {
    const settings = getSelectedSettings();
    applyEditorStyle(settings);
    await window.topNote.saveSettings(settings);
}

(async function init() {
    editor.value = await window.topNote.loadNote();
    setPinnedUI(await window.topNote.getAlwaysOnTop());

    const settings = await window.topNote.loadSettings();
    if (settings?.fontFamily) fontFamilySelect.value = settings.fontFamily;
    if (settings?.fontWeight) fontWeightSelect.value = settings.fontWeight;
    applyEditorStyle(settings);

    editor.addEventListener('input', scheduleSave);
    fontFamilySelect.addEventListener('change', saveSettings);
    fontWeightSelect.addEventListener('change', saveSettings);

    pinBtn.addEventListener('click', async () => {
        const pinned = await window.topNote.toggleAlwaysOnTop();
        setPinnedUI(pinned);
    });

    window.topNote.onAlwaysOnTopChanged((pinned) => setPinnedUI(pinned));
})();