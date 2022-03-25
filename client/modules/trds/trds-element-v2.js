export default class TrdsElementV2 extends HTMLElement{

    connectedCallback(){

        if(!document.getElementById(`${this.tagName}-style`)){

            const StyleTag = document.createElement('style');
            StyleTag.id = `${this.tagName}-style`;
            StyleTag.textContent = this.styles();
            document.head.appendChild(StyleTag);


        }

        if(!this.rendered){
            this.render();
            this.rendered = true;
        }

    }

    render(){

        this.innerHTML = this.template();

    }

    template(){

        console.log(`TrdsElement does not have a template function`);
        return ``;

    }

    styles(){

        console.log(`TrdsElement does not have a styles function`);
        return ``;

    }

}