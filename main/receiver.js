socket.on('rColorChange', function (color) {
    ctx.strokeStyle = color;
})

socket.on("onmd", function (point) {
    let { x, y, color, width } = point;

    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.beginPath();
    ctx.moveTo(x, y);
})

socket.on("onmm", function (point) {
    let { x, y, color, width } = point;

    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineTo(x, y);
    ctx.stroke();
})

socket.on("addMsg", (data) => {

    addMsg(data);
})

socket.on("showTime", () => {

    let timeDiv = document.getElementById("time");
    let h5 = document.createElement("h5");

    let hours = new Date().getHours() + "";
    let minutes = new Date().getMinutes() + "";

    hours = hours.length == 1 ? 0 + hours : hours;
    minutes = minutes.length == 1 ? 0 + minutes : minutes;
    let time = hours + ":" + minutes;
    h5.innerHTML = `${time}`; timeDiv.appendChild(h5);
})

socket.on("userJoined", (user) => {

    userJoined(user);

})

socket.on("userLeft", (user) => {
    userLeft(user);
})

socket.on("updateCode", (obj) => {
    currentUserChangingCode = false;
    // so onchange() does not fire
    editor.setValue(obj.code);

    editor.moveCursorTo(obj.cursor.row, obj.cursor.column); 
    editor.clearSelection(); // to remove selection highlighting
    // after changing code set current user as true so
    // that onchange can fire
    currentUserChangingCode = true;
})

// socket.on("changeCursor", (cursor) => {
//     currentUserChangingCursor = false;
//     // so onchange() does not fire
//     console.log(cursor.row + " " + cursor.column);
//     editor.moveCursorTo(cursor.row, cursor.column); 
//     // move the cursor
//     currentUserChangingCursor = true;
//     // now make true
// })

function addMsg(data) {


    let messageBody = document.getElementById("msg-container");
    let div = document.createElement("div");

    div.classList.add("msg");

    div.innerHTML = `<h5 style="color: red;">${data.person}<span >${data.time}</span></h5>
    <h4>${data.msgPara}</h4></div>`;

    msgContainer.appendChild(div);

    messageBody.scrollTop = messageBody.scrollHeight - messageBody.clientHeight;
}

function userJoined(user) {

    chatBotMsg(user, true);    
}

function userLeft(user) {

    chatBotMsg(user, false);
}

function chatBotMsg(user, doesJoined) {
    let messageBody = document.getElementById("msg-container");
    let div = document.createElement("div");

    let msg = `<h4>${user} ` + (doesJoined === true ? "joined" : "left") +"</h4>";
    div.innerHTML = msg;
    div.setAttribute("id", "chatBot");

    messageBody.appendChild(div);

    messageBody.scrollTop = messageBody.scrollHeight - messageBody.clientHeight;
}