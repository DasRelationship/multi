---
template: base.njk
title: Signatur
icon: "&#128395;"
background: 1
bodyScript: >-
    function showGbrSelector() {
        return new Promise((resolve) => {
            const overlay = document.createElement('div');
            overlay.className = 'modal-overlay';
            
            const modal = document.createElement('div');
            modal.className = 'modal';
            modal.innerHTML = `
                <h3>Wählen Sie die Signatur</h3>
                <p>Für welche GbR möchten Sie die Signatur erstellen?</p>
                <div class="modal-buttons">
                    <button class="notion-button" onclick="this.closest('.modal-overlay').remove(); return false;">Das Relationship</button>
                    <button class="notion-button" onclick="this.closest('.modal-overlay').remove(); return false;">Schulbegleitung</button>
                </div>
            `;

            overlay.appendChild(modal);
            document.body.appendChild(overlay);

            // Trigger animations
            requestAnimationFrame(() => {
                overlay.style.opacity = '1';
                modal.style.transform = 'translateY(0)';
            });

            // Add click handlers
            const [drsButton, schulbegleitungButton] = modal.querySelectorAll('button');
            drsButton.onclick = () => {
                overlay.style.opacity = '0';
                modal.style.transform = 'translateY(20px)';
                setTimeout(() => overlay.remove(), 200);
                resolve('drs');
            };
            schulbegleitungButton.onclick = () => {
                overlay.style.opacity = '0';
                modal.style.transform = 'translateY(20px)';
                setTimeout(() => overlay.remove(), 200);
                resolve('schulbegleitung');
            };
        });
    }
    
    async function getQueryParams() {
            const params = new URLSearchParams(window.location.search);
            const gbrValue = params.get('gbr');
            
            if (!gbrValue) {
                const choice = await showGbrSelector();
                return {
                    name: params.get('name') || '',
                    tel: params.get('tel') || '',
                    position: params.get('position') || '',
                    gbr: choice
                };
            }
    
            return {
                name: params.get('name') || '',
                tel: params.get('tel') || '',
                position: params.get('position') || '',
                gbr: gbrValue === 'schulbegleitung' ? 'schulbegleitung' : 'drs'
            };
        }
    
    async function generateSignature() {
            const { name, tel, position, gbr } = await getQueryParams();  // Only call once and destructure directly
            const signatureContainer = document.getElementById('signature-container');
            let signatureHTML = `<div class="signature-output" id="signature-output">`;
    
            if (name) {
                signatureHTML += `<p>${name}</p>`;
            }
    
            if (position) {
                signatureHTML += `<p>${position}</p>`;
            }
    
            if (tel) {
                signatureHTML += `<p>${tel}</p>`;
            }
    
            const companyInfo = {
                drs: {
                    name: 'Das Relationship GbR',
                    legalName: 'Das Relationship Jonathan Makkonen und Janine Förster Coaching GbR',
                    postAddress: 'Hermannsteiner Straße 100, 35614 Aßlar',
                    sitzAddress: 'Hermann-Löns-Straße 2, 35510 Butzbach',
                    email: 'info@dasrelationship.com',
                    website: 'https://dasrelationship.com',
                    geschaftsfuehrer: 'Jonathan Makkonen, Janine Förster',
                    ustid: 'DE 326991277',
                    datenschutz: 'https://dasrelationship.com/datenschutz',
    
                },
                schulbegleitung: {
                    name: 'Das Relationship Schulbegleitung GbR',
                    legalName: 'Das Relationship Jonathan Makkonen und Janine Förster und Kemal Aydemir Schulbegleitung GbR',
                    postAddress: 'Hermannsteiner Straße 100, 35614 Aßlar',
                    sitzAddress: 'Hermannsteiner Straße 100, 35614 Aßlar',
                    email: 'schulbegleitung@dasrelationship.com',
                    website: 'https://schulbegleitung.dasrelationship.com',
                    geschaftsfuehrer: 'Jonathan Makkonen, Janine Förster, Kemal Aydemir',
                    ustid: '', 
                    datenschutz: 'https://schulbegleitung.dasrelationship.com/datenschutz'
                }
            };
    
            const company = companyInfo[gbr] || companyInfo.drs;
    
            signatureHTML += `
                <p>Postanschrift:<br><b>${company.name}</b><br>${company.postAddress}<br>${company.email}<br><a href="${company.website}">${company.website}</a></p>
                <p>Sitz:<br><b>${company.legalName}</b><br>${company.sitzAddress}</p>
                <p>Geschäftsführer: ${company.geschaftsfuehrer}</p>
                ${company.ustid ? `<p>Umsatzsteuer-Identifikationsnummer nach § 27 a UStG: ${company.ustid}</p>` : ''}
                <p>Datenschutzhinweise finden Sie hier: <a href="${company.datenschutz}">${company.datenschutz}</a></p>
                <p>Diese E-Mail kann vertrauliche und/oder privilegierte Informationen enthalten. Wenn Sie nicht der beabsichtigte Empfänger sind (oder diese E-Mail irrtümlich erhalten haben), benachrichtigen Sie bitte unverzüglich den Absender und vernichten Sie diese E-Mail. Jegliche unbefugte Vervielfältigung, Offenlegung oder Verbreitung des in dieser E-Mail enthaltenen Materials ist strengstens untersagt.</p>
            </div>
            `;
    
            signatureHTML += `
                </div>
                <div class="signature-actions">
                    <button class="notion-button" onclick="copySignature()">Signatur Kopieren</button>
                </div>
            `;
    
            signatureContainer.innerHTML = signatureHTML;
        }

    function showNotification(message) {
            const notification = document.createElement('div');
            notification.className = 'notification';
            notification.textContent = message;
            document.body.appendChild(notification);
            
            // Trigger animation
            setTimeout(() => notification.classList.add('show'), 10);
            
            // Remove notification
            setTimeout(() => {
                notification.classList.remove('show');
                setTimeout(() => document.body.removeChild(notification), 200);
            }, 2000);
        }
    
    function copySignature() {
        const signature = document.getElementById("signature-output");
        const content = signature.innerHTML
            .replace(/style="[^"]*"|class="[^"]*"/g, '')
            .replace(/\s+/g, ' ')
            .replace(/>\s+</g, '><')
            .trim();
    
        navigator.clipboard.writeText(content).then(() => {
            showNotification("Signatur wurde kopiert!");
        }).catch(err => {
            const textarea = document.createElement('textarea');
            textarea.value = content;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
            showNotification("Signatur wurde kopiert!");
        });
    }

    window.onload = generateSignature;
