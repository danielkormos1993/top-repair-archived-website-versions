import FindClosestBgColor from "../libs/FindClosestBgColor.js";
import RgbToRgba from "../libs/RgbToRgba.js";

class TrdsCarousel extends HTMLElement{

    constructor(){
        super();

        this.attachShadow({mode: 'open'}).innerHTML = `
            <style>

                :host{
                    display: block;
                    position: relative;
                    overflow: hidden;
                }

                .blur{
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

                right-blur.blur{
                    left: auto;
                    right: 0;
                    background: linear-gradient(to left, var(--blur-color), 50%, var(--blur-color-0));
                    background: -webkit-linear-gradient(right, var(--blur-color), var(--blur-color-0));
                }

                .blur.active{
                    opacity: 1;
                }

                ::slotted(*){
                    overflow: auto;
                    -ms-overflow-style: none;  /* IE and Edge */
                    scrollbar-width: none;  /* Firefox */
                    white-space: nowrap;
                }

            </style>
            <left-blur class="blur"></left-blur>
            <right-blur class="blur"></right-blur>
            <slot name="container"></slot>
        `;

        const LeftBlur = this.shadowRoot.querySelector('left-blur');
        const RightBlur = this.shadowRoot.querySelector('right-blur');
        const Slot = this.shadowRoot.querySelector('slot');

        // dragger

        let Slotted = new Promise(resolve => {

            Slot.addEventListener('slotchange', () => {
                resolve(Slot.assignedNodes()[0]);
            });

        });

        Slotted.then(Slot => {

            let TrdsCarouselHideScrollbarStyle = document.createElement('style');
            TrdsCarouselHideScrollbarStyle.textContent = `
                trds-carousel [slot=container]::-webkit-scrollbar {
                    display: none;
                }
            `;
            this.appendChild(TrdsCarouselHideScrollbarStyle);

            const setupBlurs = () => {

                if(Slot.scrollLeft > 0) LeftBlur.classList.add('active');
                else LeftBlur.classList.remove('active');
    
                if(Slot.scrollLeft >= (Slot.scrollWidth - Slot.clientWidth)){
                    RightBlur.classList.remove('active');
                } else RightBlur.classList.add('active');
    
            }

            setupBlurs();

            let isMousePressedDown = false;
            let MousePosWhenPressedDown;
            let Pos;

            const onDown = e => {

                e.preventDefault();

                isMousePressedDown = true;

                if(typeof e.pageX !== 'undefined') MousePosWhenPressedDown = e.pageX;
                else MousePosWhenPressedDown = e.touches[0].pageX;

                Pos = Slot.scrollLeft;

            }

            const onMove = e => {

                if(!isMousePressedDown) return;

                let x;

                if(typeof e.pageX !== 'undefined') x = e.pageX;
                else x = e.touches[0].pageX;

                setupBlurs();
                Slot.scrollLeft = Pos - x + MousePosWhenPressedDown;

            }

            const onUp = () => {
                isMousePressedDown = false;
            }

            Slot.addEventListener('mousedown', e => {onDown(e)});
    
            document.addEventListener('mousemove', e => {onMove(e)});
            document.addEventListener('touchmove', setupBlurs);

            document.addEventListener('mouseup', onUp);

        });

    }

    connectedCallback(){

        this.style.setProperty('--blur-color', FindClosestBgColor(this));
        this.style.setProperty('--blur-color-0', RgbToRgba(this.style.getPropertyValue('--blur-color'), 0));

    }

}

window.customElements.define('trds-carousel', TrdsCarousel);