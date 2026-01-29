# Next.js Multi-Language Documentation Site

Overview
--------
This is a high-performance, multi-language documentation portal built with Next.js (App Router). It features Incremental Static Regeneration (ISR), internationalization (i18n), Algolia-style search, and Swagger UI integration.

Features
--------
- **ISR & SSG**: Fast static pages with background revalidation.
- **i18n**: Support for English (en), Spanish (es), French (fr), and German (de).
- **Search**: Client-side full-text search.
- **API Reference**: Integrated Swagger UI for OpenAPI specs.
- **Theming**: Dark/Light mode toggle.
- **Responsive**: Mobile-friendly layout with Tailwind CSS.

Setup & Installation
--------------------

### Preresiquites
- Node.js 18+
- Docker (optional)

### Local Development
1. Install dependencies:
   ```bash
   npm install
   ```
2. create `.env` file from `.env.example`:
   ```bash
   cp .env.example .env
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000).

### Docker
1. Build and run the container:
   ```bash
   docker-compose up --build
   ```
   The app will be available at [http://localhost:3000](http://localhost:3000).

Architecture
------------
- **Framework**: Next.js 13+ (App Router)
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Content**: Markdown files in `_docs/`
- **State**: React Context (ThemeProvider)

Project Structure
-----------------
- `app/`: Next.js App Router pages and layouts.
- `components/`: Reusable UI components.
- `lib/`: Utility functions (content parsing).
- `public/`: Static assets and translation files.
- `_docs/`: Documentation markdown source files.
- `docker-compose.yml`: Docker orchestration.
