export const initParallax = (): void => {
    const allImg = document.querySelectorAll<HTMLElement>('.main-gallery__img');
    let ticking = false;

    const updateHeroAnimation = () => {
        const scrollY = window.scrollY;
        if (window.innerWidth > 768) {
            const moveAmount = scrollY * 1.8;
            const scaleAmount = Math.min(1 + scrollY * 0.003, 3);
            allImg.forEach((img) => {
                if (img.classList.contains('main-gallery__img--left')) {
                    img.style.transform = `translateX(-${moveAmount}px) scale(${scaleAmount})`;
                } else if (img.classList.contains('main-gallery__img--right')) {
                    img.style.transform = `translateX(${moveAmount}px) scale(${scaleAmount})`;
                } else {
                    img.style.transform = `scale(${scaleAmount})`;
                }
            });
        }
    };

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                updateHeroAnimation();
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });
};