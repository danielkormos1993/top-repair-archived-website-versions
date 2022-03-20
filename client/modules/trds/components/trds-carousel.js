// usage: trds-carousel
// put content inside

import { FindClosestBgColor, RgbToRgba } from "../libs/colorHelpers.js";
import TrdsElement from "../trds-element.js";

TrdsElement.addStyle(`

    trds-carousel{
        display: block;
        position: relative;
        overflow: hidden;
        max-width: 100%;
    }

    trds-carousel .blur{
        display:block;
        position: absolute;
        pointer-events: none;
        transition: opacity 300ms ease 0s;
        top: 0;
        left: 0;
        background: linear-gradient(to right, var(--blur-color), 50%, var(--blur-color-0));
        background: -webkit-linear-gradient(left, var(--blur-color), var(--blur-color-0));
        width: 25%;
        height: 100%;
        z-index: 1;
        opacity: 0;
    }

    trds-carousel right-blur.blur{
        left: auto;
        right: 0;
        background: linear-gradient(to left, var(--blur-color), 50%, var(--blur-color-0));
        background: -webkit-linear-gradient(right, var(--blur-color), var(--blur-color-0));
    }

    trds-carousel .blur.active{
        opacity: 1;
    }

    trds-carousel .slot{
        overflow: auto;
        -ms-overflow-style: none;  /* IE and Edge */
        scrollbar-width: none;  /* Firefox */
        white-space: nowrap;
    }

    trds-carousel .slot::-webkit-scrollbar {
        display: none;
    }

`);

const TrdsCarouselTemplate = document.createElement('template');
TrdsCarouselTemplate.innerHTML = `
    <div class="slot"></div>
    <left-blur class="blur"></left-blur>
    <right-blur class="blur"></right-blur>
`;

class TrdsCarousel extends TrdsElement{

    constructor(){
        super()

        this.isMousePressedDown = false;
        this.MousePosWhenPressedDown = null;
        this.Pos = null;

    }

    disconnectedCallback(){

        this.Slot.removeEventListener('mousedown', this.onPressDown);
        document.removeEventListener('mousemove', this.onPressMove);
        document.removeEventListener('touchmove', this.setupBlurs);
        document.removeEventListener('mouseup', this.onPressUp);

    }

    connectedCallback(){

        super.connectedCallback();

        this.style.setProperty('--blur-color', FindClosestBgColor(this));
        this.style.setProperty('--blur-color-0', RgbToRgba(this.style.getPropertyValue('--blur-color'), 0));

        this.setupBlurs();

        this.Slot.addEventListener('mousedown', this.onPressDown);
        document.addEventListener('mousemove', this.onPressMove);
        document.addEventListener('touchmove', this.setupBlurs);
        document.addEventListener('mouseup', this.onPressUp);

    }

    render(){

        this.template = TrdsCarouselTemplate.content.cloneNode(true);

        this.Slot = this.template.querySelector('.slot');
        this.LeftBlur = this.template.querySelector('left-blur');
        this.RightBlur = this.template.querySelector('right-blur');

        this.Slot.append(...this.children);

        this.append(this.template);

    }

    setupBlurs = () => {

        if(this.Slot.scrollLeft > 0) this.LeftBlur.classList.add('active');
        else this.LeftBlur.classList.remove('active');

        if(this.Slot.scrollLeft >= (this.Slot.scrollWidth - this.Slot.clientWidth)){
            this.RightBlur.classList.remove('active');
        } else this.RightBlur.classList.add('active');

    }

    onPressDown = e => {

        e.preventDefault();

        this.isMousePressedDown = true;

        if(typeof e.pageX !== 'undefined') this.MousePosWhenPressedDown = e.pageX;
        else this.MousePosWhenPressedDown = e.touches[0].pageX;

        this.Pos = this.Slot.scrollLeft;

    }

    onPressMove = e => {

        if(!this.isMousePressedDown) return;

        let x;

        if(typeof e.pageX !== 'undefined') x = e.pageX;
        else x = e.touches[0].pageX;

        this.setupBlurs();
        this.Slot.scrollLeft = this.Pos - x + this.MousePosWhenPressedDown;

    }

    onPressUp = () => {
        this.isMousePressedDown = false;
    }

}

customElements.define('trds-carousel', TrdsCarousel);