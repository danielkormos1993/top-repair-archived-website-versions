import { database } from "./firebase.js";
import { collection, getDocs } from './firebase-firestore.js';

export default class WorkmediaTagsFilter extends HTMLElement{

    constructor(){
        super();

        this.tags = [];
        this.selectedTags = 'all';

        getDocs(collection(database, 'workmedias-tags')).then(results => {

            results.forEach(doc => {

                this.tags.push(doc.data().tag);

            });

            this.innerHTML = `
                <trds-stack style="gap: var(--space--s)">
                    <label>Tagek</label>
                    <trds-grid 
                        class="auto-width-layout"
                        style="max-width: var(--element--max-width)"
                    >
                        <trds-tag 
                            id="show-all-tags"
                            style="cursor: pointer"
                        >Összes</trds-tag>
                        ${this.tags.map(tag => {
                            return `<trds-tag class="outline" style="cursor: pointer">${tag}</trds-tag>`
                        }).join('')}
                    </trds-grid>
                </trds-stack>
            `;

            this.querySelectorAll('trds-tag').forEach(Tag => {

                if(Tag.id === 'show-all-tags'){
                    Tag.addEventListener('click', e => this.showAllTags());
                } else {
                    Tag.addEventListener('click', e => this.handleTagClick(e));
                }

            });

        });

    }

    showAllTags = () => {

        this.selectedTags = 'all';
        this.dispatchEvent(new CustomEvent('selectedTagsUpdated',{
            detail: {selectedTags: this.selectedTags}
        }));

        this.querySelectorAll('trds-tag').forEach(Tag => {

            if(Tag.id === 'show-all-tags') Tag.classList.remove('outline');
            else Tag.classList.add('outline');
    
        });

    }

    handleTagClick = e => {

        if(this.selectedTags.includes(e.target.textContent)){

            this.selectedTags = this.selectedTags.filter(tag => tag !== e.target.textContent);
            this.dispatchEvent(new CustomEvent('selectedTagsUpdated',{
                detail: {selectedTags: this.selectedTags}
            }));

            e.target.classList.add('outline');

        } else {

            if(this.selectedTags === 'all'){

                this.selectedTags = [e.target.textContent];
                this.dispatchEvent(new CustomEvent('selectedTagsUpdated',{
                    detail: {selectedTags: this.selectedTags}
                }));
                this.querySelector('#show-all-tags').classList.add('outline');

            } else {

                this.selectedTags = [...this.selectedTags, e.target.textContent];
                this.dispatchEvent(new CustomEvent('selectedTagsUpdated',{
                    detail: {selectedTags: this.selectedTags}
                }));

            }

            e.target.classList.remove('outline');

        }

    }

}

customElements.define('workmedia-tags-filter', WorkmediaTagsFilter);