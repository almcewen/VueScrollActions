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
| name                        | type          | description  |
| --------------------------- |:-------------:|:------------ |
| v-scroll-actions-at         | Number        | A number a scroll position to trigger |
| v-scroll-actions-style      | String &#124; Object    | The string class name to apply in conjuction with *v-scroll-actions-at*. An object with *in* and *out* classes        |
| v-scroll-actions-visible    | String        |  The style to added when the element comes into the viewport |
| v-scroll-actions-invisible  | String        |  The style to added when the element leaves the viewport |

## Vue Instance properties
In addition to the directives VueScrollActions add some useful instance methods

| function                       | description  |
| ------------------------------ |:-------------------------------- |
|   $scrollTo(selector, offset)  |  scroll the viewport to the specified element with offset added to the final position |


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
When the user scrolls passed 60px the **header-fix** style will be added

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
When the user scrolls passed 60px the **header-fix** is added. When scroll position is below 60px **header-free** is added. *in/out* classes are toggled on and off and can not exist at the same time.

### Example 3 - Visibility modifiers
```
<style>
    footer{
        transition: 1s all ease;
    }
    .fade-in{
        opacity: 1;
    }
    .header-free{
        opacity: 0;
    }
    main{
        height: 2000px;
    }
</style>
.
.
.
<body id="my-app">
    <header">
        <h1>Visible/ Invisible</h2>
    </header>
    <main>
        <article> ..... </article>
    </main>
    <footer v-scroll-actions-visible="fade-in" v-scroll-actions-invisible="fade-out">
        <div>.....</div>
    </footer>
</body
```
When the user first scrolls the **footer** element is off the screen due to the hieght of **main**. The *invisible* class is added. When the user scrolls to the bottom and the footer come fully onto the screen the *visible* class is added.

### Example 4 - Smooth animated scroll with this.$scrollTo
VueScrollActions provides a helper function to smoothly animate a scroll to a particular element

```javascript
this.$scrollTo('footer', 60);
```
This will scroll the window to the footer's offset in the document with an vertical offset of 60px

## Caveats
1. The are many improvements to come! I'm still trying to find time to fine tune and write proper tests/examples
2. Expect changes! Expect more functionality to come and even some changes to use cases.
