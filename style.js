document.addEventListener('DOMContentLoaded', () => {
    // --- 1. メインギャラリーのパララックス ---
    const allImg = document.querySelectorAll('.main-gallery__img');
    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                updateHeroAnimation();
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });

    function updateHeroAnimation() {
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
    }

    // --- 2. 通常のフェードアップ (IntersectionObserver) ---
    const fadeElements = document.querySelectorAll('.fadeup');
    const generalObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-animated');
            }
        });
    }, { threshold: 0.1 });

    fadeElements.forEach(el => generalObserver.observe(el));

    // --- 3. 画像5-6の消去とAccess背景の連動 ---
    const inOutImages = document.querySelectorAll('.in-out'); // 画像5, 6
    const triggerImg5 = document.querySelector('.picture-left.in-out'); // 画像5を基準
    const accessSection = document.querySelector('.access');
    const accessContent = document.querySelector('.access__content');

    // 監視ロジック: 画像5が「半分隠れた」タイミングを検知
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            const rect = entry.boundingClientRect;
            
            // 画像5に対する判定
            if (entry.target === triggerImg5) {
                // 中心より上に行った（半分隠れた）判定
                if (rect.top < window.innerHeight / 2 && entry.intersectionRatio < 0.6) {
                    inOutImages.forEach(img => img.classList.add('is-hidden'));
                    accessSection.classList.add('is-bg-active');
                } else {
                    inOutImages.forEach(img => img.classList.add('is-hidden')); // 下にスクロール中は消す
                    // もし戻ってきたら表示させる場合はここを remove に
                    if (rect.top > 0) {
                         inOutImages.forEach(img => img.classList.remove('is-hidden'));
                         accessSection.classList.remove('is-bg-active');
                    }
                }
            }

            // Access文章に対する判定（半分を超えたら背景消去）
            if (entry.target === accessContent) {
                if (rect.top < window.innerHeight / 2) {
                    accessSection.classList.remove('is-bg-active');
                }
            }
        });
    }, {
        threshold: [0, 0.5, 1.0] // 半分の状態を検知できるように設定
    });

    if (triggerImg5) scrollObserver.observe(triggerImg5);
    if (accessContent) scrollObserver.observe(accessContent);
});