// container element for layout
// modify --container--max-width and/or --container--padding-x as desired
// parent element will have the y-axis padding, container has the x-axis

import TrdsElement from "../trds-element.js";

TrdsElement.addStyle(`

    container{
        display: block;
        width: 100%;
        max-width: var(--container--max-width, 1700px);
        padding: 0 var(--container--padding-x, 5%);
        box-sizing: border-box;
        margin-left: auto;
        margin-right: auto;
    }

`);