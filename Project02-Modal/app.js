const openBtn = document.querySelector(".open-btn");
const container = document.querySelector(".modal-container");
const cancleBtn = document.querySelector(".cancel-btn");
const okeyBtn = document.querySelector(".okey-btn");
openBtn.addEventListener("click",()=>{
  container.classList.add("show");
  console.log(container.classList);
});

cancleBtn.addEventListener("click",()=>{
  container.classList.remove("show");
});

okeyBtn.addEventListener(("click"), ()=>{
  container.classList.remove("show");
  alert("done successfully");
});