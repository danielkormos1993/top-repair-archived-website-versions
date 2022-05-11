class WorkmediasList extends HTMLElement{

    constructor(){
        super();

        this.workmedias = [];

        this.innerHTML = `
            <trds-grid class="boxes-layout"></trds-grid>
        `;

        this.TargetNode = this.querySelector('trds-grid');

    }

    render(newWorkmedias){

        newWorkmedias.forEach(newWorkmedia => {
            
            if(!this.workmedias.find(workmedia => workmedia.data === newWorkmedia)){

                const Workmedia = document.createElement('trds-workmedia');
                Workmedia.setAttribute('before-media-type', newWorkmedia.beforeMediaType);
                Workmedia.setAttribute('before-media-src', newWorkmedia.beforeMediaUrl);
                Workmedia.setAttribute('after-media-type', newWorkmedia.afterMediaType);
                Workmedia.setAttribute('after-media-src', newWorkmedia.afterMediaUrl);
                Workmedia.setAttribute('category', newWorkmedia.category.label);
                Workmedia.setAttribute('tags', newWorkmedia.tags);

                this.TargetNode.appendChild(Workmedia);
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

customElements.define('workmedias-list', WorkmediasList);