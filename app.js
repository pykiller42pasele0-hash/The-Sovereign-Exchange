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
    updateUI();
    startBlockStream(); // Startet die Hintergrund-Matrix
    
    // Initialer Chart-Load (Bitcoin)
    setTimeout(() => { switchAsset('Crypto'); }, 500);

    // Event-Listener für die Suchleisten
    document.getElementById('market-search').addEventListener('input', (e) => handleMarketSearch(e.target.value));
    document.getElementById('viewer-search').addEventListener('input', (e) => handleViewerSearch(e.target.value));
});

// 3. NAVIGATION & UI-SWITCHER
function showPage(pageId) {
    if (pageId === 'wallet' && !sovereignState.isLoggedIn) {
        pageId = 'login';
    }

    document.querySelectorAll('.page-section').forEach(section => {
        section.classList.remove('active');
    });

    const targetPage = document.getElementById(pageId);
    if (targetPage) targetPage.classList.add('active');

    const backBtn = document.getElementById('back-btn');
    backBtn.style.display = (pageId === 'zentrale') ? 'none' : 'inline-block';
}

// 4. LIVE-CHART LOGIK (TradingView Engine)
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

    logToViewer(`MARKET-FEED: Switched to ${type} [${symbol}]`);
}

// 5. LOGIN & IDENTITÄTS-VERANKERUNG
async function performLogin() {
    const userIn = document.querySelector('input[placeholder*="Benutzername"]').value;
    const passIn = document.querySelector('input[placeholder*="Passwort"]').value;

    if (userIn.length < 3 || passIn.length < 3) {
        alert("Zugangsdaten zu kurz für 256-bit Verankerung.");
        return;
    }

    sovereignState.username = userIn;
    sovereignState.isLoggedIn = true;
    sovereignState.balance = 2500.75; // Demo-Saldo

    document.getElementById('sovereign-id').innerText = `ID: ${userIn.toUpperCase()}_${sovereignState.walletAddress.slice(0,6)}`;
    document.getElementById('wallet-addr').innerText = sovereignState.walletAddress;

    logToViewer(`IDENTITY: Anchored ${userIn.toUpperCase()} to ${sovereignState.walletAddress}`);
    showPage('wallet');
    updateUI();
}

// 6. TRADING & GEBÜHREN (0.25% Erzwungen)
function executeTrade(type) {
    if (!sovereignState.isLoggedIn) { showPage('login'); return; }

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

    logToViewer(`TX-POW: ${type.toUpperCase()} executed. Fee: ${feeAmount.toFixed(4)} deducted.`);
    updateUI();
}

// 7. VIEWER-MATRIX (BLOCK-STREAM)
function startBlockStream() {
    const stream = document.getElementById('block-stream');
    setInterval(() => {
        const hash = Math.random().toString(16).substring(2, 15);
        const blockInfo = `<div>[BLOCK-${hash.toUpperCase()}] VERIFIED | FEE_SIG: OK | POW_DIFF: 0.25</div>`;
        stream.innerHTML = blockInfo + stream.innerHTML.substring(0, 800);
    }, 4000);
}

function logToViewer(msg) {
    const stream = document.getElementById('block-stream');
    stream.innerHTML = `<div style="color: #fff; font-weight: bold;">>>> ${msg}</div>` + stream.innerHTML;
}

// 8. DOPPEL-SUCHE LOGIK
function handleMarketSearch(val) {
    // In einer echten Umgebung würde dies die TradingView Symbole filtern
    if(val.length > 2) {
        logToViewer(`SEARCH-MARKET: Filtering for ${val.toUpperCase()}...`);
    }
}

function handleViewerSearch(val) {
    // Filtert das Portfolio/Ledger im Viewer-Kontext
    logToViewer(`SEARCH-BLOCKS: Locating Hash ${val}...`);
}

// 9. UI-SYNCHRONISATION
function updateUI() {
    const balanceDisplay = document.getElementById('balance');
    if (balanceDisplay) balanceDisplay.innerText = `$ ${sovereignState.balance.toLocaleString('de-DE', {minimumFractionDigits: 2})}`;

    const portfolioContainer = document.getElementById('portfolio-list');
    if (portfolioContainer) {
        portfolioContainer.innerHTML = sovereignState.transactions.map(tx => `
            <div class="meta-balken" style="cursor:pointer;" onclick="logToViewer('TX-DETAILS: ${tx.asset} validated via PoW')">
                <span>${tx.type}: ${tx.asset}</span>
                <span style="color: #ffcc00; font-size: 10px;">${tx.status}</span>
            </div>
        `).join('');
    }
}
