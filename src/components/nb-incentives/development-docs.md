### DEVELOPMENT

During development there are 3 pages you might be interested in.
 - The root page is there to display the documentation.
 - The `/demo` page is there to display various demos for how to use your component.
 - The `/implementation` page, is a sandbox where you can work with less noise compared to the demo page.

**Running Your Project**

 - `npm start` is the default command to spin your project. It will clean up any old builds
 and then start up a development server on port `3000`  using [Browsersync](https://www.browsersync.io/) to reload the page when changes occur.

**note:** If you are finding that when reloading it is switching from demos back to docs, then in the browser add the route `/demo` to the url and then the refreshes will happen on that route.

### Demos and Releases

All components should follow semver versioning.

- You can run one of three commands to bump and tag your new release.
  - `npm run release-patch` updates from 0.0.1 to 0.0.2
  - `npm run release-minor` updates from 0.0.1 to 0.1.0
  - `npm run release-major` updates from 0.0.1 to 1.0.0

- All projects also come with built in demos and docs.
  - `npm run pages` is the command to deploy a [Github Pages](https://pages.github.com/) site for your project
    - [nb-incentives](https://johnm.org.github.io/nb-incentives)
  - **note:**
    - This creates a orphan branch with no history.
    - Always run this from `master` after pulling the latest build to ensure your docs reflect the most recent version.

### Testing
- `npm run test` is the command to run basic tests using [Web Component Tester](https://github.com/Polymer/web-component-tester) in the terminal.

Automated testing is also supported with [TravisCI](https://travis-ci.org/getting_started). If you enable this feature on the Github repo then tests are set to run on every commit. This can be adjusted in the `.travis.yml`

