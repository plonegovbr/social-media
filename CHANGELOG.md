# Change log

<!-- You should *NOT* be adding new change log entries to this file.
     You should create a file in the news directory instead.
     For helpful instructions, please see:
     https://6.docs.plone.org/volto/developer-guidelines/contributing.html#create-a-pull-request
-->

<!-- towncrier release notes start -->
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
