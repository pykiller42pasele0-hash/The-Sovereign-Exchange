/* --- MODULE: WALLETCONNECT MULTI-CHAIN BRIDGE --- */
const WalletConnectAuth = {
    chains: ["Binance Smart Chain", "Ethereum", "Polygon", "Solana"],
    
    openBridge: function() {
        let list = this.chains.map((c, i) => `${i+1}: ${c}`).join('\n');
        let choice = prompt("Wähle eine Chain zum Verbinden:\n" + list);
        
        if(choice) {
            const selectedChain = this.chains[parseInt(choice)-1] || "Multi-Chain";
            alert(`${selectedChain} wird via WalletConnect gekoppelt...`);
            
            document.getElementById('login-user').value = "WC_NODE_" + Math.random().toString(16).slice(2, 6).toUpperCase();
            document.getElementById('login-pass').value = "WC_SESSION_ACTIVE";
            
            if (typeof performLogin === "function") performLogin();
        }
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const btn = Array.from(document.querySelectorAll('.haptic-btn')).find(b => b.innerText.includes('WALLETCONNECT'));
    if(btn) btn.onclick = () => WalletConnectAuth.openBridge();
});
