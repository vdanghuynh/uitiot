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

To add a portrait for a person, put the image in `assets/img/people/` and add `photo: /assets/img/people/name.jpg` to that person's entry. Photos appear in a round frame on the People page, so use a square crop (about 400 x 400 px) with the face centred. Without a photo, a placeholder silhouette is shown.

ithout it, the full list still shows.
- Keep unpublished or pending items (for example grants awaiting results) out of the YAML files until they are public.
