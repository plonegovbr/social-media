---
myst:
  html_meta:
    "description": "Run the development site, add a link to the site's profiles, put it first, and limit a Follow Us block to two networks."
    "property=og:description": "Run the development site, add a link to the site's profiles, put it first, and limit a Follow Us block to two networks."
    "property=og:title": "Add social links to a site"
    "keywords": "Plone, Volto, plonegovbr.socialmedia, volto-social-media, tutorial, social links, Follow Us"
---

(tutorial-add-social-links-to-a-site)=

# Add social links to a site

In this tutorial, you run this repository's development site, add a GitHub link to the site's profiles, and move it to the front.
Then you limit the home page's Follow Us block to two networks.

By the end, you will have changed what every page of the site shows, from one form.

## Before you start

You need [uv](https://docs.astral.sh/uv/), Node.js 24, [pnpm](https://pnpm.io/), and Git.

## Install the site

Clone the repository, and install it.

```shell
git clone https://github.com/plonegovbr/social-media.git
cd social-media
make install
```

The installation takes several minutes.
It installs both packages, and creates a site with example content.

## Start the site

Start the backend.

```shell
make backend-start
```

Leave it running.
In a second terminal, from the same directory, start the frontend.

```shell
make frontend-start
```

When the frontend is ready, open `http://localhost:3000` in your browser.

## Look at the links

Under its title, the home page shows a Follow Us block with four icons: X, BlueSky, Facebook, and Instagram.
Scroll to the footer: it shows the same four icons, in the same order.

Rest the pointer on an icon.
Notice that it moves up a little.

## Log in

Open `http://localhost:3000/login`, and log in with the username `admin` and the password `admin`.

## Open the site's settings

1.  On the home page, select {guilabel}`Edit` in the toolbar.
2.  In the sidebar, open the **Social Media** section.

The **Profiles** field is a table with four rows: X, BlueSky, Facebook, and Instagram.
It is the list both rows of icons came from.

## Add a link

1.  Select {guilabel}`Add Link`, beside the **Profiles** label.
    A dialog opens.
2.  In **Network**, choose **GitHub**.
3.  In **Title**, type `GitHub`.
4.  In **Target**, type `https://github.com/plonegovbr`, and press {kbd}`Enter`.
5.  Select {guilabel}`Save` in the dialog.

The table now has five rows, and GitHub is the last.
Look at the Follow Us block on the page: it already shows a fifth icon, although you have not saved the page.

## Put it first

Drag the GitHub row by its handle to the top of the table.

The GitHub icon moves to the front of the Follow Us block.

## Limit the block to two networks

1.  Select the Follow Us block on the page.
    The sidebar now shows the block's settings.
2.  Under **Filter Networks**, select {guilabel}`Add Network`.
3.  In **Network**, choose **GitHub**, and select {guilabel}`Save` in the dialog.
4.  Select {guilabel}`Add Network` again, choose **BlueSky**, and select {guilabel}`Save`.

The block shows two icons now: GitHub, then BlueSky.
Notice that **Network** offered only the networks the site links to.

## Save

Select {guilabel}`Save` in the toolbar.

The home page shows the block with GitHub and BlueSky.
Scroll to the footer: it shows all five icons, with GitHub first.

## What you did

You changed the site's links once, on the site root, and every place that shows them followed: the footer, and the Follow Us block.
You gave the block a list of networks, and it kept the site's links for those networks, in its own order.

## Next steps

-   {doc}`/concepts/settings-on-content` explains why the links live on the site root.
-   {doc}`/how-to-guides/give-a-section-its-own-links` gives a part of the site links of its own.
-   {doc}`/how-to-guides/configure-networks` adds a network that is not in the list.
