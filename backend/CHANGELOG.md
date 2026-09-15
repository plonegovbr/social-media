# Changelog

<!--
   You should *NOT* be adding new change log entries to this file.
   You should create a file in the news directory instead.
   For helpful instructions, please see:
   https://github.com/plone/plone.releaser/blob/master/ADD-A-NEWS-ITEM.rst
-->

<!-- towncrier release notes start -->

## 3.0.0 (2026-09-15)


### Breaking changes:

- Drop support for Python 3.10. @ericof 


### New features:

- Add a social_links metadata column to the catalog, and add it to every summary the REST API returns for a catalog result. An existing site needs the upgrade step to profile version 1001. @ericof 
- Add create_social_link, add_social_link, and cleanse_social_links to plonegovbr.socialmedia.utils, to build, add, and merge social links from Python. @ericof 
- Add support for Plone 6.2 and Python 3.14. @ericof 


### Bug fixes:

- Compute the X and Facebook usernames from the first link to the network that has a target, instead of failing on a link without one. @ericof 
- Show Plone's Social Media control panel again when the add-on is uninstalled. @ericof 


### Internal:

- Updatede widget so social Media uses its own Object List. @humanaice [#21](https://github.com/plonegovbr/social-media/issues/21)
- Declare the widget of the `social_links` field after the field, in both behaviors. @ericof 
- Use pytest-plone 1.1.0, type check with mypy and plone-stubs, and align the backend tooling with the cookieplone templates. @ericof 


### Documentation:

- Rewrite the README to match the documentation. @ericof 


### Tests

- Test updating the site's social media settings through the REST API, and the helpers that read usernames from social links. @ericof 

## 3.0.0a0 (2025-11-11)


### Internal:

- Refactor Makefile to use repoplone to get its configuration. @ericof 

## 2.0.0 (2025-11-11)

No significant changes.


## 2.0.0a10 (2025-10-03)


### Bug fixes:

- Update German translations. @danalvrz 

## 2.0.0a9 (2025-09-28)


### New features:

- Add Basque translation @erral 
- Add Spanish translation @erral 


### Internal:

- Add plone.exportimport as a required dependency. @ericof 

## 2.0.0a8 (2025-09-16)


### Bug fixes:

- Update German translation. @davisagli 

## 2.0.0a7 (2025-09-15)

No significant changes.


## 2.0.0a6 (2025-06-04)

No significant changes.


## 2.0.0a5 (2025-04-29)

No significant changes.


## 2.0.0a4 (2025-04-25)


### New features:

- Support Python 3.10. @ericof 
- Support Python 3.11. @ericof 
- Support Python 3.13. @ericof 

## 2.0.0a3 (2025-04-25)

No significant changes.


## 2.0.0a2 (2025-04-17)


### Internal:

- Fixes `repository.toml` to publish packages @ericof 

## 2.0.0a1 (2025-04-17)


### New features:

- Disable Social Media control panel configlet @ericof 
- Implement `plonegovbr.socialmedia.links` behavior @ericof 
- Implement `plonegovbr.socialmedia.settings` behavior, add it to **Plone Site** content type @ericof 


### Internal:

- Initial release @ericof
