import './container.js';

class TrdsFooter extends HTMLElement{

    constructor(){

        super();

        this.attachShadow({mode: 'open'}).innerHTML = `
            <style>

                :host{
                    display: block;
                    background-color: var(--color--secondary-bg);
                    padding: var(--space--xl) 0;
                    box-sizing: border-box;
                }

            </style>
            <trds-container>
                <slot></slot>
            </trds-container>
        `;
       
    }
    
}

window.customElements.define('trds-footer', TrdsFooter);