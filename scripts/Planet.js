function Planet(x,y,z) {
    this.worldX = x;
    this.worldY = y;
    this.worldZ = z;
    
    var buffer;
    var vertices;
    function CreateSphere(verts) { 
		//tesselate triangle faces
		//aka subdivide each triangle face into 4 triangle faces
		//like so:
		//        ^
		//      /   \
		//     /-----\
		//    / \   / \
		//   /___\ /___\
        alert(verts[1]);
		return verts;
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
             1.0, -1.0,  0.0,
			 //face tw0
			 1.0, -1.0, 0.0,
			 1.0, -1.0, 1.0,
			 0.0, 1.0, 0.0,
			 //face two
			 -1.0, -1.0, 0.0,
			 -1.0, -1.0, 1.0,
			 0.0, 1.0, 0.0,
			 //face three
			 0.0,  1.0,  1.0,
            -1.0, -1.0,  1.0,
             1.0, -1.0,  1.0,
			 
			 //reflect in y-axis -- essentially just change the y value from 1.0 to -2.0 and leave the -1.0 alone for now, probably redo this so (0,0) is the centre as that seems more intuitave       	 
			 //face one
			 0.0,  -2.0,  0.0,
            -1.0, -1.0,  0.0,
             1.0, -1.0,  0.0,
			 //face tw0
			 1.0, -1.0, 0.0,
			 1.0, -1.0, 1.0,
			 0.0, -2.0, 0.0,
			 //face two
			 -1.0, -1.0, 0.0,
			 -1.0, -1.0, 1.0,
			 0.0, -2.0, 0.0,
			 //face three
			 0.0,  -2.0,  1.0,
            -1.0, -1.0,  1.0,
             1.0, -1.0,  1.0,   
        ];
		
		vertices = CreateSphere(vertices);
		
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
        buffer.itemSize = 3; //patch size i.e we're sending 3 sets of coordinates
        buffer.numItems = 24; //this can be caluclated as itemSize * number of faces
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