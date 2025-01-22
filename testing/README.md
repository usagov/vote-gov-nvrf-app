## Testing locally with Cypress

Vote.gov uses Cypress as its automated testing tool. To learn more about Cypress
click [here](https://docs.cypress.io/guides/overview/why-cypress#What-you-ll-learn)
to better understand the tool and why we use it.

We are also using CircleCi for continuous coverage of testing. There are several
testing pipeline (see below for more information) that helps provide confidence
and ensure we are catching any bugs are errors before we hit production.

__Please note all scripts/commands must be run in the `testing` folder__

See [Installing Cypress Documentation](https://docs.cypress.io/guides/getting-started/installing-cypress#System-requirements)
to get Cypress set up on local. If this is your first time using Cypress you
will need to run the install script in your command line.

### Command line for download - ensure you are in the testing folder

```
npm install
```

## Testing scripts and their use

Before you can run any test please review the Project [README.md](../README.md)
to get your local started and running.

### Cypress testing commands:

| Command           | Description                                       |
|-------------------|---------------------------------------------------|
| `npm run cy:open` | Opens Cypress Runner                              |
| `npm run cy:test` | Run tests headless                                |
| `npm run cy:axe`  | Run accessibility testing with Cypress Axe Plugin |
