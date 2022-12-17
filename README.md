# Vue 3 Webpack Boilerplate V2
Vue.js@3.x with webpack

A Vue 3 Starter Boilerplate using Webpack 5 instead of CLI . 
Also used 
Typescript 4, 
NProgress,
Bootstrap 5 (using only css modules we need, not whole bundle and not js stuff), 
Custom modal component, 
Custom loader components, 
Custom auth guard directive logic (using JWT tokens), 
Axios overhang to look similar to old Ajax,
Datepicker, 
Vue Router 4, 
Pinia 2, 
Prettier and More.

**And not using the Vue CLI.**

## Architecture

```text
├─ public           // static assets.
├─ service          // commands and webpack configurations.
├─ src
│  ├─ assets        // assets such as images or font files.
│  ├─ components    // universal Vue components.
│  ├─ router        // view's routers config.
│  ├─ stores        // Pinia stores.
│  ├─ typings       // typescript .d.ts files.
│  └─ views         // pages.
```

## Commands

```bash
# Install node package manager dependencies.
npm install

# Start development server.
npm run build

# Compile production bundle.
npm run production
```
