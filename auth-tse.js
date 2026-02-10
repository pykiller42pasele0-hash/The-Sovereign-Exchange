/* --- MODULE: TSE CORE SYSTEM (IDENTITY & WALLET SYNC) --- */

const TSE_SYSTEM = {
    // Speichert die Verknüpfungen lokal im Browser-Cache
    vault: JSON.parse(localStorage.getItem('tse_vault')) || {
        seed: null,
        ownerAddress: null,
        linkedAccounts: { google: null, github: null, ms: null, wallet: null }
    },

    initGenesis: function(user, pass) {
        // Erstellt die Phrasen nur beim allerersten Mal
        if (!this.vault.seed) {
            this.vault.seed = this.generateMnemonic();
            this.vault.ownerAddress = "TSE-" + Math.random().toString(36).substring(2, 15).toUpperCase();
            this.saveVault();
            console.log("TSE: Genesis Wallet created for " + user);
        }
        
        // Logik: Der erste User erhält den Owner-Status für die 0,25% Fee
        if (!localStorage.getItem('genesis_initialized')) {
            localStorage.setItem('genesis_initialized', 'true');
            sovereignState.isOwner = true; 
        }
    },

    generateMnemonic: function() {
        const words = ["sovereign", "exchange", "crypto", "node", "nexus", "core", "genesis", "alpha", "shield", "bridge", "delta", "prime"];
        return words.sort(() => Math.random() - 0.5).join(" ");
    },

    saveVault: function() {
        localStorage.setItem('tse_vault', JSON.stringify(this.vault));
    }
};

// Überarbeiteter Login-Trigger: Bereitet alles für die Wallet-Unterseite vor
const TSEAuth = {
    createNativeAccount: function() {
        const userField = document.getElementById('login-user');
        const passField = document.getElementById('login-pass');
        
        const user = userField ? userField.value : "";
        const pass = passField ? passField.value : "";

        if(user && pass) {
            // 1. Erzeugt Wallet-Daten im Hintergrund
            TSE_SYSTEM.initGenesis(user, pass);
            
            // 2. Füllt den globalen State der app.js
            sovereignState.username = user;
            sovereignState.walletAddress = TSE_SYSTEM.vault.ownerAddress;
            sovereignState.provider = "TSE_NATIVE";

            // 3. Führt performLogin() aus (Status wird 'eingeloggt')
            // Du bleibst auf der Login-Seite, bis du 'PROFIL-WALLET' klickst
            if (typeof performLogin === "function") {
                performLogin();
            }

            console.log("TSE: Identity ready. You can now enter your PROFIL-WALLET.");
            alert("Identität verankert! Klicke jetzt auf 'PROFIL-WALLET', um dein Portfolio zu verwalten.");
        } else {
            alert("Bitte Benutzername und Passwort eingeben.");
        }
    }
};

// Kopplung an den existierenden Button
document.addEventListener('DOMContentLoaded', () => {
    const loginBtn = document.querySelector("button[onclick='performLogin()']");
    if(loginBtn) {
        loginBtn.onclick = () => TSEAuth.createNativeAccount();
    }
});

// Upgrade der Settings-Logik (für die Unterseite)
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

--- STATUS ---
Fee-Collector: ${sovereignState.isOwner ? 'ACTIVE (0.25% Genesis)' : 'Standard'}
    `;
    alert(settingsHTML);
}
