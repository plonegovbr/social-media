# Change log

<!-- You should *NOT* be adding new change log entries to this file.
     You should create a file in the news directory instead.
     For helpful instructions, please see:
     https://6.docs.plone.org/volto/developer-guidelines/contributing.html#create-a-pull-request
-->

<!-- towncrier release notes start -->
## 3.0.0 (2026-09-15)

### Backend


#### Breaking changes:

- Drop support for Python 3.10. @ericof 


#### New features:

- Add a social_links metadata column to the catalog, and add it to every summary the REST API returns for a catalog result. An existing site needs the upgrade step to profile version 1001. @ericof 
- Add create_social_link, add_social_link, and cleanse_social_links to plonegovbr.socialmedia.utils, to build, add, and merge social links from Python. @ericof 
- Add support for Plone 6.2 and Python 3.14. @ericof 


#### Bug fixes:

- Compute the X and Facebook usernames from the first link to the network that has a target, instead of failing on a link without one. @ericof 
- Show Plone's Social Media control panel again when the add-on is uninstalled. @ericof 


#### Internal:

- Updatede widget so social Media uses its own Object List. @humanaice [#21](https://github.com/plonegovbr/social-media/issues/21)
- Declare the widget of the `social_links` field after the field, in both behaviors. @ericof 
- Use pytest-plone 1.1.0, type check with mypy and plone-stubs, and align the backend tooling with the cookieplone templates. @ericof 


#### Documentation:

- Rewrite the README to match the documentation. @ericof 


#### Tests

- Test updating the site's social media settings through the REST API, and the helpers that read usernames from social links. @ericof 



### Frontend


#### Feature

- Show the `social_links` field on content views as the same icons the Follow Us block shows, when the content type has no view of its own. @ericof [#20](https://github.com/plonegovbr/social-media/issues/20)
- The default title when addind a new link is the name of the SocialNetWork + Added a Icon next to title of the network. @humanaice [#21](https://github.com/plonegovbr/social-media/issues/21)
- Add Spanish translation @erral 
- Make the title of a social link optional: a link saved without one takes its network's name. @ericof 
- Offer the networks of a social link from a client-side vocabulary of the registered `socialNetwork` utilities, ordered by title, and show each link's network by its icon in the social links widget. @ericof 
- Replace the social links widget with a table: links are reordered by dragging, edited in a dialog, and deleted after a confirmation. @ericof 


#### Bugfix

- Fix social media icon color @iRohitSingh [#19](https://github.com/plonegovbr/social-media/issues/19)
- A link to a network with no registered `socialNetwork` utility no longer breaks the page it is shown on. @ericof 
- A social network icon given a title carries it as the SVG's title, and one without is hidden from screen readers; the attributes it set before never reached the SVG. @ericof 
- Fit the social links widget to its place: pad the table's sides on content forms, and in the sidebar drop the padding, the borders of its buttons, and the visible label of the network column. @ericof 
- Page titles use the separator configured in `config.settings.siteTitleFormat`. @ericof 
- Pick the network of a social link, and of a Follow Us block, from a select again: the dialog of the table widget rendered the `id` field with Volto's short name widget. @ericof 
- Style the link background and the footer links through the custom property and the class the components use; both rules pointed at names nothing set. @ericof 


#### Internal

- Add Storybook stories for every component, rendered inside Volto's storybook `Wrapper`. @ericof 
- Check the add-on's types in `make lint`, and so in CI, leaving out tests and stories, which the previous exclude patterns did not. @ericof 
- Convert the add-on to TypeScript, with its shared types in `src/types`. @ericof 
- Run unit tests with Vitest, use pnpm 10, and align the add-on tooling with the cookieplone templates. @ericof 
- Type a Follow Us block's alignment as what Volto's alignment widget stores: a name, or an object of CSS custom properties. @ericof 
- Updated SocialNetworkIcon to ajust to have better accessebility. @humanaice 


#### Documentation

- Rewrite the README to match the documentation. @ericof 


#### Tests

- Add Vitest tests for every component, hook, schema and configuration step of the add-on. @ericof 



### Project


#### Internal

- Update GitHub Actions workflows to the current monorepo layout: move `dependabot.yml` under `.github`, compute paths and changelog scopes in `config.yml`, and test the backend against Plone 6.1 and 6.2 on Python 3.11 to 3.14. @ericof 


#### Documentation

- Document both packages with a tutorial, how-to guides, concepts, and a reference. @ericof 
- Document the network vocabulary, the optional link title, the network icons of the social links widget, and how its dialog picks the widget of a field. @ericof 
- Publish the documentation and Storybook to GitHub Pages, replacing the unused Read the Docs configuration. @ericof 



## 3.0.0a0 (2025-11-11)

### Backend


#### Internal:

- Refactor Makefile to use repoplone to get its configuration. @ericof 



### Frontend

#### Breaking

- Support for @plone/volto 19.x. @ericof [#15](https://github.com/plonegovbr/social-media/issue/15)

#### Internal

- Refactor Makefile to use repoplone to get its configuration. @ericof 
- Test with @kitconcept/volto-light-theme 8.x. @ericof 



### Project


#### Internal

- Refactor config.yml to use repoplone. @ericof [#14](https://github.com/plonegovbr/social-media/pull/14)
- Update .vscode recommended extensions and default settings. @ericof [#17](https://github.com/plonegovbr/social-media/pull/17)
- Update GHA versions . @ericof 



## 2.0.0 (2025-11-11)

### Backend

No significant changes.




### Frontend

No significant changes.


### Project


#### Internal

- Update repository.toml and the root Makefile. @ericof 



## 2.0.0a10 (2025-10-03)

### Backend


#### Bug fixes:

- Update German translations. @danalvrz 



### Frontend

No significant changes.


### Project

No significant changes.




## 2.0.0a9 (2025-09-28)

### Backend


#### New features:

- Add Basque translation @erral 
- Add Spanish translation @erral 


#### Internal:

- Add plone.exportimport as a required dependency. @ericof 



### Frontend

#### Feature

- Add Basque translation @erral 



### Project


#### Internal

- GHA: Remove support for Plone 6 and do not fail-fast on Backend tests. @ericof 



## 2.0.0a8 (2025-09-16)

### Backend


#### Bug fixes:

- Update German translation. @davisagli 



### Frontend

#### Bugfix

- Update German translation. @davisagli 



### Project


#### Internal

- Update repository.toml file. @ericof 



## 2.0.0a7 (2025-09-15)

### Backend

No significant changes.




### Frontend

#### Internal

- Add german translations @iRohitSingh [#7](https://github.com/plonegovbr/social-media/issue/7)



### Project

No significant changes.




## 2.0.0a6 (2025-06-04)

### Backend

No significant changes.




### Frontend

#### Bugfix

- Fixed Redux complaining about returining a different object on every rerender. @sneridagh 

#### Internal

- Updated to Volto 18.22.0 and VLT 7.0.0a5. @sneridagh 



### Project

No significant changes.




## 2.0.0a5 (2025-04-29)

### Backend

No significant changes.




### Frontend

#### Bugfix

- Added title in UniversalLink for Networks component to fix a11y issues. @sneridagh [#4](https://github.com/plonegovbr/social-media/issue/4)



### Project


#### Internal

- GHA: Fix backend test matrix @ericof 



## 2.0.0a4 (2025-04-25)

### Backend


#### New features:

- Support Python 3.10. @ericof 
- Support Python 3.11. @ericof 
- Support Python 3.13. @ericof 



### Frontend

#### Bugfix

- Fix icons colors @ericof 



### Project


#### Internal

- GHA: Add changelog workflow to be triggered during pull requests. @ericof 
- GHA: Refactor worflows to use plone/meta. @ericof 
- GHA: Remove internal debug @ericof 



## 2.0.0a3 (2025-04-25)

### Backend

No significant changes.




### Frontend

#### Feature

- Use VLT 6 alpha latests code and developments in there. @sneridagh [#1](https://github.com/plonegovbr/social-media/issue/1)
- Use VLT slots for footer `FollowUs`. @sneridagh [#1](https://github.com/plonegovbr/social-media/issue/1)
- Footer is now updated live. @sneridagh [#1](https://github.com/plonegovbr/social-media/issue/1)
- Unify icons, adjust sizes. @sneridagh [#1](https://github.com/plonegovbr/social-media/issue/1)

#### Bugfix

- Fix settings of the `inherit` endpoint expanders. @sneridagh [#1](https://github.com/plonegovbr/social-media/issue/1)

#### Internal

- VLT as an add-on development dependency only (main `package.json`), not as direct dependency. @sneridagh [#1](https://github.com/plonegovbr/social-media/issue/1)



### Project

No significant changes.




## 2.0.0a2 (2025-04-17)

### Backend


#### Internal:

- Fixes `repository.toml` to publish packages @ericof 



### Frontend

#### Internal

- Fixes `repository.toml` to publish packages @ericof 



### Project


#### Internal

- Fixes `repository.toml` to publish packages @ericof 



## 2.0.0a1 (2025-04-17)

### Backend


#### New features:

- Disable Social Media control panel configlet @ericof 
- Implement `plonegovbr.socialmedia.links` behavior @ericof 
- Implement `plonegovbr.socialmedia.settings` behavior, add it to **Plone Site** content type @ericof 


#### Internal:

- Initial release @ericof 



### Frontend

#### Feature

- Implement Follow Us block @ericof 
- Implement `@plonegovbr/volto-social-media/components/FooterLinks/FooterLinks` component @ericof 
- Implement `@plonegovbr/volto-social-media/components/SocialNetworks/SocialNetworks` component @ericof 
- Implement `@plonegovbr/volto-social-media/hooks/useSocialMedia` and `@plonegovbr/volto-social-media/hooks/useNetworks` hooks @ericof 

#### Internal

- Initial release @ericof 



### Project


#### Internal

- Initial release @ericof 




## 1.0.0 (2024-09-03)

### Feature

- Add Spanish translations @macagua [#8](https://github.com/plonegovbr/volto-network-block/issues/8)
- Add BlueSky network [@ericof] [#10](https://github.com/plonegovbr/volto-network-block/issues/10)
- Update Twitter (X) icon [@ericof] [#11](https://github.com/plonegovbr/volto-network-block/issues/11)

## 0.2.0 (2023-08-04)

### Feature

- Add Flickr and Soundcloud icons [@ericof] [#4](https://github.com/plonegovbr/volto-network-block/issues/4)
- Update pt_BR translation [@ericof] [#5](https://github.com/plonegovbr/volto-network-block/issues/5)


## 0.1.1 (2023-08-01)

### Bugfix

- Fix linting errors [@ericof] [#3](https://github.com/plonegovbr/volto-network-block/issues/3)


## 0.1.0 (2023-08-01)

### Feature

- Implement Follow Us Block [@ericof] [#1](https://github.com/plonegovbr/volto-network-block/issues/1)
- Implement a FooterLinks component providing a list of social network profiles. [@ericof] [#2](https://github.com/plonegovbr/volto-network-block/issues/2)
