# vvw

Vue via Webpack. A project seed.

## Getting Started

Get this repository's latest content inside a new git repository using [degit](https://github.com/Rich-Harris/degit):

```
npx degit https://github.com/slacktracer/vvw.git --force
```

Create a `.env` file at root level (`.`). It will be ignored by git.

Add development environment variables as needed.

```
# stop and run npm start again after adding new environment variables

BASE_URL=https://api.example.com
```

Then `npm i`...

Then `npm start`!

## What's inside?

### Framework

[Vue](https://vuejs.org/), [Vuex](https://vuex.vuejs.org/) and [Vue-Router](https://router.vuejs.org/), the very basics for a non-trivial Vue web application.

### Compiling and bundling/building

The [Webpack](https://webpack.js.org/) module bundler uses the [Babel](https://babeljs.io/) compiler and the [Vue](https://vuejs.org/) framework loaders (and Babel uses the [TypeScript](https://www.typescriptlang.org/) preset) to allow us to use the latest and greatest JS/TS that will run in any browser of our choosing ([.browserlistrc](https://github.com/browserslist/browserslist))!

Before every commit and `npm run patch` the TypeScript compiler type checks the code.

These tools are mostly configured by the following configuration files at root (`.`) level:

- .babelrc

And by the following configuration files at source (the `./src` folder) level:

- .babelrc
- tsconfig.json

### Testing

The project is set up to look for unit tests inside `__unit-tests__` folders and run them using [Jest](https://jestjs.io/).

It is also set up to run end-to-end tests from the `cypress/integration` folder (the default) using [Cypress](https://www.cypress.io/).

These tools are mostly configured by the following configuration files at root (`.`) level:

- cypress.json
- jest.config.json

### Code quality

On every commit code is type checked, formatted and linted using TypeScript, [Prettier](https://prettier.io/) and [ESLint](https://eslint.org/) They all run on staged files only using [lint-staged](https://github.com/okonet/lint-staged) on a pre-commit git hook set up with [Husky](https://github.com/typicode/husky).

These tools are mostly configured by the following configuration files at root (`.`) level:

- .eslintignore
- .eslintrc.json
- .huskyrc.json
- .lintstagedrc.json
- .prettierignore
- .prettierrc

And by the following configuration files at source (the `./src` folder) level:

- .eslintignore
- .eslintrc.json

Finally, the [`.editorconfig`](https://editorconfig.org/) file is there, at root (`.`) level, to make different code editors behave in the same consistent way in regards to details like indentation size etc.

It is supposed to [work out of the box with WebStorm](https://github.com/JetBrains/intellij-community/tree/master/plugins/editorconfig) and there is a plugin for [VS Code](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig).

#### Some ESLint tweaks

The following eslint-plugin-vue rules were turned off because they conflict with Prettier.

- [vue/max-attributes-per-line](https://eslint.vuejs.org/rules/html-self-closing.html)
- [vue/html-self-closing](https://eslint.vuejs.org/rules/max-attributes-per-line.html)

The rationale is that overall code formatting/style consistency is preferable to following every Vue recommended style (though they **are** very sensible :pensive:). A solution to accommodate both does not seem to exist at the time of writing. :disappointed: :woman_shrugging:

The [@typescript-eslint/no-unused-vars](https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-unused-vars.md) rule is set as an error instead of a warning (the default).

The rationale is that **nobody** likes stupid unused variables hanging around and making the code look silly and stuff... :unamused:

## Run npm Run

These are (allegedly) the most important scripts inside package.json.

### For developing

#### `npm start`

Starts everything in development mode.

### For testing

#### `npm test`

Runs unit tests using jest.

#### `npm run test:e2e`

Runs e2e tests using Cypress in terminal mode (`cypress run`).

### For _push starting_ the CI/CD process

#### `npm run patch`

Updates the patch ([SemVer](https://semver.org/)) number, commits, tags and pushes it to the repository.

### Other scripts

#### For checking

##### `npm run type-check`

Runs the TypeScript compiler to type check the code.

##### `npm run format-check`

Runs Prettier to check the code formatting.

##### `npm run lint`

Runs ESLint to... well, [lint](<https://en.wikipedia.org/wiki/Lint_(software)>) the code.

## CI/CD using CircleCI

### [Project environment variables](https://circleci.com/docs/2.0/env-vars/#setting-an-environment-variable-in-a-project)

These variables should be set at project level:

**`AWS_ACCESS_KEY_ID`**

The AWS access key ID. Who would have guessed?

**`AWS_REGION`**

The AWS region. But, honestly, it is always the same. You know it.

**`AWS_SECRET_ACCESS_KEY`**

Pretty much the same thing as the first one, but this one is _seeecret_...

**`BUILDS_BUCKET`:**

The name of the bucket for all builds (staging, demo and production).

**`NODE_ENV`:**

It should be _production_. It's not related to the destination environment but the build mode.

**`STAGING_BUCKET`**

The name of the bucket where the latest staging files should be copied to after build.

**`STAGING_DIST_ID`:**

It will be used to create an invalidation on CloudFront after the latest staging files are copied to the staging bucket.

### [Context variables](https://circleci.com/docs/2.0/contexts/)

Setting variables for each environment in three easy steps!

1. Add the project name to the `package.json` file:

{
"name": "some_project_name",
"version": "1.0.0",
...
}

2. `npm run config`. It will create the `.circleci/config.yml` file.

3. Create a context for each environment with variables like `BASE_URL`.

#### Naming contexts

Follow this pattern, `[project_name]_ENV_[environment]`.

We should end up with something like this:

- `SOME_PROJECT_NAME_ENV_STAGING`
- `SOME_PROJECT_NAME_ENV_DEMO`
- `SOME_PROJECT_NAME_ENV_PRODUCTION`
