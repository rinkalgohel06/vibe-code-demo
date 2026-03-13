# Telemedicine Auth (Next.js + Supabase)

Authentication module for a telemedicine app with doctor and patient roles.

## Setup
1. Create a Supabase project.
2. Run the SQL in `supabase/schema.sql` in the Supabase SQL editor.
3. Copy `.env.example` to `.env.local` and fill in your Supabase URL and anon key.
4. Install dependencies and run the dev server.

```bash
npm install
npm run dev
```

## Notes
- Email confirmation behavior depends on your Supabase auth settings.
- Roles are stored in both `user_metadata` and the `profiles` table.
