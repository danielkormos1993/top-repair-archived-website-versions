class WorkmediaCategoryFilter extends HTMLElement{

    constructor(){
        super();

        this.category = 'all';

        this.innerHTML = `
            <trds-stack style="gap: var(--space--s)">
                <label for="category-select">Kategória</label>
                <select
                    id="category-select"
                >
                    <option value="all">Mind</option>
                    <option value="dent">Horpadás</option>
                    <option value="hail">Jégkár</option>
                </select>
            </trds-stack>
        `;

        this.querySelector('#category-select').addEventListener('change', e => {

            this.category = e.target.value;
            this.dispatchEvent(new CustomEvent('categoryUpdated', {
                detail: {category: this.category}
            }));

        });

    }

}

customElements.define('workmedia-category-filter', WorkmediaCategoryFilter);