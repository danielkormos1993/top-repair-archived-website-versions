class TrdsContainer extends HTMLElement{

    constructor(){
        super();

        this.attachShadow({mode: 'open'}).innerHTML = `
            <style>
                :host{
                    display: block;
                    width: 100%;
                    max-width: var(--container--max-width);
                    padding-left: var(--container--padding-x);
                    padding-right: var(--container--padding-x);
                    box-sizing: border-box;
                    margin-left: auto;
                    margin-right: auto;
                }
            </style>
            <slot></slot>
        `;
        
    }

}

window.customElements.define('trds-container', TrdsContainer);