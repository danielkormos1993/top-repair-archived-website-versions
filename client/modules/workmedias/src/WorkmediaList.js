class WorkmediaList extends HTMLElement{

    constructor(){
        super();

        this.workmedias = [];

        this.innerHTML = `
            <trds-grid class="boxes-layout"></trds-grid>
        `;

        this.Grid = this.querySelector('trds-grid');

    }

    renderWorkmedias(newWorkmedias){

        const htmlParser = new DOMParser();

        newWorkmedias.forEach(newWorkmedia => {
            
            if(!this.workmedias.find(workmedia => workmedia.data === newWorkmedia)){
                
                const WorkmediaDoc = htmlParser.parseFromString(`
                    <trds-workmedia
                        before-media-type="${newWorkmedia.beforeMediaType}"
                        before-media-src="${newWorkmedia.beforeMediaUrl}"
                        after-media-type="${newWorkmedia.afterMediaType}"
                        after-media-src="${newWorkmedia.afterMediaUrl}"
                        category="${newWorkmedia.category.label}"
                        tags="${newWorkmedia.tags}"
                    ></trds-workmedia>
                `, 'text/html');

                const Workmedia = WorkmediaDoc.body.firstChild;

                this.Grid.appendChild(Workmedia);
                this.workmedias.push({data: newWorkmedia, element: Workmedia});

            }

        });

        this.workmedias.forEach(workmedia => {

            if(!newWorkmedias.find(newWorkmedia => newWorkmedia === workmedia.data)){

                workmedia.element.remove();
                this.workmedias = this.workmedias.filter(wm => wm.data !== workmedia.data);

            }

        });

    }

}

customElements.define('workmedia-list', WorkmediaList);