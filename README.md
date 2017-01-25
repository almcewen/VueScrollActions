# VueScrollActions
Vue plugin providing directives to control scroll actions including when the page is scrolled to a point, when elements come onto/leave the screen.

#### NOTE: Stable but there are some more release notes and docs to come.

## Requirents
Vue.js (tested with 1.+)

## Install
Download and save to your project path.

```javascript
import VueScrollActions from './plugins/VueScrollActions/src';
Vue.use(VueScrollActions);
```

## Usage
Add directives to html elements with in the Vue app. VueScrollActions will automatically bind and take care of everything else.

```
<style>
    .header-fix{
        position: fixed;
        top: 0;
    }
</style>
.
.
.
<body id="my-app">
    <header v-scroll-actions-at='60' v-scroll-actions-style="header-fix">
        <h1>My Example</h2>
    </header>
</body
```
When the user scrolls passed 60px the *header-fix* style will be added
