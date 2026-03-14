# Deployment Guide

## 1. PostgreSQL — Railway (free tier)

1. Go to [railway.app](https://railway.app) → New Project → PostgreSQL
2. Click on the DB → **Connect** tab → copy the `DATABASE_URL`
3. Paste it in Vercel env vars (step 4)

---

## 2. Cloudinary (image hosting, free tier)

1. Sign up at [cloudinary.com](https://cloudinary.com)
2. Dashboard → **Settings → Upload → Upload presets** → Add preset
   - Name: `candles_unsigned`
   - Signing mode: **Unsigned**
   - Folder: `candles`
3. Copy `Cloud name`, `API Key`, `API Secret` from the Dashboard

---

## 3. Stripe (payments)

1. Sign up at [stripe.com](https://stripe.com) → create account
2. **Developers → API keys** → copy Secret key & Publishable key
3. **Developers → Webhooks** → Add endpoint:
   - URL: `https://yourdomain.com/api/webhooks/stripe`
   - Events: `checkout.session.completed`
   - Copy the **Signing secret**

---

## 4. Resend (transactional email)

1. Sign up at [resend.com](https://resend.com)
2. Add and verify your domain (or use the sandbox for testing)
3. **API Keys** → Create → copy the key
4. Update `FROM` address in `src/lib/email.ts` to match your verified domain

---

## 5. Vercel (hosting)

```bash
npm install -g vercel
vercel login
vercel --prod
```

Or connect via GitHub:
1. Push code to GitHub
2. [vercel.com](https://vercel.com) → New Project → Import repo
3. **Environment Variables** → add all from `.env.example`
4. Deploy

---

## 6. After deployment — run migrations & seed

```bash
# Set DATABASE_URL locally to your Railway DB URL, then:
npm run db:migrate
npm run db:seed
```

Or via Vercel CLI:
```bash
vercel env pull .env.production.local
DATABASE_URL=$(grep DATABASE_URL .env.production.local | cut -d= -f2) npx prisma migrate deploy
```

---

## 7. Stripe webhook — update URL

After deploying, update the Stripe webhook URL to your production domain:
`https://yourdomain.vercel.app/api/webhooks/stripe`

---

## Checklist before going live

- [ ] `AUTH_SECRET` is a strong random string (`openssl rand -base64 32`)
- [ ] `ADMIN_PASSWORD` is changed from the seed default
- [ ] Stripe is in **live mode** (not test)
- [ ] Cloudinary upload preset `candles_unsigned` exists
- [ ] Resend domain is verified
- [ ] Webhook endpoint registered in Stripe with correct signing secret
- [ ] `NEXTAUTH_URL` matches your production domain exactly
- [ ] Run `npm run db:seed` on production DB to create the admin user