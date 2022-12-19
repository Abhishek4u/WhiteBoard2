function createBox() {
    let stickyPad = document.createElement("div");
    let navBar = document.createElement("div");
    let close = document.createElement("div");
    let minimize = document.createElement("div");
    let textbox = document.createElement("div");
    

    let closeImg = document.createElement("img");
    closeImg.setAttribute("src","./Images/close.svg");
    close.appendChild(closeImg);

    let minimizeImg = document.createElement("img");
    minimizeImg.setAttribute("src","./Images/minimize.svg");
    minimize.appendChild(minimizeImg);
    // add the classse

    stickyPad.setAttribute("class", "stickyPad");
    navBar.setAttribute("class", "nav-bar");
    close.setAttribute("class", "close");
    minimize.setAttribute("class", "minimize");
    textbox.setAttribute("class", "textbox");

    // create subtree
    stickyPad.appendChild(navBar);
    stickyPad.appendChild(textbox);
    navBar.appendChild(minimize);
    navBar.appendChild(close);

    // add subtree to page
    document.body.appendChild(stickyPad);

    // close -> remove the stickypad
    close.addEventListener("click", function () {
        stickyPad.remove();
    })

    let isOpen = true;

    minimize.addEventListener("click", function () {
        let innerDivs = stickyPad.children;
        let xSize = navBar.style.width;
        let ySize = navBar.style.height;
        // let height ;
        if (isOpen) {
            // height = stickyPad.style.height;
            // navBar.style.display = "none";
            navBar.style.margin = ySize; // using margin and padding as buffer to save info
            navBar.style.padding = xSize;
            navBar.style.height = "1rem";
            navBar.style.width = "5rem";

            textbox.style.display = "none";
            
            // to remove transparent type shadow from screen decrease the size
            stickyPad.style.boxShadow = "none";
            stickyPad.style.minHeight = "0px";
            stickyPad.style.minWidth = "0px";
            stickyPad.style.height = "1rem";
            stickyPad.style.width = "5rem";

            // stickyPad.style.height = "20px";

            if(innerDivs.length > 2) // hide draggable icons(x,y, diagonal directions)
                for(let i = 2; i <= 4; i++) innerDivs[i].style.display = "none";

        } else {
            navBar.style.height = navBar.style.margin; // using saved info from buffer(margin, padding)
            navBar.style.width = navBar.style.padding;
            

            textbox.style.display = "block";
            // stickyPad.style.height = "calc(stickyPad.style.height - 20rem)";
            
            // again add minimum height and size for stickyPad
            stickyPad.style.minHeight  = "13rem";
            stickyPad.style.minWidth = "12rem";

            stickyPad.style.boxShadow =  "-2px 3px 25px -7px rgba(0,0,0,0.75)";
            // stickyPad.style.height = height;

            if(innerDivs.length > 2) // show draggable icons
                for(let i = 2; i <= 4; i++) innerDivs[i].style.display = "block";
        }

        isOpen = !isOpen;
    })


    navBar.addEventListener("mousedown", function () {
        $(this.parentNode).draggable();
        $(this.parentNode).droppable();


    })

    $(".stickyPad").click(function (event) {
        let clicked = $(this);
        
        $(this).resizable({
            animate: true
        });
    });

    return textbox;
}