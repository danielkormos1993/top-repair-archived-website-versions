// usage: trds-workmedia [ALL REQUIRED, before-media-type(image or video), before-media-src, after-media-type(image or video), after-media-src, category(string), tags(stringy array lol)]

import TrdsElement from "../trds-element.js";
import '../elements/trds-image.js';
import '../elements/trds-video.js';
import '../layout/trds-stack.js';
import '../layout/trds-grid.js';
import '../components/trds-button.js';
import '../typhography/trds-text.js';
import '../typhography/trds-title.js';
import '../elements/trds-tag.js';

TrdsElement.addStyle(`

    trds-workmedia{
        display: block;
        background-color: var(--color--secondary-bg);
        max-width: var(--element--max-width);
        position: relative;
    }

    trds-workmedia_media{
        display: block;
        overflow: hidden;
        position: relative;
        background-color: black;
        padding-bottom: 56.25%;
    }

    trds-workmedia_media_before,
    trds-workmedia_media_after{
        display: block;
        transition: opacity .5s;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 1;
    }

    trds-workmedia_media_after{
        z-index: 0;
        opacity: 0;
    }

    trds-workmedia_media video{
        height: 100% !important;
        width: 100%;
    }

    trds-workmedia.after-media-active trds-workmedia_media_after{
        opacity: 1;
        z-index: 2;
    }

    trds-workmedia.after-media-active trds-workmedia_media_before{
        opacity: 0;
    }

`);

const TrdsWorkmediaTemplate = document.createElement('template');
TrdsWorkmediaTemplate.innerHTML = `

    <trds-workmedia_media>
        <trds-workmedia_media_before>
        </trds-workmedia_media_before>
        <trds-workmedia_media_after>
        </trds-workmedia_media_after>
    </trds-workmedia_media>

    <trds-stack style="gap: var(--space--l); padding: var(--space--l)">
        <trds-grid class="auto-width-layout" style="gap: var(--space--s)">
            <button 
                is="trds-button"
                text="Előtte"
                onclick="this.closest('trds-workmedia').toggleBefore()"
            ></button>
            <button 
                is="trds-button"
                class="outline"
                text="Utána"
                onclick="this.closest('trds-workmedia').toggleAfter()"
            ></button>
        </trds-grid>
        <trds-stack>
            <trds-stack style="gap:var(--space--xs)">
                <trds-title level="2" class="variant--1">Kategória</trds-title>
                <span class="size--xl category" style="font-weight: bold"></span>
            </trds-stack>
            <trds-stack style="gap:var(--space--xs)">
                <trds-title level="2" class="variant--1">Tagek</trds-title>
                <trds-grid class="auto-width-layout tags-grid"></trds-grid>
            </trds-stack>
        </trds-stack>
    </trds-stack>

`;

class TrdsWorkmedia extends TrdsElement{

    constructor(){
        super()

        this.template = TrdsWorkmediaTemplate.content.cloneNode(true);
        this.BeforeToggler = this.template.querySelector('button[text="Előtte"]');
        this.AfterToggler = this.template.querySelector('button[text="Utána"]');

    }

    render(){

        this.beforeMediaType = this.getAttribute('before-media-type');
        this.afterMediaType = this.getAttribute('after-media-type');

        if(this.beforeMediaType === 'image'){

            this.BeforeMedia = document.createElement('trds-image');
            this.BeforeMedia.setAttribute('alt', 'Javítás előtt');
            this.BeforeMedia.setAttribute('lazy', '');
            this.BeforeMedia.setAttribute('src', this.getAttribute('before-media-src'));

        } else {

            this.BeforeMedia = document.createElement('video', {is: 'trds-video'});
            this.BeforeMedia.setAttribute('preload', 'metadata');
            this.BeforeMedia.setAttribute('onplay', 'this.closest("trds-workmedia").onPlay(this)');
            this.BeforeMedia.setAttribute('src', `${this.getAttribute('before-media-src')}#t=1`);
            this.BeforeMedia.setAttribute('controls', '');
            this.BeforeMedia.setAttribute('playsinline', '');
            this.BeforeMedia.setAttribute('muted', '');

        }

        if(this.afterMediaType === 'image'){

            this.AfterMedia = document.createElement('trds-image');
            this.AfterMedia.setAttribute('alt', 'Javítás után');
            this.AfterMedia.setAttribute('lazy', '');
            this.AfterMedia.setAttribute('src', this.getAttribute('after-media-src'));

        } else {

            this.AfterMedia = document.createElement('video', {is: 'trds-video'});
            this.AfterMedia.setAttribute('preload', 'metadata');
            this.AfterMedia.setAttribute('onplay', 'this.closest("trds-workmedia").onPlay(this)');
            this.AfterMedia.setAttribute('src', `${this.getAttribute('after-media-src')}#t=1`);
            this.AfterMedia.setAttribute('controls', '');
            this.AfterMedia.setAttribute('playsinline', '');
            this.AfterMedia.setAttribute('muted', '');

        }

        this.template.querySelector('trds-workmedia_media_before').appendChild(this.BeforeMedia);
        this.template.querySelector('trds-workmedia_media_after').appendChild(this.AfterMedia);

        this.template.querySelector('.category').textContent = this.getAttribute('category');

        const tags = this.getAttribute('tags').split(',');
        tags.forEach(tag => {
            const Tag = document.createElement('trds-tag');
            Tag.textContent = tag;
            Tag.classList.add('outline');
            this.template.querySelector('.tags-grid').appendChild(Tag);
        });

        this.appendChild(this.template);
    
    }

    toggleBefore(){

        this.BeforeToggler.classList.remove('outline');
        this.AfterToggler.classList.add('outline');
        this.classList.remove('after-media-active');

        if(this.beforeMediaType !== 'image'){

            this.BeforeMedia.play();

        }

    }

    toggleAfter(){

        this.AfterToggler.classList.remove('outline');
        this.BeforeToggler.classList.add('outline');
        this.classList.add('after-media-active');

        if(this.afterMediaType !== 'image'){

            this.AfterMedia.play();

        }

    }

    onPlay(video){

        if(TrdsWorkmedia.currentVideo){

            TrdsWorkmedia.currentVideo.pause();
            TrdsWorkmedia.currentVideo.currentTime = 0;

        }

        TrdsWorkmedia.currentVideo = video;

    }

    static currentVideo = null; 

}

customElements.define('trds-workmedia', TrdsWorkmedia);