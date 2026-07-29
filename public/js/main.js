document.addEventListener('DOMContentLoaded', () => {
    // 1. Carrusel Principal de Portada (Autoplay, Flechas y Táctil / Swipe)
    const slides = document.querySelectorAll('.mySwiper .swiper-slide');
    const btnNext = document.querySelector('.mySwiper .swiper-button-next');
    const btnPrev = document.querySelector('.mySwiper .swiper-button-prev');
    const sliderContainer = document.querySelector('.mySwiper');
    let currentIndex = 0;
    let autoplayInterval;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.style.display = (i === index) ? 'block' : 'none';
        });
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % slides.length;
        showSlide(currentIndex);
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        showSlide(currentIndex);
    }

    function startAutoplay() {
        autoplayInterval = setInterval(nextSlide, 4000);
    }

    function resetAutoplay() {
        clearInterval(autoplayInterval);
        startAutoplay();
    }

    if (slides.length > 0) {
        showSlide(currentIndex);
        startAutoplay();

        // Eventos de las flechas
        if (btnNext) btnNext.addEventListener('click', () => { nextSlide(); resetAutoplay(); });
        if (btnPrev) btnPrev.addEventListener('click', () => { prevSlide(); resetAutoplay(); });

        // Eventos táctiles (Swipe)
        let touchStartX = 0;
        let touchEndX = 0;

        if (sliderContainer) {
            sliderContainer.addEventListener('touchstart', (e) => {
                touchStartX = e.changedTouches[0].screenX;
            }, { passive: true });

            sliderContainer.addEventListener('touchend', (e) => {
                touchEndX = e.changedTouches[0].screenX;
                const swipeThreshold = 50;
                
                if (touchEndX < touchStartX - swipeThreshold) {
                    nextSlide();
                    resetAutoplay();
                }
                if (touchEndX > touchStartX + swipeThreshold) {
                    prevSlide();
                    resetAutoplay();
                }
            }, { passive: true });
        }
    }

    // 2. Header dinámico y Botón de WhatsApp al hacer Scroll
    window.addEventListener('scroll', () => {
        const header = document.querySelector('header');
        const whatsappBtn = document.querySelector('.whatsapp-float');
        const scrollPosition = window.scrollY;

        if (header) header.classList.toggle('shrink', scrollPosition > 50);
        if (whatsappBtn) whatsappBtn.classList.toggle('show', scrollPosition > 50);
    });
    
    // 3. Modal de Imagen por delegación de eventos
    document.addEventListener('click', (e) => {
        const modal = document.getElementById('imageModal');
        const modalImg = document.getElementById('modalImg');

        if (modal && modalImg && e.target.tagName === 'IMG' && e.target.closest('.producto-card')) {
            modal.style.display = 'flex';
            modalImg.src = e.target.src;
        }
    });

    // 4. Control del Menú Hamburguesa Lateral
    const menuBtn = document.querySelector('.menu-btn');
    const menuLateral = document.getElementById('menuLateral');
    const menuOverlay = document.getElementById('menuOverlay');
    const menuCerrar = document.getElementById('menuCerrar');

    function abrirMenu(e) {
        if (e) e.stopPropagation();
        if (menuLateral) menuLateral.classList.add('activo');
        if (menuOverlay) menuOverlay.classList.add('activo');
    }

    function cerrarMenu() {
        if (menuLateral) menuLateral.classList.remove('activo');
        if (menuOverlay) menuOverlay.classList.remove('activo');
    }

    if (menuBtn) menuBtn.addEventListener('click', abrirMenu);
    if (menuCerrar) menuCerrar.addEventListener('click', cerrarMenu);
    if (menuOverlay) menuOverlay.addEventListener('click', cerrarMenu);

    const modal = document.getElementById('imageModal');
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.style.display = 'none';
        });
    }
});