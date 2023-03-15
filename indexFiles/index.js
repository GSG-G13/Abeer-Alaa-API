const sliderImages = Array.from(document.querySelectorAll('.container img'));
const nextButton = document.getElementById('next');
const prevButton = document.getElementById('prev');
const slidesCount = sliderImages.length;

let currentSlide = 1;

const theChecker = () => {
sliderImages[currentSlide -1].classList.add('active');
   currentSlide == 1 ? prevButton.classList.add('disabled')
   :prevButton.classList.remove('disabled');
  
  currentSlide == slidesCount ? nextButton.classList.add('disabled')
  :nextButton.classList.remove('disabled');
  if(currentSlide === 1) {
    currentSlide = 1
  }
   if(currentSlide === slidesCount) {
    currentSlide = slidesCount
    clearInterval(myInterval)

  }
  currentSlide++
}

const myInterval = setInterval(theChecker,1000)



