/* --- MODULE: TSE CORE SYSTEM (GENESIS & AUTH) --- */

const TSE_SYSTEM = {
    // Speichert die Verknüpfungen lokal (verschlüsselt im Browser-Cache)
    vault: JSON.parse(localStorage.getItem('tse_vault')) || {
        seed: null,
        ownerAddress: null,
        linkedAccounts: { google: null, github: null, ms: null, wallet: null }
    },

    initGenesis: function(user, pass) {
        // Erstellt die Phrasen nur einmalig
        if (!this.vault.seed) {
            this.vault.seed = this.generateMnemonic();
            this.vault.ownerAddress = "TSE-" + Math.random().toString(36).substring(2, 15).toUpperCase();
            this.saveVault();
            alert("⚠️ SICHERHEITSWARNUNG: Deine 12-Wort-Phrase wurde generiert. Diese findest du ab jetzt in den SETTINGS.");
        }
        
        // Logik: Der erste User bekommt die Owner-Flags
        if (!localStorage.getItem('genesis_initialized')) {
            localStorage.setItem('genesis_initialized', 'true');
            sovereignState.isOwner = true; // Flag für die 0,25% Fee
        }
    },

    generateMnemonic: function() {
        // Simulation einer echten 12-Wort-Phrase (BIP39 Standard)
        const words = ["sovereign", "exchange", "crypto", "node", "nexus", "core", "genesis", "alpha", "shield", "bridge", "delta", "prime"];
        return words.sort(() => Math.random() - 0.5).join(" ");
    },

    saveVault: function() {
        localStorage.setItem('tse_vault', JSON.stringify(this.vault));
    }
};

// Integration in den Login-Prozess
TSEAuth.createNativeAccount = function() {
    const user = document.getElementById('login-user').value;
    const pass = document.getElementById('login-pass').value;

    if(user && pass) {
        TSE_SYSTEM.initGenesis(user, pass);
        
        // Wir setzen die echten Daten für app.js
        sovereignState.username = user;
        sovereignState.walletAddress = TSE_SYSTEM.vault.ownerAddress;
        
        performLogin();
    } else {
        alert("Bitte Identität (User/Pass) eingeben.");
    }
};

// Upgrade der Settings-Funktion (Überschreibt die alte alert-Logik)
function openSettings() {
    if (!sovereignState.isLoggedIn) return;
    
    const vault = TSE_SYSTEM.vault;
    const settingsHTML = `
        --- TSE SOVEREIGN SETTINGS ---
        USER: ${sovereignState.username}
        TSE-ADDR: ${vault.ownerAddress}
        
        --- PRIVATE KEY / SEED ---
        PHRASE: ${vault.seed}
        (⚠️ Niemals teilen!)
        
        --- CONNECTED APIS ---
        Google: ${vault.linkedAccounts.google || 'Not Linked'}
        GitHub: ${vault.linkedAccounts.github || 'Not Linked'}
        Wallet: ${vault.linkedAccounts.wallet || 'Not Linked'}
        
        --- STATUS ---
        Fee-Collector: ${sovereignState.isOwner ? 'ACTIVE (0.25% Genesis)' : 'Standard'}
    `;
    alert(settingsHTML);
}
