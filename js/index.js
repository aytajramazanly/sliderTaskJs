let loginBtn=document.querySelector("#login button")
let loginWindow=document.querySelector("#login")
let inputName=document.querySelector("#name")
let gallerySection=document.querySelector("#gallery")
let images=document.querySelectorAll("#gallery .images a")
let popup=document.querySelector("#popup")
let largeImg=document.querySelector("#popup .img-box img")
let closeBtn=document.querySelector(".close-icon")
let nextBtn=document.querySelector(".next")
let previousBtn=document.querySelector(".previous")

let error=document.createElement("span")
error.classList.add("error")
error.innerText="Please input your Name"
document.querySelector(".login").appendChild(error)

loginBtn.addEventListener("click", ()=>{
    checkInput()
})

document.addEventListener("keydown", (e)=>{
   switch (e.code) {
       case "Enter":
        checkInput()
        break;
       case "ArrowLeft":
        previousImage(document.querySelector(".active-img"))
        break;
       case "ArrowRight":
        nextImage(document.querySelector(".active-img"))
        break;
       case "Escape":
        galleryClose()
       default:
           break;
   }
})

images.forEach((image)=>{
    image.addEventListener("click", (a)=>{
    a.preventDefault();
    popup.style.display="flex"
    changeImg(image)
    image.classList.add("active-img");
    })
})

closeBtn.addEventListener("click", ()=>{
    galleryClose()
})

nextBtn.addEventListener("click",()=>{
nextImage(document.querySelector(".active-img"))
})

previousBtn.addEventListener("click",()=>{
previousImage(document.querySelector(".active-img"))
})

function galleryClose() {
    popup.style.display="none"
}

function galleryOpen() {
    gallerySection.style.display="block"
    setTimeout(()=>{
        gallerySection.setAttribute("class","gallery-active")
    },300)
    
    let userName=document.createElement("h2")
    userName.classList.add("name-uppercase")
    userName.innerText=inputName.value+"!"
    document.querySelector(".gallery-title").appendChild(userName)
}

function nextImage(image) {
    let nextElement=image.nextElementSibling
    if (nextElement!==null) {
        nextElement.classList.add("active-img")
        changeImg(nextElement)
    }
    else{
        image.parentElement.children[0].classList.add("active-img")
        changeImg(image.parentElement.children[0])
    }
    image.classList.remove("active-img")
}

function previousImage(image) {
    let previousElement=image.previousElementSibling
    let parentLenght=image.parentElement.children.length
    if (previousElement!==null) {
        previousElement.classList.add("active-img")
        changeImg(previousElement)
    }
    else{
        image.parentElement.children[parentLenght-1].classList.add("active-img")
        changeImg(image.parentElement.children[parentLenght-1])
    }
    image.classList.remove("active-img")
}

function changeImg(image) {
    largeImg.setAttribute("src", image.getAttribute("href"))
}

function checkInput() {
    if (inputName.value.split("").some(item=>item!==" ")) {
        loginWindow.style.transform="translateX(-100%)"    
        setTimeout(()=>{
        loginWindow.style.display="none"
        },1000)
        galleryOpen()
    }
    else{
        error.style.visibility="visible"
        error.style.opacity=1;
        setTimeout(function(){
            error.style.opacity=0;
         }, 3000);
    }
}