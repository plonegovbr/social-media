# Social Media support for Plone

Documentation for Social Media support for Plone.
Social media components for Plone and Volto

This project provides a Sphinx-based documentation environment for your Plone project, powered by the [Plone Sphinx Theme](https://github.com/plone/plone-sphinx-theme).
It's generated using the `documentation_starter` template from [Cookieplone](https://github.com/plone/cookieplone).


## Prerequisites

-   [uv](https://docs.astral.sh/uv/) is the recommended tool for managing Python versions and project dependencies.

To install uv, use the following command, or visit the [uv installation page](https://docs.astral.sh/uv/getting-started/installation/) for alternative methods.

```shell
curl -LsSf https://astral.sh/uv/install.sh | sh
```


## Build documentation

To build the HTML documentation, issue the following command.

```shell
make html
```

To build the HTML documentation and view a live preview while editing your documentation, issue the following command.

```shell
make livehtml
```

To check for broken links in your documentation, issue the following command.

```shell
make linkcheckbroken
```

To check spelling, grammar, and style in your documentation, issue the following command.
You should pay attention to errors and warnings, and suggestions may get noisy.

```shell
make vale
```

To delete the `docs` build directory and Python virtual environment, and reinitialize Python virtual environment, issue the following command.
This is useful to force reinstall dependencies and purge cached files in Sphinx builds.

```shell
make init
```

For more `make` commands, issue the following command.

```shell
make help
```


## Customize the Social Media support for Plone documentation

This section provides how-to guidance to customize your documentation.

The file `docs/conf.py` controls the configuration of your documentation.
It has extensive comments for each part, often with links to the authoritative documentation for extensions and configuration.

The following sections describe customization not addressed in `docs/conf.py`.


### Manage dependencies

You can configure which dependencies or requirements you want to use in your documentation using uv.
Requirements are stored in the `dev` dependency group in the `pyproject.toml` file.

To add a requirement, use the following command.

```shell
uv add --dev my-requirement
```

To remove a requirement, use the following command.

```shell
uv remove --dev my-requirement
```

See also uv's documentation [Development dependencies](https://docs.astral.sh/uv/concepts/projects/dependencies/#development-dependencies).

After installing a dependency, you might need to add it to your documentation's configuration file, `conf.py`, under the `extensions` key.


### Replace static files

You might want to replace the default static files, located in `docs/_static`, `logo.svg` and `favicon.ico`.
Plone Sphinx Theme is configured to use these files when rendering documentation to HTML.

If you rename `logo.svg`, you must update `conf.py`, under the `html_logo`, `ogp_image`, and `latex_logo` keys.


## Publishing

The site is deployed to GitHub Pages at [plonegovbr.github.io/social-media](https://plonegovbr.github.io/social-media/) on every push to `main` that touches the documentation or the frontend.

The documentation is published at the root, and Storybook under `/storybook/`, as one artifact — see `.github/workflows/tmp-docs-publish.yml`.
Both halves are rebuilt together on purpose: deploying one without the other would let the two drift apart.
