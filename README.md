
# Vue 3 Webpack Boilerplate V2
Vue.js@3.x with webpack **and not using the Vue CLI.**

A Vue 3 Starter Boilerplate using Webpack 5 instead of CLI . 
Also used/implemented:
 - `Typescript 4`
 - `Prettier`
 - `Vue Router 4`
 - `Pinia 2` 
 - `NProgress`
 - `Bootstrap 5`  - using only `CSS` modules we need, not whole bundle and not `JS` stuff (we are going to implement those our-self)
 - Custom **Modal component**
 - Custom **Are you sure you want to delete (modal) component**
 - Custom **Loader components**
 - Custom **Auth guard directive logic (using JWT tokens)**
 - `Axios` wrapper - wanted it to look similar to old `jQuery Ajax` and to support uploading files out of the box
 - `Datepicker`
 - and more to come :)


## Why I created this repo 
Mainly I need project that I want to upgrade from `Vue 2` to `Vue 3` but not using the `CLI`. 
*(`CLI` gave me a lot of issues in past when I was implementing the **Rich Text Editor** and I don't trust it ever since... and I am a bit of control freak when it comes to my code).*
 
I also took some time to have some fun,  to practice,  and mostly for myself to bootstrap my projects. You are more than welcome to start using it if you find it fits your needs. 


## Commands

```bash
# Install node package manager dependencies.
npm install

# Start development server.
npm run build

# Compile production bundle.
npm run production
```


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
