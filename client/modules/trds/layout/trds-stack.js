// usage: trds-stack
// it will put space beetween elements and stack on each other
// change gap style property if needed

import TrdsElement from "../trds-element.js";

TrdsElement.addStyle(`

    trds-stack{
        display: grid;
        gap: var(--space--m);
        align-content: start;
    }

`);