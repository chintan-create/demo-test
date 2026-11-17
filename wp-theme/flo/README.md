# FLO — WordPress 6.7+ Theme

## Theme Info
- **Theme Name:** `FLO`
- **Text Domain:** `flo`
- **Breakpoints:** `1080px` (Desktop) and `390px` (Mobile)
- **Accessibility:** WCAG 2.1 AA compliant
- **Performance:** <1.5s load time, 90+ Mobile PageSpeed (zero jQuery, deferred vanilla JS, inline CSS variables)

## Recommended Free WordPress Plugins
1. **Contact Form 7** (Free) — Renders the exact lead form in `front-page.php` via `[contact-form-7]`.
2. **CF7 Google Sheet Connector** (Free) — Or paste a Google Apps Script Web App URL under **Appearance → Customize → FLO Homepage Text, Icons & Images → Google Sheets Apps Script Webhook URL** (handled automatically by `inc/cf7-google-sheets.php`).
3. **Polylang** + **GeoIP Detection** (Free) — Global default is **English**; visitors from **Canada (`CA`)** or **France (`FR`)** are automatically served **French** via `inc/geolocation-fr.php`.
4. **WP-Optimize** (Free) — Enables page caching & minification for 90+ Mobile PageSpeed.

## Contact Form 7 Form Markup
```html
<div class="cf7-row-2">
  <label>First Name* [text* first-name placeholder "First name"]</label>
  <label>Last Name* [text* last-name placeholder "Last name"]</label>
</div>
<label>Work email* [email* work-email placeholder "Business Email"]</label>
<label>Company Name* [text* company-name placeholder "Company Name"]</label>
<div class="cf7-radio-group">
  <span>Which best describes you?</span>
  [radio describes-you default:1 "Building AI into our product" "Improving our agent experience" "Modernizing our stack first" "Building an FDE captive" "Not sure yet"]
</div>
<label>[textarea anything-else placeholder "Anything else? (optional)"]</label>
[submit "Submit"]
```
