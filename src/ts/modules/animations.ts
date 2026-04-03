export const initAnimations = (): void => {
    const fadeElements = document.querySelectorAll<HTMLElement>('.fadeup');
    const inOutImages = document.querySelectorAll<HTMLElement>('.in-out'); 
    const triggerImg6 = document.querySelector<HTMLElement>('.gallery__item--even.in-out'); 
    const accessSection = document.querySelector<HTMLElement>('.access');
    const accessContent = document.querySelector<HTMLElement>('.access__content');

    // フェードアニメーション
    const generalObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-animated');
            }
        });
    }, { threshold: 0.1 });

    fadeElements.forEach(el => generalObserver.observe(el));

    // 背景連動：元のJSロジックを完全再現
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            const rect = entry.boundingClientRect;
            const wh = window.innerHeight;

            if (!entry.isIntersecting && rect.top > wh) {
                inOutImages.forEach(img => img.classList.remove('is-hidden'));
                if (accessSection) accessSection.classList.remove('is-bg-active');
                return;
            }

            if (entry.target === triggerImg6) {
                if (rect.top < wh / 3) { 
                    inOutImages.forEach(img => img.classList.add('is-hidden'));
                    if (accessSection) accessSection.classList.add('is-bg-active');
                } else {
                    inOutImages.forEach(img => img.classList.remove('is-hidden'));
                    if (accessSection) accessSection.classList.remove('is-bg-active');
                }
            }

            if (entry.target === accessContent && accessSection) {
                if (rect.top < wh / 3) {
                    accessSection.classList.remove('is-bg-active');
                } else if (rect.top > wh / 3) {
                    if (triggerImg6) {
                        const img6Rect = triggerImg6.getBoundingClientRect();
                        if (img6Rect.top < wh / 3) {
                            accessSection.classList.add('is-bg-active');
                        }
                    }
                }
            }
        });
    }, {
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0]
    });

    if (triggerImg6) scrollObserver.observe(triggerImg6);
    if (accessContent) scrollObserver.observe(accessContent);
};