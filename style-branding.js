/* --- MODULE: BRANDING & COLORS --- */
(function() {
    const styles = `
        .social-btn img { filter: none !important; } /* Entfernt Schwarz-Weiß-Filter */
        button[data-provider="google"] img { color: #4285F4; }
        button[data-provider="github"] img { color: #333; }
        button[data-provider="microsoft"] img { color: #00a1f1; }
        button[data-provider="walletconnect"] img { color: #3b99fc; }
    `;
    const styleSheet = document.createElement("style");
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);
})();
