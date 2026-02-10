/* --- MODULE: MICROSOFT AZURE BRIDGE --- */
const MicrosoftAuth = {
    connect: function() {
        console.log("Connecting to Microsoft Live API...");
        // Simulation des Microsoft-Login-Screens
        setTimeout(() => {
            document.getElementById('login-user').value = "MS_Sovereign_User";
            document.getElementById('login-pass').value = "MS-TOKEN-VALID";
            performLogin();
        }, 1000);
    }
};
