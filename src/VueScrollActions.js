
import animator from "./animator";
import domUtils from "./utils";

String.prototype.capitalize = function(lower) {
    return (lower ? this.toLowerCase() : this).replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
};

export default class VueScrollActions{

    constructor(){
        this.pos =  {
            top:0,
            left:0,
            direction: {
                vertical: 0,
                horizontal: 0
            }
        };
        this.prevPos =  this.pos;
        this.actions =  [];
        this.directivePrefix    =  "scroll-action";
        //TODO: Add names and defaults for directives
        this.directives         =  ['at', 'style', 'orientation', 'visible', 'invisible'];
    }


    init(){
        var self = this;
        document.onscroll = function(e){

            self.prevPos         = {top:self.pos.top, left:self.pos.left};
            self.pos.top         = document.body.scrollTop;
            self.pos.left        = document.body.scrollLeft;
            self.pos.direction   = {
                vertical: (self.pos.top > self.prevPos.top)? 1 : (self.pos.top < self.prevPos.top)? -1 : 0,
                horizontal: (self.pos.left > self.prevPos.left)? 1 : (self.pos.left < self.prevPos.left)? -1 : 0,
            }
            self.processActions();
        }
    }

    createDefaults(){
        return {
            at: null,
            style: "",
            orientation: 'vertical'
        }
    }

    /*
    * Set the action for the element.
    * Add the id for tracking and create the action
    */
    setAction(params, val=null){
        let id = params.el.getAttribute("scroll-id");
        if(!id){
            id = this.actions.length;
            params.el.setAttribute("scroll-id", id);
        }

        this.createAction(id, params, val);
    }

    /*
    * Create or update the action object
    */
    createAction (id, params, val){
        if(!this.actions[id]) this.actions[id] = this.createDefaults();
        this.actions[id].el = params.el;
        let prop = params.name.split("-").pop();
        this.actions[id][prop] = (typeof val === 'object')? val : params.expression;
    }

    /*
    * Manage class toggling depending on what action is configured
    */
    processActions(){
        var self = this;
        this.actions.forEach(function(action){

            Object.keys(action).forEach(function(prop){
                let funct = 'action'+prop[0].toUpperCase()+prop.substr(1, prop.length);
                if(action[prop] !== null && self[funct]){
                    self[funct](action);
                }
            })
        });
    }

    /*
    * Style added when element is on screen and visible style set
    */
    actionVisible(action){
        action.el.classList.toggle(action.visible, (action.visible && domUtils.isVisible(action.el)));
    }

    /*
    * Style added when element goes off screen and invisible style set
    */
    actionInvisible(action){
        action.el.classList.toggle(action.invisible, (action.invisible && !domUtils.isVisible(action.el)));
    }

    /*
    * Items can have one string style that is added when the window is scrolled to the at value.
    * The second option is when an object is provide with and in and out style.
    * eg {in: in-style, out: out-style}
    */
    actionAt(action){
        let isAt = ((this.pos.left >= action.at  && action.orientation == "horizontal" )
        ||(this.pos.top  >= action.at && action.orientation == "vertical"));

        switch((typeof action.style)){
            case 'string':
                action.el.classList.toggle(action.style, action.style && isAt);
            break;
            case 'object':
                action.el.classList.toggle(action.style.in, action.style.in && isAt);
                action.el.classList.toggle(action.style.out, action.style.out && !isAt);
            break;
        }
    }

    /*
    * NOTE: Pass props through to animator. Should take string easing and timing (maybe frame rate???)
    */
    animateScroll(selector, opts)
    {
        var el = document.querySelector(selector);
        var offset = domUtils.getOffset(el);
        opts = (opts === undefined)?{offsetX:0, offsetY:0, }:opts;
        animator.animate(this.pos.top, offset.top + opts.offsetY, 1000, 'easeInOutQuart')
    }

}
