# Changelog

<!-- You should *NOT* be adding new change log entries to this file.
     You should create a file in the news directory instead.
     For helpful instructions, please see:
     https://6.docs.plone.org/volto/developer-guidelines/contributing.html#create-a-pull-request
-->

<!-- towncrier release notes start -->

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
