# Changelog

<!-- You should *NOT* be adding new change log entries to this file.
     You should create a file in the news directory instead.
     For helpful instructions, please see:
     https://6.docs.plone.org/volto/developer-guidelines/contributing.html#create-a-pull-request
-->

<!-- towncrier release notes start -->

## 3.0.0 (2026-09-15)


### Feature

- Show the `social_links` field on content views as the same icons the Follow Us block shows, when the content type has no view of its own. @ericof [#20](https://github.com/plonegovbr/social-media/issues/20)
- The default title when addind a new link is the name of the SocialNetWork + Added a Icon next to title of the network. @humanaice [#21](https://github.com/plonegovbr/social-media/issues/21)
- Add Spanish translation @erral 
- Make the title of a social link optional: a link saved without one takes its network's name. @ericof 
- Offer the networks of a social link from a client-side vocabulary of the registered `socialNetwork` utilities, ordered by title, and show each link's network by its icon in the social links widget. @ericof 
- Replace the social links widget with a table: links are reordered by dragging, edited in a dialog, and deleted after a confirmation. @ericof 


### Bugfix

- Fix social media icon color @iRohitSingh [#19](https://github.com/plonegovbr/social-media/issues/19)
- A link to a network with no registered `socialNetwork` utility no longer breaks the page it is shown on. @ericof 
- A social network icon given a title carries it as the SVG's title, and one without is hidden from screen readers; the attributes it set before never reached the SVG. @ericof 
- Fit the social links widget to its place: pad the table's sides on content forms, and in the sidebar drop the padding, the borders of its buttons, and the visible label of the network column. @ericof 
- Page titles use the separator configured in `config.settings.siteTitleFormat`. @ericof 
- Pick the network of a social link, and of a Follow Us block, from a select again: the dialog of the table widget rendered the `id` field with Volto's short name widget. @ericof 
- Style the link background and the footer links through the custom property and the class the components use; both rules pointed at names nothing set. @ericof 


### Internal

- Add Storybook stories for every component, rendered inside Volto's storybook `Wrapper`. @ericof 
- Check the add-on's types in `make lint`, and so in CI, leaving out tests and stories, which the previous exclude patterns did not. @ericof 
- Convert the add-on to TypeScript, with its shared types in `src/types`. @ericof 
- Run unit tests with Vitest, use pnpm 10, and align the add-on tooling with the cookieplone templates. @ericof 
- Type a Follow Us block's alignment as what Volto's alignment widget stores: a name, or an object of CSS custom properties. @ericof 
- Updated SocialNetworkIcon to ajust to have better accessebility. @humanaice 


### Documentation

- Rewrite the README to match the documentation. @ericof 


### Tests

- Add Vitest tests for every component, hook, schema and configuration step of the add-on. @ericof 

## 3.0.0-alpha.0 (2025-11-11)

### Breaking

- Support for @plone/volto 19.x. @ericof [#15](https://github.com/plonegovbr/social-media/issue/15)

### Internal

- Refactor Makefile to use repoplone to get its configuration. @ericof 
- Test with @kitconcept/volto-light-theme 8.x. @ericof 

## 2.0.0 (2025-11-11)

## 2.0.0-alpha.10 (2025-10-03)

## 2.0.0-alpha.9 (2025-09-28)

### Feature

- Add Basque translation @erral 

## 2.0.0-alpha.8 (2025-09-16)

### Bugfix

- Update German translation. @davisagli 

## 2.0.0-alpha.7 (2025-09-15)

### Internal

- Add german translations @iRohitSingh [#7](https://github.com/plonegovbr/social-media/issue/7)

## 2.0.0-alpha.6 (2025-06-04)

### Bugfix

- Fixed Redux complaining about returining a different object on every rerender. @sneridagh 

### Internal

- Updated to Volto 18.22.0 and VLT 7.0.0a5. @sneridagh 

## 2.0.0-alpha.5 (2025-04-29)

### Bugfix

- Added title in UniversalLink for Networks component to fix a11y issues. @sneridagh [#4](https://github.com/plonegovbr/social-media/issue/4)

## 2.0.0-alpha.4 (2025-04-25)

### Bugfix

- Fix icons colors @ericof 

## 2.0.0-alpha.3 (2025-04-25)

### Feature

- Use VLT 6 alpha latests code and developments in there. @sneridagh [#1](https://github.com/plonegovbr/social-media/issue/1)
- Use VLT slots for footer `FollowUs`. @sneridagh [#1](https://github.com/plonegovbr/social-media/issue/1)
- Footer is now updated live. @sneridagh [#1](https://github.com/plonegovbr/social-media/issue/1)
- Unify icons, adjust sizes. @sneridagh [#1](https://github.com/plonegovbr/social-media/issue/1)

### Bugfix

- Fix settings of the `inherit` endpoint expanders. @sneridagh [#1](https://github.com/plonegovbr/social-media/issue/1)

### Internal

- VLT as an add-on development dependency only (main `package.json`), not as direct dependency. @sneridagh [#1](https://github.com/plonegovbr/social-media/issue/1)

## 2.0.0-alpha.2 (2025-04-17)

### Internal

- Fixes `repository.toml` to publish packages @ericof 

## 2.0.0-alpha.1 (2025-04-17)

### Feature

- Implement Follow Us block @ericof 
- Implement `@plonegovbr/volto-social-media/components/FooterLinks/FooterLinks` component @ericof 
- Implement `@plonegovbr/volto-social-media/components/SocialNetworks/SocialNetworks` component @ericof 
- Implement `@plonegovbr/volto-social-media/hooks/useSocialMedia` and `@plonegovbr/volto-social-media/hooks/useNetworks` hooks @ericof 

### Internal

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
