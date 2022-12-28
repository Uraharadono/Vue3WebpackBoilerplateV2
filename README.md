
# Vue 3 Webpack Boilerplate V2
Vue.js@3.x with webpack **and not using the Vue CLI.**

A Vue 3 Starter Boilerplate using Webpack 5 instead of CLI . 
Also used/implemented:
 - `Typescript 4`
 - `Prettier`
 - `Vue Router 4` 
 - `Pinia 2` 
 - `Vuelidate`
 - `NProgress`
 - `Vue Qr code`
 - `Bootstrap 5`  - using only `CSS` modules we need, not whole bundle and not `JS` stuff (we are going to implement those our-self)
 - Custom **Tabs component** - With support for both **route (navigation)** and **component content** based tab content. My own authoring, quite simple, lightweight, easy to use. Please credit if you use it. 
 - Custom **Xhr File Upload component** - this component supports quite the amount of history while also using my implementation of `Form Post` to post data to server
 - Custom **Autocomplete component** - my own authoring, quite simple, lightweight, easy to use. Please credit if you use it. 
 - Custom **Toggle component**
 - Custom **Data table component** I named `** Sephiroth grid **` - My baby. Data table of my own authoring. Insenely extensable and customazible while being quite simple and lightweight, easy to use. Please credit if you use it.
 - Custom **Modal component**
 - Custom **Are you sure you want to delete (modal) component**
 - Custom **Loader 1 & 2 components**
 - Custom **Auth guard directive logic (using JWT tokens)**
 - `Axios` wrapper - wanted it to look similar to old `jQuery Ajax` and to support uploading files out of the box
 - `Datepicker`
 - `FontAwesome` icons - I have not implemented `FontAwesome` using this way: https://fontawesome.com/docs/web/use-with/vue/
	even tho' merging and combining icons seems like great idea, because I want to be able to use icons dynamically (using string interpolation).
	I have used modified version of: https://fontawesome.com/docs/web/setup/host-yourself/webfonts
	to load fonts myself. Instead of what is shown in tutorial, I have installed `FontAwesome` from `npm` (https://fontawesome.com/docs/web/setup/packages)
	and imported the `.scss` files myself.
	Bundle size is *1Mb bigger*, and with my experience from before, after usage of ~20ish `.svg` icons, it bloats to almost same size.
 - and more to come :)

`(*NOTE*: I have tried and I think I managed to create a push for each one of the items in list above. So in case you need just "Modal component" you can find it in pushes.)`


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
