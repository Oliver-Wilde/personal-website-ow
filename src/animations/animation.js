import { gsap } from 'gsap';
import { SlowMo } from "gsap/EasePack";
import { Elastic } from 'gsap';

// Create a React-friendly animation utility
export const buttonAnimation = (element) => {
    if (!element) return;

    const circlesTopLeft = element.querySelectorAll('.circle.top-left');
    const circlesBottomRight = element.querySelectorAll('.circle.bottom-right');
    const button = element.querySelector('.button.effect-button');

    const tl = gsap.timeline({ paused: true });
    const tlTopLeft = gsap.timeline();
    const tlBottomRight = gsap.timeline();

    // Top left animations
    tlTopLeft.to(circlesTopLeft, {
        duration: 1.2,
        x: -25,
        y: -25,
        scaleY: 2,
        ease: SlowMo.ease.config(0.1, 0.7, false)
    });
    // Add the remaining animations for top left circles

    // Bottom right animations
    tlBottomRight.to(circlesBottomRight, {
        duration: 1.1,
        x: 30,
        y: 30,
        ease: SlowMo.ease.config(0.1, 0.7, false)
    });
    // Add the remaining animations for bottom right circles

    // Button animation
    tl.add(tlTopLeft);
    tl.to(button, { duration: 0.8, scaleY: 1.1 }, 0.1);
    tl.add(tlBottomRight, 0.2);
    tl.to(button, {
        duration: 1.8,
        scale: 1,
        ease: Elastic.easeOut.config(1.2, 0.4)
    }, 1.2);

    tl.timeScale(2.6);

    return () => tl.restart();
};

export default {
    buttonAnimation,
};
