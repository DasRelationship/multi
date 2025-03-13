# Das Relationship Multi Site

[![Netlify Status](https://api.netlify.com/api/v1/badges/75450437-ea88-4f97-94c5-e726c798cc60/deploy-status)](https://app.netlify.com/sites/dasrelationship-multi/deploys)

A multi site built with 11ty for Das Relationship.

## Prerequisites

- Node.js (v18 or higher recommended)
- npm

## Installation

```bash
npm install
```

## Development

To start the development server:

```bash
npx @11ty/eleventy --serve
```

This will start a local server at `http://localhost:8080`

## Build

To build the site for production:

```bash
npx @11ty/eleventy
```

The built site will be in the `_site` directory.

## Project Structure

```
src/
├── _data/          # Global data files
├── _includes/      # Reusable components
├── _layouts/       # Layout templates
└── */              # Content pages
```

## Features

- Responsive design
- Social media integration
- Podcast links
- Custom signatures generator
- Documentation pages

## Deployment

The site is deployed using Netlify with the following configuration:
- Build command: `npx @11ty/eleventy`
- Publish directory: `_site`

## License

ISC