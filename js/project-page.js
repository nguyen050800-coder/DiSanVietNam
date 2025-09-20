document.addEventListener('DOMContentLoaded', function () {
    const currentPhoto = document.getElementById('current-photo');
    const thumbnails = document.querySelectorAll('.thumbnail');

    if (!currentPhoto || thumbnails.length === 0) return;

    thumbnails.forEach(thumb => {
        thumb.addEventListener('click', function () {
            currentPhoto.src = this.src;

            thumbnails.forEach(innerThumb => innerThumb.classList.remove('active'));

            this.classList.add('active');
        });
    });
});

const container = document.getElementById('comparison-container');

if (container) {
    const handle = container.querySelector('.slider-handle');
    const afterImage = container.querySelector('.after-image');

    let isDragging = false;

    // Bắt đầu kéo
    handle.addEventListener('mousedown', () => { isDragging = true; });
    handle.addEventListener('touchstart', () => { isDragging = true; });

    // Kết thúc kéo
    window.addEventListener('mouseup', () => { isDragging = false; });
    window.addEventListener('touchend', () => { isDragging = false; });

    // Di chuyển
    container.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        moveSlider(e.pageX);
    });
    container.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        moveSlider(e.touches[0].pageX);
    });

    function moveSlider(x_pos) {
        const rect = container.getBoundingClientRect();
        let position = ((x_pos - rect.left) / rect.width) * 100;

        // Giới hạn vị trí từ 0 đến 100
        if (position < 0) position = 0;
        if (position > 100) position = 100;

        handle.style.left = position + '%';
        afterImage.style.clipPath = `polygon(${position}% 0, 100% 0, 100% 100%, ${position}% 100%)`;
    }
}