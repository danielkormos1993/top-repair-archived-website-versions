const FindClosestBgColor = element => {
    let currentElement = element.parentElement;
    while(currentElement !== null) {
        const style = window.getComputedStyle(currentElement);
        const bgColor = style.getPropertyValue('background-color');
        if (bgColor != 'rgba(0, 0, 0, 0)') return bgColor;
        currentElement = currentElement.parentElement;
    }

    return null;

}

const RgbToRgba = (rgb, a) => {

    return rgb.replace(/rgb/i, "rgba").replace(/\)/i,`,${a})`)

}

export { FindClosestBgColor, RgbToRgba }