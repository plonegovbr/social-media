# Social Media support for Plone 🚀

<div align="center">

[![Built with Cookieplone](https://img.shields.io/badge/built%20with-Cookieplone-0083be.svg?logo=cookiecutter)](https://github.com/plone/cookieplone-templates/)
[![CI](https://github.com/plonegovbr/social-media/actions/workflows/main.yml/badge.svg)](https://github.com/plonegovbr/social-media/actions/workflows/main.yml)

</div>

## Overview 📚

This repository provides social media components for **Plone** and **Volto**.

It includes:

- `plonegovbr.socialmedia`: A Python package for Plone Dexterity behaviors.
- `@plonegovbr/volto-social-media`: A React package for Volto components and widgets.

## Quick Start 🏁

### Prerequisites ✅

Ensure you have the following installed:

- **[UV](https://github.com/astral-sh/uv)** 🐍 (Python dependency manager)
- **Node.js 22** 🟩
- **pnpm** 🧶 (JavaScript package manager)
- **Docker** 🐳 (Containerized environment)

### Installation 🔧

1. Clone the repository:

```bash
git clone git@github.com:plonegovbr/social-media.git
cd social-media
```

2. Install all dependencies:

```bash
make install
```

### Fire Up the Servers 🔥

1. Create a new Plone site:

```bash
make backend-create-site
```

2. Start the Backend (Plone) at [http://localhost:8080/](http://localhost:8080/):

```bash
make backend-start
```

3. In a separate terminal, start the Frontend (Volto) at [http://localhost:3000/](http://localhost:3000/):

```bash
make frontend-start
```

Voilà! Your Plone site should now be live. 🎉

### Local Stack Deployment 📦

Deploy a full local Docker Compose stack with:

- Backend (Plone)
- Frontend (Volto)
- Traefik Router
- Postgres Database

Run:

```bash
make stack-start
make stack-create-site
```

Your site will be available at [http://social-media.localhost](http://social-media.localhost). 🌐

## Project Structure 🏗️

This monorepo contains:

| Path      | Package                                      | Description                  |
|-----------|-----------------------------------------------|------------------------------|
| `backend/` | [`plonegovbr.socialmedia`](./backend/)        | Python package for Plone behaviors |
| `frontend/` | [`@plonegovbr/volto-social-media`](./frontend/) | React package for Volto components |

## Code Quality Assurance 🧐

### Checking the code

Run:

```bash
make check
```

This will verify code formatting, linting, and quality for both backend and frontend.

### Formatting the code

Run:

```bash
make format
```

| Section  | Tool           | Description                          | Config File |
|----------|----------------|--------------------------------------|-------------|
| Backend  | Ruff            | Python formatting and imports sorting | [`backend/pyproject.toml`](./backend/pyproject.toml) |
| Backend  | zpretty         | XML and ZCML formatting              | -- |
| Frontend | ESLint          | JavaScript/TypeScript lint fixing    | [`frontend/.eslintrc.js`](./frontend/.eslintrc.js) |
| Frontend | Prettier        | JavaScript/TypeScript formatting     | [`frontend/.prettierrc`](./frontend/.prettierrc) |
| Frontend | Stylelint       | Stylesheet (CSS/LESS/SASS) formatting | [`frontend/.stylelintrc`](./frontend/.stylelintrc) |

Formatters can also be run individually inside `backend/` and `frontend/`.

### Linting the codebase

Run:

```bash
make lint
```

| Section  | Tool                | Description                        | Config File |
|----------|---------------------|------------------------------------|-------------|
| Backend  | Ruff                 | Python code linting and import sorting | [`backend/pyproject.toml`](./backend/pyproject.toml) |
| Backend  | Pyroma               | Python package metadata checking  | -- |
| Backend  | check-python-versions | Python versions metadata checking | -- |
| Backend  | zpretty              | XML and ZCML structure checking    | -- |
| Frontend | ESLint               | JavaScript/TypeScript lint checking | [`frontend/.eslintrc.js`](./frontend/.eslintrc.js) |
| Frontend | Prettier             | JavaScript/TypeScript formatting checking | [`frontend/.prettierrc`](./frontend/.prettierrc) |
| Frontend | Stylelint            | CSS/LESS/SASS linting              | [`frontend/.stylelintrc`](./frontend/.stylelintrc) |

Linters can also be run separately inside `backend/` and `frontend/`.

## Internationalization 🌐

Extract and sync i18n messages:

```bash
make i18n
```

This will update translation files for both Plone (backend) and Volto (frontend).

## Credits & Acknowledgements 🙏

Maintained by the [PloneGov-Br Community](https://plone.org.br/gov) 🇧🇷❤️.
