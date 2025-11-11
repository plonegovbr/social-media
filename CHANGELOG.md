# Change log

<!-- You should *NOT* be adding new change log entries to this file.
     You should create a file in the news directory instead.
     For helpful instructions, please see:
     https://6.docs.plone.org/volto/developer-guidelines/contributing.html#create-a-pull-request
-->

<!-- towncrier release notes start -->
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
