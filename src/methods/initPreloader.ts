// credits https://css-tricks.com/lets-make-a-fancy-but-uncomplicated-page-loader/
export const initPreloader: () => void = (): void => {
    const preloader: HTMLDivElement = document.querySelector('#preloader');
    const fadeEffect = setInterval(() => {
        // if we don't set opacity 1 in CSS, then   //it will be equaled to "", that's why we check it
        if (!preloader.style.opacity) {
            preloader.style.opacity = 1 + '';
        }
        const oldOpacity: number = Number(preloader.style.opacity);
        if (oldOpacity > 0) {
            const newOpacity: number = oldOpacity - 0.02;
            preloader.style.opacity = newOpacity + '';
        } else {
            clearInterval(fadeEffect);
            preloader.style.display = 'none';
        }
    }, 50);
}