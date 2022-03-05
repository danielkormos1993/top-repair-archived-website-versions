import './WorkmediaList.js';
import { database } from "./firebase.js";
import { collection, getDocs, query, where, limit } from './firebase-firestore.js';

class WorkmediasShort extends HTMLElement{

    constructor(){
        super();

        this.workmedias = [];

        this.innerHTML = `
            <workmedia-list></workmedia-list>
        `;

        this.WorkmediaList = this.querySelector('workmedia-list');

        (async () => {
            await this.getWorkmedias();
            this.WorkmediaList.renderWorkmedias(this.workmedias);
        })();

    }

    getWorkmedias = async () => {

        let dbQuery;

        if(this.getAttribute('category') === 'all'){
            dbQuery = query(collection(database, 'workmedias'), limit(9));
        } else {
            dbQuery = query(collection(database, 'workmedias'), where("category.value", "==",  this.getAttribute('category')), limit(9));
        }

        const dbQueryResults = await getDocs(dbQuery);
        
        dbQueryResults.forEach(workmedia => {
            this.workmedias.push({...workmedia.data()})
        });

    }

}

customElements.define('workmedias-short', WorkmediasShort);