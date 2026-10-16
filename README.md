# UiTiOt Research Group website

A static site built with Jekyll and hosted on GitHub Pages. All content lives in `_data/` as YAML files, so you update the site by editing text, not HTML.

## Where to edit

| To change | Edit |
|---|---|
| Group name, mission, contact people, footer links, research figure path | `_data/group.yml` |
| Tagline, site description, URL | `_config.yml` |
| Four research areas | `_data/pillars.yml` |
| Core members and leadership | `_data/people.yml` |
| PhD, master's, undergraduate, completed projects | `_data/supervision.yml` |
| Advisors and collaborators | `_data/collaborators.yml` |
| Grants, testbeds, patents, books | `_data/projects.yml` |
| News items (newest first) | `_data/news.yml` |
| Publications (last five years, 2022 onward) | `_data/publications.yml`; older journal and conference papers are kept in `_data/publications_archive.yml` and are not shown |
| Menu items and their order | `_data/nav.yml` |
| Colors and fonts | top of `assets/css/main.css` (`:root` block; blue `#0d47a1` and orange `#ff5a24` come from the logo) |
| Logo | `assets/img/logo-header.png` (cropped copy of `UiTiOt-Logo.png`; keep the two names different, because macOS ignores upper and lower case while GitHub does not), used in the header, footer, and link previews; `assets/img/favicon.svg` is the browser-tab icon |
| Icons of the four areas | `_includes/pillar-graph.html` (one small SVG symbol per area, keyed by the `id` in `_data/pillars.yml`) |
| Join us page text | `join.html` |

To add a publication, copy an existing entry in `_data/publications.yml` and set `type` (journal, conference, book, patent), `year`, `pillars` (any of `dt`, `edge`, `wireless`, `qsec`), and optional `abstract`, `pdf`, `note`, `status`. Add `featured: true` to show it on the home page.

## Research areas illustration

Save your illustration of the four research areas as `assets/img/research-areas.png` (or `.jpg`, `.webp`). It appears automatically at the top of the Research page. If no file exists, the figure is simply left out. To change the caption or alt text, edit `research_figure` in `_data/group.yml`.

To add a portrait for a person, put the image in `assets/img/people/` and add `photo: /assets/img/people/name.jpg` to that person's entry. The templates do not render photos yet; ask for that change when you have the images.

## Deploy on GitHub Pages

The site is configured as a project site at `https://vdanghuynh.github.io/uitiot/` (`url: "https://vdanghuynh.github.io"` and `baseurl: "/uitiot"` in `_config.yml`).

1. On GitHub, create a public repository named `uitiot` under `vdanghuynh`, without a README or .gitignore.
2. In this folder, run `git init -b main`, `git add .`, `git commit -m "Initial site"`, `git remote add origin https://github.com/vdanghuynh/uitiot.git`, and `git push -u origin main`.
3. In the repository, open Settings, then Pages, set Source to "Deploy from a branch", branch `main`, folder `/ (root)`, and save.
4. After one or two minutes the site appears at `https://vdanghuynh.github.io/uitiot/`. To update it later, edit files, then `git add .`, `git commit -m "Update"`, and `git push`.

If the site later moves to its own organization or a custom domain, set `baseurl: ""`, change `url`, and for a custom domain add a `CNAME` file containing the domain.

## Preview locally

```bash
bundle install
bundle exec jekyll serve
```

Then open http://127.0.0.1:4000/uitiot/. The Gemfile uses the `github-pages` gem so local builds match what GitHub produces. Use Ruby 3.3 for local preview, because Ruby 4.0 is too new for that gem. GitHub builds the site in its own environment, so this only affects your local copy.

## One-command local preview

`serve.sh` runs the site with Ruby 3.3 without changing your default Ruby:

```bash
bash serve.sh
```

It installs missing gems on first run, starts Jekyll with live reload, and opens the site in your browser. To start it from any folder, add an alias to `~/.zshrc`:

```bash
alias uitiot='cd ~/Documents/RunCode/uitiot-site && bash serve.sh'
```

## Notes

- The font (IBM Plex Sans) loads from Google Fonts. If you prefer no third-party requests, download them into `assets/fonts/` and replace the `<link>` in `_layouts/default.html` with `@font-face` rules.
- The publication filters need JavaScript. Without it, the full list still shows.
- Keep unpublished or pending items (for example grants awaiting results) out of the YAML files until they are public.
