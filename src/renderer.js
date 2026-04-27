const editor = document.getElementById('editor');
const pinBtn = document.getElementById('pinBtn');
const status = document.getElementById('status');

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

(async function init() {
    editor.value = await window.topNote.loadNote();
    setPinnedUI(await window.topNote.getAlwaysOnTop());

    editor.addEventListener('input', scheduleSave);

    pinBtn.addEventListener('click', async () => {
        const pinned = await window.topNote.toggleAlwaysOnTop();
        setPinnedUI(pinned);
    });

    window.topNote.onAlwaysOnTopChanged((pinned) => setPinnedUI(pinned));
})();