customCSS: |
    .signature-output {
        margin: 20px 0;
    }
    .info-icon {
        float: right;
        cursor: pointer;
        color: #0066cc;
    }
    details summary {
        display: flex;
        align-items: center;
        gap: 0.5em;
        cursor: pointer;
    }
    details summary h2 {
        margin: 0;
        display: inline;
    }
    .signature-actions {
        margin-top: 1rem;
        margin-bottom: 1rem;
        text-align: left;
        display: flex;
        gap: 1rem;
        justify-content: flex-start;
    }
    button {
        padding: 6px 12px;
        border-radius: 3px;
        font-size: 14px;
        transition: background-color 0.1s ease;
        border: 1px solid rgba(0, 0, 0, 0.1);
    }
    
    .background {
        display: flex;
        justify-content: center;
        align-items: center;
        background-position: center;
        background-size: cover;
        background-repeat: no-repeat;
        width: 100%;
        height: 200px;
        position: relative;
    }
    .notification {
        position: fixed;
        bottom: 20px;
        left: 20px;
        background: rgba(55, 53, 47, 0.9);
        color: white;
        padding: 12px 24px;
        border-radius: 6px;
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.2s ease;
    }
    .notification.show {
        opacity: 1;
        transform: translateY(0);
    }
    .modal-overlay {
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: transparent;
        display: flex;
        justify-content: flex-end;
        align-items: flex-end;
        opacity: 0;
        transition: opacity 0.2s ease;
        z-index: 9999;
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        pointer-events: none;
    }
    .modal {
        background: white;
        padding: 24px;
        border-radius: 8px;
        max-width: 400px;
        width: 90%;
        transform: translateY(20px);
        transition: transform 0.2s ease;
        z-index: 10000;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        pointer-events: auto;
    }
    .modal h3 {
        margin-top: 0;
        margin-bottom: 16px;
    }
    .modal-buttons {
        display: flex;
        gap: 12px;
        justify-content: flex-end;
        margin-top: 24px;
    }
    .notion-button {
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: rgb(239, 239, 238);
        border: 1px solid rgba(55, 53, 47, 0.16);
        border-radius: 6px;
        color: rgb(55, 53, 47);
        font-family: ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI Variable Display", "Segoe UI", Helvetica, "Apple Color Emoji", Arial, sans-serif;
        font-size: 14px;
        font-weight: 500;
        height: 32px;
        padding: 8px 12px;
        min-width: 50px;
        cursor: pointer;
        transition: background 0.02s ease-in;
        white-space: nowrap;
        column-gap: 6px;
        box-sizing: border-box;
        -webkit-user-select: none;
        user-select: none;
        outline: none;
        text-align: center;
    }

    .notion-button:hover {
        background-color: rgba(55, 53, 47, 0.08);
    }

