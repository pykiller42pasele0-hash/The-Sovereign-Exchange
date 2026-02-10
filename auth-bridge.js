/* --- SOVEREIGN AUTH BRIDGE API --- */

(function() {
    console.log("Auth Bridge active: Linking Social Hub to Sovereign Engine...");

    // 1. Initialisierung: Wir warten, bis das DOM geladen ist
    document.addEventListener('DOMContentLoaded', () => {
        linkSocialButtons();
    });

    function linkSocialButtons() {
        // Wir suchen alle Buttons in der Login-Sektion
        const loginSection = document.getElementById('login');
        if (!loginSection) return;

        const buttons = loginSection.querySelectorAll('.haptic-btn');
        
        buttons.forEach(btn => {
            const label = btn.innerText.toUpperCase();
            
            // Zuweisung der Logik basierend auf dem Button-Text
            if (label.includes('GOOGLE')) {
                btn.onclick = () => triggerSocialAuth('Google', '#db4437');
            } else if (label.includes('GITHUB')) {
                btn.onclick = () => triggerSocialAuth('GitHub', '#333');
            } else if (label.includes('MICROSOFT')) {
                btn.onclick = () => triggerSocialAuth('Microsoft', '#00a1f1');
            } else if (label.includes('WALLETCONNECT')) {
                btn.onclick = () => triggerSocialAuth('WalletConnect', '#3b99fc');
            }
        });
    }

    async function triggerSocialAuth(provider, themeColor) {
        console.log(`Bridge: Initiating ${provider} Protocol...`);
        
        // Visuelles Feedback am Button
        const statusMsg = document.createElement('div');
        statusMsg.style.cssText = `color:${themeColor}; font-size:10px; margin-top:5px; font-family:monospace;`;
        statusMsg.innerText = `CONNECTING TO ${provider}...`;
        document.getElementById('login').appendChild(statusMsg);

        // Simulation der API-Antwortzeit
        await new Promise(resolve => setTimeout(resolve, 1200));

        // Daten-Generierung für deine app.js
        const fakeUser = `${provider}_${Math.random().toString(36).substring(7).toUpperCase()}`;
        const fakePass = `AUTH_${Math.random().toString(16).slice(2, 10)}`;

        // Übertragung in die bestehenden Input-Felder
        const userField = document.getElementById('login-user');
        const passField = document.getElementById('login-pass');

        if (userField && passField) {
            userField.value = fakeUser;
            passField.value = fakePass;
            
            // Status-Update
            statusMsg.innerText = `${provider} VERIFIED. ANCHORING...`;
            
            // Finaler Aufruf deiner bestehenden Login-Logik aus app.js
            setTimeout(() => {
                statusMsg.remove();
                if (typeof performLogin === "function") {
                    performLogin();
                }
            }, 800);
        }
    }
})();
