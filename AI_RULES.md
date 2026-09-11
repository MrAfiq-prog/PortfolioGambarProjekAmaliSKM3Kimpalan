# AI_RULES.md — Project: Portfolio Gambar Projek Amali SKM3 Kimpalan

## Tech Stack (5–10 bullets)

- **Next.js** — React framework; routes live in `src/app/` (App Router).
- **React** — UI library; components are functional with hooks.
- **Tailwind CSS** — styling; use utility classes extensively for layout, spacing, colors.
- **shadcn/ui** — prebuilt UI components (buttons, inputs, cards, tabs, badges); import from `@/components/ui/*`.
- **@libsql/client** — Turso SQLite client; all DB queries go through `src/lib/db.js`.
- **jose** — JWT creation/verification for auth sessions.
- **bcryptjs** — password hashing (register) and comparison (login).
- **@aws-sdk/client-s3 + @aws-sdk/s3-request-presigner** — S3 object upload + presigned URL generation.
- **browser-image-compression** — compress images before upload.
- **jspdf** — generate PDF certificates/reports on the server.
- **uuid** — generate unique IDs for files/records.

## Library Rules

| Concern | Library | Rule |
|---|---|---|
| UI components | shadcn/ui | Always use existing shadcn/ui components; do not edit them — create new wrappers in `src/components/` instead. |
| Styling | Tailwind CSS | Use Tailwind utility classes; avoid custom CSS unless necessary. |
| Database | @libsql/client | All DB access through `src/lib/db.js`; never import the client directly in routes. |
| Auth tokens | jose | Use jose for signing/verifying JWTs; do not use jsonwebtoken or other JWT libs. |
| Passwords | bcryptjs | Hash with `bcryptjs` (salt rounds ≥ 10); never store plain-text passwords. |
| File storage | @aws-sdk/client-s3 | Upload to S3 via presigned URLs; use `uuid` for file keys. |
| Image prep | browser-image-compression | Compress images client-side before upload to reduce size. |
| PDF generation | jspdf | Server-side only; use for certificates or reports. |
| Routing | React Router (via Next.js App Router) | Keep routes in `src/app/`; use `next/link` for navigation. |
| Icons | lucide-react | Use lucide-react icons; avoid inline SVGs unless custom. |

## File Conventions

- Pages → `src/pages/` (or `src/app/` for App Router)
- Components → `src/components/`
- Lib/utils → `src/lib/`
- Styles → `src/app/globals.css`
