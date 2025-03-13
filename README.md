# Das Relationship Multi-Site  

[![Netlify Status](https://api.netlify.com/api/v1/badges/75450437-ea88-4f97-94c5-e726c798cc60/deploy-status)](https://app.netlify.com/sites/dasrelationship-multi/deploys)  
Eine vielseitige Website, erstellt mit 11ty für Das Relationship, mit Funktionen wie Signaturgenerierung, Dokumentation und Social-Media-Integration.  

## Voraussetzungen  

- Node.js (empfohlen: Version 18 oder höher)  
- npm  

## Installation  

```bash
npm install
```

## Entwicklung  

Um den Entwicklungsserver zu starten:  

```bash
npm run dev
```

Dadurch wird ein lokaler Server unter `http://localhost:8080` gestartet.  

## Build  

Um die Website für die Produktion zu erstellen:  

```bash
npm run build
```

Die erstellte Website befindet sich im Verzeichnis `_site`.  

## Projektstruktur  

```
src/
├── _data/          # Globale Daten-Dateien (podcast.json, social.json)
├── _includes/      # Wiederverwendbare Komponenten und Partials
├── _layouts/       # Layout-Vorlagen (base.njk)
└── */              # Inhaltsseiten in Markdown
    └── signatur/   # Seiten für den Signatur-Generator
```

## Funktionen  

- Responsives Design mit Potion CSS  
- Social-Media-Integration  
- Podcast-Link-Integration  
- Individueller Signatur-Generator  
- Dokumentationsseiten  
- HTML-Formatierung  
- Asset-Passthrough für CSS und JS  

## Konfiguration  

- Template-Engine: Nunjucks  
- Markdown-Dateien verwenden `layout: base.njk` im Frontmatter  
- Globale Daten sind über die Variablen `podcast` und `social` verfügbar  
- Debug-Collection für die Entwicklung verfügbar  

## Deployment  

Die Website wird mit Netlify bereitgestellt und verwendet folgende Konfiguration:  
- Build-Befehl: `npm run build`  
- Veröffentlichungsverzeichnis: `_site`  

## Lizenz

Dieses Projekt steht unter der [GNU Affero General Public License v3 (AGPL-3.0)](LICENSE).