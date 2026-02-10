/* --- THE SOVEREIGN ENGINE: FINAL PERMUTATION --- */

let sovereignState = {
    isLoggedIn: false,
    username: "",
    provider: "Native",
    walletAddress: "0x" + Math.random().toString(16).slice(2, 10).toUpperCase(),
    fiatBalance: 2500.00,
    assetBalances: { "Crypto": 0.0, "Aktien": 0.0, "Rohstoffe": 0.0 },
    currentAsset: "Crypto",
    transactions: []
};

document.addEventListener('DOMContentLoaded', () => {
    switchAsset('Crypto');
    startGlobalFeed();
});

function showPage(pageId) {
    if (pageId === 'wallet' && !sovereignState.isLoggedIn) pageId = 'login';
    document.querySelectorAll('.page-section').forEach(s => s.style.display = "none");
    const target = document.getElementById(pageId);
    if (target) target.style.display = "flex";
    document.getElementById('back-btn').style.display = (pageId === 'zentrale') ? 'none' : 'inline-block';
}

function switchAsset(type) {
    sovereignState.currentAsset = type;
    const symbols = { "Crypto": "BINANCE:BTCUSDT", "Aktien": "NASDAQ:AAPL", "Rohstoffe": "TVC:GOLD" };
    const units = { "Crypto": "BTC", "Aktien": "AAPL", "Rohstoffe": "GOLD" };
    new TradingView.widget({
        "autosize": true, "symbol": symbols[type], "interval": "D", "theme": "dark", "container_id": "tradingview_widget", "hide_top_toolbar": true
    });
    document.getElementById('asset-unit').innerText = units[type];
    updateUI();
}

function performLogin() {
    const user = document.getElementById('login-user').value;
    if (user.length < 3) return alert("ID zu kurz.");
    
    sovereignState.username = user;
    sovereignState.isLoggedIn = true;
    document.getElementById('sovereign-id').innerText = `ID: ${user.toUpperCase()}`;
    document.getElementById('wallet-addr').innerText = sovereignState.walletAddress;
    document.getElementById('zentrale-saldos').style.display = "flex";
    document.getElementById('settings-icon').style.display = "inline";
    
    updateUI();
    showPage('zentrale');
    createBlock(true, {msg: `IDENTITY_ANCHOR: ${user.toUpperCase()} LINKED`});
}

async function socialLogin(provider) {
    // API Simulation: Übernimmt Benutzerdaten von Drittanbietern
    const dummyNames = { google: "G-User", github: "Git-Node", microsoft: "MS-Sovereign", walletconnect: "Eth-Wallet" };
    document.getElementById('login-user').value = dummyNames[provider] + "_" + Math.floor(Math.random()*999);
    document.getElementById('login-pass').value = "API_STUB_TOKEN";
    sovereignState.provider = provider.toUpperCase();
    performLogin();
}

function executeTrade(type) {
    if (!sovereignState.isLoggedIn) return showPage('login');
    const amount = 100;
    const fee = amount * 0.0025;
    
    if (type === 'buy') {
        sovereignState.fiatBalance -= (amount + fee);
        sovereignState.assetBalances[sovereignState.currentAsset] += 0.005; 
    } else {
        sovereignState.fiatBalance += (amount - fee);
        sovereignState.assetBalances[sovereignState.currentAsset] -= 0.005;
    }
    
    addTx(type.toUpperCase(), fee);
    updateUI();
}

function initWithdraw() {
    if (!sovereignState.isLoggedIn) return showPage('login');
    const addr = prompt("Ziel-Adresse eingeben:");
    const amount = prompt("Betrag:");
    if (addr && amount) {
        const fee = parseFloat(amount) * 0.0025;
        if (confirm(`Auszahlung: ${amount}\nGebühr: ${fee.toFixed(2)}\nBestätigen?`)) {
            sovereignState.fiatBalance -= (parseFloat(amount) + fee);
            addTx("WITHDRAW", fee);
            updateUI();
        }
    }
}

function updateUI() {
    if (!sovereignState.isLoggedIn) return;
    const fiat = `$ ${sovereignState.fiatBalance.toFixed(2)}`;
    document.getElementById('fiat-val').innerText = fiat;
    document.getElementById('balance').innerText = fiat;
    document.getElementById('asset-val').innerText = sovereignState.assetBalances[sovereignState.currentAsset].toFixed(4);
    
    const list = document.getElementById('portfolio-list');
    list.innerHTML = sovereignState.transactions.slice(0, 10).map(tx => `
        <div style="background:rgba(255,255,255,0.05); padding:8px; margin-bottom:5px; border-radius:4px; font-size:11px;">
            ${tx.type} | ${tx.asset} | FEE: ${tx.fee} | OK
        </div>
    `).join('');
}

function addTx(type, fee) {
    const tx = { type, asset: sovereignState.currentAsset, fee: fee.toFixed(4) };
    sovereignState.transactions.unshift(tx);
    createBlock(true, {msg: `${type} SUCCESS | FEE: ${tx.fee}`});
}

function createBlock(isUserAction = false, data = {}) {
    const hash = Math.random().toString(16).substring(2, 12).toUpperCase();
    const type = isUserAction ? "USER_TX" : "SYS_NET";
    const addr = isUserAction ? sovereignState.walletAddress : "ANONYMIZED";
    const color = isUserAction ? "#00d4ff" : "rgba(0,255,136,0.4)";
    
    const blockHTML = `
        <div style="border-left: 2px solid ${isUserAction ? '#00d4ff' : '#00ff88'}; margin-bottom:4px; padding-left:5px; color:${color}">
            [${type}-${hash}] ${data.msg || 'POW_VALIDATION_ACTIVE'} | ADDR: ${addr} | FEE_0.25%
        </div>
    `;
    
    const gStream = document.getElementById('global-stream');
    gStream.innerHTML = blockHTML + gStream.innerHTML.substring(0, 1500);
    
    if(isUserAction) {
        const pStream = document.getElementById('private-stream');
        if(pStream) pStream.innerHTML = blockHTML + pStream.innerHTML;
    }
}

function startGlobalFeed() {
    setInterval(() => {
        if(Math.random() > 0.3) createBlock(false); // Simuliert P2P-Rauschen
    }, 4000);
}

function openSettings() {
    if (!sovereignState.isLoggedIn) return;
    alert(`--- SOVEREIGN IDENTITY ---
Username: ${sovereignState.username}
Main-Provider: ${sovereignState.provider}
Wallet: ${sovereignState.walletAddress}

--- LINKED ---
GitHub/Google/MS: ENABLED ✅
WalletConnect: ACTIVE ✅
Fee-Rate: 0.25% (Protocol Enforced)`);
}
