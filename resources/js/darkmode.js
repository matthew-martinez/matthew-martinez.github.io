//let lm = document.getElementById('light');
//let dm = document.getElementById('dark');
let toggle = document.getElementById('toggle');

function toggleTheme() { 
    // Obtains an array of all <link> 
    // elements. 
    // Select your element using indexing. 
    var theme = document.getElementsByTagName('link')[0]; 

    // Change the value of href attribute  
    // to change the css sheet. 
    if (theme.getAttribute('href') == './resources/dark.css') { 
        theme.setAttribute('href', './resources/light.css'); 
    } else { 
        theme.setAttribute('href', './resources/dark.css'); 
    } 
} 

//lm.onclick = toggleTheme;
//dm.onclick = toggleTheme;
toggle.onclick = toggleTheme;