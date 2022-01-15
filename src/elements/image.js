// usage: trds-image[src(required), lazy(optional), alt(required), aspect-ratio="w h"(optional)]
// default its 16:9 aspect ratio

import './loader.js';

const TrdsImageIntersectionHandler = new IntersectionObserver(function(entries){
    entries.forEach(function(entry) {
        if(entry.isIntersecting){
            entry.target.loadImage();
            TrdsImageIntersectionHandler.unobserve(entry.target);
        }
    });
}, {rootMargin: "0px 0px 200px 0px"});

class TrdsImage extends HTMLElement{
    
    constructor(){ 
        super();

        this.attachShadow({mode: 'open'}).innerHTML = `
            <style>

                :host{
                    display: block;
                    width: 100%;
                    max-width: var(--element--max-width);
                    position: relative;
                    overflow: hidden;
                    background-color: var(--color--secondary-bg);
                    object-fit: contain;
                    object-position: center center;
                    --image-padding-bottom: 56.25%;
                }

                aspect-ratio-box{
                    padding-bottom: var(--image-padding-bottom);
                    display: block;
                    box-sizing: border-box;
                }

                img{
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    display: block;
                    object-fit: inherit;
                    object-position: inherit;
                }

            </style>
            <trds-loader></trds-loader>
            <aspect-ratio-box></aspect-ratio-box>
            <img>
        `;
        
        this.image = this.shadowRoot.querySelector('img')

    }

    connectedCallback(){

        this.shadowRoot.querySelector('trds-loader').enable();

        if(!this.hasAttribute('src') || this.getAttribute('src') === '') 
            return console.error('trds-image src attribute must be declared.');

        if(!this.hasAttribute('alt') || this.getAttribute('alt') === '')
            return console.error('trds-image alt attribute must be declared.');

        this.image.setAttribute('alt', this.getAttribute('alt'));

        if(this.hasAttribute('aspect-ratio')){
            const aspectRatio = this.getAttribute('aspect-ratio').split(' ');
            const w = parseInt(aspectRatio[0]);
            const h = parseInt(aspectRatio[1]);
            const calculatedPaddingBottom = `${(h/w)*100}%`;
            this.style.setProperty('--image-padding-bottom', calculatedPaddingBottom);
        }

        if(this.hasAttribute('lazy')) TrdsImageIntersectionHandler.observe(this);
        else this.loadImage();

    }

    loadImage = () => {

        this.image.addEventListener('load', () => {
            requestAnimationFrame(() => {requestAnimationFrame(() => { 
                this.shadowRoot.querySelector('trds-loader').disable();
                this.style.backgroundColor = 'transparent'; 
            })});
        });
        
        this.image.src = this.getAttribute('src');

    }

}

window.customElements.define('trds-image', TrdsImage);