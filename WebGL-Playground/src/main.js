import { Shader } from "../helpers/shader";
import { drawScene } from "../common/drawScene";
import { initBuffers } from "../helpers/buffer";
import { resizeCanvas } from "../helpers/utils";

// shaders
import { vertexShader } from "../shaders/vertex";
import { fragmentShader } from "../shaders/fragment";

main();

function main() {
  const canvas = document.querySelector("#gl-canvas");

  // Initialize the GL context
  const gl = canvas.getContext("webgl");

  // Only continue if WebGL is available and working
  if (gl === null) {
    alert(
      "Unable to initialize WebGL. Your browser or machine may not support it.",
    );
    return;
  }

  // ---------- RENDERING LOOP ---------- //
  // Set clear color to black, fully opaque
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  // Clear the color buffer with specified clear color
  gl.clear(gl.COLOR_BUFFER_BIT);

  const shaderProgram = new Shader();

  const success = shaderProgram.initShader(gl, vertexShader, fragmentShader);

  if (!success) {
    console.error("ERROR: Shader failed to initialize.");
    return;
  }

  const programInfo = {
    program: shaderProgram.program,
    attribLocations: {
      vertexPosition: gl.getAttribLocation(shaderProgram.program, "aVertexPos")
    },
    uniformLocations: {
      projectionMatrix: gl.getUniformLocation(shaderProgram.program, "uProjection"),
      viewMatrix: gl.getUniformLocation(shaderProgram.program, "uView")
    },
  }

  const buffers = initBuffers(gl);

  resizeCanvas(canvas, gl);

  window.addEventListener("resize", () => {
    resizeCanvas(canvas, gl);
    drawScene(gl, programInfo, buffers);
  })

  drawScene(gl, programInfo, buffers);
}