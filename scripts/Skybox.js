function Skybox()
{
  this.Texture = gl.createTexture();

  this.Init = function()
  {
      //this.Texture = gl.createTexture();
      this.Texture.image = new Image();
      var that = this;
      this.Texture.image.onload = function () {
        that.textureHasLoaded(that.Texture);
      }
      this.Texture.image.src = "images/stars.jpg";
  }

  this.textureHasLoaded = function(Texture) {
    gl.bindTexture(gl.TEXTURE_2D, Texture);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, Texture.image);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.bindTexture(gl.TEXTURE_2D, null);
  }

  this.buffer;
  this.vertsBuffer;
  this.indexBuffer;

  this.generate = function() {
    this.buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
    var texCoords = [
      //far wall
        0.0, 0.0,
        1.0, 0.0,
        1.0, 1.0,
        0.0, 1.0,

      //near wall
        0.0, 0.0,
        1.0, 0.0,
        1.0, 1.0,
        0.0, 1.0,

      //left wall
        0.0, 0.0,
        1.0, 0.0,
        1.0, 1.0,
        0.0, 1.0,

      //right wall
          0.0, 0.0,
          1.0, 0.0,
          1.0, 1.0,
          0.0, 1.0,

      //floor
          0.0, 0.0,
          1.0, 0.0,
          1.0, 1.0,
          0.0, 1.0,

          //ceiling
              0.0, 0.0,
              1.0, 0.0,
              1.0, 1.0,
              0.0, 1.0,
    ];

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(texCoords), gl.STATIC_DRAW);
    this.buffer.itemSize = 2;
    this.buffer.numItems = 24;

    this.vertsBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vertsBuffer);

    var verts = [
      //far wall
      -2000.0, -2000.0,-2000.0,
      -2000.0, 2000.0,-2000.0,
      2000.0, 2000.0,-2000.0,
      2000.0, -2000.0,-2000.0,

      //near wall
      -2000.0, -2000.0,2000.0,
      -2000.0, 2000.0,2000.0,
      2000.0, 2000.0,2000.0,
      2000.0, -2000.0,2000.0,

      //left wall
      -2000.0, -2000.0,2000.0,
      -2000.0, 2000.0,2000.0,
      -2000.0, 2000.0,-2000.0,
      -2000.0, -2000.0,-2000.0,

      //right wall
      2000.0, -2000.0,2000.0,
      2000.0, 2000.0,2000.0,
      2000.0, 2000.0,-2000.0,
      2000.0, -2000.0,-2000.0,

      //floor
      -2000.0, -2000.0,2000.0,
      -2000.0, -2000.0,-2000.0,
      2000.0, -2000.0,-2000.0,
      2000.0, -2000.0,2000.0,

      //ceiling
      -2000.0, 2000.0,2000.0,
      -2000.0, 2000.0,-2000.0,
      2000.0, 2000.0,-2000.0,
      2000.0, 2000.0,2000.0,
    ];

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(verts), gl.STATIC_DRAW);
    this.vertsBuffer.itemSize = 3;
    this.vertsBuffer.numItems = 24;

    this.indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
    var indices = [
      0, 1, 2,
      2, 3, 0,

      4,5,6,
      6,7,4,

      8,9,10,
      10,11, 8,

      12, 13, 14,
      14, 15, 12,

      16, 17 ,18,
      18, 19, 16,

      20, 21, 22,
      22, 23, 20,
    ];
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
    this.indexBuffer.itemSize = 1;
    this.indexBuffer.numItems = 36;
  }

  this.render=  function(pMatrix, mvMatrix, shader) {
    gl.useProgram(shader);
    gl.enableVertexAttribArray(shader.vertexPositionAttribute);
    gl.enableVertexAttribArray(shader.textureCoordAttribute);

    gl.bindBuffer(gl.ARRAY_BUFFER, this.vertsBuffer);
    gl.vertexAttribPointer(shader.vertexPositionAttribute, this.vertsBuffer.itemSize, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
    gl.vertexAttribPointer(shader.textureCoordAttribute, this.buffer.itemSize, gl.FLOAT, false, 0, 0);

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, this.Texture);
    gl.uniform1i(shader.samplerUniform, 0);

    //switch to index buffer
    gl.uniformMatrix4fv(shader.pMatrixUniform, false, pMatrix);
    gl.uniformMatrix4fv(shader.mvMatrixUniform, false, mvMatrix);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
    gl.drawElements(gl.TRIANGLES, this.indexBuffer.numItems, gl.UNSIGNED_SHORT, 0);

    //clean up
    gl.disableVertexAttribArray(shader.vertexPositionAttribute);
    gl.disableVertexAttribArray(shader.textureCoordAttribute);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
  }
}
