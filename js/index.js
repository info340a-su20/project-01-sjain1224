'use strict';

const state = {
    data: {},
    currentdata: {},
    bizAdded: [],
    filter: false
}

function renderCard(busObj) {
    let newCard = document.createElement('div');
    newCard.classList.add('card');
    newCard.tabIndex = 0;

    let busImg = document.createElement('img');
    busImg.classList.add('bus-pic');
    busImg.src = busObj.pic;
    busImg.alt = busObj.name;
    newCard.appendChild(busImg);

    let busName = document.createElement('p');
    busName.classList.add('bus-name');
    busName.textContent = busObj.name;
    newCard.appendChild(busName);

    let busLoc = document.createElement('p');
    busLoc.classList.add('bus-loc');
    busLoc.textContent = busObj.location;
    newCard.appendChild(busLoc);

    newCard.addEventListener('click', () => {
        renderModalContent(busObj);
    })

    return newCard;
}

function renderSection(sectArray) {

    let newSect = document.createElement('div');
    newSect.classList.add('row');

    for(let each of sectArray){
        let aCard = renderCard(each)
        newSect.appendChild(aCard);
    }

    //searchBusiness(sectArray, newSect)

    return newSect;
}

function renderAll(allObj) {
    let addAllCardObj = document.querySelector('#addCards');

    let display = document.createElement('div');
    display.classList.add('all-cards');

    for(let section of allObj){       
        let sectHeader = document.createElement('h2');
        sectHeader.textContent = section[0].type;
        let setID = section[0].type.replace(/\s+/g, ''); //Cleans up whitespaces in words/ business names. Code from W3schools
        sectHeader.setAttribute("id", setID.toLowerCase());
        display.appendChild(sectHeader);
        
        let aSect = renderSection(section)
        display.appendChild(aSect);
    }

    addAllCardObj.appendChild(display);
}

// function searchBusiness(sectionArray, parent){
//     //console.log(parent);
//     let searchBtn = document.querySelector('#search-btn');
//     searchBtn.addEventListener('click', (event) => {
//         event.preventDefault();
//         let connectDOM = parent;
//         state.filter = true;
//         connectDOM.innerHTML = "";
//         let userSearch = document.querySelector("#search-input");
//         let restName = userSearch.value.toLowerCase();
//         let counter = 0;
//         sectionArray.filter(() => {
//             for(let eachRest of sectionArray) {
//                 let objName = eachRest.name.toLowerCase();
//                 if (objName.includes(restName) == true){
//                     counter = counter + 1;
//                     let aCard = renderCard(eachRest)
//                     parent.appendChild(aCard);
//                 }
//             }
//             if (counter == 0){
//                 let emptyMsg = document.createElement('p');
//                 emptyMsg.textContent = "No " + sectionArray[0].type + " containing '" + restName + "' found.";
//                 parent.appendChild(emptyMsg);
//             }
//         })
//     })

//     let resetBtn = document.querySelector('#reset-btn');
//     resetBtn.addEventListener('click', (event) => {
//         event.preventDefault();
//         state.filter = false;
//         parent.innerHTML = "";
//         for(let each of sectionArray){
//             let aCard = renderCard(each)
//             parent.appendChild(aCard);
//         }
//     })
// }

function goToItems(allObj) {
    let goTo = document.querySelector('#go-to');

    for(let sectionNames of allObj){       
        let sectFilter = document.createElement('li');
        sectFilter.classList.add('filter-list');

        let addLink = document.createElement('a');
        addLink.textContent = sectionNames[0].type;

        let setID = sectionNames[0].type.replace(/\s+/g, '');
        addLink.href = '#' + setID.toLowerCase();

        sectFilter.appendChild(addLink);
        //console.log(sectFilter);

        goTo.appendChild(sectFilter);
    }
}

function renderModalBg(selector, exitDOM) {
    let modalBackground = document.querySelector(selector);
    modalBackground.style.display = "block";

    let exitBtn = document.querySelector(exitDOM)
    exitBtn.addEventListener('click', () => {
        document.querySelector(selector).style.display = "none";
    })
}

