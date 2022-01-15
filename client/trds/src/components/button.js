import '../libs/wc-polyfill.js'
import '../elements/icon.js';
import '../elements/loader.js';
import '../elements/link.js';

let TrdsButtonStyle = document.createElement('style');
TrdsButtonStyle.textContent = `

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

    .trds-button[disabled]{
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

`;
document.head.appendChild(TrdsButtonStyle);

const renderButton = button => {

    if(button.hasAttribute('icon')){

        let Icon = button.querySelector('trds-icon');

        if(!Icon){

            Icon = document.createElement('trds-icon');
            Icon.setAttribute('icon', button.getAttribute('icon'));
            button.appendChild(Icon)

        } 

    }

    if(button.hasAttribute('text')){

        let Text = button.querySelector('span');

        if(!Text){

            Text = document.createElement('span');
            Text.textContent = button.getAttribute('text');
            button.appendChild(Text);

        }
        
    }

}

class TrdsButton extends HTMLButtonElement{

    constructor(){
        super();

        this.classList.add('trds-button');

        let ButtonLoader = this.appendChild(document.createElement('trds-loader'));
        ButtonLoader.addEventListener('enabled', () => { this.setAttribute('disabled', '') });
        ButtonLoader.addEventListener('disabled', () => { this.removeAttribute('disabled') });

    }

    connectedCallback(){

        renderButton(this);

    }

}

window.customElements.define('trds-button', TrdsButton, {extends: 'button'});

class TrdsButtonLink extends TrdsLink{

    constructor(){
        super();

        this.classList.add('trds-button');
    }

    connectedCallback(){

        if(this.classList.contains('call')){

            if(!this.hasAttribute('number')) return console.error('Number attribute to call button must be given.');

            this.setAttribute('href', `tel:${this.getAttribute('number')}`);
            this.setAttribute('icon', 'solid/phone');
            this.setAttribute('text', this.getAttribute('number'));

        }

        super.connectedCallback();

        renderButton(this);

    }

}

window.customElements.define('trds-button--link', TrdsButtonLink, {extends: 'a'});