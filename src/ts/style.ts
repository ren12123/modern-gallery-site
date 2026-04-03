import { initParallax } from './modules/parallax';
import { initNavigation } from './modules/navigation';
import { initAnimations } from './modules/animations';

document.addEventListener('DOMContentLoaded', () => {
    initParallax();
    initNavigation();
    initAnimations();
});