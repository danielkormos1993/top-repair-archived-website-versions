class WorkmediaCategoryFilter extends HTMLElement{

    constructor(){
        super();

        this.category = 'all';

        this.innerHTML = `
            <trds-drawer class="opened">
                <trds-drawer_toggler>
                    <label for="category-select">Kategória</label>
                </trds-drawer_toggler>
                <trds-drawer_drawer>
                <select id="category-select">
                    <option value="all">Mind</option>
                    <option value="dent">Horpadás</option>
                    <option value="hail">Jégkár</option>
                </select>
                </trds-drawer_drawer>
            </trds-drawer>
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