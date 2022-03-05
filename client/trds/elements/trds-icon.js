// usage: trds-icon [icon(required)="solid/cog", lazy(optional)]

import TrdsElement from '../trds-element.js';

TrdsElement.addStyle(`

    trds-icon{
        display: block;
        width: 1em;
        height: 1em;
        background: currentColor;
        -webkit-mask-size: contain;
        mask-size: contain;
        -webkit-mask-repeat: no-repeat;
        mask-repeat: no-repeat;
        -webkit-mask-position: center center;
        mask-position: center center;
    }

    trds-icon[onclick]{
        cursor:pointer;
    }

`);

const TrdsIconIntersectionHandler = new IntersectionObserver(function(entries){
    entries.forEach(function(entry) {
        if(entry.isIntersecting){
            entry.target.loadIcon();
            TrdsIconIntersectionHandler.unobserve(entry.target);
        }
    });
}, {rootMargin: "0px 0px 200px 0px"});

class TrdsIcon extends TrdsElement{

    constructor(){
        super()

        this.attachShadow({mode: 'open'});
        this.IconStyle = this.shadowRoot.appendChild(document.createElement('style'));

    }

    render(){

        if(this.hasAttribute('lazy'))
            TrdsIconIntersectionHandler.observe(this);
        else this.loadIcon();

    }

    loadIcon = () => {

        const iconName = this.getAttribute('icon');

        this.IconStyle.textContent = `
            :host{
                -webkit-mask-image: url("/trds-elements/assets/icons/${iconName}.svg");
                mask-image: url("/trds-elements/assets/icons/${iconName}.svg");
            }
        `;

    }

}

customElements.define('trds-icon', TrdsIcon);