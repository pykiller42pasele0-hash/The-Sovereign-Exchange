/* --- MODULE: PROTOCOL TRADING ENGINE --- */
const TradingLogic = {
    calculateAndExecute: function(type, amount) {
        if (!sovereignState.isLoggedIn) return alert("Bitte erst einloggen.");
        
        const fee = amount * 0.0025; // 0.25% Protocol Fee
        const totalCost = type === 'BUY' ? amount + fee : amount - fee;

        // Prüfung der Liquidität
        if (type === 'BUY' && sovereignState.fiatBalance < totalCost) {
            return alert("Unzureichendes Saldo (inkl. 0.25% Gebühr).");
        }

        // Ausführung & Genesis-Fee Verteilung
        if (typeof FeeLogic !== 'undefined') {
            FeeLogic.processFee(amount); 
        }

        // Update der State-Variablen
        if (type === 'BUY') sovereignState.fiatBalance -= totalCost;
        else sovereignState.fiatBalance += totalCost;

        // Dokumentation im P2P Stream
        ExplorerEngine.addBlock({
            isUser: true,
            addr: sovereignState.walletAddress,
            msg: `${type} SUCCESS: ${amount} | FEE_PAID: ${fee.toFixed(4)}`
        });

        if (typeof updateUI === "function") updateUI();
    }
};
