'use strict';

const state = {
    data: {},
    currentdata: [],
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
        renderModelContent(busObj);
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

    return newSect;
}

function renderAll(allObj) {
    let addAllCardObj = document.querySelector('#addCards');

    let display = document.createElement('div');
    display.classList.add('all-cards');

    console.log(allObj);

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

function searchBusiness(){
    let searchCards = document.querySelector('#addCards');

    let searchRes = document.createElement('div');
    searchRes.classList.add('row');

    let searchBtn = document.querySelector('#search-btn');
    searchBtn.addEventListener('click', (event) => {
        event.preventDefault();
        state.filter = true;
        searchCards.innerHTML = "";
        let userSearch = document.querySelector("#search-input");
        let restName = userSearch.value.toLowerCase();
        let counter = 0;
        let newArray = [];
        for (let sectionArray of state.data.data) {
            sectionArray.filter(() => {
                for(let eachRest of sectionArray) {
                    let objName = eachRest.name.toLowerCase();
                    if (objName.includes(restName) == true){
                        newArray.push(eachRest);
                        counter = counter + 1;
                        let aCard = renderCard(eachRest)
                        searchRes.appendChild(aCard);
                    }
                }
                if (counter == 0){
                    let emptyMsg = document.createElement('p');
                    emptyMsg.textContent = "No " + sectionArray[0].type + " containing '" + restName + "' found.";
                    searchCards.appendChild(emptyMsg);
                }
                searchCards.appendChild(searchRes);
            })
        }
        state.currentdata = newArray;
        console.log(newArray)
        renderSection(state.currentdata.data);
    })

    let resetBtn = document.querySelector('#reset-btn');
    resetBtn.addEventListener('click', (event) => {
        event.preventDefault();
        state.filter = false;
        state.currentdata = state.data;
        searchCards.innerHTML = "";
        renderAll(state.currentdata.data)
    })
}

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

function renderModelBg() {
    let modalBackground = document.querySelector("#cardModal");
    modalBackground.style.display = "block";
    
    modalBackground.addEventListener('click', (event) => {
        modalBackground.style.display = "none";
    })
}

function renderModelContent(cardObj) {
    renderModelBg();
    let modelContent = document.querySelector(".model-content");

    
}

fetch('data/business.json')
    .then(function(response) {
       return response.json();
    })
    .then(function(data) {
        state.data = data;
        renderAll(data.data);
        goToItems(data.data);
        searchBusiness();
    })