let editor = ace.edit("editor");

editor.setTheme("ace/theme/monokai");
editor.session.setMode("ace/mode/text");
editor.setFontSize(14);


function changeExtension(lang) {
    editor.session.setMode(lang);
    // console.log(lang);
}

async function handleFileLoad(event) {
    fileContent = event.target.result;
    // editorContent.innerHTML = fileContent;
    editor.setValue(fileContent);
}

function handleFileSave(obj) {
    let fileName = (obj.name == "" ? "no-name" : obj.name) + (obj.extension == "" ? ".txt" : obj.extension);
    let type = obj.type;

    // console.log(fileName);

    let data = editor.getValue();

    let blobData = new Blob([data], { type: type });
    let url = window.URL.createObjectURL(blobData);

    let a = document.createElement("a");
    a.style = "display : none";
    document.body.appendChild(a);
    a.href = url;
    a.download = fileName;
    a.click();
    window.URL.revokeObjectURL(url);
    a.remove();
}