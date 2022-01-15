// usage: <trds-section class="bg-image bg-image--lazy" style="--bg-image-overlay=rgb, --bg-image-url=url('')">

import './container.js';

const TrdsBgImageIntersectionHandler = new IntersectionObserver(function(entries){
    entries.forEach(function(entry) {
        if(entry.isIntersecting){
            entry.target.loadBgImage();
            TrdsBgImageIntersectionHandler.unobserve(entry.target);
        }
    });
}, {rootMargin: "0px 0px 200px 0px"});

class TrdsSection extends HTMLElement{

    constructor(){

        super();

        this.attachShadow({mode: 'open'}).innerHTML = `
            <style>

                :host{
                    display: block;
                    padding: var(--space--xxl) 0;
                    box-sizing: border-box;
                }

                :host(:last-child){
                    flex: 1;
                }

                :host(.bg-image){
                    --bg-image-overlay: var(--color--primary-bg);
                    background: var(--bg-image-url) var(--bg-image-overlay);
                    background-position: center center;
                    background-size: cover;
                    background-blend-mode: overlay;
                }

                :host(.bg-image--lazy){
                    background: var(--bg-image-overlay);
                }

            </style>
            <trds-container>
                <slot></slot>
            </trds-container>
        `;
       
    }

    connectedCallback(){

        if(this.classList.contains('bg-image--lazy'))
            TrdsBgImageIntersectionHandler.observe(this);

    }

    loadBgImage = () => this.classList.remove('bg-image--lazy');
    
}

window.customElements.define('trds-section', TrdsSection);