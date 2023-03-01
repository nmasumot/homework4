export {alertListener,confirmListener,promptListener,spromptListener};

//alert variables
const alertShow = document.getElementById("alert-button");
const alertDia = document.getElementById("alertDialog");

//confirm variables
const confirmShow = document.getElementById("confirm-button");
const confirmDia = document.getElementById("cDialog");
const confirmButton = document.getElementById('confirm');
const denyButton = document.getElementById('cancel');

//prompt variables
const promptShow = document.getElementById("prompt-button");
const promptDia = document.getElementById("promptDialog");
const pconfirmButton = document.getElementById("prompt-confirm");
const pdenyButton = document.getElementById("prompt-cancel");

//safe prompt variables
const spromptShow = document.getElementById("safer-prompt-button");
const spromptDia = document.getElementById("safepromptDialog");
const spconfirmButton = document.getElementById("sprompt-confirm");
const spdenyButton = document.getElementById("sprompt-cancel");

function alertListener(){
    alertShow.addEventListener('click', alertFunction);
}

function alertFunction(){
    let el = document.getElementById('out');
    el.innerHTML = '';
    setTimeout(function delay(){
        alertDia.showModal();
    },50);
}

function confirmListener(){
    confirmShow.addEventListener('click', confirmFunction);
    confirmButton.addEventListener('click', confirm);
    denyButton.addEventListener('click',deny);
}

function confirmFunction(){
    let el = document.getElementById('out');
    el.innerHTML = '';
    setTimeout(function delay(){
        confirmDia.showModal();
    },50);
}

function confirm(){
    let el = document.getElementById('out');
    el.innerHTML = `Confirm result: true`
}

function deny(){
    let el = document.getElementById('out');
    el.innerHTML = `Confirm result: false`
}

function promptListener(){
    promptShow.addEventListener('click', promptFunction);
    pconfirmButton.addEventListener('click', pconfirm);
    pdenyButton.addEventListener('click',pdeny);
}

function promptFunction(){
    let el = document.getElementById('out');
    el.innerHTML = '';
    setTimeout(function delay(){
        promptDia.showModal();
    },50);
}

function pconfirm(){
    let el = document.getElementById('out');
    let name = document.getElementById('input').value;
    if(name === null || name === ''){
        name = 'User didn\`t enter anything';
    }
    el.innerHTML = `Prompt result: ${name}`;
}

function pdeny(){
    let el = document.getElementById('out');
    let name = 'User didn\`t enter anything';
    el.innerHTML = `Prompt result: ${name}`;
}

function spromptListener(){
    spromptShow.addEventListener('click', spromptFunction);
    spconfirmButton.addEventListener('click', spconfirm);
    spdenyButton.addEventListener('click',spdeny);
}

function spromptFunction(){
    let el = document.getElementById('out');
    el.innerHTML = '';
    setTimeout(function delay(){
        spromptDia.showModal();
    },50);
}

function spconfirm(){
    let el = document.getElementById('out');
    let name = document.getElementById('sinput').value;
    let cleanname = DOMPurify.sanitize(name);
    if(cleanname === null || cleanname === ''){
        cleanname = 'User didn\`t enter anything';
    }
    
    el.innerHTML = `Prompt result: ${cleanname}`;
}

function spdeny(){
    let el = document.getElementById('out');
    let name = 'User didn\`t enter anything';
    el.innerHTML = `Prompt result: ${name}`;
}







