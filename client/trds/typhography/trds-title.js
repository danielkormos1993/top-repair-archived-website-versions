// usage: <trds-title level={1-6} ...
// level attribute represents heading level(h1,h2...h6)
// do not use whitespace in between trds-title tags
// add class variant--1 for a variant

import TrdsElement from "../trds-element.js";
import './class-size.js';

TrdsElement.addStyle(`

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

`);

const levelToClassMap = {

    1: 'size--xxl',
    2: 'size--xl',
    3: 'size--l',
    4: 'size--m',
    5: 'size--s',
    6: 'size--xs'

}

class TrdsTitle extends TrdsElement{

    constructor(){
        super()
    }

    render(){

        const level = this.getAttribute('level') || '1';
        if(levelToClassMap[level]) this.classList.add(levelToClassMap[level]);

        const Title = document.createElement(`h${level}`);
        Title.classList.add('trds-title_tag');
        Title.append(...this.childNodes);

        this.appendChild(Title);

    }

}

customElements.define('trds-title', TrdsTitle);