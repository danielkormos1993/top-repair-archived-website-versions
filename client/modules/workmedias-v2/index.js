import './list.js';
import { database } from "./database.js";
import { collection, getDocs, query, orderBy, limit, startAfter } from './firebase/firebase-firestore.js';

class WorkmediasModule extends HTMLElement{

    constructor(){
        super();

        this.perPage = 9;
        this.currentPage = 1;

        this.workmedias = [];

        this.innerHTML = `
            <trds-stack>
                <workmedias-list></workmedias-list>
                <button is="trds-button" text="Következő ${this.perPage} munka" icon="solid/arrow-right" class="icon-on-right" id="workmedia-list_more-button"></button>
            </trds-stack>
        `;

        this.WorkmediasList = this.querySelector('workmedias-list');
        this.MoreButton = this.querySelector('#workmedia-list_more-button');

        this.MoreButton.addEventListener('click', () => {

            this.showMore();

        });
 
        this.getWorkmedias(this.currentPage);

    }

    getWorkmedias = async (currentPage) => {

        const dbQuery = query(collection(database, 'workmedias'), orderBy("createdAt", "desc"), startAfter((currentPage-1)*this.perPage), limit(this.perPage));
        const dbQueryResults = await getDocs(dbQuery);
        
        dbQueryResults.forEach(workmedia => {
            this.workmedias.push({...workmedia.data()})
        });

        console.log(dbQueryResults);

        this.WorkmediasList.render(this.workmedias);

    }

    showMore = () => {

        this.currentPage = this.currentPage + 1;
        this.getWorkmedias(this.currentPage);

    }

}

customElements.define('workmedias-module', WorkmediasModule);