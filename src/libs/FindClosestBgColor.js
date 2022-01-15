const FindClosestBgColor = element => {
    let currentElement = element.parentElement || element.getRootNode().host;
    while(currentElement !== null || currentElement !== 'undefined') {
        const style = window.getComputedStyle(currentElement);
        const bgColor = style.getPropertyValue('background-color');
        if (bgColor != 'rgba(0, 0, 0, 0)') return bgColor;
        currentElement = currentElement.parentElement || element.getRootNode().host;
    }

    return null;

}

export default FindClosestBgColor;