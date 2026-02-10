# The-Sovereign-Exchange
A stateless, peer-to-peer decentralized trading dApp. No server, no terminal, 100% browser-based sovereignty with PoW-validation.


# 🌐 THE SOVEREIGN EXCHANGE

## 1. Die Vision: Absolute Unabhängigkeit
The Sovereign Exchange ist eine revolutionäre, dezentrale Handelsplattform (dApp), die als **Stateless Web-App** funktioniert. Es gibt keinen zentralen Server, keine Datenbank und keine Firma, die deine Daten verwaltet. Die gesamte App lebt ausschließlich im Browser deines Handys.

**Das Prinzip:** Dein Gerät ist die Bank. Dein Schlüssel ist das Gesetz.

---

## 2. Technische Mechatronik (No-Terminal / No-Server)
Dieses Projekt ist für maximale Unabhängigkeit optimiert und wird rein über den GitHub-Webeditor verwaltet.
* **Kein Terminal:** Keine Installation von `npm`, `pip` oder Git-Befehlen nötig.
* **Kein Backend:** Keine SQL-Datenbanken oder Firebase. Nutzung der **Web Crypto API** zur Identitätssicherung.
* **Statische Auslieferung:** Gehostet via GitHub Pages; die gesamte Logik liegt in der `app.js`.
* **RAM-Sicherheit:** Alle sensiblen Daten existieren nur im Arbeitsspeicher und werden bei Tab-Schluss gelöscht (Wipe-Protocol).

---

## 3. User Interface & Navigations-Logik
Die App ist als **Single-Page-Application (SPA)** in einem festen Rahmen (Viewport) aufgebaut. Das Design nutzt **Glasmorphismus** (leicht transparente Fenster mit 1px Lichtkante) für ein haptisches App-Gefühl.

### A. Die Zentrale (Trading-Markt)
* **Asset-Switcher:** Haptischer Balken für `CRYPTO`, `AKTIEN`, `ROHSTOFFE` und `FOREX`.
* **Main-Display:** Echtzeit-Charts via WebSockets.
* **Action-Bar (Unten):** Fest verankerte Buttons für `[BUY]`, `[SELL]`, `[EINZAHLEN]` und `[AUSZAHLEN]`.
* **Login-Trigger:** Button `[Profil-Wallet]` oben rechts führt zur Identitäts-Ebene.

### B. Die Login-Bridge (Identitäts-Anker)
* **Doppelte Verankerung:** User-ID (Username/Passwort) wird untrennbar mit der Wallet-Adresse verknüpft.
* **Key-System:** Anmeldung via **Phrase-Input** oder **Datei-Upload** (dein digitaler Ausweis).
* **Social-Entropy:** 4 Buttons (Google, GitHub, Microsoft, WalletConnect) zur Generierung mathematischer Sicherheit.

### C. Wallet-Profil & Portfolio
* **Aktions-Raster:** Sechs haptische Blöcke: `[Senden]`, `[Empfangen]`, `[Swap]`, `[Einzahlen]`, `[Auszahlen]`, `[QR-Scan]`.
* **Sovereign Ledger:** Ein scrollbares Verzeichnis von **Meta-Balken** (deine Transaktions-Historie), gespeichert im verschlüsselten IndexedDB des Browsers.

---

## 4. Der Sovereign Viewer (Die fundamentale Ebene)
Der Viewer bildet die unterste Ebene der App und ist das "Gehirn" hinter der Zentrale.
* **Öko-Cooles Design:** Visualisierung von Live-P2P-Datenströmen.
* **Suchleiste:** Horizontale Suche oben im Viewer zum Auffinden von Hashes, Adressen oder Assets.
* **Beweis-Instanz:** Detailansicht für jeden Meta-Balken aus dem Portfolio (PoW-Hashes, Validierungen).

---

## 5. Das ökonomische Protokoll (Dein Verdienst)
Das Geschäftsmodell ist mathematisch im Code erzwungen:
* **0,25% Gebühr:** Jede Aktion (Trade, Swap, Auszahlung) zieht automatisch eine Gebühr von 0,25% ab.
* **PoW-Erzwingung:** Das dezentrale P2P-Netzwerk (Nutzer-zu-Nutzer) validiert Blöcke nur dann, wenn die Gebühr korrekt an die Betreiber-Wallet-ID signiert wurde.

---

## 6. Bedienungsanleitung für Entwickler (Ich)
Da ich ausschließlich am Handy arbeite, gelten für dieses Repo folgende Regeln:
1. Änderungen erfolgen nur durch direktes Bearbeiten der `.html`, `.css` oder `.js` Dateien.
2. Jede neue Funktion muss als vollständiger Code-Block zum Kopieren geliefert werden.
3. Die Struktur bleibt flach, um die Übersicht im Browser-Editor zu behalten.

---

© 2026 The Sovereign Exchange Protocol – "The Power is in your Browser."
