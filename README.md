# Open Bank Participants API Visualisation

This project, developed with Vue.js, tested with Vitest and translated with i18n, is a simple dashboard to view and filter through the data output of some major OpenBanking API's.

You're currently able to:
- Visualize the data from either one of the 2 working endpoints
- Filter the data by the roles of the participants
- Filter the data by the status of the roles of the participants
- See more details about each entry
- See some simple charts regarding the roles and some statistics

Both English and Brazilian Portuguese are supported.

### Live Demo
You can check out the result by following clicking [here](https://exemplo.com/)


## Known issues

The following endpoint didn't respond the requests, and as to the current date, it doens't work properly in my Dashboard, showing no valid data.
("https://data.sandbox.directory.opinbrasil.org.br/participants")


## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
yarn
```

### Compile and Hot-Reload for Development

```sh
yarn dev
```

### Compile and Minify for Production

```sh
yarn build
```

### Lint with [ESLint](https://eslint.org/)

```sh
yarn lint
```
