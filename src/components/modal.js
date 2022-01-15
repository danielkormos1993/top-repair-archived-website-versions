// usage: trds-modal[showonfirsthit(optional - acts like a popup)]
// slot name title for title
// slot for modal body
// show func and close func

import '../elements/icon.js';

class TrdsModal extends HTMLElement{

    constructor(){
        super();

        this.attachShadow({mode: 'open'}).innerHTML = `
            <style>
                :host{
                    width: 100vw;
                    height: 100vh;
                    padding: var(--space--m) 0;
                    box-sizing: border-box;
                    position: fixed;
                    top: 0;
                    left: 0;
                    display: flex;
                    opacity: 0;
                    visibility: hidden;
                    transform: scale(1.1);
                    transition: visibility 0s linear 0.25s, opacity 0.25s 0s, transform 0.25s;
                    align-items: center;
                    justify-content: center;
                    z-index: 1000;
                }
                :host([show]){
                    opacity: 1;
                    visibility: visible;
                    transform: scale(1.0);
                    transition: visibility 0s linear 0s, opacity 0.25s 0s, transform 0.25s;
                }
                trds-modal__overlay{
                    display: block;
                    width: 100%;
                    height: 100%;
                    position: absolute;
                    top: 0;
                    left: 0;
                    background-color: var(--color--secondary-bg);
                    background-blend-mode: overlay;
                    z-index: 1000;
                }
                trds-modal__container{
                    display: block;
                    width: 90%;
                    max-width: var(--element--max-width);
                    max-height: 100%;
                    overflow: auto;
                    position: relative;
                    z-index: 1001;
                }
                trds-modal__header{
                    display: flex;
                    align-items: center;
                    padding: var(--space--m);
                    box-sizing: border-box;
                    background-color: var(--color--primary);
                    justify-content: space-between;
                }
                trds-modal__body{
                    display: block;
                    padding: var(--space--l);
                    box-sizing: border-box;
                    background-color: var(--color--secondary-bg);
                    overflow: auto;
                    max-height: 90vh;
                }
                trds-modal__header trds-icon{
                    cursor: pointer;
                    flex-shrink: 0;
                }
                ::slotted([slot=title]){
                    text-transform: uppercase;
                    margin-right: var(--space--m);
                    letter-spacing: 2px;
                    font-weight: bold;
                    font-size: var(--size--s);
                }
            </style>
            <trds-modal__overlay></trds-modal__overlay>
            <trds-modal__container>
                <trds-modal__header>
                    <slot name="title">Modal title</slot>
                    <trds-icon icon="solid/times" onclick="this.getRootNode().host.close()"></trds-icon>
                </trds-modal__header>
                <trds-modal__body>
                    <slot></slot>
                </trds-modal__body>
            </trds-modal__container>
        `;

    }

    connectedCallback(){

        if(this.hasAttribute('showonfirsthit') && sessionStorage.getItem('popup') != 'true'){
            this.show();
            sessionStorage.setItem('popup', 'true');
        }
        
    }

    show = () => {

        let currentModal = document.querySelector('trds-modal[show]');
        if(currentModal) currentModal.close();
        
        this.setAttribute('show', '');
    }

    close = () => {
        this.removeAttribute('show');
    } 

}

window.customElements.define('trds-modal', TrdsModal);