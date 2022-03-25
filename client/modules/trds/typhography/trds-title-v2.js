// usage: <trds-title level={1-6} ...
// level attribute represents heading level(h1,h2...h6)
// do not use whitespace in between trds-title tags
// add class variant--1 for a variant

import TrdsElementV2 from "../trds-element-v2.js";
import './class-size.js';

const levelToClassMap = {

    1: 'size--xxl',
    2: 'size--xl',
    3: 'size--l',
    4: 'size--m',
    5: 'size--s',
    6: 'size--xs'

}

class TrdsTitleV2 extends TrdsElementV2{

    connectedCallback(){
        super.connectedCallback();

        if(levelToClassMap[this.level]) this.classList.add(levelToClassMap[this.level]);

    }

    template(){

        this.level = this.getAttribute('level') || '1';

        return `
            <h${this.level}>${this.getAttribute('title')}</h${this.level}>
        `;

    }

    styles(){

        return `

            trds-title{
                display: block;
                font-weight: bold;
                max-width: var(--element--max-width);
            }
        
            .trds-title_tag{
                margin: 0;
                font-weight: inherit;
                font-size: inherit;
            }
        
            trds-title[level="4"] .trds-title_tag{
                text-decoration: underline;
            }
        
            trds-title.variant--1 .trds-title_tag{
                text-transform: uppercase;
                letter-spacing: .2rem;
                font-size: var(--size--m);
                line-height: var(--size--m--line-height);
            }

        `;

    }

}

customElements.define('trds-title-v2', TrdsTitleV2);