// usage: trds-work[format=video or image(required)]
// if image declare src attribute like src="before.jpg after.jpg"
// if video declare src and poster will be src.jpg

import '../elements/video.js';
import './showcase.js';

class TrdsWork extends HTMLElement{

    constructor(){
        super();
    }

    connectedCallback(){

        if(!this.hasAttribute('format')) return console.error('format on trds-work needs to be defined');

        const format = this.getAttribute('format');

        if(format === 'video')

            this.innerHTML = `
                <video is="trds-video" lazy-src="${this.getAttribute('src')}" lazy-poster="${this.getAttribute('src')}.jpg" controls></video>
            `;

        else if(format === 'image'){

            this.innerHTML = `
                <trds-showcase before-image-url="${this.getAttribute('src').split(' ')[0]}" after-image-url="${this.getAttribute('src').split(' ')[1]}"></trds-showcase>
            `;

        }

    }

}

window.customElements.define('trds-work', TrdsWork);