//  usage: 
//  <trds-drawer>
//      <trds-drawer_toggler>...</trds-drawer_toggler>
//      <trds-drawer_drawer>...</trds-drawer_drawer>
//  </trds-drawer>

import TrdsElement from "../trds-element.js";
import '../elements/trds-icon.js';

TrdsElement.addStyle(`

    trds-drawer{
        display: block;
    }

    trds-drawer_toggler{
        display: flex;
        width: max-content;
        gap: var(--space--s);
        align-items: center;
        margin-bottom: var(--space--s);
        cursor: pointer;
    }

    trds-drawer_toggler > *{
        flex: 0 1 auto;
    }

    trds-drawer .drawer-toggler-icon{
        transition: transform .5s;
    }

    trds-drawer.opened .drawer-toggler-icon{
        transform: rotate(180deg);
    }

    trds-drawer_drawer{
        display: block;
        height: 0;
        overflow: hidden;
    }

    trds-drawer.opened trds-drawer_drawer{
        height: auto;
    }

`);

class TrdsDrawer extends TrdsElement{

    constructor(){
        super()
    }

    render(){

        this.DrawerTogglerIcon = document.createElement('trds-icon');
        this.DrawerTogglerIcon.setAttribute('icon', 'solid/angle-down');
        this.DrawerTogglerIcon.classList.add('drawer-toggler-icon');

        this.DrawerToggler = this.querySelector('trds-drawer_toggler');

        this.DrawerToggler.appendChild(this.DrawerTogglerIcon);

    }

    connectedCallback(){
        super.connectedCallback();

        this.DrawerToggler.addEventListener('click', () => this.toggleDrawer());

    }

    disconnectedCallback(){
        this.DrawerToggler.removeEventListener('click', () => this.toggleDrawer());
    }

    toggleDrawer(){
        this.classList.contains('opened') ? 
            this.classList.remove('opened') : this.classList.add('opened');
    }

}

customElements.define('trds-drawer', TrdsDrawer);