/* --- MODULE: SYSTEM INITIALIZER & DIAGNOSTICS --- */

document.addEventListener('DOMContentLoaded', () => {
    console.log("TSE: Starting System Diagnostics...");
    
    // Eine Liste deiner Module, die wir prüfen
    const modules = [
        { name: "AUTH_GATEWAY", status: typeof TSE_SYSTEM !== 'undefined' },
        { name: "P2P_EXPLORER", status: typeof ExplorerEngine !== 'undefined' },
        { name: "TRADING_ENGINE", status: typeof TradingLogic !== 'undefined' },
        { name: "ASSET_CORE", status: typeof AssetLogic !== 'undefined' },
        { name: "GENESIS_FEE_LOGIC", status: typeof FeeLogic !== 'undefined' }
    ];

    // Visualisierung im Sovereign Viewer
    setTimeout(() => {
        if (typeof ExplorerEngine !== 'undefined') {
            ExplorerEngine.addBlock({ 
                msg: "SYSTEM_BOOT: OS v1.0.42-HASH | NODES_ONLINE", 
                addr: "CORE_SYSTEM" 
            });

            modules.forEach(mod => {
                const statusText = mod.status ? "STABLE" : "OFFLINE";
                const color = mod.status ? "color: #00ff88" : "color: #ff4444";
                
                console.log(`%c[CHECK] ${mod.name}: ${statusText}`, color);
                
                // Wir loggen nur Fehler oder wichtige Status in den Viewer
                if (!mod.status) {
                    ExplorerEngine.addBlock({ msg: `CRITICAL: ${mod.name} is ${statusText}!`, addr: "DIAGNOSTICS" });
                }
            });
        }
    }, 1000); // 1 Sekunde Verzögerung für den Effekt
});
