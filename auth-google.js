/* --- MODULE: GOOGLE IDENTITY HUB --- */
const GoogleAuth = {
    init: function() {
        console.log("Google Auth Module loaded.");
    },
    selectAccount: function() {
        // Simuliert das Fenster für die Account-Wahl
        const accounts = ["mein.name@gmail.com", "work.sovereign@googlemail.com"];
        let choice = prompt("Wähle einen Google-Account:\n1: " + accounts[0] + "\n2: " + accounts[1]);
        
        if(choice) {
            let selected = choice == "2" ? accounts[1] : accounts[0];
            document.getElementById('login-user').value = selected.split('@')[0];
            document.getElementById('login-pass').value = "G-AUTH-TOKEN-99";
            performLogin(); // Nutzt die Funktion aus app.js
        }
    }
};
// Bindet den Button an die neue Logik
document.addEventListener('DOMContentLoaded', () => {
    const btn = document.querySelector("button:contains('GOOGLE')");
    if(btn) btn.onclick = () => GoogleAuth.selectAccount();
});
