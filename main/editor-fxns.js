// controllers------------------>>>>

let codeOpener = document.querySelector("#code-file-opener");
let fileContent = "";
let editorContent = document.querySelector("#editor");
let fileInitialName = document.querySelector(".file-name").children[0];
let fileExtension = document.querySelector(".file-extension").children[0];


// ---------FOR OPENING FILE-----------
async function openFile() {

    await codeOpener.click();
}

codeOpener.addEventListener("change", async (event) => {

    setFileNameNExtension(event);
});

async function setFileNameNExtension(event) {
    let fileData = codeOpener.files[0];

    let fileFullName = fileData.name.split(".");

    // show file-name and extension on editor top bar
    fileInitialName.value = fileFullName[0];
    fileExtension.value = "." + fileFullName[fileFullName.length - 1];

    let extension = manageExtension(fileExtension.value);
    changeExtension(extension);

    const reader = new FileReader();
    reader.readAsText(event.target.files[0]);
    reader.onload = handleFileLoad;
}

// ------------FOR SAVING FILE-----------------------

function saveFile() {

    let type = getExtensionType(fileExtension.value);
    let obj = {
        name: fileInitialName.value,
        extension : fileExtension.value,
        type: type
    }

    handleFileSave(obj);
}


// --------------FOR SYNCHRONIZING CODE---------
editor.session.on("change", function () {

    distributeCodeToOthers();
})

let currentUserChangingCode = true;

function distributeCodeToOthers() {
    // using current user bcz otherwise on change in editor will
    // make a loop using socket
    if (currentUserChangingCode) {

        let code = editor.getValue();
        // console.log("change ho rha hai");
        let obj = {
            "code": code,
            "cursor" : editor.getCursorPosition()
        }
        sendCodeToOthers(obj);
    }
}

function manageExtension(extnsn) {

    let extension = "ace/mode/";

    if (extnsn === ".cpp" || extnsn === ".c") {
        extension += "c_cpp";

    } else if (extnsn === ".java") {
        extension += "java";

    } else if (extnsn === ".py") {
        extension += "python";

    } else if (extnsn === ".js") {
        extension += "javascript";

    } else if (extnsn === ".css") {
        extension += "css";

    } else if (extnsn === ".html") {
        extension += "html";

    } else if (extnsn === ".json") {
        extension += "json";

    } else extension += "text";

    return extension;
}

function getExtensionType(extnsn) {

    let type = "text/plain"; // default type

    if (extnsn === ".c" || extnsn === ".cpp") {
        type = "text/x-c";

    } else if (extnsn === ".java") {
        type = "text/x-java-source";

    } else if (extnsn === ".js") {
        type = "text/javascript";

    } else if (extnsn === ".json") {
        type = "application/json";

    } else if (extnsn === ".py") {
        type = "text/x-script.phyton";

    } else if (extnsn === ".css") {
        type = "text/css";

    } else if (extnsn === ".html") {
        type = "text/html";

    }
    return type;
}

// }