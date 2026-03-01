function resizeCanvas(canvas, gl) {
    const displayWidth = window.innerWidth;
    const displayHeight = window.innerHeight;
    const scale = window.devicePixelRatio;

    canvas.width = Math.floor(displayWidth * scale);
    canvas.height = Math.floor(displayHeight * scale);

    gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
}

export { resizeCanvas }