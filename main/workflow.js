let person = "unknown";

let sandwich = document.getElementsByClassName("sandwich")[0]; 
// using[0] bcz selecting elt using class and class can be on multiple elts so selecting first one
let socketRoom = document.getElementById("socketRoom");

let isClicked = false;
sandwich.addEventListener("click", () => {
    if (!isClicked) {
        socketRoom.style.display = "block";
        isClicked = true;

        sandwich.children[0].style.transform = "rotate(90deg)";
        // if removing then remove from idNRoomGeneration(), disconnectMe(), canvas.js
    } else {
        socketRoom.style.display = "none";
        sandwich.children[0].style.removeProperty("transform");
        isClicked = false;
    }

})

// ----------chat-code------------------------

let chatSwitch = document.getElementsByClassName("chat")[0];
let chatArea = document.getElementById("chat-room");
let isClicked2 = false;

chatSwitch.addEventListener("click", () => {
    if(!isClicked2) {
        chatArea.style.display = "block";
        isClicked2 = true;
    } else {
        chatArea.style.display = "none";
        isClicked2 = false;
    }
})


let btn = document.getElementById("sckt");
let id = document.getElementById("id");
let userName = document.getElementById("name");

let roomId = id.value;

btn.addEventListener("click", () => {

    idNRoomGeneration();

})

id.addEventListener("keypress", (e) => {
    if (e.key == 'Enter') {
        idNRoomGeneration();
    }
})

// Disconnect
let disconnect = document.getElementById("disconnect");

disconnect.addEventListener("click", () => {

    disconnectMe();

})

// Send message
let msgContainer = document.getElementById("msg-container");
let sendBtn = document.getElementById("send");
let msg = document.getElementById("msgToSend");

msg.addEventListener("keypress", (e) => {
    if (e.key == 'Enter') {
        sendTheMessage();
    }
})


sendBtn.addEventListener("click", () => {

    sendTheMessage();
})

//-------------end-chat-code-------------------------------------


//------------code-editor--------------------------------------
let editorSwitch = document.getElementsByClassName("code-editor")[0];
let editorContainer = document.getElementsByClassName("editor-container")[0];

let isClicked3 = false;
editorSwitch.addEventListener("click", () => {

    if(!isClicked3) {
        editorContainer.style.display = "block";
        isClicked3 = true;
    } else {
        editorContainer.style.display = "none";
        isClicked3 = false;
    }
})

//----------------end-code-editor------------------------------

// -------------Functions----------------------------------------

function idNRoomGeneration() {

    person = (userName.value == "" ? person : userName.value);
    // console.log(person);
    userName.value = "";

    socketRoom.style.display = "none";
    sandwich.children[0].style.removeProperty("transform");

    isClicked = false;

    let newroom = id.value;
    // console.log(newroom);

    // to inform other users
    socket.emit("sendLeaveMessage", person); 
    socket.emit('switchRoom', {newroom,person});

    id.value = "";
    let idChild = document.getElementById("socketId");
    idChild.innerText = " Your current id is : " + newroom;
    idChild.style.color = "green";


    // <div id="chat-title">
    //         <h4>Chat Room</h4>
    //         <h4>ID : None</h4>

    let chatTitle = document.getElementById("chat-title");
    chatTitle.innerHTML = `<h4>Chat Room</h4><h4>ID : ${newroom}</h4>`;
    chatTitle.style.color = "green";
}


function disconnectMe() {

    socketRoom.style.display = "none";
    sandwich.children[0].style.removeProperty("transform");
    isClicked = false;

    let idChild = document.getElementById("socketId");
    idChild.innerText = " Hey! Now You are connected to unique room ";
    idChild.style.color = "#f51f5a";

    let newroom = randomId();
    // console.log(newroom);
    let person = userName.value;

    // to inform other users
    socket.emit("sendLeaveMessage", person);
    socket.emit('switchRoom', {newroom,person});

    let chatTitle = document.getElementById("chat-title");
    chatTitle.innerHTML = `<h4>Chat Room</h4><h4>ID : Unique ID</h4>`;
    chatTitle.style.color = "#f51f5a";
}

function sendTheMessage() {

    if (msg.value != "") {

        let messageBody = document.getElementById("msg-container");
        let div = document.createElement("div");
        div.classList.add("msg");
        let msgPara = msg.value;

        let hours = new Date().getHours() + "";
        let minutes = new Date().getMinutes() + "";

        hours = hours.length == 1 ? 0 + hours : hours;
        minutes = minutes.length == 1 ? 0 + minutes : minutes;
        let time = hours + ":" + minutes;

        div.innerHTML = `<h5  style="color: blue;">${person}<span>${time}</span></h5><h4>${msgPara}</h4></div>`;
        socket.emit('distributeMsg', {roomId, person, time, msgPara });
        msg.value = "";

        msgContainer.appendChild(div);

        messageBody.scrollTop = messageBody.scrollHeight - messageBody.clientHeight;
    }
}

let randomId = () => {
    let s4 = () => {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    //return id of format 'aaaaaaaa'-'aaaa'-'aaaa'-'aaaa'-'aaaaaaaaaaaa'
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}