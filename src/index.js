import VueScrollActions from "./VueScrollActions.js";


(function(){
    var Vue;
    var isVueLoaded = true;

    if(typeof require === 'undefined'){
        Vue = Window.Vue;
    }else{
        Vue = require('vue');
    }

    if(!Vue) {
        isVueLoaded = false;
        console.warn('Vue is not loaded. Ensure vue is installed and running before laoding VueScrollTime.');
    }


    var vsa = new VueScrollActions();
    var scrollActionPlugin = {

        install: function(Vue, options){

            console.log(vsa.directives );
            Vue.prototype.$scrollTop = function(){return vsa.pos.top};
            Vue.prototype.$scrollLeft = function(){return vsa.pos.left};
            Vue.prototype.$scrollDirection = function(){return vsa.pos.direction};
            Vue.prototype.$scrollTo = function(selector, opts){
                vsa.animateScroll(selector, opts);
            };
            Vue.prototype.$visible = function(selector, opts){
                return vsa.isVisible(document.querySelector(selector));
            };

            //Create directives
            console.log("Setting directives...")

            vsa.directives.forEach(function(directiveID){
                console.log(directiveID);
                Vue.directive(vsa.directivePrefix+'-'+directiveID, {
                    bind: function(){
                        vsa.setAction(this);
                    },
                    update: function(val=null){
                        if(val === null) return;
                        vsa.setAction(this, val);
                    }
                });
            })

            vsa.init();

        }
    }

    if(typeof module !== 'undefined' && typeof module.exports !== 'undefined'){
        module.exports = scrollActionPlugin;
    }else{
        window.vScrollAction = scrollActionPlugin;
    }
})()
