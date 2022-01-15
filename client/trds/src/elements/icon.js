// usage: <trds-icon [lazy(optional)] [icon(required)="solid/cog"]>

const TrdsIconIntersectionHandler = new IntersectionObserver(function(entries){
    entries.forEach(function(entry) {
        if(entry.isIntersecting){
            entry.target.loadIcon();
            TrdsIconIntersectionHandler.unobserve(entry.target);
        }
    });
}, {rootMargin: "0px 0px 200px 0px"});

class TrdsIcon extends HTMLElement{

    constructor(){
        super();

        this.attachShadow({mode: 'open'}).innerHTML = `
            <style>
                :host{
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

                :host([onclick]){
                    cursor: pointer;
                }
            </style>

        `;

        this.icon = document.createElement('style');
        this.shadowRoot.appendChild(this.icon);

    }

    connectedCallback(){

        if(this.hasAttribute('lazy'))
            TrdsIconIntersectionHandler.observe(this);
        else this.loadIcon();

    }

    loadIcon = () => {

        const iconName = this.getAttribute('icon');

        this.icon.textContent = `
            :host{
                -webkit-mask-image: url("/trds/assets/icons/${iconName}.svg");
                mask-image: url("/trds/assets/icons/${iconName}.svg");
            }
        `;

    }

}

window.customElements.define('trds-icon', TrdsIcon);