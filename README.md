# VAKKOZ EDITOR: Portfolio Website

A cinematic video-editing portfolio built with plain HTML, CSS and JavaScript. No frameworks, no build step, no backend. It works on GitHub Pages and can be edited in Acode on Android.

## Files

```
your-folder/
├── index.html      Page structure and text
├── style.css       All design (colors, layout, animation)
├── script.js       All behavior, plus the CONFIG section you edit
├── logo.png        The VAKKOZ EDITOR logo
├── README.md       This file
└── media/
    └── intro.mp4   Intro animation shown when the site opens
```

Keep every file in the same folder and keep the file names exactly as shown. The `media` folder is where you can also put your own videos and images (for example `media/hero.mp4`, `media/reel1.jpg`).

## What you can edit

Open `script.js` and look for the section named **CONFIG** at the very top. Everything below is changed there.

| What | Setting | Example |
| --- | --- | --- |
| Logo file | `logo` | `"logo.png"` |
| Email | `email` | `"hello@example.com"` |
| Instagram | `instagram` | `"https://www.instagram.com/yourname"` (or just `"yourname"`) |
| YouTube | `youtube` | `"https://www.youtube.com/@yourchannel"` |
| WhatsApp | `whatsapp` | `"919876543210"` (digits only, with country code) |
| Hero background video | `heroVideo` | `"media/hero.mp4"` |
| Hero background image | `heroPoster` | `"media/hero.jpg"` |
| Showreel video | `showreelUrl` | A YouTube, Vimeo, Instagram link, or `"media/reel.mp4"` |
| Showreel thumbnail | `showreelThumb` | `"media/reel-thumb.jpg"` |
| About photo | `aboutPhoto` | `"media/me.jpg"` |
| Client reviews | `testimonials` | See below |
| Portfolio cards | `portfolio` | See below |

Leave a value as `""` (empty quotes) and that item is skipped or hidden. Social buttons you have not filled in never appear on the site.

### Portfolio cards

Each card is one block in `CONFIG.portfolio`:

```js
{ title: "Wedding Highlights", category: "wedding", label: "WEDDING HIGHLIGHTS",
  ratio: "4/5", image: "media/wedding.jpg", video: "https://youtu.be/XXXXXXXXXXX", sample: false }
```

- `category` decides which filter button shows the card: `cinematic`, `reels`, `youtube`, `travel`, `wedding`, `brand`, `motion`, `color`.
- `ratio` is the card shape: `"9/16"` vertical, `"16/9"` wide, `"1/1"` square, `"4/5"`, `"3/2"`, `"2/1"`.
- `image` is the thumbnail. Leave it `""` to keep the designed placeholder.
- `video` is the link that opens when the card is clicked. YouTube, Vimeo, Instagram reel/post links and direct `.mp4` files work.
- `sample: true` shows a SAMPLE badge. Change it to `false` once the card is a real project of yours. The sample note above the gallery disappears when no sample cards remain.

### Client reviews

Add only genuine reviews you have permission to show:

```js
testimonials: [
  { quote: "Fast, creative and easy to work with.", name: "Client name", project: "Wedding highlights" }
]
```

While the list is empty, the site shows "Client feedback will appear here".

### About text

The bio and the philosophy line are in `index.html`. Search for `EDIT YOUR BIO HERE` and replace the placeholder text with your own.

## Intro animation

`media/intro.mp4` plays once per visit.

- It starts muted (browsers block autoplay with sound). Visitors can press **Sound on**.
- **Skip intro** and the Esc key skip it.
- It is skipped for visitors who prefer reduced motion, and if the video cannot load or play.
- To change it, replace the file and keep the name `intro.mp4`.

## Enquiry form: how sending works

The site has no server, so the form works in one of three ways:

1. **Email app (default).** Set `email` in CONFIG. When someone submits the form, their email app opens with the enquiry already written, and they press Send there. Nothing is sent from the page itself, and the page says so.
2. **EmailJS (optional, sends directly to your inbox).**
   1. Create a free account at emailjs.com and add an Email Service.
   2. Create a template that uses these variables: `{{from_name}}`, `{{reply_to}}`, `{{platform}}`, `{{video_type}}`, `{{budget}}`, `{{deadline}}`, `{{message}}`.
   3. In CONFIG, set `enabled: true` and fill `publicKey`, `serviceId` and `templateId`.
   4. Only the **Public Key** goes in this file. Never paste a Private Key.
3. **WhatsApp (optional).** If `whatsapp` is set, a "Send on WhatsApp" button appears and opens WhatsApp with the enquiry written.

If nothing is configured, the form tells the visitor that it is not connected yet instead of pretending to send.

## Test it on your phone

1. Open the folder in Acode and tap the preview (play) button on `index.html`.
2. Scroll the whole page and check that nothing slides sideways.
3. Open the menu and tap each link.
4. Try a portfolio filter and open a card.
5. Press the showreel play button.
6. Submit the form once with empty fields (you should see error messages), then once filled in.

## Publish on GitHub Pages

1. Create a free account at github.com and make a new repository (for example `vakkoz-editor`). Set it to Public.
2. Choose **Add file → Upload files** and upload `index.html`, `style.css`, `script.js`, `logo.png`, `README.md` and the whole `media` folder.
3. Tap **Commit changes**.
4. Open **Settings → Pages**. Under **Build and deployment**, choose **Deploy from a branch**, select `main` and `/ (root)`, then **Save**.
5. Wait one or two minutes. Your site will be at `https://YOURUSERNAME.github.io/REPOSITORYNAME`.

To update the site later, upload the changed files again (same names) and commit.

## Troubleshooting

- **Logo missing:** check that `logo.png` is in the same folder as `index.html` and the name matches exactly, including capital letters.
- **Intro does not play:** check that `media/intro.mp4` exists. If it is missing, the site simply opens without the intro.
- **A video does not open:** check the link is public. Private or unlisted-by-owner restricted videos cannot be embedded. For files, check the path in CONFIG matches the file name exactly.
- **Changes do not show:** hard-refresh the page, or wait a minute after uploading to GitHub.
- **Fonts look different offline:** fonts load from Google Fonts. Without internet the page falls back to Georgia and the system sans-serif, and everything still works.

## Notes

- Portfolio cards marked SAMPLE are demonstration placeholders, not real client work. Replace them with your own projects.
- The page makes no claims about experience, awards or clients. Add only what is true for you.
- Use only media you own or have permission to use. If you use stock images or video, check the license first.
- 
