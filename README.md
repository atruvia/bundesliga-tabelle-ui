[![Node.js CI](https://github.com/atruvia/bundesliga-tabelle-ui/actions/workflows/node.js.yml/badge.svg)](https://github.com/atruvia/bundesliga-tabelle-ui/actions/workflows/node.js.yml)
# BundesligaTabelleUi
Example project to showcase how consumer driven contract testing can be used to improve stability between frontend and backend components of an application. This project uses `pact-core` for contract testing, `cypress` for component and e2e tests and `jest` for unit tests. To further guarantee stability in the UI `cypress-image-diff` is used to run automated screenshot comparisons of the UI.

The backend code and additional details can be found [here](https://github.com/atruvia/bundesliga-tabelle). 

## Development server

Run `npm start` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Testing

`npm run test` - run jest unit tests

`npm run test:pact` - run pact contract tests

`npm run test:cypress` - run cypress component tests

`npm run test:e2e` - run cypress e2e tests (with screenshot comparison)

`npm run test:smoketest` - run smoketest with docker container (docker installation required)

`npm run test:ci` - run all of the above at once
