export default class TrdsElement extends HTMLElement{

    constructor(){
        super()

        this.rendered = false;

    }

    connectedCallback(){

        if(!this.rendered){
            this.render();
            this.rendered = true;
        }

    }

    render(){

        console.error('TrdsElement does not have render function:');
        console.log(this);

    }

    static addStyle(cssString){

        const StyleTag = document.createElement('style');
        StyleTag.textContent = cssString;
        document.head.appendChild(StyleTag);

    }

}

TrdsElement.addStyle(`

    :root{

        --space--0: 0px;
        --space--xs: 5px;
        --space--s: 10px;
        --space--m: 20px;
        --space--l: 30px;
        --space--xl: 40px;
        --space--xxl: 80px;


        font-size: clamp(16px, 15.065px + 0.259vw, 20px);
        line-height: 1.5;
        -webkit-text-size-adjust: none;

        --size--xs: .75rem;
        --size--xs--line-height: 1.5;
        --size--s: .9rem;
        --size--s--line-height: 1.5;
        --size--m: 1rem;
        --size--m--line-height: 1.5;
        --size--l: 1.2rem;
        --size--l--line-height: 1.42;
        --size--xl: 2rem;
        --size--xl--line-height: 1.3;
        --size--xxl: clamp(2rem, 1.7662rem + 1.0390vw, 3rem);
        --size--xxl--line-height: 1.25;


        --element--base-width: 400px;
        --element--max-width: 800px;

    }

`);

window.addEventListener('load', () => document.body.style.visibility = 'visible');