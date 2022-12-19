ctx.lineWidth = 5;
ctx.lineCap = "round";
ctx.lineJoin = "round";
let currColor;
let activeTool = 'pencil';


let pencil = document.querySelector("#pencil");
let erase = document.querySelector("#eraser");
let pencilOptions = document.querySelector("#pencil-options");
let eraserOptions = document.querySelector("#eraser-options");

function handleTool(tool) {

    if (tool == 'pencil') {

        if (activeTool == 'pencil') {
            ctx.strokeStyle = currColor == 'white' ? "#1affea" : currColor;
            pencilOptions.classList.add("show");
        } else {
            ctx.strokeStyle = currColor == null ? "black" : currColor;
            activeTool = "pencil";
            ctx.globalCompositionOperation = "source-over";
            eraserOptions.classList.remove("show");
        }
    } else if (tool == "eraser") {

        if (activeTool == "eraser") {
            ctx.strokeStyle = "white";
            eraserOptions.classList.add("show");

        } else {
            ctx.strokeStyle = "white";
            activeTool = "eraser";
            ctx.globalCompositionOperation = "destination-out";
            pencilOptions.classList.remove("show");
        }
    } else if (tool == "sticky") {
        createSticky();
    } else if (tool == "upload") {
        uploadFile();
    } else if (tool == "undo") {
        undoLast();
    } else if (tool == "redo") {
        redoLast();
    } else if (tool == "download") {
        downloadBoard();
    }
}

function changeColor(color) {
    ctx.strokeStyle = color;
    currColor = color;
    pencilOptions.classList.remove("show");
    socket.emit("colorChange", color);
    changeSize();
}


function changeSize() {

    let selection = $(".slider").slider("value");
    ctx.lineWidth = selection;
    
}
function changeSize2() {

    let selection = $(".eraserSlider").slider("value");
    ctx.lineWidth = selection;
    
}
