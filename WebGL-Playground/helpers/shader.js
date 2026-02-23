export class Shader {
    constructor() {
        this.program = null;
    }
    initShader(gl, vertexSource, fragmentSource) {
        const vertexShader = this.#loadShader(gl, gl.VERTEX_SHADER, vertexSource);
        const fragmentShader = this.#loadShader(gl, gl.FRAGMENT_SHADER, fragmentSource);

        const shaderProgram = gl.createProgram();
        gl.attachShader(shaderProgram, vertexShader);
        gl.attachShader(shaderProgram, fragmentShader);
        gl.linkProgram(shaderProgram);

        if (!gl.getProgramParameter((shaderProgram), gl.LINK_STATUS)) {
            alert(
                `Unable to link shader program: ${gl.getProgramInfoLog(shaderProgram)}`,
            );
            return null;
        }

        this.program = shaderProgram;

        return this.program;
    }

    #loadShader(gl, type, source) {
        const shader = gl.createShader(type);
        gl.shaderSource(shader, source);

        gl.compileShader(shader);

        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            alert(
                `Unable to compile shader: ${gl.getShaderInfoLog(shader)}`
            );
            gl.deleteShader(shader);
            return null;
        }

        return shader;
    }
}