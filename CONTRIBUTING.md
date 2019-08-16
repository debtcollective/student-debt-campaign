# CONTRIBUTING

Contributions are always welcome, no matter how large or small. Before contributing,
please read the [code of conduct](CODE_OF_CONDUCT.md).

## Setup

> Install yarn on your system: [https://yarnpkg.com/en/docs/install](https://yarnpkg.com/en/docs/install)

### Install dependencies

> Only required on the first run, subsequent runs can use `yarn` to both
bootstrap and run the development server using `yarn develop`.
Since this starter using the [netlify-lambda](https://github.com/netlify/netlify-lambda), there could be further issues you, please check the [Readme](https://github.com/netlify/netlify-lambda) for further information and set up questions.

```sh
yarn
```

## Available scripts

### `start`

Starts the development server. This task runs both the `start:app` and `start:lambda` scripts.

#### Usage

```sh
yarn start
```

### `build`

Build the static files into the `public` folder, turns lambda functions into a deployable form. This task runs both the `build:app` and `build:lambda` scripts.

#### Usage

```sh
yarn build
```

### `clean`

Removes all the files from `public`, `.cache` directories using the `rimraf` command.

#### Usage

```sh
yarn clean
```

### `develop`

Runs the `clean` script and starts the gatsby develop server using the command `gatsby develop`. Since this is not starting the lambda server it can be used when you only changing the site and not the lambda functions.

#### Usage

```sh
yarn develop
```

### `serve`

This command is shorthand for `gatsby serve` 

#### Usage

```sh
yarn serve
```

### `test`

Not implmented yet

#### Usage

```sh
yarn test
```

### `format`

Formats code and docs according to our style guidelines using `prettier`

#### Usage

```sh
yarn format
```

### `start:app`

Runs the `develop` command, this mapping is needed so we can start both gatsby and lambda with one command (`yarn start`).

#### Usage

```sh
yarn start:app
```

### `start:lambda`

Runs the `netlify-lambda` command, starts the lambda server in develop mode.

#### Usage

```sh
yarn start:lambda
```

### `build:app`

Builds the gatsby app

#### Usage

```sh
yarn build:app
```

### `build:lambda`

Runs the `netlify-lambda build` command, compiles the functions.

#### Usage

```sh
yarn build:lambda
```

## License

By contributing to this project, you agree that your contributions will be licensed
under its [BSD license](LICENSE).
