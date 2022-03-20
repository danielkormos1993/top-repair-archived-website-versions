import '../layout/container.js';
import TrdsElement from '../trds-element.js';

TrdsElement.addStyle(`

    trds-footer{
        display: block;
        background-color: var(--color--secondary-bg);
        padding: var(--space--xl) 0;
        box-sizing: border-box;
    }

`);

class TrdsFooter extends TrdsElement{

    constructor(){
        super()

        this.template = document.createElement('template');
        this.template.innerHTML = `
            <container>
            </container>
        `;

    }

    render(){

        this.template.content.querySelector('container').append(...this.children);

        this.appendChild(this.template.content);

    }

}

customElements.define('trds-footer', TrdsFooter);