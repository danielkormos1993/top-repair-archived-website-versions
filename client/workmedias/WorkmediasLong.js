import './WorkmediaCategoryFilter.js';
import './WorkmediaTagsFilter.js';
import './WorkmediaCount.js';
import './WorkmediaList.js';
import { database } from "./firebase.js";
import { collection, getDocs, query, orderBy } from './firebase-firestore.js';

class WorkmediasLong extends HTMLElement{

    constructor(){
        super();

        this.workmedias = [];
        this.filterState = {
            tags: 'all',
            category: 'all'
        }

        this.innerHTML = `
            <trds-stack>
                <workmedia-category-filter></workmedia-category-filter>
                <workmedia-tags-filter></workmedia-tags-filter>
                <workmedia-count></workmedia-count>
                <workmedia-list></workmedia-list>
            </trds-stack>
        `;

        this.CategoryFilter = this.querySelector('workmedia-category-filter');
        this.TagsFilter = this.querySelector('workmedia-tags-filter');
        this.Count = this.querySelector('workmedia-count');
        this.WorkmediaList = this.querySelector('workmedia-list');

        (async () => {
            await this.getWorkmedias();
            this.WorkmediaList.renderWorkmedias(this.workmedias);
            this.Count.setCount(this.workmedias.length);
        })();

        this.CategoryFilter.addEventListener('categoryUpdated', e => {
            this.filterState = {...this.filterState, category: e.detail.category};
            this.filterWorkmedias(this.filterState);
        });

        this.TagsFilter.addEventListener('selectedTagsUpdated', e => {
            this.filterState = {...this.filterState, tags: e.detail.selectedTags};
            this.filterWorkmedias(this.filterState);
        });

    }

    filterWorkmedias = filterState => {

        const categoryFilteredWorkmedias = this.workmedias.filter(document => {
            switch(filterState.category) {
                case 'all':
                    return true
                case 'dent':
                case 'hail':
                    return document.category.value === filterState.category
                default:
                    return true
            }
        });

        const tagFilteredWorkmedias = categoryFilteredWorkmedias.filter(document => {

            if(filterState.tags === 'all') return true;
            
            let passIt = true;

            filterState.tags.forEach(tag => {
                if(!document.tags.includes(tag)) passIt = false;
            });

            return passIt;

        });

        this.WorkmediaList.renderWorkmedias(tagFilteredWorkmedias);
        this.Count.setCount(tagFilteredWorkmedias.length);

    }

    getWorkmedias = async () => {

        const dbQuery = query(collection(database, 'workmedias'), orderBy("createdAt", "desc"));
        const dbQueryResults = await getDocs(dbQuery);
        
        dbQueryResults.forEach(workmedia => {
            this.workmedias.push({...workmedia.data()})
        });

    }

}

customElements.define('workmedias-long', WorkmediasLong);