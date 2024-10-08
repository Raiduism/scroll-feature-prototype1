const slider = document.getElementById('descriptionSlider');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

let currentIndex = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;

slider.style.width = `${totalSlides * 100}%`;

prevBtn.addEventListener('click', () => moveSlide('prev'));
nextBtn.addEventListener('click', () => moveSlide('next'));

let isDragging = false;
let startPos = 0;
let currentTranslate = 0;
let prevTranslate = 0;

slider.addEventListener('mousedown', startDrag);
slider.addEventListener('mouseup', endDrag);
slider.addEventListener('mousemove', dragMove);
slider.addEventListener('mouseleave', endDrag);
slider.addEventListener('touchstart', startDrag);
slider.addEventListener('touchend', endDrag);
slider.addEventListener('touchmove', dragMove);

function moveSlide(direction) {
    if (direction === 'prev') {
        currentIndex = Math.max(currentIndex - 1, 0);
    } else if (direction === 'next') {
        currentIndex = Math.min(currentIndex + 1, totalSlides - 1);
    }
    updateSliderPosition();
}

function startDrag(e) {
    isDragging = true;
    startPos = getPositionX(e);
    slider.style.cursor = 'grabbing';
}

function dragMove(e) {
    if (isDragging) {
        const currentPos = getPositionX(e);
        currentTranslate = prevTranslate + currentPos - startPos;
        slider.style.transform = `translateX(${currentTranslate}px)`;
    }
}

function endDrag() {
    isDragging = false;
    slider.style.cursor = 'grab';

    const movedBy = currentTranslate - prevTranslate;

    if (movedBy < -100 && currentIndex < totalSlides - 1) {
        currentIndex++;
    } else if (movedBy > 100 && currentIndex > 0) {
        currentIndex--;
    }

    updateSliderPosition();
}

function updateSliderPosition() {
    currentTranslate = currentIndex * -slider.clientWidth;
    prevTranslate = currentTranslate;
    slider.style.transform = `translateX(${currentTranslate}px)`;
}

function getPositionX(e) {
    return e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
}
