export {promptListener,loadEntries};

//Blog Prompt Variables
const promptShow = document.getElementById("add-button");
const promptDia = document.getElementById("blogPrompt");
const epromptDia = document.getElementById('eblogPrompt');
const pconfirmButton = document.getElementById("prompt-confirm");
const epconfirmButton = document.getElementById('eprompt-confirm');


var currentSection;
var oldTitle;
var oldDate;

function promptListener(){
    promptShow.addEventListener('click', promptFunction);
    pconfirmButton.addEventListener('click', pconfirm);
    epconfirmButton.addEventListener('click', epconfirm);
    
}

function promptFunction(){
    setTimeout(function delay(){
        promptDia.showModal();
    },50);
    let title = document.getElementById('bTitle');
    let date = document.getElementById('bDate');
    let summary = document.getElementById('bSummary');
    title.value = '';
    date.value = '';
    summary.value = '';
}

function pconfirm(){
    let title = document.getElementById('bTitle').value;
    let date = document.getElementById('bDate').value;
    let summary = document.getElementById('bSummary').value;
    title = DOMPurify.sanitize(title);
    summary = DOMPurify.sanitize(summary);
    let newSection = document.createElement('section');
    let newTitle = document.createElement('h2');
    newTitle.innerHTML = title;
    let newDate = document.createElement('p');
    newDate.innerText = date;
    let newSummary = document.createElement('p');
    newSummary.innerHTML = summary;
    newSection.appendChild(newTitle);
    newSection.appendChild(newDate);
    newSection.appendChild(newSummary);
    let deleteBtn = document.createElement('button');
    let editBtn = document.createElement('button');
    deleteBtn.addEventListener('click',()=>{
        let buttonClicked = deleteBtn;
        let parent = buttonClicked.parentNode;
        let delID = parent.childNodes[0].innerHTML+parent.childNodes[1].innerHTML;
        deleteLC(delID);
        while(parent.firstChild != null){
            parent.firstChild.remove();
        }
        parent.remove();
    });
    editBtn.addEventListener('click',()=>{
        let buttonClicked = editBtn;
        let parent = buttonClicked.parentNode;
        currentSection = parent;
        let eTitle = parent.childNodes[0].innerHTML;
        let eDate = parent.childNodes[1].innerHTML;
        let eSummary = parent.childNodes[2].innerHTML;
        let title = document.getElementById('eTitle');
        let date = document.getElementById('eDate');
        let summary = document.getElementById('eSummary');
        title.value = eTitle;
        date.value = eDate;
        summary.value = eSummary;
        oldTitle = eTitle;
        oldDate = eDate;
        epromptDia.showModal();
    });    
    deleteBtn.innerText = 'Delete';
    editBtn.innerText = 'Edit';
    newSection.appendChild(deleteBtn);
    newSection.appendChild(editBtn);
    newSection.appendChild(document.createElement('hr'));
    document.getElementById('newPost').appendChild(newSection);
    saveToLC(newSection);
}

function epconfirm(){
    let title = document.getElementById('eTitle').value;
    let date = document.getElementById('eDate').value;
    let summary = document.getElementById('eSummary').value;
    currentSection.childNodes[0].innerHTML = title;
    currentSection.childNodes[1].innerHTML = date;
    currentSection.childNodes[2].innerHTML = summary;
    editLC(currentSection,oldTitle,oldDate);
}

function saveToLC(element){
    let postList = JSON.parse(localStorage.getItem('items'));
    if(postList == null){
        postList = {};
    }
    let id = element.childNodes[0].innerHTML+element.childNodes[1].innerHTML;
    let entryJSON = {
        title: element.childNodes[0].innerHTML,
        date: element.childNodes[1].innerHTML,
        summary: element.childNodes[2].innerHTML,
    }
    postList[id] = entryJSON;
    localStorage.setItem('items', JSON.stringify(postList));
}

function loadEntries(){
    let postList = JSON.parse(localStorage.getItem('items'));
    let keyList = Object.keys(postList)
    keyList.forEach(element => {
        let post = postList[element]
        let title = post.title;
        let date = post.date;
        let summary = post.summary;
        let newSection = document.createElement('section');
        let newTitle = document.createElement('h2');
        newTitle.innerHTML = title;
        let newDate = document.createElement('p');
        newDate.innerHTML = date;
        let newSummary = document.createElement('p');
        newSummary.innerHTML = summary;
        newSection.appendChild(newTitle);
        newSection.appendChild(newDate);
        newSection.appendChild(newSummary);
        let deleteBtn = document.createElement('button');
        let editBtn = document.createElement('button');
        deleteBtn.addEventListener('click',()=>{
            let buttonClicked = deleteBtn;
            let parent = buttonClicked.parentNode;
            let delID = parent.childNodes[0].innerHTML+parent.childNodes[1].innerHTML;
            deleteLC(delID);
            while(parent.firstChild != null){
                parent.firstChild.remove();
            }
            parent.remove();
    });
    editBtn.addEventListener('click',()=>{
        let buttonClicked = editBtn;
        let parent = buttonClicked.parentNode;
        currentSection = parent;
        let eTitle = parent.childNodes[0].innerHTML;
        let eDate = parent.childNodes[1].innerHTML;
        let eSummary = parent.childNodes[2].innerHTML;
        let title = document.getElementById('eTitle');
        let date = document.getElementById('eDate');
        let summary = document.getElementById('eSummary');
        title.value = eTitle;
        date.value = eDate;
        summary.value = eSummary;
        oldTitle = eTitle;
        oldDate = eDate;
        epromptDia.showModal();
    });    
    deleteBtn.innerText = 'Delete';
    editBtn.innerText = 'Edit';
    newSection.appendChild(deleteBtn);
    newSection.appendChild(editBtn);
    newSection.appendChild(document.createElement('hr'));
    document.getElementById('newPost').appendChild(newSection);
    });
}

function deleteLC(id){
    let postList = JSON.parse(localStorage.getItem('items'));
    let keyList = Object.keys(postList);
    //let id = elementToDelete.childNodes[0].innerHTML+elementToDelete.childNodes[1].innerHTML;
    let newPostList = {};
    keyList.forEach(element => {
        if(id != element){
            newPostList[element] = postList[element];
        }
    });
    localStorage.setItem('items', JSON.stringify(newPostList));
}

function editLC(elementToDelete, oldTitle, oldDate){
    let postList = JSON.parse(localStorage.getItem('items'));
    //let keyList = Object.keys(postList);
    //let id = oldTitle+oldDate;
    let newid = elementToDelete.childNodes[0].innerHTML+elementToDelete.childNodes[1].innerHTML;
    let entryJSON = {
        title: elementToDelete.childNodes[0].innerHTML,
        date: elementToDelete.childNodes[1].innerHTML,
        summary: elementToDelete.childNodes[2].innerHTML,
    }
    postList[newid] = entryJSON;
    localStorage.setItem('items',JSON.stringify(postList));
    if((oldTitle != entryJSON.title) || oldDate != (entryJSON.date)){
        deleteLC(oldTitle+oldDate);
    }
}
