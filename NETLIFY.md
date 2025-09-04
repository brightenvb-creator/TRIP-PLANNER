Netlify deploy instructions

This project is configured to be deployed to Netlify. The `netlify.toml` is included and sets the build command and publish directory.

Quick steps (Git-connected site)

1. Push this branch to your Git provider (e.g., GitHub)
   - git checkout -b netlify/deploy-config
   - git add netlify.toml NETLIFY.md
   - git commit -m "Add Netlify config and instructions"
   - git push -u origin netlify/deploy-config

2. In Netlify: "New site from Git" -> select repository -> set build command `npm run build` and publish directory `dist` (these are already set in `netlify.toml`).

Using Netlify CLI (local deploy)

Install (if not installed):

npm i -g netlify-cli

Login:

netlify login

Create a deploy (draft):

netlify deploy --dir=dist --message "Draft deploy from local"

Publish to a site (one-time):

netlify deploy --dir=dist --prod

Link project to Netlify site (if you want to link CLI to an existing site):

netlify link

Notes

- The site uses client-side routing, so `netlify.toml` contains a redirect rule to serve `index.html` for unknown routes.
- If you prefer CI builds on Netlify, connect the repository and Netlify will run `npm run build` automatically on each push.
