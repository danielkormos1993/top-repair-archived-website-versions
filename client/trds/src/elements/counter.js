// usage: trds-counter > textNode with the starting number
// attribute "to" required -> it will count from the starting number to this number
// its "lazyloaded" so counter will start only when its close to viewport
// use inside a typhography

const TrdsCounterIntersectionHandler = new IntersectionObserver(function(entries){
    entries.forEach(function(entry) {
        if(entry.isIntersecting){
            entry.target.start();
            TrdsCounterIntersectionHandler.unobserve(entry.target);
        }
    });
}, {rootMargin: "0px 0px 100px 0px"});

class TrdsCounter extends HTMLElement{

    constructor(){
        super();
    }

    connectedCallback(){

        if(!this.hasAttribute('to')) console.error('trds-counter must have a "to" attribute');
        if(this.textContent === '') console.error('trds-counter cannot be empty. it needs a start number.');

        this.startNumber = Number(this.textContent);
        this.endNumber = Number(this.getAttribute('to'));

        TrdsCounterIntersectionHandler.observe(this);

    }

    start(){

        let startTimestamp = null;

        const step = timestamp => {

            if (!startTimestamp) startTimestamp = timestamp;

            const progress = Math.min((timestamp - startTimestamp) / 4000, 1); // 4000ms is the duration here

            this.textContent = Math.floor(progress * (this.endNumber - this.startNumber) + this.startNumber).toLocaleString('DE-de');

            if (progress < 1) window.requestAnimationFrame(step);

        };

        window.requestAnimationFrame(step);
        
    }

}

window.customElements.define('trds-counter', TrdsCounter);