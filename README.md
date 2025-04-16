# Vote.gov National Voter Registration Form app (NVRF app)

This repository contains the files of the National Voter Registration Form (NVRF) filler app embedded on vote.gov website. This app is built using Vite and React integrating data from API endpoints found on vote.gov.

[Preview the standalone app](https://federalist-aef5b597-8e18-44b6-aeba-3fc3f17cdac1.sites.pages.cloud.gov/site/usagov/vote-gov-nvrf-app/) 

## Requirements

Node: https://nodejs.org/en/  
NVM: https://github.com/nvm-sh/nvm

## Getting started

### Installation
Use NVM to load the designated node version for running the app and install all dependencies. 
```
nvm use
npm install
```

### Running the app locally
Initiate the app on localhost to access via your browser.
```
npm start
```

### Running a build
There are two scenarios to generate build assets:
#### Building for Pages.cloud.gov
This ensures that the assets get built in the appropriate location for delivery on pages.cloud.gov
```
npm run pages
```

#### Building for vote.gov
This ensures that the assets get build appropriately for delivery on vote.gov
```
npm run build 
```

## Development
The NVRF app is built on Vite and React using USWDS React components from the [Trussworks USWDS React component library](https://trussworks.github.io/react-uswds/).

### File structure
| Directory/file                    | Description                                                             |
|-----------------------------------|-------------------------------------------------------------------------|
| `index.html`                      | Main entrypoint for the app in English                                  |
| `/es/index.html`                  | Main entrypoint for the app in Spanish                                  |
| `/public/files/*.pdf`             | Validated copies of the latest translated versions of the NVRF PDF      |
| `/src/Components`                 | App components                                                          |
| `/src/Components/Buttons`         | Buttons are used to render buttons or links styled as buttons           |
| `/src/Components/FieldComponents` | Field Components are used to apply consist properties across each field |
| `/src/Components/Fields`          | Fields load specific data/configuration for each field in the app       |
| `/src/Utils`                      | Utility functions for fetch, processing, parsing or validation          |
| `/src/Views`                      | App pages/steps                                                         |
| `/src/Views/FormPages`            | Multistep form pages/steps associated with progress bar                 |

## Testing
See [testing README](/testing/README.md).

## Deployment
Currently CORS rules prevents the app from being hosted anywhere but vote.gov. 
But generally speaking to deploy the app you must:
1. Run the build process to create the `/dist` files.
2. Host the `/assets` files on your server and copy the pdfs into root `/files/*.pdf` location.
3. Embed the app in a web page
```
<!-- Ensure that your html tag has valid 'lang' and `dir` attributes -->
<html lang="en" dir="ltr">
<!-- Load dependencies in the head -->
<script type="module" crossorigin src="/assets/main.js"></script>
<link rel="stylesheet" crossorigin href="/assets/main.css">

<!-- Embedded REACT app -->
<div class="nvrf-app-container" data-returnPath='https://vote.gov/register/alabama' data-stateId="al" id="root"></div>
```
`data-returnPath`: valid url path back to the state page

`data-stateId`: valid state abbreviation

See Drupal module for more specific implementation instructions [vote_nvrf](https://github.com/usagov/vote-gov-drupal/tree/dev/web/modules/custom/vote_nvrf).

## Changelog

We log all changes in the [release notes](https://github.com/usagov/vote-gov-nvrf-app/releases).

## Resources
- [Vite](https://vite.dev/guide/)
- [React](https://react.dev/reference/react)
- [Trussworks USWDS React component library](https://trussworks.github.io/react-uswds/)