---

<div id="signature-container">
    <!-- Die Signatur wird hier durch das Skript generiert -->
</div>

<h2>Einrichtung</h2>
<p>Solltest du Probleme bei der Installation haben, schreib gerne mir (Jesper) per E-Mail oder WhatsApp.</p>
<details class="mt-3">
    <summary>Nextcloud</summary>
    <section id="instructions">
        <ol>
            <li>Öffne die Mail App</li>
            <li>Klicke auf die drei Punkte neben der E-Mail-Adresse, für die du die Signatur einrichten möchtest</li>
            <li>Wähle „Signatur“ aus</li>
            <li>Füge die Signatur mit <code>&#8984;</code> + <code>v</code> (macOS) oder <code>strg</code> + <code>v</code> (Windows) ein</li>
            <li>Klicke auf „Signatur speichern“</li>
        </ol>
    </section>
</details>
<details class="mt-3">
    <summary>GMail (Android)</summary>
    <ol>
        <li>Öffne die GMail App</li>
        <li>Tippe links oben auf das Dreistrich-Menü</li>
        <li>Scrolle nach unten und tippe auf Einstellungen</li>
        <li>Wähle das Mail-Konto aus, für das du eine Signatur hinzufügen möchtest</li>
        <li>Tippe auf Mobile Signatur</li>
        <li>Füge den Text für die Signatur ein</li>
        <li>Tippe auf OK</li>
    </ol>
</details>
<details class="mt-3">
    <summary>GMail (iOS & iPadOS)</summary>
    <ol>
        <li>Öffne die GMail App auf deinem iPhone oder iPad.</li>
        <li>Tippe links oben auf das Dreistrich-Menü und dann auf „Einstellungen“.</li>
        <li>Tippe unter „E-Mails schreiben und beantworten" auf „Signatureinstellungen“.</li>
        <li>Aktiviere „Mobile Signatur“.</li>
        <li>Füge eine mobile Signatur hinzu oder bearbeite deine Signatur.</li>
        <li>Tippe auf „Zurück“, um die Einstellungen zu speichern.</li>
    </ol>
</details>
<details class="mt-3">
    <summary>Thunderbird</summary>
    <section id="instructions">
        <ol>
            <li>Öffne Thunderbird</li>
            <li>Klicke unten links auf das Zahnrad-Icon</li>
            <li>Klicke in der Leiste unten „Konten-Einstellungen“</li>
            <li>Klicke auf die E-Mail-Adresse, für die du die Signatur einrichten möchtest</li>
            <li>Füge die Signatur unter „Signaturtext“ mit <code>&#8984;</code> + <code>v</code> (macOS) oder <code>strg</code> + <code>v</code> (Windows) ein</li>
            <li>Klicke auf „Signatur speichern“</li>
        </ol>
    </section>
</details>