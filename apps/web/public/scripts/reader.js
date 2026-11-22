(() => {
  const reader=document.querySelector(".sacred-reader");
  if(!reader)return;
  let value=1;
  for(const btn of document.querySelectorAll("[data-reader-size]")){
    btn.addEventListener("click",()=>{
      const delta=Number(btn.getAttribute("data-reader-size"));
      value=Math.max(0.85,Math.min(1.6,Math.round((value+delta*0.1)*10)/10));
      reader.style.setProperty("--reader-scale",String(value));
    });
  }
})();
