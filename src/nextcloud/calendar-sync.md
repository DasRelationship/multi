---
layout: base.njk
background: 4
title: Das Relationship Calendar Sync
icon: "&#9729;"
description: "Hier findest du die Anleitung, wie du den Kalender-Sync auf deinem Smartphone oder Tablet einrichten kannst."
---
<details class="mt-3">
    <summary>Android</summary>
    <section id="instructions">
        <p><b>Voraussetzungen:</b> Nextcloud Mobil-App eingerichtet</p>
        <ol>
            <li>Installiere <a href="https://www.davx5.com/download/">DAVx⁵ (ehemals DAVDroid)</a>.</li>
            <li>Geh in der mobilen Nextcloud-App auf <i>Einstellungen/Mehr</i> und tippe auf <i>Kalender & Kontakte synchronisieren</i>.</li>
            <li>Nun wird DAVx⁵ das Anmelde-Fenster von Nextcloud öffnen, wo du deine Anmeldedaten eingeben und den Zugriff erlauben musst.</li>
            <li>DAVx⁵ wird geöffnet und du wirst aufgefordert, ein Konto zu erstellen. Leg den Kontonamen auf einen Namen deiner Wahl fest und stell die <b>Kontaktgruppenmethode</b> auf <b>Gruppen sind Kategorien der Kontakte</b>.</li>
            <li>Danach wird DAVx⁵ geschlossen und die Nextcloud-App wird erneut angezeigt. Um das Setup abzuschließen, muss DAVx⁵ erneut manuell gestartet werden.</li>
            <li>Tippe auf das Symbol für das Konto, das DAVx⁵ gerade erstellt hat, und gewähre DAVx⁵ in der Aufforderung Zugriff auf deine Kalender und Kontakte.</li>
            <li>Wenn du auf das Symbol für das Konto tippst, das DAVx⁵ eingerichtet hat, werden die verfügbaren Adressbücher und Kalender erkannt. Wähle, welche du synchronisieren möchtest und schließe den Vorgang ab.</li>
        </ol>
    </section>
</details>
<details class="mt-3">
    <summary>iOS</summary>
    <section id="instructions">
        <ol>
            <li>Öffne <i>Einstellungen/Apps/Kalender/Konten</i></li>
            <li>Geh auf <i>Konto hinzufügen</i>.</li>
            <li>Wähle <i>Andere</i> als Kontotyp und <i>CalDAV-Konto hinzufügen</i></li>
            <li>Im Feld „Server“ muss der Wert <code>app.dasrelationship.cloud</code> eingetragen werden.</li>
            <li>In den Feldern „Benutzername“ und „Passwort“ muss das Nextcloud-Passwort eingetragen werden.</li>
            <li>Gehe auf <i>Weiter</i>.</li>
            <li>Gib bei „Server“ den Wert <code>app.dasrelationship.cloud/remote.php/dav/principals/users/username/</code> ein. <i>username</i> muss durch den Nextcloud-Username, welcher auch zum Anmelden verwendet wird angegeben werden.</li>
        </ol>
    </section>
</details>