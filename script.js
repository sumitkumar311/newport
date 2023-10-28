Shery.imageEffect(".back", {
  style: 5,
  config:{"a":{"value":1.74,"range":[0,30]},"b":{"value":0.75,"range":[-1,1]},"zindex":{"value":-9996999,"range":[-9999999,9999999]},"aspect":{"value":2.0052798307901885},"gooey":{"value":true},"infiniteGooey":{"value":true},"growSize":{"value":4,"range":[1,15]},"durationOut":{"value":1,"range":[0.1,5]},"durationIn":{"value":1.5,"range":[0.1,5]},"displaceAmount":{"value":0.5},"masker":{"value":true},"maskVal":{"value":1.07,"range":[1,5]},"scrollType":{"value":0},"geoVertex":{"range":[1,64],"value":1},"noEffectGooey":{"value":false},"onMouse":{"value":1},"noise_speed":{"value":0.2,"range":[0,10]},"metaball":{"value":0.2,"range":[0,2],"_gsap":{"id":3}},"discard_threshold":{"value":0.5,"range":[0,1]},"antialias_threshold":{"value":0,"range":[0,0.1]},"noise_height":{"value":0.5,"range":[0,2]},"noise_scale":{"value":10,"range":[0,100]}},
  // debug: true,
  gooey: true
});

gsap.from(".nlink", {
  stagger: .2,
  y:20,
  opacity:0,
  duration: 1,
  ease: Power2
})

function firstAnim(){
  var tl = gsap.timeline();

  tl.from(".nav",{
      y: "-10",
      opacity: 0,
      duration: 1,
      ease: Expo.easeInOut
  })
  tl.to(".boundingelem",{
      y: 0,
      ease: Expo.easeInOut,
      duration: 1,
      stagger: .2
  })
  .from("#herofooter", {
    y: -10,
    opacity: 0,
    duration: 1.5,
    delay: -1,
    ease: Expo.easeInOut,
  });
}
firstAnim();

gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector(".part"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the ".part" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy(".part", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector(".part").style.transform ? "transform" : "fixed"
});


