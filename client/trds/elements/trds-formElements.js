import TrdsElement from "../trds-element.js";

TrdsElement.addStyle(`

    input,
    select{
        display: block;
        max-width: var(--element--max-width);
        background-color: var(--color--secondary-bg);
        color: inherit;
        font-size: inherit;
        padding: var(--space--s);
        border: none;
        font-family: inherit;
        margin: 0;
    }

    select{
        font-weight: bold;
        border-bottom: 2px solid var(--color--primary);
    }        

`);