
function sendCodeToOthers(obj) {
    // console.log("bheja")
    socket.emit('distributeCode', obj);
    
}