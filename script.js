function locomotiveAnimation(){
    gsap.registerPlugin(ScrollTrigger);

    // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll
    
    const locoScroll = new LocomotiveScroll({
      el: document.querySelector("#main"),
      smooth: true
    });
    // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
    locoScroll.on("scroll", ScrollTrigger.update);
    
    // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
    ScrollTrigger.scrollerProxy("#main", {
      scrollTop(value) {
        return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
      }, // we don't have to define a scrollLeft because we're only scrolling vertically.
      getBoundingClientRect() {
        return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
      },
      // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
      pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
    });
   
    
    // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
    
    // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
    ScrollTrigger.refresh();
    
    
}

function navAnimation(){
    let nav = document.querySelector('nav');
nav.addEventListener("mouseenter",function(){
    // console.log("Hello")
    let tl = gsap.timeline();
    tl.to("#nav-bottom",{ bottom: "-8vw",
    duration:0
       })
 
    tl.from(".bottom-div h5 span",{
        
        x:5,

        stagger:{amount:0}
    })
    tl.to('.bottom-div',{display:"block",duration:0.1});
})

nav.addEventListener("mouseleave",function(){
    
    let tl = gsap.timeline();
    
    tl.to("#nav-bottom",{ bottom: "0",
    duration:0
       })  
       
    tl.to(".bottom-div h5 span",{
        x:5,
        
        stagger:{amount:0}
    })
    gsap.to('.bottom-div',{display:"none", duration:0.01});
    
    
})
}

navAnimation();

function page2Animation(){
    let rightElems=document.querySelectorAll('.right-elem');

rightElems.forEach(function(i){
i.addEventListener('mouseenter',()=>{
    // i.childNodes[3].style.opacity=1
    gsap.to(i.childNodes[3],{
        opacity:1
        ,scale:1
    })
    
})
i.addEventListener('mouseleave',()=>{
    gsap.to(i.childNodes[3],{
        opacity:0
        ,scale:0
    })
}) 
i.addEventListener('mousemove',(dets)=>{
    gsap.to(i.childNodes[3],{
        x:dets.x-i.getBoundingClientRect().x-(i.childNodes[3].getBoundingClientRect().width/2)
        ,y:dets.y-i.getBoundingClientRect().y-(i.childNodes[3].getBoundingClientRect().height/2+20)
    })
}) 
});
}

page2Animation();

function page3VideoAnimation(){
    let page3Center=document.querySelector('.page3-center');
    let video=document.querySelector('#page3 video');
    page3Center.addEventListener('click',()=>{
        
        video.play();
    
        gsap.to(video,{
            transform:"scaleX(1) scaleY(1)",
            opacity:1,
            borderRadius:0,
            bottom:0
            
        })
    })
    
    video.addEventListener('click',()=>{
        
        video.pause();
    
        gsap.to(video,{
            transform:"scaleX(0) scaleY(0)",
            opacity:0,
            borderRadius:"30px",
            bottom:"-50%"
            
        })
    })
    
    
}

page3VideoAnimation();


let sections=document.querySelectorAll(".sec-right")
sections.forEach((elem)=>{
elem.addEventListener('mouseenter',()=>{

    elem.childNodes[3].style.opacity=1;
    elem.childNodes[3].play();
})

elem.addEventListener('mouseleave',()=>{

    elem.childNodes[3].style.opacity=0;
    elem.childNodes[3].pause();
    elem.childNodes[3].duration=0
})
});



function page6Animations() {
     console.log("hii")
     gsap.registerPlugin(ScrollTrigger)
    gsap.from("#btm6-part2 h4",{
        x: 10,
        duration:1,
        scroller:"#main",
        
        stagger:{
            amount:-1
        },
        scrollTrigger:{
            trigger:"#btm6-part2",
            scroller:"body",
            start:"top 80%"
        }
    })
}

page6Animations();
 locomotiveAnimation()
function loadingAnimation(){
    var tl = gsap.timeline()
    tl.from("#main", {
        opacity: 0,
        duration: 0.2,
        delay: 0.2
    })
    tl.from("#main", {
        transform: "scaleX(0.7) scaleY(0.2) translateY(80%)",
        borderRadius: "150px",
        duration: 2,
        ease: "expo.out"
    })
    tl.from("nav", {
        opacity: 0,
        delay: -0.2
    })
    tl.from("#page1 h1, #page1 p, #page1 div ", {
        opacity: 0,
        duration: 0.5,
        stagger: 0.2
    })
}

 loadingAnimation()
