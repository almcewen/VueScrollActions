import easing from './easing';

export default {

    animate(from, to, duration, ease){
        var start, timer, self;
        self = this;
        start = new Date().getTime();

        console.log("Animate to: "+to)
        timer = setInterval(function() {
            var time, x;
            time = new Date().getTime() - start;
            x = easing[ease](time, from, to - from, duration);
            window.scrollTo(0, x);
            if (time >= duration) clearInterval(timer);
         }, 1000 / 60);
    }
}
