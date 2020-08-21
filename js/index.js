'use strict';

const state = {
    data: {},
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
        newCard.classList.toggle('expand');
        
        if (newCard.classList.contains('expand')) {
            newCard.classList.add('expanded');
            let moreinfo = document.createElement('p');
            if (moreinfo.textContent == ""){ 
                moreinfo.textContent = "Stars: " + busObj.rating;
            } else {
                moreinfo.textContent= "";
                console.log("I worked");
            }
            newCard.appendChild(moreinfo)
        }
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

    searchBusiness(sectArray, newSect);

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

function searchBusiness(sectionArray, parentDOM){
    let searchBtn = document.querySelector('#search-btn');
    searchBtn.addEventListener('click', (event) => {
        event.preventDefault();
        state.filter = true;
        parentDOM.innerHTML = "";
        let userSearch = document.querySelector("#search-input");
        let restName = userSearch.value.toLowerCase();
        let counter = 0;
        sectionArray.filter(() => {
            for(let eachRest of sectionArray) {
                let objName = eachRest.name.toLowerCase();
                if (objName.includes(restName) == true){
                    counter = counter + 1;
                    let aCard = renderCard(eachRest)
                    parentDOM.appendChild(aCard);
                }
            }
            if (counter == 0){
                let emptyMsg = document.createElement('p');
                emptyMsg.textContent = "No " + sectionArray[0].type + " containing '" + restName + "' found.";
                parentDOM.appendChild(emptyMsg);
            }
        })
    })

    let resetBtn = document.querySelector('#reset-btn');
    resetBtn.addEventListener('click', (event) => {
        event.preventDefault();
        state.filter = false;
        parentDOM.innerHTML = "";
        for(let each of sectionArray){
            let aCard = renderCard(each)
            parentDOM.appendChild(aCard);
        }
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

fetch('data/business.json')
    .then(function(response) {
       return response.json();
    })
    .then(function(data) {
        state.data = data;
        renderAll(data.data);
        goToItems(data.data);
    })