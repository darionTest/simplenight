# simplenight

#**App Automation Test**

### General requisites for submission

1. Programming languages
   - Typescript

2. Drivers
   - Playwright

3. Browsers
	- Chrome (preferred)

### Dependencies and initial steps
We are gonna be needing:
NodeJs, Git installed in our computers.

Initial Steps:

1 - Clonning git repo:
```sh
git clone https://github.com/darionTest/simplenight.git
cd simplenight
```

2 - Installing all dependencies listed on package.json
```sh
npm install
```

3 - Playright dependencies
```sh
npx playwright install
```
#"Sometimes Playwright browsers are not installed automatically, so you can install them by running this command:"


### Running tests locally
By default, Playwright tests run headless (without opening a browser window). This is set in the Playwright configuration. If you want to run the tests with visible browsers, you can modify the configuration, but for CI purposes, it is set to run headless by default.
If you want to test with a visible browser, simply change the configuration to set the headless: false:

```sh
// playwright.config.ts
module.exports = {
  use: {
    headless: false, // Set to false to see the browser
  },
};
```

To run tests with DEV env or STG env
We provide two scripts:
Run tests using DEV:
```sh
 npm run test:dev     
```

Run tests using STG:
```sh
 npm run test:stg     
```

After running the tests, Playwright generates a testing report. 
We can open it by:
```sh
npx playwright show-report
```

### GitHub Actions Setup
The tests are automated using GitHub Actions for Continuous Integration (CI). This will automatically run tests on every push or pull request to the main or master branch.

To see the workflow configuration, check out the 
```sh
.github/workflows/tests.yml file.
```

How to manually trigger the tests:
You can manually trigger the tests by going to the Actions, selecting tests workflow and clicking on the "Run workflow" button.

GitHub Actions workflow details:
Executes Playwright tests.
The pipeline also uses cache in order to spend less time on the up coming executions. All needed dependencies are gonna be stored
and they are gonna be used as long as we keep using the same versions.

There is an artifact created as well with the testing report that will be linked to the workflow.
As soon as the pipeline ends, by accesing the execution, user is able to download the createad artifact 
that is gonna be the report under .html format.

### Best Practices implemented
Have worked with POM pattern.
Have used a base page in order to efficiently apply inheritance.
Have make use of allure report for getting results in html.
Have commented and formated the code.
