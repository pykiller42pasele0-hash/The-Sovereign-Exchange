/* --- MODULE: WALLET REINFORCEMENT --- */
const WalletModule = {
    generateSovereignIdentity: function() {
        // Nutzt die 12 Wörter, um deine Identität in der HTML zu verankern
        const seed = TSE_SYSTEM.generateMnemonic(); 
        const addr = "TSE-" + Math.random().toString(36).substring(2, 10).toUpperCase();
        
        // Speichert es so, dass die index.html es beim Seitenwechsel findet
        sovereignState.walletAddress = addr;
        TSE_SYSTEM.vault.seed = seed;
        TSE_SYSTEM.vault.ownerAddress = addr;
        TSE_SYSTEM.saveVault();
        
        console.log("Wallet verstärkt: Phrasen generiert.");
    }
};
