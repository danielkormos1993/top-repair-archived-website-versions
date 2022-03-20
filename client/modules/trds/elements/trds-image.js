// usage: trds-image[src(required), lazy(optional), alt(required), aspect-ratio="w h"(optional)]
// default its 16:9 aspect ratio
// it has a builtin loader

import TrdsElement from '../trds-element.js';
import './trds-loader.js';

TrdsElement.addStyle(`

    trds-image{
        display: block;
        width: 100%;
        max-width: var(--element--max-width);
        position: relative;
        background-color: var(--color--secondary-bg);
        object-fit: contain;
        object-position: center center;
        --image-padding-bottom: 56.25%;
    }

    trds-image aspect-ratio-box{
        padding-bottom: var(--image-padding-bottom);
        display: block;
        box-sizing: border-box;
    }

    trds-image img{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: block;
        object-fit: inherit;
        object-position: inherit;
    }

`);

const TrdsImageIntersectionHandler = new IntersectionObserver(function(entries){
    entries.forEach(function(entry) {
        if(entry.isIntersecting){
            entry.target.loadImage();
            TrdsImageIntersectionHandler.unobserve(entry.target);
        }
    });
}, {rootMargin: "0px 0px 200px 0px"});

class TrdsImage extends TrdsElement{
    
    constructor(){ 
        super()
    }

    render(){

        this.innerHTML = `
            <trds-loader></trds-loader>
            <aspect-ratio-box></aspect-ratio-box>
            <img>
        `

        this.querySelector('trds-loader').enable();
        this.ImgTag = this.querySelector('img');

        this.ImgTag.setAttribute('alt', this.getAttribute('alt'));

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

        this.ImgTag.addEventListener('load', () => {
            requestAnimationFrame(() => {requestAnimationFrame(() => { 
                this.querySelector('trds-loader').disable();
                this.style.backgroundColor = 'transparent'; 
            })});
        });
        
        this.ImgTag.src = this.getAttribute('src');

    }

}

customElements.define('trds-image', TrdsImage);