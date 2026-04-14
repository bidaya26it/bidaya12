Bidaya CMS setup

What changed:
- All editable content was moved to content/site.json
- The page now renders from that content file using app.js
- A Decap CMS admin panel was added at /admin
- Existing design assets were preserved

How to use on Netlify:
1. Push this whole folder to your GitHub repo.
2. Make sure the repo branch in Netlify matches the branch in admin/config.yml (currently: main).
3. In Netlify:
   - Enable Identity
   - Enable Git Gateway
   - Invite yourself as a user or register from the site
4. Open: yoursite.com/admin
5. Log in and edit content

How to reorder major sections:
- In the CMS, open “Site Settings” → “Section Order”
- Drag sections up/down
- Save and publish

How to replace images:
- Open the relevant field in CMS and choose/upload an image under assets/

Important:
- This setup gives you a functional admin CMS for editing content and reordering sections.
- Free dragging of visual elements on the page is not part of static HTML CMS editing. To move design elements freely, edit CSS/layout or rebuild in a visual builder.
