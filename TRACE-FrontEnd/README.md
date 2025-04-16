# TRACE System – Fullstack Reconnaissance Platform

This repository contains the fullstack implementation of the TRACE (Targeted Reconnaissance for Advanced Content Exploitation) system. TRACE enables automated scanning, crawling, and testing of web applications using a unified interface. It includes both the backend modules and a frontend SvelteKit-based dashboard.

---

## Subsystem Components (Backend)

### Crawler Module

The **Crawler** performs structured, recursive traversal of a target website to identify accessible paths and gather HTTP response data. It builds a tree-based representation of discovered URLs and records relevant metadata for further analysis.

- Supports depth limits, delay configuration, and custom user-agent headers.
- Stores response data.
- Populates a directory tree used by other modules.

---

### ML Algorithm for Credentialing Generator

This component uses NLP and AI techniques to generate realistic credential pairs based on content scraped from the target site.

- **Web Scraper**: Extracts visible and hidden text from crawled pages.
- **MDP Model**: Simulates user decision-making to generate common password patterns.
- Outputs username/password combinations.

---

### Fuzzer Module

The **Fuzzer** dynamically generates and sends parameterized HTTP requests to identify input-based vulnerabilities.

- Supports multiple HTTP methods (GET, POST, PUT).
- Accepts user-provided wordlists.
- Filters results based on status codes and content length.

---

### Brute Force Engine

The **Brute Force** module attempts to log in using the generated credentials against a given login endpoint.

- Supports form field customization and request configuration.
- Tracks attempt metrics like success/failure, response time, and status codes.
- Filters and stores results for UI presentation.

---

## Frontend (SvelteKit)

The frontend is built using **SvelteKit**, providing a reactive dashboard that allows users to:

- Set up scans and fuzzing operations through forms.
- View real-time logs, metrics, and results.
- Navigate module tools like Crawler, Fuzzer, and Brute Force through a sidebar panel.
- View progress bars, tooltips, and result tables.

---

## Integration with TRACE UI

The backend modules are triggered through API routes that the SvelteKit frontend interacts with. The dashboard enables the user to:

- Start and configure a scan.
- Upload wordlists.
- Run brute-force attempts.
- View outputs in real-time.

To launch the full platform locally:

```bash
npm install
npm run dev
```

---

## Status

All components are currently functional and integrated via the frontend dashboard. Logs and visualizations reflect real-time progress for each tool.

---

# sv

Everything you need to build a Svelte project, powered by [`sv`](https://github.com/sveltejs/cli).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```bash
# create a new project in the current directory
npx sv create

# create a new project in my-app
npx sv create my-app
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.
