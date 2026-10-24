# duongta155.github.io

Personal academic website of **Tung Duong Ta**, Ph.D. candidate in Computer Science at UMBC.
Live at <https://duongta155.github.io/>.

Plain HTML/CSS/JS, no build step. GitHub Pages serves `index.html` directly.

```
index.html                      single page: About, News, Publications, Research, Experience,
                                Education, Honors, Degrees & transcripts, Skills
assets/css/style.css            styles (light/dark themes)
assets/js/main.js               theme toggle, mobile menu, active-section nav, image lightbox
assets/img/                     profile photo and earlier-project figures
assets/cv/Tung_Duong_Ta_CV.pdf  current CV (replace this file to update the CV link)
assets/credentials/
  diplomas/                     diploma photos (+ thumbs/)
  transcripts/                  transcripts with personal identifiers redacted (+ thumbs/)
  awards/                       award certificates (+ thumbs/)
projects.html, Honor.html,      redirects from the old site's URLs
resume/index.html
```

To add a publication or news item, copy an existing `<article class="pub">` or `<li>` block in
`index.html` and edit it.
