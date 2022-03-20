// usage: button is=trds-button
// or a is=trds-button--link for anchor button
// attributes: [text, icon]
// button has a built in loader, which can be enabled by enable()
// class variants: disabled, rounded, block, icon-on-right, outline

import '../libs/wc-polyfill.js'
import '../elements/trds-icon.js';
import '../elements/trds-loader.js';
import TrdsLink from '../elements/trds-link.js';
import TrdsElement from '../trds-element.js';

TrdsElement.addStyle(`

    .trds-button{
        all: unset;
        display: flex;
        box-sizing: border-box;
        padding: var(--space--s) var(--space--m);
        border-radius: 5px;
        overflow: hidden;
        max-width: max-content;
        min-width: max-content;
        --base-bg-color: var(--color--primary);
        background-color: var(--color--primary);
        font-weight: bold;
        text-transform: uppercase;
        font-size: var(--size--xs);
        transition: filter 0.25s ease-in-out, transform 0.25s ease-in-out;
        align-items: center;
        justify-content: center;
        gap: var(--space--s);
        cursor: pointer;
        position: relative;
    }

    .trds-button:hover,
    .trds-button:focus{
        filter: brightness(125%);
    }

    .trds-button:active{
        transform: scale(0.95);
    }

    .trds-button.disabled{
        filter: brightness(0.75);
        pointer-events: none;
    }
    
    .trds-button.rounded{
        border-radius: 50px;
    }

    .trds-button.block{
        max-width: var(--element--max-width);
    }

    .trds-button.icon-on-right trds-icon{
        order: 2;
    }

    .trds-button.call{
        --base-bg-color: var(--color--success);
        background-color: var(--color--success);
        border-radius: 50px;
    }

    .trds-button.outline{
        box-shadow: inset 0 0 0 2px currentColor;
        background-color: transparent;
    }

    .trds-button.outline:hover,
    .trds-button.outline:focus{
        box-shadow: none;
        background-color: var(--base-bg-color);
    }

    .trds-button trds-icon{
        flex-shrink: 0;
    }

`);

const renderButton = button => {

    button.innerHTML = `

        ${button.hasAttribute('icon') ?
            `<trds-icon icon="${button.getAttribute('icon')}"></trds-icon>`
            :
            ''
        }

        ${button.hasAttribute('text') ?
            `<span>${button.getAttribute('text')}</span>`
            :
            ''
        }

    `;

}

export class TrdsButton extends HTMLButtonElement{

    constructor(){
        super()

        this.rendered = false;

    }

    render = () => {

        this.classList.add('trds-button');

        renderButton(this);

        const ButtonLoader = this.appendChild(document.createElement('trds-loader'));
        ButtonLoader.addEventListener('enabled', () => this.classList.add('disabled'));
        ButtonLoader.addEventListener('disabled', () => this.classList.remove('disabled'));

        this.rendered = true;

    }

    connectedCallback(){

        if(!this.rendered) this.render();

    }

}

customElements.define('trds-button', TrdsButton, {extends: 'button'});

export class TrdsButtonLink extends TrdsLink{

    constructor(){
        super();

        this.rendered = false;

    }

    render(){

        this.classList.add('trds-button');

        if(this.classList.contains('call')){

            if(!this.hasAttribute('number')) return console.error('Number attribute to call button must be given.');

            this.setAttribute('href', `tel:${this.getAttribute('number')}`);
            this.setAttribute('icon', 'solid/phone');
            this.setAttribute('text', this.getAttribute('number'));

        }

        super.render();

        renderButton(this);

        this.rendered = true;

    }

    connectedCallback(){

        if(!this.rendered) this.render();

    }

}

customElements.define('trds-button--link', TrdsButtonLink, {extends: 'a'});