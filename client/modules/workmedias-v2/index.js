import './list.js';
import { database } from "./database.js";
import { collection, getDocs, query, orderBy, limit, startAfter } from './firebase/firebase-firestore.js';

class WorkmediasModule extends HTMLElement{

    constructor(){
        super();

        this.perPage = 9;
        this.dbQuery = query(collection(database, "workmedias"), orderBy("createdAt", "desc"), limit(this.perPage));

        this.innerHTML = `
            <trds-stack>
                <workmedias-list></workmedias-list>
                <button is="trds-button" text="Következő ${this.perPage} munka" icon="solid/arrow-right" class="icon-on-right" id="workmedia-list_more-button"></button>
            </trds-stack>
        `;
        this.WorkmediasList = this.querySelector('workmedias-list');
        this.MoreButton = this.querySelector('#workmedia-list_more-button');

        this.getWorkmedias();

        this.MoreButton.addEventListener('click', () => {

            this.getMoreWorkmedias();

        });
 
    }

    getWorkmedias = async () => {

        const dbQueryResults = await getDocs(this.dbQuery);

        this.lastVisible = dbQueryResults.docs[dbQueryResults.docs.length - 1];
    
        
        dbQueryResults.forEach(workmedia => {
            this.workmedias.push({...workmedia.data()})
        });

        this.WorkmediasList.render(this.workmedias);

    }

    getMoreWorkmedias = async () => {

        if(this.currentPage === 1){

            this.dbQuery = query(this.baseDbQuery, limit(this.perPage));

        } else {

            this.dbQuery = query(this.db, orderBy("createdAt", "desc"), startAfter(this.lastVisible), limit(this.perPage));

        }

    }

}

customElements.define('workmedias-module', WorkmediasModule);