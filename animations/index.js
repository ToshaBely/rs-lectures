const node = document.getElementById('js-slider');

function moveNode(distance, duration) {
  const frames = duration / 1000 * 60; //   60 fps
  const delta = distance / frames;

  let currentX = node.getBoundingClientRect().x;
  const max = currentX + distance;

  function animationWithInterval() {
    const intervalId = setInterval(() => {
      currentX += delta;
      // console.log(currentX);
  
      node.style.transform = `translateX(${currentX}px)`;
  
      if (currentX > max) {
        clearInterval(intervalId);
      }
    }, 16);
  }

  function animationWithRequest() {
    const step = () => {
      currentX += delta;

      node.style.transform = `translate(${currentX}px)`;
  
      if (currentX < max) {
        requestAnimationFrame(step);
      }
    };
  
    step();
  }

  animationWithInterval();
  // animationWithRequest();
}

moveNode(510, 1000);
