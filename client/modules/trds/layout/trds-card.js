// usage: trds-card
// add trds-card_media for media element
// add trds-card_body for card body
// add trds-card_footer for card footer (this will pushed to the bottom of the card when there is a grid for example)

import TrdsElement from "../trds-element.js";

TrdsElement.addStyle(`

    trds-card{
        background-color: var(--color--secondary-bg);
        display: flex;
        flex-direction: column;
        max-width: var(--element--max-width);
    }

    trds-card_media{
        display: block;
    }

    trds-card_body{
        display: flex;
        flex-direction: column;
        flex: 1;
        padding: var(--space--l);
    }

    trds-card_footer{
        display: block;
        padding: var(--space--l);
        padding-top: 0;
    }

`);