console.log("Tasks2");

const url = new URL('http://127.0.0.1:5500/2/index.html/filter?size=M&color=1&color=2&manufacturer=aaa&manufacturer=ddd');

const setUrlParam = (param, value) => url.searchParams.set(param, value);

const changeUrlParam = (param, value, isSelected) => {

    if (isSelected) {
        url.searchParams.append(param, value);

    } else {
        const allParams = url.searchParams.getAll(param);
        url.searchParams.delete(param);

        allParams.forEach(currentParam => {
            if (currentParam !== value) {
                url.searchParams.append(param, currentParam)
            }
        });
    }
}

const changeUrlParamManufacturer = (param, values) => {

    url.searchParams.delete(param);

    values.forEach(currentValue => url.searchParams
        .append(param, currentValue));
}


const logUrl = () => {
    url.searchParams.sort();
    console.log("the URL has been changed: ", url.search)
}

//all parametrs
let getUrlwidthParams = url.search;
console.log("base param URL from task: ", getUrlwidthParams)

const setSelected = (element) => { element.checked = true }
const setOption = (element) => { element.selected = true }

// Get parametrs from filter
const size = url.searchParams.get('size');
const colors = url.searchParams.getAll('color');
const manufacturers = url.searchParams.getAll('manufacturer');


//set values from filter on the site
const radioInput = document.querySelector(`.size-block input[value="${size}"]`)
setSelected(radioInput);

colors.forEach((color) => {

    const colorCheckBox = document.querySelector(`.colors-block input[value="${color}"]`);
    setSelected(colorCheckBox);
})


manufacturers.forEach((manufacturer) => {

    const manufacturerOption = document.querySelector(`.manufacturers-select option[value="${manufacturer}"]`);
    setOption(manufacturerOption);
});



const handleSizeChange = (event) => {
    setUrlParam('size', event.target.value);
}
const handleColorChange = (event) => {
    changeUrlParam('color', event.target.value, event.target.checked)
}

const handleManufacturerChange = (event) => {
    console.log(event.currentTarget.value)


    const selectedManufacturers = [...event.target.options].filter(({ selected }) => selected).map(({ value }) => value)

    changeUrlParamManufacturer('manufacturer', selectedManufacturers)
}


const handleInputChange = (selector, urlModification) => {

    const elementList = document.querySelectorAll(selector)

    elementList.forEach(item => {
        item.addEventListener('change', event => {
            urlModification(event);
            logUrl();
        })
    })
}

const ready = () => {

    handleInputChange(".size-block input[type=radio]", handleSizeChange);

    handleInputChange(".colors-block input[type=checkbox]", handleColorChange);

    handleInputChange(".manufacturers-select", handleManufacturerChange);
}

document.addEventListener("DOMContentLoaded", ready);













