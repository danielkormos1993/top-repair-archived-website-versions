import '../elements/image.js';

class TrdsShowcase extends HTMLElement{

    constructor(){
        super();

        this.attachShadow({mode:'open'}).innerHTML = `
            <style>
                :host{
                    display: block;
                    max-width: var(--element--max-width);
                    position: relative;
                    background-color: var(--color--secondary-bg);
                }
                trds-showcase__before,
                trds-showcase__after{
                    display: block;
                    transition: opacity .5s;
                    position: relative;
                }
                trds-showcase__before:before,
                trds-showcase__after:before{
                    content: 'Előtte';
                    display: block;
                    position: absolute;
                    top: 0;
                    left: 0;
                    padding: var(--space--xs) var(--space--s);
                    font-size: var(--size--s);
                    text-transform: uppercase;
                    font-weight: bold;
                    background-color: var(--color--primary-bg);
                    mix-blend-mode: screen;
                    z-index: 1;
                }
                trds-showcase__after:before{
                    content: 'Utána';
                }
                trds-showcase__after{
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    opacity: 0;
                }
                :host([after-image-active]) trds-showcase__after{
                    opacity: 1;
                }
                :host([after-image-active]) trds-showcase__before{
                    opacity: 0;
                }
                trds-image{
                    object-fit: cover;
                }
            </style>
            <trds-showcase__before>
            </trds-showcase__before>
            <trds-showcase__after>
            </trds-showcase__after>
        `;

        this.addEventListener('click', this.toggleAfterImg);
                
    }

    toggleAfterImg = () => {
        this.hasAttribute('after-image-active') ? this.removeAttribute('after-image-active') : this.setAttribute('after-image-active', '');
    }

    connectedCallback(){

        this.shadowRoot.querySelector('trds-showcase__before').innerHTML = `
            <trds-image alt="Javítás előtti kép" lazy src="${this.getAttribute('before-image-url')}"></trds-image>
        `;

        this.shadowRoot.querySelector('trds-showcase__after').innerHTML = `
            <trds-image alt="Javítás utáni kép" lazy src="${this.getAttribute('after-image-url')}"></trds-image>
        `;

    }

}

window.customElements.define('trds-showcase', TrdsShowcase);