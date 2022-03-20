import '../elements/trds-image.js';
import TrdsElement from '../trds-element.js';

TrdsElement.addStyle(`
    trds-showcase{
        display: block;
        max-width: var(--element--max-width);
        position: relative;
        background-color: var(--color--secondary-bg);
    }
    trds-showcase_before,
    trds-showcase_after{
        display: block;
        transition: opacity .5s;
        position: relative;
    }
    trds-showcase_before:before,
    trds-showcase_after:before{
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
    trds-showcase_after:before{
        content: 'Utána';
    }
    trds-showcase_after{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
    }
    trds-showcase.active trds-showcase_after{
        opacity: 1;
    }
    trds-showcase.active trds-showcase_before{
        opacity: 0;
    }
    trds-showcase trds-image{
        object-fit: cover;
    }
`);

class TrdsShowcase extends TrdsElement{

    constructor(){
        super()
    }

    connectedCallback(){

        super.connectedCallback();
        this.addEventListener('click', this.toggleAfterImg);

    }

    disconnectedCallback(){

        this.removeEventListener('click', this.toggleAfterImg);

    }

    render(){

        this.innerHTML = `
            <trds-showcase_before>
                <trds-image alt="Javítás előtti kép" lazy src="${this.getAttribute('before-image-url')}"></trds-image>
            </trds-showcase_before>
            <trds-showcase_after>
                <trds-image alt="Javítás utáni kép" lazy src="${this.getAttribute('after-image-url')}"></trds-image>
            </trds-showcase_after>
        `;

    }

    toggleAfterImg = () => {
        this.classList.contains('active') ? this.classList.remove('active') : this.classList.add('active');
    }

}

customElements.define('trds-showcase', TrdsShowcase);