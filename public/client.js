const socket = io()
let name;
let textarea = document.querySelector('#textarea')
let messageArea = document.querySelector('.message__area');
var btn=document.querySelector("button");
// disavle button
btn.disabled=true;
var username=document.querySelector(".name");
username.addEventListener('keyup',(e)=>{
    if(e.target.value==""){
        btn.disabled=true;
        alert("please fill the form");
    }
    else{
        btn.disabled=false;
    }
});

btn.addEventListener("click",()=>{
    let user=document.querySelector(".name").value;
    name=user;
    let form=document.querySelector(".container");
    form.style.display="none";
    let chat=document.querySelector(".chat__section ");
    chat.style.display="block";

});




textarea.addEventListener('keyup', (e) => {
    if(e.key === 'Enter') {
        sendMessage(e.target.value)
    }
})

function sendMessage(message) {
    let msg = {
        user: name,
        message: message.trim()
    }
    // Append 
    appendMessage(msg, 'outgoing')
    textarea.value = ''
    scrollToBottom()

    // Send to server 
    socket.emit('message', msg)

}

function appendMessage(msg, type) {
    let mainDiv = document.createElement('div')
    let className = type
    mainDiv.classList.add(className, 'message')

    let markup = `
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
    `
    mainDiv.innerHTML = markup
    messageArea.appendChild(mainDiv)
}

// Recieve messages 
socket.on('message', (msg) => {
    appendMessage(msg, 'incoming')
    scrollToBottom()
})

function scrollToBottom() {
    messageArea.scrollTop = messageArea.scrollHeight
}



