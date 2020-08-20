'use strict';

const state = {
    data: {}
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
            moreinfo.textContent = "Stars: " + busObj.rating;
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

    return newSect;
}

function renderAll(allObj) {
    let test = document.querySelector('#addCards');

    let display = document.createElement('div');
    display.classList.add('all-cards');

    for(let section of allObj){       
        let sectHeader = document.createElement('h2');
        sectHeader.textContent = section[0].type;
        let setID = section[0].type.replace(/\s+/g, '');
        sectHeader.setAttribute("id", setID.toLowerCase());
        display.appendChild(sectHeader);
        
        let aSect = renderSection(section)
        display.appendChild(aSect);
        console.log(sectHeader);
    }

    test.appendChild(display);
}

function goToItems(allObj) {
    let goTo = document.querySelector('.filter-options');

    for(let sectionNames of allObj){       
        let sectFilter = document.createElement('li');
        sectFilter.classList.add('filter-list');

        let addLink = document.createElement('a');
        addLink.classList.add('filter-list');
        addLink.textContent = sectionNames[0].type;

        let setID = sectionNames[0].type.replace(/\s+/g, '');
        addLink.href = '#' + setID.toLowerCase();

        sectFilter.appendChild(addLink);
        console.log(sectFilter);

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