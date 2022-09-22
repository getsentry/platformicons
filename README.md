Platformicons
=============

A set of platform and framework icons from the people behind https://sentry.io.

## Publishing Changes 
Platformicons uses GitHub Actions to publish changes. You don’t need to update the version in `package.json` since that’s done automatically.

1. Make a change but don’t update the version in package.json
2. Merge with Master
3. Head to the [Release workflow](https://github.com/getsentry/platformicons/actions/workflows/release.yml) and then run the workflow
4. This will create an issue in [getsentry/publish](https://github.com/getsentry/publish/issues)
5. Add the accepted label to publish
