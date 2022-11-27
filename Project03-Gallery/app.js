const fullImg = document.querySelector('.full-img');
const smallImg = document.querySelectorAll(".img");
const modal = document.querySelector(".modal");

smallImg.forEach((img)=>{
    img.addEventListener("click", ()=>{
    modal.style.opacity = 1;
    modal.style.pointerEvents = "all";
    const orginal = img.getAttribute("alt");
    console.log(orginal);
    fullImg.src =`img/${orginal}.jpg`;
  });
});

modal.addEventListener('click',(item)=>{
  if(item.target.classList.contains('modal')){
    modal.style.opacity = 0;
    modal.style.pointerEvents = "none";
  }
  console.log(modal.style);
});