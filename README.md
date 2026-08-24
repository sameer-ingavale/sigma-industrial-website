# Sigma Industrial Solutions — starting point

A minimal Next.js foundation for a B2B export catalog site: static product,
category, brand, and blog pages (good for SEO and for citation by AI
answer engines), an enquiry form that emails you via Resend, and
structured data (JSON-LD, sitemap, llms.txt, per-page social share
previews). No database, no CMS — everything is a plain JS array; you add
content by editing a file and pushing.

This is intentionally plain — a foundation to build on, not a finished
site. Styling is inline Tailwind utility classes throughout (no custom
design-system layer to learn beyond a couple of small shared components),
and there's no state management, no forms library, no abstraction beyond
what's needed to make the pages work.

**Before deploying this for real, read the Next.js version note near the
bottom of this file** — it's on the newest available 14.x release, but
that line has known security advisories only fixed in Next 15/16, and
upgrading is a real migration, not a patch. I didn't do it in this pass
since it would touch every page.

## Run it

```bash
npm install
cp .env.example .env.local   # add RESEND_API_KEY — see below
npm run dev
```

## Structure

```
app/
  layout.jsx                 Fonts, global <head>, header/footer wrapper
  page.jsx                   Homepage
  products/page.jsx          Full catalog listing — search only, nothing else
  products/[slug]/page.jsx   Product detail page
  categories/page.jsx        All Categories index (large tiles)
  categories/[slug]/page.jsx Dedicated category page — just that category's products
  brands/page.jsx            All Brands index
  brands/[slug]/page.jsx     Dedicated brand page — just that brand's products
  blog/page.jsx              Blog index (not in the header nav — see below)
  blog/[slug]/page.jsx       Blog post page — renders the MDX body
  about/page.jsx
  contact/page.jsx           General enquiry form lives here — the nav "Enquire" button points at it
  api/enquiry/route.js       Enquiry form handler → sends email via Resend
  sitemap.js / robots.js     Auto-generated from lib/
  llms.txt/route.js          Plaintext catalog summary for AI crawlers
content/
  blog/*.mdx                 Blog posts — one file per post, see "Blog (MDX)" below
lib/
  products.js                 Catalog + category data — edit this to add/change either
  brands.js                    OEM brands — edit this to add/change brands
  clients.js                   Client logos for the homepage trust grid
  reviews.js                   Buyer/supplier quotes for the homepage
  blog.js                      Reads content/blog/*.mdx — nothing to edit here
  site-config.js                Company name, contact, shipping terms, stats, compliance docs, sister concern
  seo.js                        JSON-LD + social-share metadata generators
  assets.js                     Small helper — see "The leading-slash thing" below
components/
  Header.jsx, Footer.jsx, ProductCard.jsx, ProductImage.jsx, EnquiryForm.jsx,
  EnquiryPrompt.jsx, ProductSearch.jsx, BrandGrid.jsx, ClientLogos.jsx,
  CategoryTiles.jsx, ComplianceLinks.jsx, ShareButtons.jsx, StatusBadge.jsx,
  GoogleAnalytics.jsx, CountryFlag.jsx
```

## Adding products, categories, and brands

Products and categories live in `lib/products.js`; brands live in
`lib/brands.js`. All three are plain arrays — nothing about the code
assumes a fixed number of any of them. Copy an existing object, edit the
fields, done. See the comments at the top of `lib/products.js` for the
image and document (datasheet/drawing/test certificate) conventions.

