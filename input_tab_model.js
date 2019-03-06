
function addRoutersInputs() {
    let tab_contents = document.getElementsByClassName("tab_contents")
    let newDiv = document.createElement("div")
    newDiv.id = "Routers"
    newDiv.className = "content-tab"

    let columns = document.createElement("div")
    columns.className = "columns"

    for (let i = 0; i < 4; i++) {
        let placeholder_counter

        let column = document.createElement("div")
        column.className = "column"    
        columns.appendChild(column)

        if(i < 1) {
            placeholder_counter = "ID"
        } else if(i < 2) {
            placeholder_counter = "Uscite"
        } else if(i < 3) {
            placeholder_counter = "Rate"
        } else {
            placeholder_counter = "P_Err"
        }
    
        for (let j = 0; j < 8; j++) {
            let inputField = document.createElement("input")
            inputField.type="text"
            inputField.placeholder=placeholder_counter
            
            column.appendChild(inputField)
        }
        
    }


    newDiv.appendChild(columns)

    tab_contents[0].appendChild(newDiv)

    console.log(newDiv);

}



function openTab(evt, tabName) {
    var i, x, tablinks;
    x = document.getElementsByClassName("content-tab");
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tab");
    for (i = 0; i < x.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" is-active", "");
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " is-active";
  }

  //addRoutersInputs()
