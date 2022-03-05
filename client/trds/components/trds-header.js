import '../layout/container.js';
import '../elements/trds-image.js';
import '../elements/trds-link.js';
import './trds-carousel.js';
import TrdsElement from '../trds-element.js';

TrdsElement.addStyle(`

    :root{
        --header-height: 5rem;
    }

    trds-header{
        background-color: var(--color--secondary-bg);
        height: var(--header-height);
        display: flex;
        width: 100%;
        position: fixed;
        top: 0;
        z-index: 100;
        overflow: hidden;
    }

    trds-header container{
        display: flex;
        justify-content: space-between;
        padding-right: 0;
    }

    trds-header .logo-link{
        margin-right: var(--space--l);
        flex-shrink: 1;
        flex-basis: 6.5rem;
        min-width: 3.5rem;
        display: flex !important;
        align-items: center;
        max-width: none !important;
        align-self: center;
    }

    trds-header .slot{
        display: flex;
        height: 100%;
        gap: var(--space--m);
        align-items: center;
        padding-right: var(--space--m);
        box-sizing: border-box;
    }

    @media all and (min-width:1360px){

        trds-header .slot{
            gap:var(--space--l);
        }

    }

`);

const TrdsHeaderTemplate = document.createElement('template');
TrdsHeaderTemplate.innerHTML = `
    <container>
        <a is="trds-link" class="block logo-link" href="/">
            <trds-image alt="Logo"></trds-image>
        </a>
        <trds-carousel>
        </trds-carousel>
    </container>
`;

class TrdsHeader extends TrdsElement{

    constructor(){
        super()

        this.template = TrdsHeaderTemplate.content.cloneNode(true);

    }

    connectedCallback(){

        super.connectedCallback();
        document.body.style.paddingTop = 'var(--header-height)';

    }

    disconnectedCallback(){

        document.body.style.paddingTop = 0;

    }

    render(){

        if(!this.hasAttribute('logo-src')) console.error('trds-header must have logo-src attribute.');

        this.template.querySelector('.logo-link trds-image').setAttribute('src', this.getAttribute('logo-src'));

        this.template.querySelector('trds-carousel').append(...this.children);

        this.append(this.template);

    }

}

customElements.define('trds-header', TrdsHeader);