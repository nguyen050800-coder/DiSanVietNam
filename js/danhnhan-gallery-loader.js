document.addEventListener('DOMContentLoaded', () => {
    const gridContainer = document.querySelector('.danhnhan-grid');

    if (gridContainer && typeof danhNhanData !== 'undefined') {
        for (const id in danhNhanData) {
            const danhnhan = danhNhanData[id];
            const cardHTML = `
                <a href="danhnhan-detail.html?id=${id}" class="danhnhan-link">
                    <div class="danhnhan-card">
                        <img src="${danhnhan.image}" alt="Chân dung ${danhnhan.name}" loading="lazy">
                        <h3>${danhnhan.name}</h3>
                    </div>
                </a>
            `;
            gridContainer.insertAdjacentHTML('beforeend', cardHTML);
        }
    }
});