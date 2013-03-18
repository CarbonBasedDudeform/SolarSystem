function Planet(x,y,z) {
    this.worldX = x;
    this.worldY = y;
    this.worldZ = z;
    
    var buffer;
    var vertices;
    function CreateSphere() {
        
    }
    
    function RecalcCoord(coord) {
        
    }
    
    this.generate = function (radius) {
        buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        vertices = [
            //face one
             0.0,  1.0,  0.0,
            -1.0, -1.0,  0.0,
             1.0, -1.0,  0.0             
        ];
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
        buffer.itemSize = 3;
        buffer.numItems = 3;
    };
    
    this.getWorldPosX = function () {
        return this.worldX;
    }
    
    this.getWorldPosY = function () {
        return this.worldY;
    }
    
    this.getWorldPosZ = function () {
        return this.worldZ;
    }
    
    this.draw = function (pMatrix, mvMatrix) {
        mat4.translate(mvMatrix, [this.worldX, this.worldY, this.worldZ]);
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, buffer.itemSize, gl.FLOAT, false, 0, 0);
        gl.uniformMatrix4fv(shaderProgram.pMatrixUniform, false, pMatrix);
        gl.uniformMatrix4fv(shaderProgram.mvMatrixUniform, false, mvMatrix);
        gl.drawArrays(gl.TRIANGLES, 0, buffer.numItems);
    }
}