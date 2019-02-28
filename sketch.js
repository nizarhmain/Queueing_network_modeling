// A2Z F16
// Daniel Shiffman
// https://github.com/shiffman/A2Z-F16
// http://shiffman.net/a2z

function setup() {
    noCanvas();
    // createFileInput creates a button in the window
    // that can be used to select files
    // The first argument is the callback function
    // The 'multiple' flag allows more than one file to be selected// A2Z F16
// Daniel Shiffman
// https://github.com/shiffman/A2Z-F16
// http://shiffman.net/a2z

function setup() {
  noCanvas();
  // createFileInput creates a button in the window
  // that can be used to select files
  // The first argument is the callback function
  // The 'multiple' flag allows more than one file to be selected
  var fileSelect = createFileInput(gotFile, 'multiple');
}

// file is a p5.File object that has metadata, and the file's contents
function gotFile(file) {    
    let words = file.data.split('\n')

    let trimmed_words = []
    
    words.forEach(element => {
        if(element !== "") {
            trimmed_words.push(element)
        }    
    });

    // console.log(trimmed_words);

    let variabili_globali = trimmed_words[2]
    let simulation_details = trimmed_words[5]

    let routers = []

    for (let index = 8; index < 16; index++) {
        const element = trimmed_words[index];
        routers.push(element)
    }

    console.log(routers);
    


  // Make a div to display info about the file
  var fileDiv = createDiv(file.name + ' ' + file.type + ' ' + file.subtype + ' ' + file.size + ' bytes');
  // Assign a CSS class for styling (see index.html)
  fileDiv.class('file');

  // Hanlde image and text differently
  if (file.type === 'image') {
    var img = createImg(file.data);
    img.class('thumb');
  } else if (file.type === 'text') {
    // Make a paragraph of text
    var par = createP(file.data);
    par.class('text');
  }
}
    var fileSelect = createFileInput(gotFile, 'multiple');
  }