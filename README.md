# VueScrollActions
Vue plugin providing directives to control scroll actions including when the page is scrolled to a point, when elements come onto/leave the screen.

#### NOTE: Stable but there are some more release notes and docs to come.

## Requirements
Vue.js (tested with 1.+)

## Install
Download and save to your project path.

```javascript
import VueScrollActions from './plugins/VueScrollActions/src';
Vue.use(VueScrollActions);
```

## Directives Summary
| name        | type           | description  |
| ------------- |:-------------:| -----:|
| v-scroll-actions-at     | Number | A number a scroll position to trigger |
| v-scroll-actions-style      | String &#124; Object    | The string class name to apply in conjuction with *v-scroll-actions-at*. An object with *in* and *out* classes |
| v-scroll-actions-visible | String     |  The style to added when the element comes into the viewport |
| v-scroll-actions-invisible | String     |  The style to added when the element leaves the viewport |

## Vue Instance properties
In addition to the direcives VueScrollActions add some useful instance methods
| name        | type           | description  |
| ------------- |:-------------:| -----:|
| v-scroll-actions-at     | Number | A number a scroll position to trigger |


## Usage
Add directives to html elements with in the Vue app. VueScrollActions will automatically bind and take care of everything else.

### Example 1 - Simple class using v-scroll-actions-at combined with v-scroll-actions-style
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

### Example 2 - v-scroll-actions-at and v-scroll-actions-style with in out properties
```
<style>
    .header-fix{
        position: fixed;
        top: 0;
    }
    .header-free{
        position: relative;
    }
</style>
.
.
.
<body id="my-app">
    <header v-scroll-actions-at='60' v-scroll-actions-style="{in: header-fix, out: header-free;">
        <h1>My Example</h2>
    </header>
</body
```
When the user scrolls passed 60px the *header-fix* is added. When scroll position is below 60px *header-free* is added. *in/out* classes are toggled on and off and can not exist at the same time.
