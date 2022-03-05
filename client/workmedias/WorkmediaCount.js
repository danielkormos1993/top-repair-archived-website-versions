class WorkmediaCount extends HTMLElement{

    constructor(){
        super();
    }

    setCount = number => {

        this.innerHTML = `
            <span>${number} találat</span>
        `;

    }

}

customElements.define('workmedia-count', WorkmediaCount);