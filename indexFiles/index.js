
const sliderImages = Array.from(document.querySelectorAll('.container img'));
const slidesCount = sliderImages.length;

let currentSlide = 1;
const slideNumberElement = document.getElementById('slide-number');

const nextButton = document.getElementById('next');
const prevButton = document.getElementById('prev');



const removeAllActive =() => {
  sliderImages.forEach( (img) => img.classList.remove('active'));
}

const theChecker = () => {

  removeAllActive();
  sliderImages[currentSlide - 1].classList.add('active');
  currentSlide == 1 ? prevButton.classList.add('disabled'):prevButton.classList.remove('disabled');
  
  currentSlide == slidesCount ? nextButton.classList.add('disabled')
  :nextButton.classList.remove('disabled');

}
const nextSlide = () => {
  nextButton.classList.contains('disabled')
  ? false
  :currentSlide++;
    theChecker();
}


const  prevSlide = () => {
  prevButton.classList.contains('disabled') 
  ? false
  :currentSlide--;
    theChecker();
}
// theChecker();

nextButton.addEventListener("click",nextSlide);
prevButton.addEventListener("click",prevSlide);

setTimeout(theChecker,10)