A product points at its brand by slug (`brand: 'jcb'`). Its
**`categories`** field is an array of slugs, not a single string — a
product can belong to more than one category (e.g. a gasket that's both
"Bearings, Seals & Gaskets" and "Brewery & Beverage Processing
Equipment"). Most products only need one entry.

### Product fields worth knowing about
- **`categories`** — array of category slugs. `['earthmoving-construction-spares']`
  for one category, or list more if it genuinely fits elsewhere too (a
  blowdown valve, say, is both "Valves & Flow Control" and "Boiler &
  Steam System Spares"). The product page shows every category it's
  filed under as clickable links (in Specifications, not up top with the
  photo), and the product itself appears on every one of those category
  pages. The catalog card shows only the first (primary) one to stay
  compact.
- **`application`** — the one-line description shown everywhere. This
  should be the use case + compatible equipment ("Services X on Y
  equipment"), not marketing copy.
- **`status`** — `'made-to-order'` or `'sourced-on-demand'` only. Nothing
  is held in stock, so there's no "ex-stock" option.
- **`modelNumber`** / **`partNumbers`** — some products have one, some
  the other, some both; each only shows on the page if it has a value
  (`modelNumber` a string or `null`, `partNumbers` an array — `[]` if
  there isn't one). A **catalogue link** sits right inside the
  model-number row when `catalogueUrl` is set, since a model number is
  what signals "this is one of a family" — no model number, no catalogue
  link, and that falls out naturally from where the link lives in the
  markup rather than needing a separate check.
- **`hsCode`** — 8 digits (e.g. `'8421.23.00'`), the format used for
  export customs. Double-check the exact 8-digit line with your customs
  broker before publishing — the two trailing digits especially can vary
  by product even within the same 6-digit heading. Shown in
  Specifications, near the bottom, not with the top-of-page facts.
- **`countryOfOrigin`** — shown as "Origin" in Specifications, right
  after HS code. This is the country (almost always "India"); it's a
  different field from `originCity` below.
- **`leadTime`** / **`originCity`** — two separate fields that combine
  into one line on the page: `leadTime` is just the range (e.g.
  `'5–7 days'`), `originCity` is a plain city name (e.g. `'Mumbai'`).
  The product page renders them together as "5–7 days, EXW Mumbai".
  Keeping them separate means changing one doesn't require retyping the
  other, and `originCity` is per-product since not everything ships EXW
  the same place (one sample product uses Mundra instead of Mumbai).
- **`datasheetUrl` / `drawingUrl` / `testCertificateUrl` / `catalogueUrl`**
  — not every product has every document, so each of these is three-state,
  not just present/absent:
  - a string (e.g. `"/documents/tc.pdf"`) → available now, downloadable
  - `null` → not on hand yet, but available on request (shows a plain
    "on request" note, no dead link)
  - `false` → not offered for this product at all — hidden completely,
    no "on request" note either
  
  The 4 sample products each set these differently on purpose, so you can
  see all three states in the actual pages rather than just in this
  README. Every one of these opens in a new tab (`target="_blank"`),
  never downloads automatically — that's set per link, so carry it over
  if you add a new document link somewhere else.
- **`indicativePrice`** — a plain string you write, e.g. `"From $45"`,
  not a real quote — a gateway number so pricing doesn't feel like a
  total unknown before someone enquires. It's EXW the same city as
  `originCity`. `null` shows no price at all (used on the made-to-order
  sample product, where a price genuinely depends on the drawing).

### Category fields worth knowing about
- **`image`** — shown on the category tile (homepage and `/categories`)
  and at the top of the category's own page.
  `/public/categories/<slug>.jpg`.
- **`featured`** — `true` puts the category in the homepage row, capped
  at 4 (the homepage slices to the first 4 even if more are flagged, so
  the row stays on one line on desktop — keep at most 4 flagged to avoid
  surprises). The full list always shows at `/categories` regardless.

Every category tile also shows a small product-count badge in its
top-right corner (`components/CategoryTiles.jsx`) — computed live from
`lib/products.js` via `getProductsByCategory()`, nothing to keep in sync
by hand.

### The `industries` field
An array of plain strings on each product — every industry it actually
gets used in, not just the "main" one (a utility item like a belt or
filter can span several). Shown as static tags on the product page,
between Specifications and Attachments — in the main content column, not
next to the enquiry form. Not clickable yet; the field is shaped so that
"click an industry to see everything tagged with it" is a small addition
later (a `lib/industries.js` with slugs + a `getProductsByIndustry()`
helper, same pattern as categories) rather than a schema change. There's
no fixed list of allowed values — write whatever's accurate per product.

### Undisclosed manufacturers and brand origin
Some Indian manufacturers you source from aren't globally known — naming
them lets a buyer search them out directly and cut you out. There's no
per-brand disclosure flag for this; instead, `lib/brands.js` has one
shared brand, `sigma-verified-manufacturer`, and any product whose real
manufacturer you don't want named just points its `brand` field at that
slug. You keep track of who actually made it yourself, outside this
codebase — the website only ever shows "Sigma Verified Manufacturer."

Every brand carries an `origin`: `'international'`, `'indian'`, or
`'verified'` (reserved for the one shared brand above — don't reuse it
elsewhere). `/brands` uses this to show three sections, in this order:
**Indian** first (the deliberate differentiation this catalog leads
with), then **International**, then **Sigma Verified Manufacturers**.
That last section isn't a grid — since it's one brand, not several, a
row of identical tiles would look broken. It's one full-width banner
instead (`siteConfig.sigmaVerifiedBanner`, same height as the small
tiles above it, `h-32` — adjust that class in `app/brands/page.jsx` if
your image needs a different height), linking to
`/brands/sigma-verified-manufacturer` — an ordinary brand page like any
other, just listing every product that shares this brand. There's a
placeholder `example-indian-brand` entry to replace with a real
disclosed Indian brand.

### Brand credentials
Optional `credentials` array per brand (e.g. ISO certifications) —
`{ label, url }`, same on-request/available pattern as product
attachments. Shown as clickable badges on the brand's own page, above
the product listing, opening the certificate PDF in a new tab. Leave the
array empty for a brand with nothing to show.

## Design system — colors and corners

Three colors, each with one job (`tailwind.config.js` → `colors`):
- **`navy`** — brand, structure, navigation, headings. The default for
  anything that isn't specifically asking the visitor to act.
- **`accent`** (a muted red) — reserved for the single highest-intent
  action in whatever context it appears: form submit buttons, the
  header's "Enquire" button, "Request quotation" on a product page. If
  you're reaching for `accent` on something that isn't a call to action,
  reach for `navy` instead — the color only works as a signal if it stays
  rare.
- **`trust`** (a muted green) — a confirmation signal, not decoration:
  the dot next to the Sigma Verified Manufacturer brand, the checkmark on
  an available (downloadable) document. Green reads as "checked/cleared"
  fairly universally, which is the specific job it's doing.

Every bordered box, button, tile, and input uses `rounded-md` — one
consistent soft radius, not sharp corners, not a rounder "friendly SaaS"
radius. Change `rounded-md` to a different Tailwind radius class
site-wide with a find-and-replace if you want it softer or sharper.

**Hover and cursor:** no grayscale/opacity/color-shift effects on
images anywhere (brand logos, client logos) — they show at full color
always. Hover feedback is limited to a border-color change on clickable
cards/tiles. Every clickable element gets an explicit `cursor-pointer`
class (on top of the browser default for `<a>`/`<Link>`, which already
does this — the explicit class is just belt-and-suspenders for clarity);
non-clickable elements (like the client-logo grid, which isn't a link)
deliberately don't get one.

**Text size:** base (16px, Tailwind's default — no class needed) is the
site-wide default for anything meant to be read: paragraphs, list items,
form inputs, facts, spec tables. `text-sm` is reserved for things that
are genuinely secondary or compact by convention — eyebrow labels
(`uppercase tracking-wide`), buttons, breadcrumbs, form field labels,
badges/tags, footer and header nav. If you're adding new prose content,
default to no size class (base) and only reach for `text-sm` if it's
clearly UI chrome rather than something a buyer needs to read carefully.

**Status badges** (`components/StatusBadge.jsx`) — "Sourced on demand"
gets a solid navy pill, "Made to order" gets a navy-outlined one. Two
different treatments on purpose, not just different words, since they're
genuinely different commitments. No new color introduced.

## Images — all 4:3, no padding

Every image box on the site (product photos, category photos) is a 4:3
box with `object-cover` and zero padding — the image is expected to fill
it edge-to-edge. If you're sourcing or cropping photos, crop to 4:3
before uploading; anything else will get cropped by the browser to fit
(object-cover crops rather than distorts, so an off-ratio image won't
stretch, but it will lose some edge content). Brand logos are the one
exception — those tiles keep a little padding, since a logo mark usually
isn't 4:3 and looks cramped without breathing room. Blog thumbnails are
16:9, not 4:3, since those images are meant to carry more visual weight
than a small square would allow.

A few images break the 4:3/no-padding rule on purpose, since they're
doing a different job than a product photo:
- **`heroImage`** (homepage) — no box at all, meant to float as a
  transparent-background cutout.
- **`aboutBanner.desktop` / `.mobile`** (About page) — a wide/short crop
  and a taller crop, swapped by plain responsive CSS (no JS) so the same
  image doesn't get awkwardly cropped at both a wide banner ratio and a
  tall mobile ratio.
- **`contactImage`** (Contact page) — 4:3 like a product photo, but a
  photo of the office or team, not a product.

## The leading-slash thing

Every reference to a file in `/public` — `image`, `datasheetUrl`,
`drawingUrl`, `testCertificateUrl`, `catalogueUrl`, brand `logo`, blog
post `image` — **must start with `/`**. `/public/documents/tc.pdf` is
referenced as `"/documents/tc.pdf"`, not `"documents/tc.pdf"`. Without
the leading slash, the browser treats it as relative to whatever page
it's clicked from, so it works on the homepage and breaks everywhere
else. `lib/assets.js` → `assetUrl()` is a small safety net that
auto-adds the slash if you forget — every image and document link in
this codebase already runs through it — but it's still worth getting
right in the data, since the fix is one character.

## Search, categories, and brands

- **`/products`** — every product, search-only (name/part number, via
  `components/ProductSearch.jsx` — client-side, no pagination, a starting
  point to replace once the catalog is large enough to need something
  fancier). No category or brand filter here — that's what the two pages
  below are for.
- **`/categories`** → **`/categories/[slug]`** — browse by category.
- **`/brands`** → **`/brands/[slug]`** — browse by brand, same pattern.

Both index pages and both detail pages end with the same highlighted
"don't see what you need?" prompt (`components/EnquiryPrompt.jsx`) — one
component, edit once to change the wording or styling everywhere.

## Homepage sections

In order: hero (with an image slot on the right/top — see below), trust
stats + client logos, the ordering process (with a small icon per step
from `lucide-react` — swap any of them for a different icon from the
same library), browse-by-category (featured only, capped at 4, with a
link to the full `/categories` page), then buyer/supplier reviews. The
"what we do" value-add case and the compliance documents both live on
the About page only now, not duplicated here — the homepage stays
shorter on purpose.

- `lib/site-config.js` → `heroImage` — the hero's right-hand (desktop) /
  top (mobile) image. Deliberately not wrapped in a bordered box, since a
  transparent-background PNG cutout is meant to float against the page —
  add your photo, set the path, done. Leave `null` for a dashed
  placeholder box.
- `lib/site-config.js` → `stats` — homepage trust numbers, edited by
  hand; these are real headline claims, not derived from the (much
  smaller) sample catalog, so keep them accurate.
- `lib/clients.js` — client logos, grayscale by default, full color on
  hover. Only add a client once you have permission to show their logo.
- `lib/reviews.js` — buyer/supplier quotes. Replace the placeholders.
- `lib/site-config.js` → `sisterConcern` — shown in the footer and on the
  About page.
- `lib/site-config.js` → `foundedYear` — a fixed fact, not derived from
  `yearsInExport`; keep both in sync by hand if either changes.

The "How ordering works" step numbers (1–5) are deliberately large and
bold — actual headings, not small mono digits — with the icon as a
smaller companion badge next to each one rather than competing with it.

## The About page

Rewritten to do more than list facts: it makes the explicit case for why
this is a "managed platform" rather than a one-person trading agent —
standardization, transparency, technology, reliability — since that's a
real distinction for a buyer who's been burned by an unreliable
middleman before. Below that: the Sigma Verified Manufacturer
explainer, commercial terms, and the compliance-documents component
(`components/ComplianceLinks.jsx`, `size="md"`) — this is the only place
those documents show now; the homepage no longer duplicates them.

## The enquiry form

One component (`components/EnquiryForm.jsx`) used in three places: the
Contact page, the bottom of `/products`, and every product page. On a
product page it's pre-tagged with that product's name, so it skips the
category dropdown and always shows Quantity — but never Required
Delivery Timeline at all, since asking "when do you need it" makes less
sense once you're already looking at that one product's own lead time.
Everywhere else it shows a category `<select>` (labeled **Enquiry
Type**) pulled straight from `lib/products.js` → `categories`, plus two
fixed options — "Other (category not listed)" and "General enquiry (not
a purchase)". Pick that last one, and Quantity + Timeline both disappear
entirely and stop being required — neither question makes sense for
contact that isn't a purchase. Nothing sent through the form goes
uncategorized either way. The nav's "Enquire" button links to
`/contact#enquire`, which is this form — there's no separate "Contact"
link in the header since Enquire already goes there (the page itself is
still called Contact, and still linked from the footer).

On a product page, the form sits in a sidebar that's wider than a strict
1/3 split (`lg:grid-cols-7`, 4 cols main / 3 cols form — roughly 43%) so
the fields have room to breathe next to the spec content.

Name is split into first/last, and there are two required qualifying
fields (when they're shown — see above): **Country** (a curated
`<select>`, not free text — see `lib/enquiry-options.js` for the "top
countries" + "other countries" groups, which is a relevance list, not a
full geography list) and **Required Delivery Timeline** (also a
`<select>`: Immediate through "just researching", only ever shown in the
general-enquiry context, never on a product page). Both exist to
discourage tire-kicker submissions without adding friction for a serious
buyer. Edit the option lists directly in `lib/enquiry-options.js`.

The "don't see what you need?" nudge at the bottom of `/products`,
`/categories`(`/[slug]`), and `/brands`(`/[slug]`) is a separate, much
smaller component — `components/EnquiryPrompt.jsx` — plain left-aligned
text, not a form, not boxed. The accent-colored link is what carries the
emphasis.

## Blog (MDX)

Posts are `.mdx` files in `content/blog/` — not a JS array like the rest
of the site's content, since the whole point of MDX is authoring a post
as its own file. Each file starts with a frontmatter block:

```
---
title: "Your post title"
excerpt: "One or two sentences, shown on the index and in share previews."
date: "2026-01-15"
image: null
category: "thought-leadership"
---

Your post body in Markdown/MDX goes here.
```

The filename (minus `.mdx`) becomes the URL slug. `lib/blog.js` reads the
whole `content/blog/` directory at request time (`getAllPosts()`) —
there's nothing to import or register per post. The rendered body uses
`@tailwindcss/typography` (the `prose` class in
`app/blog/[slug]/page.jsx`) so headings, lists, links, and blockquotes
get sensible default styling without hand-styling every element; adjust
the `prose-*` classes there if you want a different look.

`category` should match a slug in `lib/blog-categories.js` — currently
Thought Leadership, Buying Guides, and Case Studies (the 3 placeholder
posts each use one, so you can see the pattern live). Add a new type by
adding it to that file, then using its slug in a post's frontmatter.
`/blog?category=<slug>` filters the index; the filter pills there are
plain server-rendered links, same pattern as category/brand filtering
elsewhere.

The index page (`app/blog/page.jsx`) is a title-led list with a wide
16:9 thumbnail (not a small square — these are meant to carry visual
weight), closer to a trade publication's insights page than a product
grid — that was a deliberate choice, since a handful of substantial
posts reads better as a list than as tiles. `/blog` isn't in the header
nav on purpose, only the footer — add it to `components/Header.jsx` the
same way as the other links if you want it more prominent.

## Social sharing

Product, category, brand, and blog pages all have:
- **A title, description, and image in the page `<head>`**
  (`lib/seo.js` → `shareMetadata()`) so pasting the link into WhatsApp,
  iMessage, LinkedIn, or Twitter shows a real preview card instead of a
  bare URL. If a page has no image set, the preview just won't include
  one — there's no site-wide fallback image included, so consider adding
  one and wiring it in if that matters to you.
- **Share buttons** (`components/ShareButtons.jsx`) — WhatsApp and email,
  plain links (`wa.me` / `mailto:`), no share-sheet library.

## Small touches

- **Footer tagline** — a large, maximum-weight (`font-black`), low-opacity
  line at the very bottom of the footer
  (`lib/site-config.js` → `footerTagline`). It's a deliberately full
  commitment to the effect rather than a half-measure — a lighter weight
  at this size and opacity just reads as a rendering glitch. Purely brand
  texture; set it to `null` to drop it and keep the footer plain if it
  ever reads as too D2C for your taste.
- **Footer link columns** — the "Site" links are a 2-column grid, not a
  single vertical list, so that section stays wide and short instead of
  tall and narrow as more links get added.
- **"Products" nav link** — colored and bolded differently from the rest
  of the header nav on purpose; it's the actual differentiator (rich
  product pages), so it gets visual priority over Categories/Brands/Company.
- **The pulse on "Enquire"** — a small animated dot on the header button,
  built entirely from Tailwind's `animate-ping` utility (no library, no
  custom CSS). If it ever feels like too much, deleting the `<span>`
  pair inside the Enquire link in `components/Header.jsx` removes it
  cleanly without touching anything else.
- **WhatsApp on a product page** — "Request on WhatsApp," WhatsApp's
  deeper teal-green (`#128C7E` — the brand's own darker tone, not the
  brighter `#25D366` action-button green), and the chat opens pre-filled
  with the product name and page link, not blank.
- **"How ordering works" step numbers** — large, bold headings
  (`text-4xl font-bold`), not small mono digits, with each step's icon
  sitting directly beside the number at reduced opacity — a supporting
  visual, not a second boxed element competing for attention.
- **Country flag in the header** (`components/CountryFlag.jsx`) —
  guesses the visitor's country from their IP via a free, keyless public
  API (ipapi.co) and shows that flag on the right edge of the nav,
  visually separated from the actual nav links/button by a border and
  extra spacing so it reads as ambient context, not another destination
  to click. No flag images exist in `/public/flags/` yet, so right now
  it always falls back to showing the country name as plain text — see
  the comment in that file for the one-line change to make a failed
  image render nothing at all instead, once you've added real flags.
  This is a client-side fetch, so it works on any host; if you're
  specifically on Vercel, their Edge geo headers are a more robust
  (rate-limit-free) alternative worth switching to later.
- **Founder section on the Company page** — a photo + short bio slot
  (`siteConfig.founderImage`), placed right after the "why this isn't
  just another trading agent" argument, on the theory that a real person
  reinforces that case rather than needing its own separate pitch. Both
  the photo and the bio text are placeholders — swap in the real ones
  before launch.

## Enquiry emails (Resend)

1. Sign up at resend.com, verify a sending domain.
2. Set `RESEND_API_KEY` and `ENQUIRY_TO_EMAIL` as env vars (locally in
   `.env.local`, in production via Vercel project settings).
3. `app/api/enquiry/route.js` sends from `enquiries@<your-domain>` — make
   sure that matches the domain you verified in Resend.

## Google Analytics

A bare-bones GA4 connection — pageviews only, nothing else wired up yet
(`components/GoogleAnalytics.jsx`, rendered in `app/layout.jsx`). It
renders nothing at all if the env var below isn't set, so it's safe to
leave in place before you've created an account.

### Setting up GA4 (you haven't yet, so start here)
1. Go to [analytics.google.com](https://analytics.google.com) and sign in
   with a Google account.
2. Click **Admin** (bottom left) → **Create Account**. Name it your
   company name, accept the data-sharing defaults (or turn them off,
   your call).
3. Inside that account, **Create Property** — name it something like
   "Sigma Industrial Solutions Website", set your timezone and currency.
4. When asked for a platform, choose **Web**. Enter your site URL
   (`lib/site-config.js` → `url`) and a stream name.
5. This creates a **Data Stream** — click into it and copy the
   **Measurement ID** (looks like `G-XXXXXXXXXX`).
6. Set that as `NEXT_PUBLIC_GA_MEASUREMENT_ID` in `.env.local` (dev) and
   in Vercel's Project Settings → Environment Variables (production).
   Redeploy — pageviews should start appearing in GA's **Realtime**
   report within a minute or two of a visit.

### Excluding your own traffic
This has to be configured in GA4 itself — there's no code-side way to
know which visitor is you:
1. **Admin → Data Streams** → click your web stream → **Configure tag
   settings** → **Define internal traffic**.
2. Add a rule: traffic type `internal`, matching your office's public IP
   address (search "what's my IP" from your office network to get it —
   note this is your router's public IP, not your computer's local one,
   and it'll need updating if your ISP ever changes it). Add one rule
   per location/device you want excluded (e.g. home + office).
3. **Admin → Data Settings → Data Filters** → find the built-in
   **Internal Traffic** filter → set it to **Active** (it's created in
   "Testing" mode by default, which logs but doesn't exclude — you have
   to flip it to Active for it to actually filter your data out).
4. This only works from a fixed/known IP. If you or your team browse
   from changing IPs (mobile data, coffee shops, VPNs), the simplest
   fallback is a browser extension that blocks GA on your own machine,
   or just mentally discount a small amount of self-traffic in the
   reports.

## Deploying

Push to GitHub, import into Vercel, add the env vars above, deploy. Every
push to main redeploys. Add your domain in Vercel and update `url` in
`lib/site-config.js` to match — it feeds every canonical link, the
sitemap, the structured data, and the social-share preview URLs.

## Next.js version — a known tradeoff

This is pinned to `14.2.35`, the newest stable release on the 14.x line.
Running `npm audit` against it turns up a long list of advisories
(mostly denial-of-service / cache-poisoning classes, not data-exposing
RCE) that are only fixed starting in Next 15/16 — there is no newer 14.x
patch that addresses them, so staying on 14 means carrying these
forward.

I didn't upgrade to 15/16 as part of this build, because it's a real
migration, not a version bump: Next 15 made route params and
`searchParams` asynchronous (`await params` instead of destructuring
directly), and every dynamic page in this app —
`products/[slug]`, `categories/[slug]`, `brands/[slug]`, `blog/[slug]`,
plus `products/page.jsx`'s `searchParams` usage — would need updating to
match. That's a deliberate, testable change to make on its own, not
something to fold into a broader feature pass.

If you're taking this to production, plan for that upgrade explicitly —
either budget the migration, or at minimum keep the app off the open
internet (staging/password-protected) until it's done.

## Notes on what's deliberately left out

- No image gallery/carousel, no cart, no pagination on search — add these
  if you need them; the intended flow is search-engine landing → spec
  check → enquiry, not deep on-site browsing.
- 4 sample products spread across 17 pre-populated categories (most have
  no products yet — that's expected, not a bug) and 4 brands — enough to
  see every pattern (a confidential brand, a catalogue-variants note, a
  category with no listings yet), not a populated catalog.
- FAQs are optional per-product (`faqs: []` to omit) and meant to be one
  sentence each — this is a spec sheet, not a blog post.
- Reviews and client logos are static placeholder data in `lib/`; the two
  blog posts are placeholder `.mdx` files in `content/blog/`. Replace all
  of it before launch — don't leave the placeholder text live.
