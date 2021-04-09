// https://gist.github.com/gre/1650294
const EasingFunctions = {
    // no easing, no acceleration
    linear: t => t,
    // accelerating from zero velocity
    easeInQuad: t => t*t,
    // decelerating to zero velocity
    easeOutQuad: t => t*(2-t),
    // acceleration until halfway, then deceleration
    easeInOutQuad: t => t<.5 ? 2*t*t : -1+(4-2*t)*t,
    // accelerating from zero velocity 
    easeInCubic: t => t*t*t,
    // decelerating to zero velocity 
    easeOutCubic: t => (--t)*t*t+1,
    // acceleration until halfway, then deceleration 
    easeInOutCubic: t => t<.5 ? 4*t*t*t : (t-1)*(2*t-2)*(2*t-2)+1,
    // accelerating from zero velocity 
    easeInQuart: t => t*t*t*t,
    // decelerating to zero velocity 
    easeOutQuart: t => 1-(--t)*t*t*t,
    // acceleration until halfway, then deceleration
    easeInOutQuart: t => t<.5 ? 8*t*t*t*t : 1-8*(--t)*t*t*t,
    // accelerating from zero velocity
    easeInQuint: t => t*t*t*t*t,
    // decelerating to zero velocity
    easeOutQuint: t => 1+(--t)*t*t*t*t,
    // acceleration until halfway, then deceleration 
    easeInOutQuint: t => t<.5 ? 16*t*t*t*t*t : 1+16*(--t)*t*t*t*t
  }
  
  const slider = document.querySelector('.slider__inner');
  const sliderWidth = slider.clientWidth;
  const slides = [...slider.querySelectorAll('.slide')]
    .map(el => ({
      el,
      r: (sliderWidth - el.clientWidth) / 2 / el.clientWidth * 100,
    }));
  
  
  let rafId = null;
  let rotAngle = 0;
  function animate(angle = 0, duration = 1000) {
    const closestAngle = Math.PI / 2;
    const from = rotAngle;
    const to = angle;
    
    let begin = 0;
    const loop = (now) => {
      begin = begin || now;
      const t = Math.min(1, (now - begin) / duration);
      const ease = EasingFunctions.easeInQuad(t);
      rotAngle = lerp(from, to, ease);
      
      for (let i = 0; i < slides.length; i++) {
        const slide = slides[i];
        const angle = 2 * Math.PI * i / slides.length + rotAngle;
        const x = Math.cos(angle) * slide.r;
        const y = Math.sin(angle) * slide.r;
        const aDist = Math.abs(Math.abs(angle) % (Math.PI * 2) - closestAngle) / Math.PI;
  
        slide.el.style.transform = `translate3d(${x}%, ${y}%, ${-aDist * 100}px)`;
      }
      rafId = t === 1 ? null : requestAnimationFrame(loop);
    };
    
    rafId = requestAnimationFrame(loop);
  }
  
  function lerp(v0, v1, t) {
    return (1 - t) * v0 + t * v1;
  }
  
  
  function autoPlay(c = 0) {
    if (!document.hidden) {
      const angle = Math.PI * 2 * c / 4;
      animate(angle, 1000);
      c++;
    }
    setTimeout(autoPlay, 3000, c);
  }
  autoPlay()