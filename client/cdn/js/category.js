// function for init category and render it after init
const initCategory = (select, category = 'all') => {

    [...select.options].forEach((option, index) => {
        if(option.value === category){
            select.selectedIndex = index;
            renderCategory(select);
            return;
        }
    });

    select.addEventListener('change', () => {renderCategory(select)});

};

// function for render a category
const renderCategory = select => {

    // get target
    select.categoryTarget = document.getElementById(select.getAttribute('category-target'));
    // if select value not equal to currentCategory than delete elements which arent in the currentCategory
    if(select.currentCategory && select.currentCategory != select.value) select.categoryTarget.innerHTML = '';
    // set currentCategory
    select.currentCategory = select.value;

    // get data
    fetch(select.getAttribute('category-data-url')).then(response => { return response.json()}).then(data => {

        // if category not equals to all assign proper entries to currentData
        if(select.currentCategory != 'all') {
            data = data.filter(entry => {
                return entry.category === select.currentCategory;
            });
        }

        data.forEach(entry => {

            let $itemMarkup = select.viewTemplate.replace(/{{(.+?)}}/g, (_,replaced) => entry[replaced]);
            let $item = document.createRange().createContextualFragment($itemMarkup);

            select.categoryTarget.appendChild($item);

        });
        
    });
    
};

export { initCategory };