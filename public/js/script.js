// console.log("Test")

// Hamburger Menu
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
    
    if(navMenu.style.display != "block"){
        navMenu.style.display = "block";
    }else{
        navMenu.style.display = "none";
    }
})


document.querySelectorAll(".nav-link").
    forEach(link => link.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
    }))


//Refresh page when size moves above 1024.
window.onresize = reloadPage;

function reloadPage(){
    var width = window.innerWidth;
    if(width >= 1024){ location.reload() }
}