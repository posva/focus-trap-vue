# [4.1.0](https://github.com/posva/focus-trap-vue/compare/v4.0.3...v4.1.0) (2025-08-13)

### Features

- add component name ([#599](https://github.com/posva/focus-trap-vue/issues/599)) ([46ce689](https://github.com/posva/focus-trap-vue/commit/46ce689c28dc2e574efba96ac378e893efa8d9dd))

## [4.0.3](https://github.com/posva/focus-trap-vue/compare/v4.0.2...v4.0.3) (2023-10-20)

### Bug Fixes

- `preventScroll` property through to `createFocusTrap`. ([#507](https://github.com/posva/focus-trap-vue/issues/507)) ([e04a40d](https://github.com/posva/focus-trap-vue/commit/e04a40d34341bdfcdc5114b6a112efe584779e6f))

## [4.0.2](https://github.com/posva/focus-trap-vue/compare/v4.0.1...v4.0.2) (2023-02-26)

### Bug Fixes

- forward delayInitialFocus prop to createFocusTrap ([#454](https://github.com/posva/focus-trap-vue/issues/454)) ([f067ea6](https://github.com/posva/focus-trap-vue/commit/f067ea65b83e734eca81540169f0439cd9678388))

## [4.0.1](https://github.com/posva/focus-trap-vue/compare/v4.0.0...v4.0.1) (2022-12-21)

### Bug Fixes

- adjust peerDeps range ([37633d8](https://github.com/posva/focus-trap-vue/commit/37633d85ec610a53b26bf32655100e60b5d3f857))

# [4.0.0](https://github.com/posva/focus-trap-vue/compare/v3.4.0...v4.0.0) (2022-12-15)

### Code Refactoring

- upgrade focus-trap to v7 ([445b128](https://github.com/posva/focus-trap-vue/commit/445b12859396e5d97ab3757a741b97986dc71474))

### BREAKING CHANGES

- Plesae refer to [focus-trap changelog](https://github.com/focus-trap/focus-trap/blob/master/CHANGELOG.md#700) for breaking changes

# [3.4.0](https://github.com/posva/focus-trap-vue/compare/v3.3.1...v3.4.0) (2022-12-15)

### Features

- add support for `tabbableOptions` ([#445](https://github.com/posva/focus-trap-vue/issues/445)) ([fec2556](https://github.com/posva/focus-trap-vue/commit/fec255642547815bc586177e0d009b29e438daba))

## [3.3.1](https://github.com/posva/focus-trap-vue/compare/v3.3.0...v3.3.1) (2022-06-28)

### Features

- Allow passing a function to clickOutsideDeactivates prop ([#407](https://github.com/posva/focus-trap-vue/issues/407)) ([a4ab6bc](https://github.com/posva/focus-trap-vue/commit/a4ab6bc20ad176bde772ea0cc8fc9e8c29dcc047))

# [3.3.0](https://github.com/posva/focus-trap-vue/compare/v3.2.1...v3.3.0) (2022-05-11)

### Bug Fixes

- allow components as root ([18a184c](https://github.com/posva/focus-trap-vue/commit/18a184c2a58a57f1f1df9b9855c5c6bed69bdac0)), closes [#385](https://github.com/posva/focus-trap-vue/issues/385) [#387](https://github.com/posva/focus-trap-vue/issues/387)
- **props:** Upgrade `focus-trap` to fix `initialFocus` prop types ([#390](https://github.com/posva/focus-trap-vue/issues/390)) ([1af880f](https://github.com/posva/focus-trap-vue/commit/1af880f6b9514d2296e54c430094c78a31925d80))

### Features

- add more events ([c445e51](https://github.com/posva/focus-trap-vue/commit/c445e514df2d28f4d5ae0d08fd100fc67e7dc592))
- implement all focus-trap options ([8d7a4b4](https://github.com/posva/focus-trap-vue/commit/8d7a4b48e94c8b45d197d93f9172e709d1c65818)), closes [#384](https://github.com/posva/focus-trap-vue/issues/384) [#389](https://github.com/posva/focus-trap-vue/issues/389)

## [3.2.1](https://github.com/posva/focus-trap-vue/compare/v3.2.0...v3.2.1) (2021-07-07)

### Bug Fixes

- Fixed compatibility problems introduced for Vue2 Migrations ([ace36a0](https://github.com/posva/focus-trap-vue/commit/ace36a06e888eeab987066e575b39f78e8f6247e))
- Re-exposed the activate/deactivate methods on component ([#375](https://github.com/posva/focus-trap-vue/issues/375)) ([f5480ac](https://github.com/posva/focus-trap-vue/commit/f5480ac793f9f07c02e3cc0f2b0d6c89e689221c))

### Features

- function for the `allowOutsideClick` prop ([#373](https://github.com/posva/focus-trap-vue/issues/373)) ([a7769e6](https://github.com/posva/focus-trap-vue/commit/a7769e61cbb0b4ded04c7dd9f3bd78c7aaace50e)), closes [#328](https://github.com/posva/focus-trap-vue/issues/328)

# [3.2.0](https://github.com/posva/focus-trap-vue/compare/v3.1.0...v3.2.0) (2021-06-03)

Upgrade all dependencies

### Features

- **types:** emits option in FocusTrap ([#330](https://github.com/posva/focus-trap-vue/issues/330)) ([986d3e5](https://github.com/posva/focus-trap-vue/commit/986d3e57cd0f25b81ca18ab811d45729b8856a98))

# [3.1.0](https://github.com/posva/focus-trap-vue/compare/v3.0.2...v3.1.0) (2020-10-22)

### Features

- backport support of clickOutsideDeactivates for next ([#302](https://github.com/posva/focus-trap-vue/issues/302)) ([#303](https://github.com/posva/focus-trap-vue/issues/303)) ([b12d6ce](https://github.com/posva/focus-trap-vue/commit/b12d6cea16506d65388cdd8df81797e2f650247a))

## [3.0.2](https://github.com/posva/focus-trap-vue/compare/v3.0.1...v3.0.2) (2020-09-23)

### Bug Fixes

- watcher flush option to post ([aa2582d](https://github.com/posva/focus-trap-vue/commit/aa2582df912475d2ca91e5fb1296c1d113085e78))

## [3.0.1](https://github.com/posva/focus-trap-vue/compare/v3.0.0...v3.0.1) (2020-09-18)

- Build fixes

# [3.0.0](https://github.com/posva/focus-trap-vue/compare/v2.0.1...v3.0.0) (2020-09-18)

- Upgrade to focus-trap 6

## [2.0.1](https://github.com/posva/focus-trap-vue/compare/v2.0.0...v2.0.1) (2020-08-07)

### Bug Fixes

- ignore comments for focus-trap ([26586b7](https://github.com/posva/focus-trap-vue/commit/26586b72b5f63f4fe12ea879bb237b9e28d0ad1c))

# [2.0.0](https://github.com/posva/focus-trap-vue/compare/v0.0.6...v2.0.0) (2020-08-07)

### Bug Fixes

- change test config + make e2e pass ([8e3a38f](https://github.com/posva/focus-trap-vue/commit/8e3a38f5359991426ad11c633b929229151300ae))