function renderModalContent(cardObj) {
    let modalBgSelect = "#cardModal";
    let modelContent = document.querySelector(".content-after-exit");
    modelContent.innerHTML = "";
    renderModalBg(modalBgSelect, ".exit-card");

    let cardTitle = document.createElement('h1');
    cardTitle.classList.add('modal-title');
    cardTitle.textContent= cardObj.name;
    modelContent.appendChild(cardTitle);

    let cardLocation = document.createElement('p');
    cardLocation.classList.add('modal-location');
    cardLocation.textContent= cardObj.location;
    modelContent.appendChild(cardLocation);

    let cardImg = document.createElement('img');
    cardImg.classList.add('modal-img');
    cardImg.src = cardObj.pic;
    cardImg.alt = cardObj.name;
    modelContent.appendChild(cardImg);

    let cardContact = document.createElement('h2');
    cardContact.classList.add('modal-contact');
    cardContact.textContent= 'Contact Info:';
    modelContent.appendChild(cardContact);

    let cardTel = document.createElement('p');
    cardTel.classList.add("card-body");
    let linkTel = document.createElement('a');
    linkTel.href = "tel:" + cardObj.tel;
    linkTel.target = "_blank";
    linkTel.textContent = cardObj.tel;
    cardTel.appendChild(linkTel)
    modelContent.appendChild(cardTel);

    let cardURL = document.createElement('p');
    cardURL.classList.add("card-body");
    let linkURL = document.createElement('a');
    linkURL.href = cardObj.website;
    linkURL.target = "_blank";
    linkURL.textContent = cardObj.website;
    cardURL.appendChild(linkURL);
    modelContent.appendChild(cardURL);

    let cardOther = document.createElement('h2');
    cardOther.classList.add('modal-contact');
    cardOther.textContent= 'Other Info:';
    modelContent.appendChild(cardOther);

    if ('menu' in cardObj){ 
        let cardMenu = document.createElement('p');
        cardMenu.classList.add("card-body");
        let linkMenu = document.createElement('a');
        linkMenu.target = "_blank";
        linkMenu.href = cardObj.menu;
        linkMenu.textContent = "Menu";
        cardMenu.appendChild(linkMenu)
        modelContent.appendChild(cardMenu);
    }

    if ('dining' in cardObj){ 
        let cardDining = document.createElement('p');
        cardDining.classList.add("card-body");
        cardDining.textContent= "Dining Options: " + cardObj.dining;
        modelContent.appendChild(cardDining);
    }    

    let cardRating = document.createElement('p');
    cardRating.classList.add("card-body");
    cardRating.textContent= "Yelp Rating: " + cardObj.rating + "/5 Stars";
    modelContent.appendChild(cardRating);

}

function addBizModal() {
    let getToForm = document.querySelector(".form-add");
    getToForm.addEventListener('click', () => {
        let addBizBgSelect = "#addBizModal";
        renderModalBg(addBizBgSelect, ".exit-biz");
    })

    let submittedForm = document.querySelector(".submit-btn");
    submittedForm.addEventListener('click', (event) => {
        event.preventDefault();
        renderNewItem();        
    })
}

function renderNewItem() {
    let newBizName = document.querySelector("#bus-name").value;
    let newBizType = document.querySelector("#bus-type").value;
    let newBizLoc = document.querySelector("#bus-location").value;

    let showEntry = newBizName + " (" + newBizType + "), located in " + newBizLoc;
    state.bizAdded.push(showEntry);
    renderNewList();
}

function renderNewList() {
    let addToList = document.querySelector(".user-list");
    addToList.innerHTML = "";

    for (let item of state.bizAdded){

        let newListItem = document.createElement("li");
        newListItem.textContent = item;

        addToList.appendChild(newListItem);
    }
}

fetch('data/business.json')
    .then(function(response) {
       return response.json();
    })
    .then(function(data) {
        state.data = data;
        renderAll(data.data);
        goToItems(data.data);
        //searchBusiness();
        addBizModal();
    })
    .catch(function(error){
        let errorMsg = document.querySelector("#addCards");
        let errorElem = document.createElement('p');
        errorElem.textContent = error.message;
        errorMsg.appendChild(errorElem);
    })