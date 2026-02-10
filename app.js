/* --- THE SOVEREIGN ENGINE (MASTER) --- */

let sovereignState = {
    isLoggedIn: false,
    username: "",
    walletAddress: "0x" + Math.random().toString(16).slice(2, 10).toUpperCase(),
    balance: 2500.50,
    currentAsset: "Crypto",
    transactions: []
};

document.addEventListener('DOMContentLoaded', () => {
    switchAsset('Crypto');
    startBlockStream();
    
    // Such-Logik binden
    document.getElementById('market-search').addEventListener('input', (e) => {
        if(e.target.value.length > 2) logToViewer(`MARKET-SEARCH: ${e.target.value.toUpperCase()}`);
    });
});

// NAVIGATION (DER TÜRSTEHER)
function showPage(pageId) {
    if (pageId === 'wallet' && !sovereignState.isLoggedIn) {
        pageId = 'login';
    }

    document.querySelectorAll('.page-section').forEach(s => {
        s.style.display = "none";
        s.classList.remove('active');
    });

    const target = document.getElementById(pageId);
    if (target) {
        target.style.display = "flex";
        target.classList.add('active');
    }

    document.getElementById('back-btn').style.display = (pageId === 'zentrale') ? 'none' : 'inline-block';
}

// ASSET-SWITCHER
function switchAsset(type) {
    sovereignState.currentAsset = type;
    let symbol = "BINANCE:BTCUSDT";
    if(type === 'Aktien') symbol = "NASDAQ:AAPL";
    if(type === 'Rohstoffe') symbol = "TVC:GOLD";
    if(type === 'Forex') symbol = "FX:EURUSD";

    new TradingView.widget({
        "autosize": true, "symbol": symbol, "interval": "D", "theme": "dark", "style": "1",
        "locale": "de", "hide_top_toolbar": true, "container_id": "tradingview_widget"
    });
    logToViewer(`PROTOCOL: Switched to ${type}`);
}

// LOGIN LOGIK
async function performLogin() {
    const user = document.getElementById('login-user').value;
    if (user.length < 3) return alert("Identität zu kurz.");

    sovereignState.username = user;
    sovereignState.isLoggedIn = true;
    
    document.getElementById('sovereign-id').innerText = `ID: ${user.toUpperCase()}`;
    document.getElementById('wallet-addr').innerText = sovereignState.walletAddress;
    
    updateUI();
    showPage('wallet');
    logToViewer(`IDENTITY: ${user.toUpperCase()} anchored.`);
}

// TRADING MIT 0.25% FEE
function executeTrade(type) {
    if (!sovereignState.isLoggedIn) return showPage('login');
    
    const amount = 100;
    const fee = amount * 0.0025; // 0,25% Erzwungen
    
    sovereignState.balance -= (amount + fee);
    
    sovereignState.transactions.unshift({
        type: type.toUpperCase(),
        asset: sovereignState.currentAsset,
        status: "Validated [PoW]",
        fee: fee.toFixed(4)
    });
    
    updateUI();
    logToViewer(`TX-POW: ${type.toUpperCase()} | FEE: ${fee.toFixed(4)} signiert.`);
}

function updateUI() {
    document.getElementById('balance').innerText = `$ ${sovereignState.balance.toLocaleString('de-DE', {minimumFractionDigits: 2})}`;
    const list = document.getElementById('portfolio-list');
    list.innerHTML = sovereignState.transactions.map(tx => `
        <div class="meta-balken" style="background:rgba(255,255,255,0.05); padding:10px; margin-bottom:5px; border-radius:5px; font-size:12px;">
            <span>${tx.type}: ${tx.asset}</span>
            <span style="float:right; color:#00ff88;">${tx.status}</span>
        </div>
    `).join('');
}

// VIEWER BLOCK-STREAM
function startBlockStream() {
    const stream = document.getElementById('block-stream');
    setInterval(() => {
        const hash = Math.random().toString(16).substring(2, 12).toUpperCase();
        stream.innerHTML = `<div>[BLOCK-${hash}] VERIFIED | FEE_OK | POW_0.25</div>` + stream.innerHTML.substring(0, 400);
    }, 4000);
}

function logToViewer(msg) {
    const stream = document.getElementById('block-stream');
    stream.innerHTML = `<div style="color:#fff; font-weight:bold;">>>> ${msg}</div>` + stream.innerHTML;
}
