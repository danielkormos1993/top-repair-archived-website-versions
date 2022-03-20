import '../elements/trds-icon.js';
import TrdsElement from '../trds-element.js';

TrdsElement.addStyle(`

    trds-toasts-container{
        display: grid;
        width: 90%;
        max-width: var(--element--max-width);
        gap: var(--space--m);
        position: fixed;
        z-index: 100;
        bottom: var(--space--m);
        left: 5%;
    }

    trds-toast{
        display: flex;
        align-items: center;
        width: 100%;
        box-sizing: border-box;
        max-width: var(--element--max-width);
        padding: var(--space--m);
        background-color: var(--color--secondary-bg);
        animation: TrdsToastAnimation .5s;
        gap: var(--space--m);
    }

    @keyframes TrdsToastAnimation{
        from { transform: translateY(100vh) }
        to { transform: translateY(0) }
    }

    trds-toast.danger{
        background-color: var(--color--primary);
    }

    trds-toast.success{
        background-color: var(--color--success);
    }

    trds-toast_content{
        display: block;
        flex: 1;
    }

    trds-toast_close-icon-container{
        display: block;
    }

`);

const TrdsToastTemplate = document.createElement('template');
TrdsToastTemplate.innerHTML = `
    <trds-toast_content>
    </trds-toast_content>
    <trds-toast_close-icon-container>
        <trds-icon icon="solid/times" onclick="this.closest('trds-toast').remove()"></trds-icon>
    </trds-toast_close-icon-container>
`;

class TrdsToast extends TrdsElement{

    constructor(){ 
        super()

        this.template = TrdsToastTemplate.content.cloneNode(true);

    }

    connectedCallback(){

        super.connectedCallback();

        setTimeout(() => {
            this.remove();
        }, 10000);

    }

    render(){

        this.template.querySelector('trds-toast_content').append(...this.childNodes);

        this.append(this.template);

    }

    show = (options) => {

        if(options && options.hasOwnProperty('after'))
            options.after.parentNode.insertBefore(this, options.after.nextSibling);
        else if(options && options.hasOwnProperty('before'))
            options.before.parentNode.insertBefore(this, options.before);
        else{
            
            if(document.body.querySelectorAll('trds-toasts-container trds-toast').length === 0)
                document.body.appendChild(document.createElement('trds-toasts-container'));
            
            document.body.querySelector('trds-toasts-container').appendChild(this);

        } 

    }

}

customElements.define('trds-toast', TrdsToast);