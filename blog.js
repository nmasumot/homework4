export {promptListener};

//Blog Prompt Variables
const promptShow = document.getElementById("add-button");
const promptDia = document.getElementById("blogPrompt");
const epromptDia = document.getElementById('eblogPrompt');
const pconfirmButton = document.getElementById("prompt-confirm");
const epconfirmButton = document.getElementById('eprompt-confirm');


var currentSection;

function promptListener(){
    promptShow.addEventListener('click', promptFunction);
    pconfirmButton.addEventListener('click', pconfirm);
    epconfirmButton.addEventListener('click', epconfirm);
    
}

function promptFunction(){
    setTimeout(function delay(){
        promptDia.showModal();
    },50);
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
        epromptDia.showModal();
        let title = document.getElementById('eTitle');
        let date = document.getElementById('eDate');
        let summary = document.getElementById('eSummary');
        title.value = eTitle;
        date.value = eDate;
        summary.value = eSummary;
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
}

function saveToLC(element){
    let postList = JSON.parse(localStorage.getItem('items'));
    console.log(postList);
    if(postList == null){
        postList = {};
    }
    let entryJSON = {
        title: element.childNodes[0].innerHTML,
        date: element.childNodes[1].innerHTML,
        summary: element.childNodes[2].innerHTML,
    }
    console.log(postList.length);
    postList[postList.length] = entryJSON;
    localStorage.setItem('items', JSON.stringify(postList));
}
