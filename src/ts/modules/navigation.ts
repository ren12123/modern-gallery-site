export const initNavigation = (): void => {
    const sideBtn = document.querySelector<HTMLElement>('.side-nav');
    const heroElement = document.querySelector<HTMLElement>('.hero');
    const accessSection = document.querySelector<HTMLElement>('.access');
    const hamBurger = document.querySelector<HTMLElement>('.header__hamburger');
    const serchMenu = document.querySelector<HTMLElement>('.menu');
    const header = document.querySelector<HTMLElement>('.header');

    let ticking = false;

    const handleSideBtnDisplay = () => {
        if (!heroElement || !sideBtn || !accessSection) return;
        const heroRect = heroElement.getBoundingClientRect();
        const accessRect = accessSection.getBoundingClientRect();
        const vh = window.innerHeight;

        if (heroRect.top < 100 && accessRect.top > (vh + 100)) {
            sideBtn.classList.add('is-activate');
        } else {
            sideBtn.classList.remove('is-activate');
        }
    };

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                handleSideBtnDisplay();
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });

    // ハンバーガーメニュー：SCSSのクラス名と連動
    if (hamBurger && header && serchMenu) {
        hamBurger.addEventListener('click', () => {
            hamBurger.classList.toggle('is-active'); // spanのアニメーション用
            header.classList.toggle('is-open');     // 背景の高さ用
            
            if (hamBurger.classList.contains('is-active')) {
                serchMenu.classList.add('is-active'); // メニュー表示用
            } else {
                serchMenu.classList.remove('is-active');
            }
        });
    }
};