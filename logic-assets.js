/* --- MODULE: ASSET CATEGORY SWITCHER --- */
const AssetLogic = {
    configs: {
        'CRYPTO': { unit: 'BTC', pair: 'BINANCE:BTCUSDT' },
        'AKTIEN': { unit: 'AAPL', pair: 'NASDAQ:AAPL' },
        'ROHSTOFFE': { unit: 'GOLD', pair: 'TVC:GOLD' }
    },
    updateCategory: function(category) {
        const config = this.configs[category];
        if (!config) return;

        sovereignState.currentAsset = category;
        console.log(`TSE: Market Context set to ${category}`);

        // UI-Update der Bestandsanzeige (Saldos)
        const assetVal = document.getElementById('asset-val');
        if (assetVal) {
            const balance = sovereignState.assetBalances[category] || 0;
            assetVal.innerText = balance.toFixed(4) + " " + config.unit;
        }
        
        // Signal an den Explorer
        ExplorerEngine.addBlock({ msg: `NETWORK_SYNC: ${category} Market Active` });
    }
};

// Bindet die Buttons automatisch an die Logik
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.asset-btn').forEach(btn => {
        btn.onclick = () => AssetLogic.updateCategory(btn.innerText.toUpperCase());
    });
});
