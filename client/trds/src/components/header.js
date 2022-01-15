import '../layout/container.js';
import './header.js';

class TrdsHeader extends HTMLElement{

    constructor(){
        super();

        this.attachShadow({mode: 'open'}).innerHTML = `
            <style>

                :host{
                    background-color: var(--color--secondary-bg);
                    height: var(--header-height);
                    display: flex;
                    width: 100%;
                    position: fixed;
                    top: 0;
                    z-index: 100;
                    overflow: hidden;
                }

                trds-container{
                    display: flex;
                    justify-content: space-between;
                    padding-right: 0;
                }

                ::slotted([slot=logo]){
                    margin-right: var(--space--l);
                    flex-shrink: 1;
                    flex-basis: 6.5rem;
                    min-width: 3.5rem;
                    display: flex !important;
                    align-items: center;
                    max-width: none !important;
                    align-self: center;
                }

                nav{
                    display: flex;
                    height: 100%;
                    gap: var(--space--m);
                    align-items: center;
                    padding-right: var(--space--m);
                    box-sizing: border-box;
                }

                @media all and (min-width:1360px){

                    nav{
                        gap:var(--space--l);
                    }

                }

            </style>
            <trds-container>    
                <slot name="logo"></slot>
                <trds-carousel>
                    <nav slot="container">
                        <slot></slot>
                    </nav>
                </trds-carousel>
            </trds-container>
        `;

    }

    connectedCallback(){

        document.body.style.paddingTop = 'var(--header-height)';

    }

}

window.customElements.define('trds-header', TrdsHeader);