---
myst:
  html_meta:
    "description": "Set up the Social Media support for Plone repository, run its tests and Storybook, and build this documentation."
    "property=og:description": "Set up the Social Media support for Plone repository, run its tests and Storybook, and build this documentation."
    "property=og:title": "Contributing"
    "keywords": "Plone, plonegovbr.socialmedia, volto-social-media, contributing, development, tests, Storybook"
---

(contributing)=

# Contributing

The repository is a monorepo holding both packages and this documentation.

| Path | Holds |
|---|---|
| `backend/` | `plonegovbr.socialmedia` |
| `frontend/packages/volto-social-media/` | `@plonegovbr/volto-social-media` |
| `docs/` | This documentation |

Report problems and propose changes on [GitHub](https://github.com/plonegovbr/social-media).

## Set up

You need [uv](https://docs.astral.sh/uv/), Node.js 24, and [pnpm](https://pnpm.io/).

Install both packages from the repository root.

```shell
make install
```

The backend's installation also creates a site with the example content.
To create it again from scratch, run the following command.

```shell
DELETE_EXISTING=1 make backend-create-site
```

## Run

Start the backend at `http://localhost:8080`.

```shell
make backend-start
```

In a second terminal, start the frontend at `http://localhost:3000`.

```shell
make frontend-start
```

Log in with the username `admin` and the password `admin`.

## Test

Run both test suites from the repository root.

```shell
make test
```

Or run one of them.

```shell
make backend-test
make frontend-test
```

To see the backend's test coverage, run the following commands.

```shell
cd backend
make test-coverage
```

To check the types of the frontend add-on, run the following commands.

```shell
cd frontend
pnpm --filter @plonegovbr/volto-social-media typecheck
```

## Format and lint

```shell
make format
make lint
```

## Storybook

Every component has stories next to its source, in `*.stories.tsx` files.
Start Storybook at `http://localhost:6006`.

```shell
cd frontend
make storybook-start
```

The published Storybook is at [plonegovbr.github.io/social-media/storybook](https://plonegovbr.github.io/social-media/storybook/).

## Documentation

This documentation is written in {term}`MyST`, and structured following {term}`Diátaxis`.
Preview it while you edit.

```shell
cd docs
make livehtml
```

Before proposing a change, build it and run the checks continuous integration runs.

```shell
cd docs
make html
make linkcheckbroken
make vale
```

## Changelog

Every change carries a news fragment, in the folder of the part it changes.

| Part | Folder |
|---|---|
| The repository | `news/` |
| `plonegovbr.socialmedia` | `backend/news/` |
| `@plonegovbr/volto-social-media` | `frontend/packages/volto-social-media/news/` |

Name a fragment after its issue, as `42.bugfix`, or with a short slug, as `+new-network.feature`.
Its type is one of `breaking`, `feature`, `bugfix`, `internal`, `documentation`, or `tests`.
