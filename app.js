/* --- THE SOVEREIGN ENGINE (MASTER LOGIC) --- */

// 1. STATE MANAGEMENT (RAM-Only)
let sovereignState = {
    isLoggedIn: false,
    username: "",
    walletAddress: "0x" + Math.random().toString(16).slice(2, 10).toUpperCase(),
    balance: 0.00,
    currentAsset: "Crypto",
    transactions: [
        { type: "SYSTEM", asset: "INIT", status: "Validated [PoW]", time: "Genesis" }
    ]
};

// 2. INITIALISIERUNG & START
document.addEventListener('DOMContentLoaded', () => {
    console.log("Sovereign Engine: Master-Protocol Active.");
    
    // Initialer Zustand: Alles außer Zentrale hart verstecken
    const sections = document.querySelectorAll('.page-section');
    sections.forEach(s => s.style.display = "none");
    document.getElementById('zentrale').style.display = "flex";
    
    updateUI();
    startBlockStream(); 
    
    setTimeout(() => { switchAsset('Crypto'); }, 500);

    // Event-Listener für die Suchleisten
    document.getElementById('market-search').addEventListener('input', (e) => handleMarketSearch(e.target.value));
    document.getElementById('viewer-search').addEventListener('input', (e) => handleViewerSearch(e.target.value));
});

// 3. NAVIGATION (DER TÜRSTEHER)
function showPage(pageId) {
    // Falls Wallet ohne Login aufgerufen wird -> Umleitung zu Login
    if (pageId === 'wallet' && !sovereignState.isLoggedIn) {
        pageId = 'login';
    }

    // Alle Sektionen deaktivieren und physisch verstecken
    const sections = document.querySelectorAll('.page-section');
    sections.forEach(section => {
        section.classList.remove('active');
        section.style.display = "none"; 
    });

    // Zielseite aktivieren
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
        targetPage.style.display = "flex"; // Erzwingt Neudarstellung
    }

    // Zurück-Button Logik
    const backBtn = document.getElementById('back-btn');
    if (backBtn) {
        backBtn.style.display = (pageId === 'zentrale') ? 'none' : 'inline-block';
    }
}

// 4. LIVE-CHART LOGIK
function switchAsset(type) {
    sovereignState.currentAsset = type;
    let symbol = "BINANCE:BTCUSDT";

    if(type === 'Aktien') symbol = "NASDAQ:AAPL";
    if(type === 'Rohstoffe') symbol = "TVC:GOLD";
    if(type === 'Forex') symbol = "FX:EURUSD";

    new TradingView.widget({
        "autosize": true,
        "symbol": symbol,
        "interval": "D",
        "timezone": "Etc/UTC",
        "theme": "dark",
        "style": "1",
        "locale": "de",
        "enable_publishing": false,
        "hide_top_toolbar": true,
        "container_id": "tradingview_widget"
    });

    logToViewer(`MARKET-FEED: Switched to ${type}`);
}

// 5. LOGIN & IDENTITÄTS-VERANKERUNG
async function performLogin() {
    // Selektoren präzisiert für Login-Main
    const userIn = document.querySelector('#login input[placeholder*="Benutzername"]').value;
    const passIn = document.querySelector('#login input[placeholder*="Passwort"]').value;

    if (userIn.length < 3 || passIn.length < 3) {
        alert("Zugangsdaten zu kurz für Identitäts-Anker.");
        return;
    }

    sovereignState.username = userIn;
    sovereignState.isLoggedIn = true;
    sovereignState.balance = 2500.75; 

    // UI Beschriftung aktualisieren
    document.getElementById('sovereign-id').innerText = `ID: ${userIn.toUpperCase()}`;
    document.getElementById('wallet-addr').innerText = sovereignState.walletAddress;

    logToViewer(`IDENTITY: Anchored ${userIn.toUpperCase()} to ${sovereignState.walletAddress}`);
    
    updateUI();
    showPage('wallet'); // Jetzt erst Wallet freischalten
}

// 6. TRADING
function executeTrade(type) {
    if (!sovereignState.isLoggedIn) { 
        showPage('login'); 
        return; 
    }

    const fee = 0.0025;
    const amount = 100.00;
    const feeAmount = amount * fee;

    const newTx = {
        type: type.toUpperCase(),
        asset: sovereignState.currentAsset,
        status: "Validated [PoW]",
        time: new Date().toLocaleTimeString()
    };

    sovereignState.transactions.unshift(newTx);
    sovereignState.balance -= (amount + feeAmount);

    logToViewer(`TX-POW: ${type.toUpperCase()} - Fee: ${feeAmount.toFixed(4)}`);
    updateUI();
}

// 7. VIEWER-MATRIX
function startBlockStream() {
    const stream = document.getElementById('block-stream');
    setInterval(() => {
        const hash = Math.random().toString(16).substring(2, 10).toUpperCase();
        const blockInfo = `<div>[BLOCK-${hash}] VERIFIED | POW_DIFF: 0.25</div>`;
        stream.innerHTML = blockInfo + stream.innerHTML.substring(0, 500);
    }, 4000);
}

function logToViewer(msg) {
    const stream = document.getElementById('block-stream');
    if(stream) {
        stream.innerHTML = `<div style="color: #fff; font-weight: bold;">>>> ${msg}</div>` + stream.innerHTML;
    }
}

// 8. SUCHE
function handleMarketSearch(val) {
    if(val.length > 2) logToViewer(`SEARCH: Market filter active for ${val.toUpperCase()}`);
}

function handleViewerSearch(val) {
    if(val.length > 2) logToViewer(`SEARCH: Locating Hash ${val.toUpperCase()}`);
}

// 9. UI-SYNCHRONISATION
function updateUI() {
    const balanceDisplay = document.getElementById('balance');
    if (balanceDisplay) balanceDisplay.innerText = `$ ${sovereignState.balance.toLocaleString('de-DE', {minimumFractionDigits: 2})}`;

    const portfolioContainer = document.getElementById('portfolio-list');
    if (portfolioContainer) {
        portfolioContainer.innerHTML = sovereignState.transactions.map(tx => `
            <div class="meta-balken" style="background: rgba(255,255,255,0.05); padding: 10px; margin: 5px 0; border-radius: 5px; border-left: 3px solid #00d4ff;">
                <span>${tx.type}: ${tx.asset}</span>
                <span style="float: right; color: #ffcc00; font-size: 10px;">${tx.status}</span>
            </div>
        `).join('');
    }
}
