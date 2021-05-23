// function for init category and render it after init
const initCategory = (select, category = 'all') => {

    select.currentData = [];
    select.currentCategory = category;
    select.currentPage = 1;
    select.perPage = 9;
    select.categoryTarget = document.getElemenById(select.getAttribute('category-target') || console.error('category target missing'));
    select.categoryDataUrl = select.getAttribute('category-data-url') || console.error('category data url missing');

    select.moreButton = document.createElement('trb-button');
    select.moreButton.setAttribute('text', 'Mutass többet');
    select.moreButton.addEventListener('click', () => {loadMore(select)});

    [...select.options].forEach((option, index) => {
        if(option.value === category){
            select.selectedIndex = index;
            renderCategory(select);
            return;
        }
    });

    select.addEventListener('change', () => {renderCategory(select)});

};

const renderMoreButton = select => {

    let entryCountQuery = `?${category != 'all' ? `category=${select.currentCategory}` : ''}&countonly`;
    fetch(`${select.categoryDataUrl}/${entryCountQuery}`).then( response => response.json()).then(data => {
        if(data.count > select.perPage && (data.count / select.perPage != select.currentPage)) select.categoryTarget.appendChild(select.moreButton);
        else select.categoryTarget.removeChild(select.moreButton);
    });

}

const loadMore = select => {

    select.currentPage++;
    renderCategory(select);

}

const getData = select => {

    return new Promise(resolve => {

        // we have currentData, currentCategory, currentPage, perPage, viewTemplate, categoryTarget, categoryDataUrl
        // construct query
        let query = `?${select.currentCategory != 'all' ? `category=${select.currentCategory}` : ''}&currentPage=${select.currentPage}&perPage=${select.perPage}`;
        // get data
        fetch(`${select.categoryDataUrl}/${query}`).then( response => response.json()).then(data => {
            resolve(data);
        });

    });

}

// function for render a category
const renderCategory = async select => {

    if(select.currentCategory != select.value) resetCategory(select);
     
    select.currentData += await getData(select);

    select.currentData.forEach((entry, index) => {

        let $itemMarkup = select.viewTemplate.replace(/{{(.+?)}}/g, (_,replaced) => entry[replaced]);
        let $item = document.createRange().createContextualFragment($itemMarkup);

        select.categoryTarget.appendChild($item);

    });

}

const resetCategory = select => {
    select.currentPage = 1;
    select.currentData = [];
    select.categoryTarget.innerHTML = '';
}