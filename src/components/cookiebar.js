// usage: trds-cookiebar[cookieName(required), cookieValue(required)]
// use at body > level
// add class .SetCookieButton to the cookie setter button
// put elements inside as youd like

import { setCookie, getCookie } from '../libs/cookies.js';
import '../layout/container.js';

class TrdsCookiebar extends HTMLElement{
    
    constructor(){ 
        super();

        this.attachShadow({mode: 'open'}).innerHTML = `
            <style>

                :host{
                    display: block;
                    box-sizing: border-box;
                    padding: var(--space--xl) 0;
                    position: fixed;
                    width: 100%;
                    bottom: -100%;
                    left: 0;
                    background-color: var(--color--primary);
                    z-index: 100;
                }

                :host([show]){
                    animation: TrdsCookieBarAnimation 1s forwards ease-in-out;
                    animation-delay: 3s;
                }

                @keyframes TrdsCookieBarAnimation{
                    100%{bottom:0}
                }

            </style>
            <trds-container>
                <slot></slot>
            </trds-container>
        `;

    }

    connectedCallback(){

        if(!this.hasAttribute('cookieName') || !this.hasAttribute('cookieValue'))
            return console.error('trds-cookiebar need both attribute: cookieName cookieValue');

        if(getCookie(this.getAttribute('cookieName')) != this.getAttribute('cookieValue'))
            this.setAttribute('show', '');
        else return this.remove();

        this.querySelector('[SetCookieButton]').addEventListener('click', () => {
            setCookie(this.getAttribute('cookieName'), this.getAttribute('cookieValue'));
            this.remove();
        });
   
    }

}

window.customElements.define('trds-cookiebar', TrdsCookiebar);