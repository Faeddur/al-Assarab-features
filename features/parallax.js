// Parallax for inner contains
// const settings = {
//     min: 0, 
//     max: 50,
//     unit: '%',
// };

const interpolation = (value, min, max, newMin, newMax) => {
    let newValue = ( (value-min) / (max-min) ) * (newMax-newMin) + newMin;
    return newValue;
};

const initParallax = (elem, settings) => {
    if(elem.hasChildNodes()){
        const align = elem.dataset.parallax;
        const childs = Array.from(elem.children);
        if(childs.length && (childs[0].tagName == 'IMG' || childs[0].tagName == 'VIDEO' || childs[0].tagName == 'CANVAS')) {
            const child = childs[0];
            let prevValue = 0;

            const animate = () => {
                const box = elem.getBoundingClientRect();
                if(box.top + box.height >= 0 && box.top < window.innerHeight) {
                    let topTrigger;
                    switch(align) {
                        case 'bottom':
                            topTrigger = window.innerHeight - box.height * 0.5;
                            break;
                        case 'center':
                            topTrigger = window.innerHeight * 0.5 - box.height * 0.5;
                            break;
                        default:
                            topTrigger = 0;
                    }

                    let normalValue = interpolation(box.top, topTrigger, topTrigger + window.innerHeight, settings.min, settings.max);
                    normalValue = -normalValue.toFixed(2);

                    if(normalValue !== prevValue) {
                        child.style.transform = `scale(1.1) translate3d(0, ${normalValue}${settings.unit}, 0)`;
                    }
                    prevValue = normalValue;
                }
                
                requestAnimationFrame(animate);
            }
            animate();
        }
    }
};
//

const elems = document.querySelectorAll('[data-parallax]');
Array.from(elems).forEach((el) => {
    initParallax(el, {
        min: 0,
        max: 50,
        unit: '%',
    });
});
