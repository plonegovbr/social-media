---
myst:
  html_meta:
    "description": "The release status of Social Media support for Plone, and the Plone, Python, and Volto versions its test suites run against."
    "property=og:description": "The release status of Social Media support for Plone, and the Plone, Python, and Volto versions its test suites run against."
    "property=og:title": "Compatibility"
    "keywords": "Plone, plonegovbr.socialmedia, volto-social-media, compatibility, Python, Volto, changelog"
---

(reference-compatibility)=

# Compatibility

This page lists the versions this repository's continuous integration tests against, and the state of each user interface.

## Release status

Both packages are in alpha.

| Package | Version | Status |
|---|---|---|
| `plonegovbr.socialmedia` | `3.0.0a0` | Alpha, with the `Development Status :: 3 - Alpha` classifier |
| `@plonegovbr/volto-social-media` | `3.0.0-alpha.0` | Alpha, with an `-alpha` version suffix |

Read the changelog before upgrading.

## Backend

The backend test suite runs for every combination below, against the latest release of each Plone series.

| Plone | Python 3.10 | Python 3.11 | Python 3.12 | Python 3.13 | Python 3.14 |
|---|---|---|---|---|---|
| 6.2 | Tested | Tested | Tested | Tested | Tested |
| 6.1 | Tested | Tested | Tested | Tested | Tested |

The matrix is defined in [`.github/workflows/backend.yml`](https://github.com/plonegovbr/social-media/blob/main/.github/workflows/backend.yml).
The package's metadata declares `Framework :: Plone :: 6.1` and `Framework :: Plone :: 6.2`.

## Frontend

Code analysis, type checks, internationalization checks, and unit tests for the frontend run against the following versions.

| Dependency | Version |
|---|---|
| Volto | 19.4.1 |
| Node.js | 24 |
| React | 18, as a peer dependency |

The add-on shadows Volto's `ContentMetadataTags` component.
A Volto release that changes that component needs the shadow brought up to date.

## User interfaces

| Interface | Status |
|---|---|
| Volto | Supported. |
| Classic UI | Not supported. The package ships no Classic UI integration. |

## Translations

| Package | Languages |
|---|---|
| `plonegovbr.socialmedia` | German, English, Spanish, Basque, Italian, Brazilian Portuguese |
| `@plonegovbr/volto-social-media` | German, English, Spanish, Basque, Brazilian Portuguese |

## Changelogs

-   [Repository changelog](https://github.com/plonegovbr/social-media/blob/main/CHANGELOG.md).
-   [`plonegovbr.socialmedia` changelog](https://github.com/plonegovbr/social-media/blob/main/backend/CHANGELOG.md).
-   [`@plonegovbr/volto-social-media` changelog](https://github.com/plonegovbr/social-media/blob/main/frontend/packages/volto-social-media/CHANGELOG.md).
