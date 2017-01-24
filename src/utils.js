export default {
    isVisible: function(el) {

        var rect = el.getBoundingClientRect();
        var html = document.documentElement;

        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || html.clientHeight) &&
            rect.right <= (window.innerWidth || html.clientWidth)
        );
    },

    getOffset: function(el){
        var docEl, rect;

        if ( !el ) {
            return;
        }

        rect = el.getBoundingClientRect();
        if ( rect.width || rect.height || el.getClientRects().length ) {
            docEl = el.ownerDocument.documentElement;
            return {
                top: rect.top + window.pageYOffset - docEl.clientTop,
                left: rect.left + window.pageXOffset - docEl.clientLeft
            };
        }
    }
}
