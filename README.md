## Getting Started

Install dependencies and run the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Admin Panel

- Admin URL: [http://localhost:3000/admin](http://localhost:3000/admin)
- Default password fallback: `admin123`
- Recommended: create `.env.local` and set:

```bash
ADMIN_PANEL_PASSWORD=guclu-bir-sifre-yaz
```

From the panel you can:

- edit hero text and CTA links
- add/remove/toggle highlighted cards
- view visitor count and location analytics

## Visitor Analytics

Visitor records are stored in `data/visits.json` via `POST /api/track`.
Admin analytics are served from `GET /api/admin/stats`.

## Installed Integrations

- `framer-motion` for smoother UI transitions
- `@21st-dev/registry` for importing 21st.dev components into the project

Quick commands:

```bash
npm run 21st:login
npm run 21st:add -- @team/component
```

For deployment details, check [Next.js deployment docs](https://nextjs.org/docs/app/building-your-application/deploying).
