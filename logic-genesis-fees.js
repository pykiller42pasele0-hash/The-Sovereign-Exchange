/* --- MODULE: GENESIS FEE COLLECTOR --- */
const FeeLogic = {
    ownerWallet: "0x...DEINE_ADRESSE", // Deine erste Wallet
    processFee: function(amount) {
        let fee = amount * 0.0025;
        console.log(`System: 0.25% Fee (${fee}) an Genesis-Node übertragen.`);
        // Hier wird die Fee in dein Portfolio-Objekt gebucht
        if(sovereignState.isLoggedIn && sovereignState.username === "DEIN_ADMIN_NAME") {
            sovereignState.fiatBalance += fee; 
        }
    }
};
