/* --- THE SOVEREIGN ENGINE (CORE LOGIC) --- */

// 1. STATE MANAGEMENT (Nur im RAM)
let sovereignState = {
    isLoggedIn: false,
    username: "",
    walletAddress: "0x" + Math.random().toString(16).slice(2, 10) + "..." + Math.random().toString(16).slice(2, 6),
    balance: 0.00,
    currentAsset: "Crypto",
    transactions: [
        { type: "SYSTEM", asset: "INIT", status: "Validated [PoW]", time: "Gerade eben" }
    ]
};

// 2. INITIALISIERUNG
document.addEventListener('DOMContentLoaded', () => {
    console.log("Sovereign Engine gestartet... Kein Terminal erkannt.");
    updateUI();
});

// 3. NAVIGATION (STATISCHE SWITCHER)
function showPage(pageId) {
    // Falls Wallet aufgerufen wird, aber kein Login besteht -> Umleitung zu Login
    if (pageId === 'wallet' && !sovereignState.isLoggedIn) {
        pageId = 'login';
    }

    document.querySelectorAll('.page-section').forEach(section => {
        section.classList.remove('active');
    });

    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
    }

    // Zurück-Button Logik
    const backBtn = document.getElementById('back-btn');
    backBtn.style.display = (pageId === 'zentrale') ? 'none' : 'inline-block';
}

// 4. LOGIN & DOPPELTE VERANKERUNG
async function performLogin() {
    const userIn = document.querySelector('input[placeholder="Benutzername erstellen"]').value;
    const passIn = document.querySelector('input[placeholder="Passwort erstellen"]').value;

    if (userIn.length < 3 || passIn.length < 3) {
        alert("Bitte Benutzername und Passwort (min. 3 Zeichen) eingeben.");
        return;
    }

    // Mathematische Verankerung (Simulation der Web Crypto Generierung)
    sovereignState.username = userIn;
    sovereignState.isLoggedIn = true;
    sovereignState.balance = 1250.50; // Start-Guthaben (Demo-Modus bis P2P-Sync)

    // UI-Update
    document.getElementById('sovereign-id').innerText = `ID: ${userIn.toUpperCase()}_0x${Math.random().toString(16).slice(2, 6)}`;
    
    // Protokoll-Eintrag im Viewer-Layer
    const flow = document.getElementById('p2p-flow');
    flow.innerText = `POW-STREAM: Identity anchored for ${userIn}... 0.25% Fee-Protocol active.`;

    showPage('wallet');
    updateUI();
}

// 5. TRADING LOGIK (MIT GEBÜHREN-ERZWUNGUNG)
function executeTrade(type) {
    if (!sovereignState.isLoggedIn) {
        showPage('login');
        return;
    }

    const fee = 0.0025; // 0,25%
    const amount = 100; // Beispielbetrag
    const feeAmount = amount * fee;

    // Mathematische Logik im Ledger speichern
    const newTx = {
        type: type.toUpperCase(),
        asset: sovereignState.currentAsset,
        status: "Validated [PoW]",
        time: new Date().toLocaleTimeString()
    };

    sovereignState.transactions.unshift(newTx);
    sovereignState.balance -= feeAmount; // Gebühr wird mathematisch abgezogen

    alert(`${type} ausgeführt. Gebühr von ${feeAmount} an Betreiber-Wallet signiert.`);
    updateUI();
}

// 6. UI SYNCHRONISATION
function updateUI() {
    // Saldo im Wallet
    const balanceDisplay = document.getElementById('balance');
    if (balanceDisplay) {
        balanceDisplay.innerText = `$ ${sovereignState.balance.toLocaleString('de-DE', {minimumFractionDigits: 2})}`;
    }

    // Portfolio-Liste (Meta-Balken)
    const portfolioContainer = document.querySelector('#wallet div[style*="overflow-y: auto"]');
    if (portfolioContainer) {
        portfolioContainer.innerHTML = sovereignState.transactions.map(tx => `
            <div class="meta-balken" onclick="openViewer('${tx.type}')">
                <span>${tx.type}: ${tx.asset}</span>
                <span style="color: var(--neon-gold); font-size: 10px;">${tx.status}</span>
            </div>
        `).join('');
    }
}

// 7. VIEWER LOGIK (SUCHE & DETAILS)
function openViewer(txType) {
    const viewerSearch = document.querySelector('.search-bar-viewer');
    viewerSearch.value = `BLOCK-DETAIL: ${txType} - Fee 0.25% verified.`;
    viewerSearch.style.borderColor = "var(--neon-gold)";
    
    // Minimiert die aktiven Fenster kurz, um den Viewer zu zeigen
    document.querySelectorAll('.page-section').forEach(s => s.style.opacity = "0.3");
    setTimeout(() => {
        document.querySelectorAll('.page-section').forEach(s => s.style.opacity = "1");
    }, 1500);
}

// Event-Listener an Buttons binden (da wir im HTML onclick nutzen, hier nur Ergänzungen)
// Diese Funktion binden wir an den Login-Button im HTML (ersetze onclick="showPage('wallet')" durch onclick="performLogin()")
