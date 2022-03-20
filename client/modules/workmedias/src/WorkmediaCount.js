class WorkmediaCount extends HTMLElement{

    constructor(){
        super();
    }

    setCount = number => {

        this.innerHTML = `
            <span style="font-weight: bold; font-style: italic; color: var(--color--secondary-text)">${number} találat</span>
        `;

    }

}

customElements.define('workmedia-count', WorkmediaCount);