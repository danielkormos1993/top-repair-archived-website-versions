// usage: add trds-loader element to almost any element(except elements with position property)
// enable(), disable() function

import TrdsElement from '../trds-element.js';
import './trds-icon.js';
import { FindClosestBgColor } from '../libs/colorHelpers.js';

TrdsElement.addStyle(`

    trds-loader{
        position: absolute;
        width: 100%;
        height: 100%;
        max-height: 100vh;
        z-index: 10;
        display: flex;
        align-items: center;
        justify-content: center;
        visibility: hidden;
        top: 0;
        left: 0;
    }

    trds-loader.active{
        visibility: visible;
    }

    trds-loader.active trds-icon{
        animation: TrdsSpin 1.5s linear infinite;
        font-size: 1.5em;
    }

    @keyframes TrdsSpin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }

`);

class TrdsLoader extends TrdsElement{

    constructor(){
        super()
    }

    render(){

        this.innerHTML = '<trds-icon icon="solid/spinner"></trds-icon>';

    }

    enable = () => {

        this.parentElement.style.position = 'relative';
        this.style.backgroundColor = FindClosestBgColor(this);
        this.classList.add('active');
        this.dispatchEvent( new Event('enabled'));

    }

    disable = () => {

        this.classList.remove('active');
        this.dispatchEvent( new Event('disabled'));

    }

}

customElements.define('trds-loader', TrdsLoader);