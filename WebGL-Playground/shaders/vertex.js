const vertexShader = `
    uniform mat4 uView;
    uniform mat4 uProjection;
    attribute vec4 aVertexPos;
    
    void main() {
        gl_Position = uProjection * uView * aVertexPos;
    }
`;

export { vertexShader };