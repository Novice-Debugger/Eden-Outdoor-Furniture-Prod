import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

/**
 * Custom hook for common animation patterns
 */
const useAnimation = () => {
    const elementRef = useRef(null);

    // Create a reveal animation that triggers when element is scrolled into view
    const createRevealAnimation = ({
        delay = 0,
        y = 50,
        opacity = 0,
        duration = 0.8,
        ease = 'power3.out',
        stagger = 0.1,
        trigger = null,
        start = 'top 85%',
        markers = false
    } = {}) => {
        const element = trigger || elementRef.current;

        useEffect(() => {
            if (!element) return;

            const children = element.querySelectorAll('.reveal-item');

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: element,
                    start,
                    markers,
                    toggleActions: 'play none none none'
                }
            });

            if (children.length) {
                tl.from(children, {
                    y,
                    opacity,
                    duration,
                    ease,
                    stagger,
                    delay
                });
            } else {
                tl.from(element, {
                    y,
                    opacity,
                    duration,
                    ease,
                    delay
                });
            }

            return () => {
                tl.kill();
                ScrollTrigger.getAll().forEach(st => st.kill());
            };
        }, [element]);
    };

    // Create a parallax effect on scroll
    const createParallaxEffect = ({
        trigger = null,
        target = null,
        speed = 0.5,
        start = 'top bottom',
        end = 'bottom top',
        markers = false
    } = {}) => {
        const element = trigger || elementRef.current;
        const targetElement = target || element.querySelector('.parallax-item');

        useEffect(() => {
            if (!element || !targetElement) return;

            const parallaxEffect = gsap.fromTo(
                targetElement,
                { y: 0 },
                {
                    y: () => speed * 100,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: element,
                        start,
                        end,
                        scrub: true,
                        markers
                    }
                }
            );

            return () => {
                parallaxEffect.kill();
                ScrollTrigger.getAll().forEach(st => st.kill());
            };
        }, [element, targetElement]);
    };

    // Create a fade-in stagger effect
    const createStaggerAnimation = ({
        delay = 0,
        duration = 0.8,
        stagger = 0.1,
        ease = 'power3.out',
        from = { y: 20, opacity: 0 },
        trigger = null,
        items = '.stagger-item',
        start = 'top 85%',
        markers = false
    } = {}) => {
        const element = trigger || elementRef.current;

        useEffect(() => {
            if (!element) return;

            const children = element.querySelectorAll(items);

            if (!children.length) return;

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: element,
                    start,
                    markers,
                    toggleActions: 'play none none none'
                }
            });

            tl.from(children, {
                ...from,
                duration,
                stagger,
                ease,
                delay
            });

            return () => {
                tl.kill();
                ScrollTrigger.getAll().forEach(st => st.kill());
            };
        }, [element]);
    };

    return {
        elementRef,
        createRevealAnimation,
        createParallaxEffect,
        createStaggerAnimation
    };
};

export default useAnimation;