// usage: trds-section
// add bg-image class for background-image and declare bg-image-src style property
// add lazy class for lazy loading bg-image
// modify bg-image-overlay with an rgb color declaration
// feel free to modify background related css properties on trds-section element if needed

import TrdsElement from '../trds-element.js';
import './container.js';

TrdsElement.addStyle(`

    trds-section{
        display: block;
        padding: var(--space--xxl) 0;
    }

    trds-section:last-child{
        flex: 1;
    }

    trds-section.bg-image{
        --bg-image-overlay: var(--color--primary-bg);
        background: var(--bg-image-src) var(--bg-image-overlay);
        background-position: center center;
        background-size: cover;
        background-blend-mode: overlay;
    }

    trds-section.lazy{
        background: var(--bg-image-overlay);
    }

`);

const TrdsSectionIntersectionHandler = new IntersectionObserver(function(entries){
    entries.forEach(function(entry) {
        if(entry.isIntersecting){
            entry.target.loadBgImage();
            TrdsSectionIntersectionHandler.unobserve(entry.target);
        }
    });
}, {rootMargin: "0px 0px 200px 0px"});

const TrdsSectionTemplate = document.createElement('template');
TrdsSectionTemplate.innerHTML = `
    <container></container>
`;

class TrdsSection extends TrdsElement{

    constructor(){
        super();

        this.template = TrdsSectionTemplate.content.cloneNode(true);

    }

    render(){

        this.template.querySelector('container').append(...this.children);
   
        this.appendChild(this.template);

        if(this.classList.contains('lazy'))
            TrdsSectionIntersectionHandler.observe(this);

    }

    loadBgImage = () => this.classList.remove('lazy');

}

customElements.define('trds-section', TrdsSection);