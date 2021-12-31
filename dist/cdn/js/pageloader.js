let pageloaderStyle = document.createElement('style');
pageloaderStyle.id = 'pageloader-style';
pageloaderStyle.textContent = `

    body{
        min-height: 100vh;
        margin: 0;
        background-color: rgb(28, 28, 28);
    }

    body.trbs-loader--active{
        position: fixed;
        overflow: hidden;
        height: 100vh;
        width: 100vw;
        visibility: hidden;
    }

    .trbs-loader--active:before{
        content: '';
        display: block;
        width: 100%;
        height: 100%;
        position: absolute;
        background-color: inherit;
        z-index: 101;
        visibility: visible;
    }

    .trbs-loader--active:after{
        content: '';
        display: block;
        width: 1em;
        height: 1em;
        color: rgb(204, 46, 40);
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
        border: .2em solid transparent;
        border-top: .2em solid currentColor;
        border-radius: 50%;
        animation: TrbsSpin 2s linear infinite;
        z-index: 102;
        visibility: visible;
    }

    @keyframes TrbsSpin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }

`;

document.head.appendChild(pageloaderStyle);

window.addEventListener('load', () => {
    document.body.classList.remove('trbs-loader--active');
});