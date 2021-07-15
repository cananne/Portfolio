/*----nav menu ---*/
(()  =>{

   const hamburgerBtn = document.querySelector(".hamburger-btn"),
   navMenu = document.querySelector(".nav-menu"),
   closeNavBtn = navMenu.querySelector(".close-nav-menu");

   hamburgerBtn.addEventListener("click", showNavMenu);
   closeNavBtn.addEventListener("click", hideNavMenu);
   function showNavMenu(){
       navMenu.classList.toggle("open");
       bodyScrollingToggle();
   }
   function hideNavMenu(){
    navMenu.classList.remove("open");
    fadeOuteffect();
    bodyScrollingToggle();
   }
   function fadeOuteffect(){
       document.querySelector(".fade-out-effect").classList.add.apply("active");
       setTimeout(() =>{
           document.querySelector(".fade-out-effect").classList.remove("active");
       },300)
   }

   document.addEventListener("click", (event) =>{
       if(event.target.classList.contains('link-item')){
           if(event.target.hash !==""){
               event.preventDefault();
               const hash = event.target.hash;
               document.querySelector(".section.active").classList.add("hide");
               document.querySelector(".section.active").classList.remove("active");
               document.querySelector(hash).classList.add("active");
               document.querySelector(hash).classList.remove("hide");
               navMenu.querySelector(".active").classList.add("outer-shadow","hover-in-shadow");
               navMenu.querySelector(".active").classList.remove("active","inner-shadow");
               if(navMenu.classList.contains("open")){
               event.target.classList.add("active", "inner-shadow");
               event.target.classList.remove("outer-shadow","hover-in-shadow");
               hideNavMenu();
               }
            else{
                let navItems= navMenu.querySelectorAll(".link-item");
                navItems.forEach((item) =>{
                    if(hash === item.hash){
                        item.target.classList.add("active", "inner-shadow");
                        item.target.classList.remove("outer-shadow","hover-in-shadow");
                    }
                })
                fadeOutEffect();
            }
            window.location.hash = hash;
           }
       }
   })


})();


function bodyScrollingToggle(){
    document.body.classList.toggle("hidden-scrolling");
}


/*-----portfolio filter and popups ----*/
(() =>{

    const filterContainer = document.querySelector(".portfolio-filter"),
    portfolioItemsContainer = document.querySelector(".portfolio-items"),
    portfolioItems = document.querySelectorAll(".portfolio-item"),
    popup = document.querySelector(".portfolio-popup"),
    prevBtn = popup.querySelector(".soa-prev"),
    nextBtn = popup.querySelector(".soa-next"),
    closeBtn = popup.querySelector(".soa-close"),
    projectDetailsContainer = popup.querySelector(".soa-details"),
    projectDetailsBtn = popup.querySelector(".soa-project-details-btn");
    let itemIndex, slideIndex, screenshots;

    filterContainer.addEventListener("click", (event)=>{
        if(event.target.classList.contains("filter-item") &&
         !event.target.classList.contains("active")){
         filterContainer.querySelector(".active").classList.remove("outer-shadow","active");
         event.target.classList.add("active","outer-shadow");
         const target = event.target.getAttribute("data-target");
         portfolioItems.forEach((item)=>{
             if(target === item.getAttribute("data-category") || target === 'all'){
                 item.classList.remove("hide");
                 item.classList.add("show");
             }
             else{
                 item.classList.remove("show");
                 item.classList.add("hide");
             }
         })
    }
})

    portfolioItemsContainer.addEventListener("click", (event)=>{
        if(event.target.closest(".portfolio-item-inner")){
            const portfolioItem = event.target.closest(".portfolio-item-inner").parentElement;
            itemIndex = Array.from(portfolioItem.parentElement.children).indexOf(
                portfolioItem);
            screenshots = portfolioItems[itemIndex].querySelector(".portfolio-item-img img").getAttribute("data-screenshots");
            screenshots = screenshots.split(",");
            if(screenshots.length === 1){
                prevBtn.style.display="none";
                nextBtn.style.display="none";
            }
            else{
                prevBtn.style.display="block";
                nextBtn.style.display="block";
            }
            slideIndex = 0;
            popupToggle();
            popupSlideshow();
            popupDetails();
        }
    })

    closeBtn.addEventListener("click", ()=>{
        popupToggle();
        if(projectDetailsContainer.classList.contains("active")){
            popupDetailsToggle();
        }
    })

    function popupToggle() {
        popup.classList.toggle("open");
        bodyScrollingToggle();
    }
    function popupSlideshow(){
        const imgSrc = screenshots[slideIndex];
        const popupImg = popup.querySelector(".soa-img");
        popup.querySelector(".soa-loader").classList.add("active");
        popupImg.src=imgSrc; 
        popupImg.onload = () =>{
            popup.querySelector(".soa-loader").classList.remove("active");
        }
        popup.querySelector(".soa-counter").innerHTML= (slideIndex+1) + " of " + screenshots.length;
    }

    nextBtn.addEventListener("click", () =>{
        if(slideIndex === screenshots.length-1){
            slideIndex = 0;
        }
        else{
            slideIndex++;
        }
        popupSlideshow();
    })
    prevBtn.addEventListener("click", () =>{
        if(slideIndex === 0){
            slideIndex = screenshots.length-1
        }
        else{
            slideIndex--;
        }
        popupSlideshow();
    })

    function popupDetails(){
        if(!portfolioItems[itemIndex].querySelector(".portfolio-item-details")){
            projectDetailsBtn.style.display = "none";
            return;
        }
        projectDetailsBtn.style.display="block";
        const details = portfolioItems[itemIndex].querySelector(".portfolio-item-details").innerHTML;
        popup.querySelector(".soa-project-details").innerHTML = details;
        const title = portfolioItems[itemIndex].querySelector(".portfolio-item-title").innerHTML;
        popup.querySelector(".soa-title h2").innerHTML = title ;
        const category = portfolioItems[itemIndex].getAttribute("data-category");
        popup.querySelector(".soa-project-category").innerHTML=category.split("-").join();

    }

    projectDetailsBtn.addEventListener("click", () =>{
        popupDetailsToggle();
    })

    function popupDetailsToggle(){
        if(projectDetailsContainer.classList.contains("active")){
            projectDetailsBtn.querySelector("i").classList.remove("fa-min");
            projectDetailsBtn.querySelector("i").classList.add("fa-plus");
            projectDetailsContainer.classList.remove("active");
            projectDetailsContainer.style.maxHeight = 0 + "px"

        }
        else{
            projectDetailsBtn.querySelector("i").classList.remove("fa-plus");
            projectDetailsBtn.querySelector("i").classList.add("fa-minus");
            projectDetailsContainer.classList.add("active");
            projectDetailsContainer.style.maxHeight = projectDetailsContainer.scrollHeight + "px";
            popup.scrollTo(0,projectDetailsContainer.offsetTop);

        }
    }
})();


(() =>{
    const sections = document.querySelectorAll(".section");
    sections.forEach((section) =>{
        if(!section.classList.contains("active")){
            section.classList.add("hide");
        }

    })
})();