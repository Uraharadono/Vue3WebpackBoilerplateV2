# Vue 3 Webpack Boilerplate V2
Vue.js@3.x with webpack **nd not using the Vue CLI.**

A Vue 3 Starter Boilerplate using Webpack 5 instead of CLI . 
Also used/implemented:
 - Typescript 4
 - Prettier  
 - Vue Router 4
 - NProgress 
 - Bootstrap 5  - using only CSS modules we need, not whole bundle and not JS stuff)
 - Custom modal component
 - Custom are you sure you want to delete (modal) component
 - Custom loader components
 - Custom auth guard directive logic (using JWT tokens)
 - Axios wrapper - wanted it to look similar to old jQuery Ajax and 
 - Datepicker
 - Vue Router 4
 - Pinia 2 
 - and more to come :)



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
