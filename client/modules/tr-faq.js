class TrFaq extends HTMLElement{

    constructor(){
        super();

        // template

        this.innerHTML = `
            <trds-stack>
                <trds-stack style="gap:var(--space--xs)">
                    <label for="tr-faq_select">Kategória</label>
                    <select id="tr-faq_select">
                        <option value="all">Mind</option>
                        <option value="common">Általános kérdések</option>
                        <option value="pdr">Horpadás javítás</option>
                        <option value="hdr">Jégkár javítás</option>
                    </select>
                </trds-stack>
                <trds-grid id="tr-faq_grid" class="boxes-layout"></trds-grid>
            </trds-stack>
        `;

        this.Select = this.querySelector('#tr-faq_select');
        this.Select.addEventListener('change', (e) => this.setAttribute('category', e.target.value));

        this.Grid = this.querySelector('#tr-faq_grid');

        // data

        this.data = [{
            question:"Bármikor oda lehet vinni a műhelybe az autót megtekintésre?",
            answer:"Nem. Műhelyünk bejelentkezés alapján tart nyitva. Kérjük hívjon minket időpontfoglaláshoz.",
            category:"common"
            },{
            question:"Milyen időintervallumon belül történik a megtekintés, illetve a javítás a bejelentkezéstől számítva?",
            answer:"Árajánlatot akár már aznap adunk, a javítások pedig általában 1-2 héten belül történnek.",
            category:"common"
            },{
            question:"Vákummal javítanak?",
            answer:"Nem. Vákumos javítást nagyon ritkán alkalmazunk, akkor is csak a horpadás megindításához, de a javítást fényezés nélküli technológiánkkal fejezzük be.",
            category:"common"
            },{
            question:"Milyen minőségű lesz a jégkár javítás eredménye?",
            answer:"Gyári. Szakszerű javítással az autó teljesen visszanyeri gyári állapotát.",
            category:"hdr"
            },{
            question:"Mennyi időt vesz igénybe egy jégkár javítás?",
            answer:"Könnyű jégkár esetén 1 napon belül történik a javítás, nehéz jégkár esetében pedig maximum 1-2 héttel lehet számolni.",
            category:"hdr"
            },{
            question:"Az összes jégkárt meg lehet javítani fényezés nélkül?",
            answer:"Nem. Extrém jégkár esetén technológiánk alkalmazása után szükséggessé válhat fényezni, illetve akár cserélni is azokat az elemeket, melyeken akkora lemeznyúlás ment végbe az ütések során, hogy szimplán a fényezés nélküli  technológia által már nem javíthatóak.",
            category:"hdr"
            },{
            question:"Mennyibe fog kerülni a horpadás javítás?",
            answer:"A javítás költsége függ a horpadások számától, elhelyezkedésüktől, méretüktől, mélységüktől, jellegüktől és az autó karosszériaanyagától. Mivel ez egy komplex téma, így hiteles árajánlatot csak élő szemrevételezés után tudunk adni.",
            category:"pdr"
            },{
            question:"Milyen horpadásokat lehet megjavítani a fényezés nélküli technológiával?",
            answer:"Mi azt szoktuk mondani, ameddig a fényezés nem sérült, addig nagy valószínűséggel megtudjuk menteni az elemet, de vannak kivételes esetek, amikor a lemez sérülés közben megnyúlt és szimplán technológiánk segítségével már nem javítható, így hagyományos(lakatolás-fényezés) megoldást kell alkalmazni.",
            category:"pdr"
            },{
            question:"Mennyi ideig tart egy horpadásnak a javítása?",
            answer:"A kisebb horpadásokat akár 15 percen belül, míg a lehetséges legnagyobb javítható horpadást pár órán belüli határidővel javítjuk.",
            category:"pdr"
        }];

        this.data.forEach(faq => {
            faq.element = document.createElement('trds-card');
            faq.element.setAttribute('category', faq.category);
            faq.element.innerHTML = `
                <trds-card_body>
                    <trds-stack>
                        <trds-title level="3">${faq.question}</trds-title>
                        <p style="color:var(--color--secondary-text)" class="size--s">${faq.answer}</p>
                    </trds-stack>
                </trds-card_body>
            `;
        });

    }

    connectedCallback(){
        if(!this.hasAttribute('category')) this.setAttribute('category', 'all');
    }

    static get observedAttributes(){
        return ['category'];
    }

    attributeChangedCallback() {

        const selectedCategory = this.getAttribute('category');

        this.data.forEach(faq => {

            if(faq.category === selectedCategory || selectedCategory === 'all'){
                if(!this.Grid.contains(faq.element)) this.Grid.appendChild(faq.element)
            }
            else 
                faq.element.remove();

        });

    }

}

customElements.define('tr-faq', TrFaq);