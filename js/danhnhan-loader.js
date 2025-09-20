document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const danhNhanId = params.get('id');
    const data = danhNhanData[danhNhanId];

    if (data) {
        document.title = `Tiểu sử ${data.name}`;
        document.getElementById('detail-image').src = data.image;
        document.getElementById('detail-image').alt = `Chân dung ${data.name}`;
        document.getElementById('detail-name').textContent = data.name;
        document.getElementById('detail-quote').textContent = `"${data.quote}"`;

        const bioContainer = document.getElementById('detail-bio');
        bioContainer.innerHTML = '';
        data.bio.forEach(paragraph => {
            const p = document.createElement('p');
            p.textContent = paragraph;
            bioContainer.appendChild(p);
        });
    } else {
        const container = document.querySelector('.detail-container');
        if (container) {
            container.innerHTML = '<h1 style="text-align: center; width: 100%;">Không tìm thấy thông tin danh nhân.</h1>';
        }
    }

    const container = document.getElementById('portrait-3d-container');
    if (container) {
        const MAX_ROTATION = 8; 

        container.addEventListener('mousemove', (e) => {
            const rect = container.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -MAX_ROTATION;
            const rotateY = ((x - centerX) / centerX) * MAX_ROTATION;

            container.style.transform = `perspective(1500px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

            const glow = container.querySelector('.card-glow');
            if (glow) {
                glow.style.left = `${x}px`;
                glow.style.top = `${y}px`;
            }
        });

        container.addEventListener('mouseleave', () => {
            container.style.transform = 'perspective(1500px) rotateX(0) rotateY(0)';
        });
    }
});