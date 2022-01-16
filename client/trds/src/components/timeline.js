// usage: trds-timeline
// add trds-timeline__step element for a step which MUST HAVE A NUMBER attribute which displayed as count in timeline
// it automatically set timeline to row oriented if all elements can fit 

import '../elements/icon.js';

let TrdsTimelineStyle = document.createElement('style');
TrdsTimelineStyle.textContent = `

    trds-timeline__step{
        display: block;
        position: relative;
    }

    trds-timeline__step:last-child{
        padding-bottom: 2.85rem;
    }

    trds-timeline.row-oriented trds-timeline__step:last-child{
        padding-bottom: 0;
    }

    trds-timeline__step:before{
        content: attr(number);
        width: 2rem;
        height: 2rem;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: var(--color--primary);
        border-radius: 50%;
        position: absolute;
        left: -3.05rem;
        top: -.28rem;
        font-size: var(--size--m);
        font-weight: bold;
    }

    trds-timeline__step[digit-number="3"]:before{
        font-size: var(--size--s);
    }

    trds-timeline__step[digit-number="4"]:before{
        font-size: var(--size--xs);
    }

    trds-timeline.row-oriented trds-timeline__step:before{
        top: -4.1rem;
        left: auto;
    }

`;
document.head.appendChild(TrdsTimelineStyle);

class TrdsTimeline extends HTMLElement{
    
    constructor(){ 
        super();

        this.attachShadow({mode: 'open'}).innerHTML = `
            <style>

                :host{
                    display: grid;
                    border-left: 3px solid var(--color--primary);
                    gap: var(--space--xl);
                    padding-left: 2rem;
                    margin-left: 1rem;
                    box-sizing: border-box;
                    position: relative;
                }

                :host(.row-oriented){
                    grid-template-columns: repeat(auto-fit, minmax(1px, 1fr));
                    border-left: none;
                    border-top: 3px solid var(--color--primary);
                    padding-left: 0;
                    margin-left: 0;
                    padding-top: 3rem;
                }
                
                trds-timeline__finish-flag{
                    content: attr(number);
                    width: 2rem;
                    height: 2rem;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background-color: var(--color--primary);
                    border-radius: 50%;
                    position: absolute;
                    left: -1.05rem;
                    bottom: 0;
                    font-size: var(--size--m);
                    font-weight: bold;
                    animation: TrdsIconRotater 1s infinite;
                }
   
                :host(.row-oriented) trds-timeline__finish-flag{
                    top: -1.1rem;
                    left: auto;
                    right: 0;
                    bottom: auto;
                }

                @keyframes TrdsIconRotater{
                    0%{
                        transform:rotate(30deg);
                    }
                    50%{
                        transform:rotate(-30deg);
                    }
                    100%{
                        transform:rotate(30deg);
                    }
                }
            </style>
            <slot></slot>
            <trds-timeline__finish-flag>
                <trds-icon icon="solid/flag-checkered"></trds-icon>
            </trds-timeline__finish-flag>
        `;

    }

    connectedCallback(){

        let resizeTimer;
        let timelineSteps = this.querySelectorAll('trds-timeline__step');

        timelineSteps.forEach(elem => {
            if(!elem.hasAttribute('number')) return console.error("Number attribute must be added to trds-timeline__step component.");
            if(elem.getAttribute('number').length > 4) return console.error("Number attribute should not exceed 4 digits.");
            elem.setAttribute( 'digit-number', elem.getAttribute('number').length);
        });

        const setTimeline = () => {
            (this.parentElement.getBoundingClientRect().width / 400) >= timelineSteps.length ? this.classList.add('row-oriented') : this.classList.remove('row-oriented');
        };

        setTimeline();

        window.addEventListener('resize', () => {

            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => setTimeline(), 250);

        });

    }

}

window.customElements.define('trds-timeline', TrdsTimeline);