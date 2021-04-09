$(document).ready(function () {

 
    // Wow Js Init
    new WOW().init();


    gsap.set('.hero-title-wrap .word', {
        yPercent: 150,
        skewY : 8
    });
    gsap.set('.header-area .nav-stagger', {
        yPercent: -100,
        autoAlpha : 0
    })
    // Global Variable
    var ctrl = new ScrollMagic.Controller();

    /*==================
    ---- ONLOAD ANI-----
    ==================*/
    function OnloadAni(){
        var HeroTitle = $('.hero-title-wrap .word');
        var HeroTl = gsap.timeline();
        // gsap.set(HeroTitle, {y:'100%', rotation:2, autoAlpha:0}); 
        // HeroTl.to(HeroTitle, 0.5, {y:'0%', rotation:0, autoAlpha:1, ease: Power3.easeOut}, 0.15) 
        HeroTl.to(HeroTitle, 1, { 
            yPercent:0,
            easy: 'power3.out',
            delay:0.5,
            skewY:0, 
            stagger:{ 
                amount: 0.3
            }
        })
        HeroTl.to('.header-area .nav-stagger', 0.5, {
            yPercent:0,
            autoAlpha : 1,
            delay : 0.5, 
            stagger:{
                amount : 0.2
            }, 
            easy : 'power3.out'
        }, "-=1") 


    } OnloadAni();


    //WE TRANSFORM ANIM//
        var text1 = $("#we-transform");
        var text2 = $("#into-content");
        var weTrans = new TimelineMax().to(text1, {color: "#ffffff"}).to(text2, {color: "#55fd08"}, 0);
        new ScrollMagic.Scene({
            triggerElement : "#trigger-pin-1",
            offset: $("#pin-text").height()/2,
            duration : $(window).height(),
        })
        .setPin("#pin-text")
        .setTween(weTrans)
        .addTo(ctrl); 

    /*==================
    ---- PARALLAX ANI---
    ==================*/
    $('.hero-area').each(function() {

        var bg = $(this).find('.hero-bg');

        // Add tweenmax for backgroundParallax
        var parallax = TweenMax.to(bg, 1, {
            y: '50%', 
            ease: Linear.easeNone
        })
        // Create scrollmagic scene
        var parallaxScene = new ScrollMagic.Scene({
            triggerElement: this, // <-- Use this to select current element
            triggerHook: 0,
            duration: '100%', 
        })
        .setTween( parallax )
        .addTo(ctrl); 
    });
    $('.parallax-box').each(function() {

        var bg = $(this).find('.parallax-bg');

        // Add tweenmax for backgroundParallax
        var parallax = TweenMax.to(bg, 1, {
            y: '40%',
            ease: Linear.easeNone
        })
        // Create scrollmagic scene
        var parallaxScene = new ScrollMagic.Scene({
            triggerElement: this, // <-- Use this to select current element
            triggerHook: 1,
            duration: '200%',
        })
        .setTween( parallax )
        .addTo(ctrl); 
    });

    // LOGO Animation

    $('.ani-lg-logo').each(function(){
        gsap.set('.ani-lg-logo .logo-part-2 img', {rotationX: -180})  
        gsap.set('.ani-lg-logo .logo-part-4 img', {rotationX: 180}) 
        var LogoTl = TweenMax.to('.ani-lg-logo span img', 1, {rotationX: 0, ease: Linear.easeNone}) 
        new ScrollMagic.Scene({
            triggerElement : this,  
            triggerHook:1,
            duration : '70%' 
        }).setTween(LogoTl).addTo(ctrl); 
    }); 


    // ARROW ANIMATION
    $(".ani-arrowdown-wrap").each(function(){
        var Line = $(this).find('.arrow-down-line');
        gsap.set(Line, {y:"-104%"});  

        var LineTl = TweenMax.to(Line, 0.5, {y:"0%", ease: Linear.easeNone});

        new ScrollMagic.Scene({
            triggerElement : this,
            triggerHook : 0.8,
            duration : '50%' 
        }).setTween(LineTl).addTo(ctrl); 

    });


    $(".camera-wrap").each(function(){
        var camera = $(this).find('.camera'); 
        gsap.set(camera, {rotation: -100, transformOrigin: 'center'});
        var cameraTl = TweenMax.to(camera, 0.5, {rotation: 0, ease: Linear.easeNone});
        new ScrollMagic.Scene({
            triggerElement : this,
            triggerHook : .8,
            duration : '50%', 
        }).setTween(cameraTl).addTo(ctrl); 
    });

    $(".photo-gallery-wrapper").each(function(){ 
        var Photo1 = $(this).find('.img-g-1');
        var Photo2 = $(this).find('.img-g-2');
        var Photo3 = $(this).find('.img-g-3');
        var Photo4 = $(this).find('.img-g-4');
        var Photo = $(this).find('.img-gallery');
        gsap.set(Photo1, {y: 0, x: 0});
        gsap.set(Photo2, {y: "100%", x: -10});
        gsap.set(Photo3, {y: "80%", x: "-35%"});
        gsap.set(Photo4, {y: "-2%", x: "-30%"});
       
        var PhotoTl = TweenMax.to(Photo, 0.5, {y:0, x: 0, ease: Linear.easeNone});
        new ScrollMagic.Scene({
            triggerElement : this,
            triggerHook : 0.8,
            duration : '40%',   
        }).setTween(PhotoTl).addTo(ctrl); 
    });


    $(".dron-wrapper").each(function() {
        var Dron = $(this).find('.dron');
        gsap.set(Dron, {y: 100, x: "-50%", rotation:30})
        var DronTl = new TimelineMax();
        DronTl.to(Dron, 0.5, {y:0, x:0, rotation:0, ease: Linear.easeNone})
        new ScrollMagic.Scene({
            triggerElement : this,
            triggerHook : 0.9,
            duration : '60%',
        }).setTween(DronTl).addTo(ctrl); 
    });


    if ($(window).width() < 900) {
        gsap.set("#card-1", {y: "100%"});
        gsap.set("#card-2", {y: "-100%"});
        var cards = new TimelineMax().to("#card-1", {y: "40%"}).to("#card-2", {y: "-40%"}, 0);
    } else {
        gsap.set("#card-1", {x: 445});
        gsap.set("#card-2", {x: -445});
        var cards = new TimelineMax().to("#card-1, #card-2", {x: 0});
    }

    new ScrollMagic.Scene({
        triggerElement : "#cards-all",
        triggerHook : 1,
        duration : '60%',
    })
    .setTween(cards)
    .addTo(ctrl); 


      //get in touch anim//
      new ScrollMagic.Scene({
          triggerElement : ".contact-section",
          triggerHook: 0,
          duration : "300%"
      })
      .setPin(".contact-section .sec-bg")
      .addTo(ctrl); 


      new ScrollMagic.Scene({
        triggerElement : ".trigger-get",
        triggerHook: .3,
        duration : "100%"
    })
    .setPin(".contact-section .section-title")
    .addTo(ctrl);

    var arrowGetIn = $(".arrow-get-in");
    var arrowRight = TweenMax.to(arrowGetIn, {transform: "translateX(0%)"});
    new ScrollMagic.Scene({
        triggerElement : ".trigger-get",
        triggerHook: .3,
        duration : "100%"
    })
    .setPin(".contact-section .section-get-right .right-ani-arrowdown-wrap")
    .setTween(arrowRight)
    .addIndicators()
    .addTo(ctrl);



});