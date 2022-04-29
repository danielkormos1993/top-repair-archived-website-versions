// usage: <trds-title level={1-6} ...
// level attribute represents heading level(h1,h2...h6)
// add class variant--1 for a variant

import TrdsElementV2 from "../trds-element-v2.js";
import './class-size.js';

class TrdsTitleV2 extends TrdsElementV2{

    template(){

        if(!this.hasAttribute('level')) this.setAttribute('level', 1);

        this.level = this.getAttribute('level');

        return `
            <h${this.level} class="trds-title_tag">${this.innerHTML}</h${this.level}>
        `;

    }

    styles(){

        return `

            trds-title-v2{
                display: block;
                max-width: var(--element--max-width);
            }

            trds-title-v2[level="1"]{
                font-size: var(--size--xxl);
                line-height: var(--size--xxl--line-height);
            }
        
            trds-title-v2[level="2"]{
                font-size: var(--size--xl);
                line-height: var(--size--xl--line-height);
            }
        
            trds-title-v2[level="3"]{
                font-size: var(--size--l);
                line-height: var(--size--l--line-height);
            }
        
            trds-title-v2[level="4"]{
                font-size: var(--size--m);
                line-height: var(--size--m--line-height);
                text-decoration: underline;
            }
        
            trds-title-v2[level="5"]{
                font-size: var(--size--s);
                line-height: var(--size--s--line-height);
            }
        
            trds-title-v2[level="6"]{
                font-size: var(--size--xs);
                line-height: var(--size--xs--line-height);
            }

            trds-title-v2.variant--1{
                text-transform: uppercase;
                letter-spacing: .2rem;
                font-size: var(--size--m);
                line-height: var(--size--m--line-height);
                color: var(--color--secondary-text);
            }

            .trds-title_tag{
                margin: 0;
                font-weight: bold;
                font-size: inherit;
                line-height: inherit;
            }

        `;

    }

}

customElements.define('trds-title-v2', TrdsTitleV2);