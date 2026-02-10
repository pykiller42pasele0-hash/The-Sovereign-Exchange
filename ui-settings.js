/* --- MODULE: SOVEREIGN SETTINGS HUB --- */
const SettingsManager = {
    open: function() {
        if (!sovereignState.isLoggedIn) return;

        const vault = (typeof TSE_SYSTEM !== 'undefined') ? TSE_SYSTEM.vault : { seed: "NOT_GENERATED" };
        
        const menu = `
--- THE SOVEREIGN EXCHANGE: SETTINGS ---
ID: ${sovereignState.username}
BLOCKCHAIN-ADDR: ${sovereignState.walletAddress}
FEE-LEVEL: 0.25% (Genesis Node)

DEIN SEED (12 WÖRTER):
${vault.seed}

Möchtest du dein 'Sovereign-Key-Backup' (.txt) jetzt herunterladen?`;

        if (confirm(menu)) {
            this.downloadBackup(vault.seed);
        }
    },

    downloadBackup: function(seed) {
        const content = `TSE IDENTITY BACKUP\nUSER: ${sovereignState.username}\nADDR: ${sovereignState.walletAddress}\nSEED: ${seed}\nDATE: ${new Date().toISOString()}`;
        const blob = new Blob([content], { type: 'text/plain' });
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = `TSE_KEY_${sovereignState.username}.txt`;
        a.click();
    }
};

// Überschreibt die alte Settings-Funktion in der app.js dezent
function openSettings() {
    SettingsManager.open();
}
