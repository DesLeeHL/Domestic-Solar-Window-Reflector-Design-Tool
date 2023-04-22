const setSize = (container, camera, renderer, originalAspectRatio) => {
    const aspectRatio = container.clientWidth / container.clientHeight;
    let newWidth, newHeight;

    if (aspectRatio > originalAspectRatio) {
        newWidth = container.clientHeight * originalAspectRatio;
        newHeight = container.clientHeight;
    } else {
        newWidth = container.clientWidth;
        newHeight = container.clientWidth / originalAspectRatio;
    }

    camera.left = -newWidth / 2;
    camera.right = newWidth / 2;
    camera.top = newHeight / 2;
    camera.bottom = -newHeight / 2;
    camera.updateProjectionMatrix();

    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
};

class Resizer {
    constructor(container, camera, renderer) {
        // set initial size on load
        setSize(container, camera, renderer);

        window.addEventListener("resize", () => {
            // set the size again if a resize occurs
            setSize(container, camera, renderer);
            this.onResize();
        });
    }
    onResize() { }
}

export { Resizer };