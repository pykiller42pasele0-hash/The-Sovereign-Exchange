/* --- MODULE: PROFIL-VIEWER SYNC --- */
document.addEventListener('DOMContentLoaded', () => {
    // Diese Funktion verstärkt den Viewer in deiner Wallet-Unterseite
    window.refreshPrivateStream = function() {
        const pStream = document.getElementById('private-tse-viewer'); // ID aus deiner HTML
        if (pStream && sovereignState.isLoggedIn) {
            pStream.innerHTML = `<div class="block">SYNCED WITH NODE: ${sovereignState.walletAddress}</div>`;
            pStream.innerHTML += `<div class="block">STATUS: SECURE_PHRASE_ACTIVE</div>`;
        }
    };
});
