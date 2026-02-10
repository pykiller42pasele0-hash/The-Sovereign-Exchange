/* --- MODULE: GLOBAL SOVEREIGN EXPLORER (P2P STREAM) --- */
const ExplorerEngine = {
    init: function() {
        console.log("P2P Explorer Engine: Online.");
    },
    // Erzeugt einen neuen Block im globalen Stream
    addBlock: function(data) {
        const gStream = document.getElementById('global-stream');
        if (!gStream) return;

        const hash = Math.random().toString(16).substring(2, 12).toUpperCase();
        const isUser = data.isUser || false;
        
        const blockHTML = `
            <div style="border-left: 2px solid ${isUser ? '#00d4ff' : '#00ff88'}; 
                        margin-bottom: 6px; padding: 6px; background: rgba(255,255,255,0.03); font-size: 10px; font-family: monospace;">
                <span style="color: ${isUser ? '#00d4ff' : '#00ff88'}; font-weight: bold;">
                    [BLOCK-${hash}] ${isUser ? 'USER_TX' : 'SYS_NET'}
                </span><br>
                <span>ADDR: ${data.addr || 'ANONYMOUS'} | FEE: 0.25%</span><br>
                <span style="opacity: 0.8;">MSG: ${data.msg}</span>
            </div>
        `;

        gStream.innerHTML = blockHTML + gStream.innerHTML;
        // Begrenze den Stream auf die letzten 20 Blöcke für Performance
        if (gStream.children.length > 20) gStream.lastElementChild.remove();
    }
};
