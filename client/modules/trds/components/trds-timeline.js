import '../elements/trds-icon.js';
import TrdsElement from '../trds-element.js';

TrdsElement.addStyle(`

    trds-timeline{
        display: grid;
        border-left: 3px solid var(--color--primary);
        gap: var(--space--xl);
        padding-left: 2rem;
        margin-left: 1rem;
        box-sizing: border-box;
        position: relative;
    }

    trds-timeline.row-oriented{
        grid-template-columns: repeat(auto-fit, minmax(1px, 1fr));
        border-left: none;
        border-top: 3px solid var(--color--primary);
        padding-left: 0;
        margin-left: 0;
        padding-top: 3rem;
    }

    trds-timeline_finish-flag{
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

    trds-timeline.row-oriented trds-timeline_finish-flag{
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

    trds-timeline_step{
        display: block;
        position: relative;
    }

    trds-timeline_step:last-of-type{
        padding-bottom: 2.85rem;
    }

    trds-timeline.row-oriented trds-timeline_step:last-of-type{
        padding-bottom: 0;
    }

    trds-timeline_step:before{
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

    trds-timeline_step[digit-number="3"]:before{
        font-size: var(--size--s);
    }

    trds-timeline_step[digit-number="4"]:before{
        font-size: var(--size--xs);
    }

    trds-timeline.row-oriented trds-timeline_step:before{
        top: -4.1rem;
        left: auto;
    }

`);

const TrdsTimelineTemplate = document.createElement('template');
TrdsTimelineTemplate.innerHTML = `
    <trds-timeline_finish-flag>
        <trds-icon icon="solid/flag-checkered"></trds-icon>
    </trds-timeline_finish-flag>
`;

class TrdsTimeline extends TrdsElement{
    
    constructor(){ 
        super()

        this.template = TrdsTimelineTemplate.content.cloneNode(true);

    }

    render(){

        [...this.children].forEach(child => {

            this.template.insertBefore(child, this.template.querySelector('trds-timeline_finish-flag'));

        });

        this.append(this.template);

        this.TimelineSteps =  this.querySelectorAll('trds-timeline_step');

        this.TimelineSteps.forEach(elem => {
            if(!elem.hasAttribute('number'))
                return console.error("Number attribute must be added to trds-timeline_step component.");
            if(elem.getAttribute('number').length > 4)
                return console.error("Number attribute should not exceed 4 digits.");

            elem.setAttribute( 'digit-number', elem.getAttribute('number').length);
        });

        this.setTimeline();

    }

    connectedCallback(){

        super.connectedCallback();

        window.addEventListener('resize', this.setTimeline);

    }

    disconnectedCallback(){

        window.removeEventListener('resize', this.setTimeline);

    }

    setTimeline = () => {

        (this.parentElement.getBoundingClientRect().width / 400) >= this.TimelineSteps.length ? this.classList.add('row-oriented') : this.classList.remove('row-oriented');

    }

}

customElements.define('trds-timeline', TrdsTimeline);