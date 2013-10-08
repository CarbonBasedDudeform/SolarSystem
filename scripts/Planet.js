function Planet(x,y,z) {
	this.worldX = x;
    this.worldY = y;
    this.worldZ = z;
    
    var _buffer;
    var _vertices;
    	
    	function CreateSphere(verts, radius) { 
		//tesselate triangle faces
		//aka subdivide each triangle face into 4 triangle faces
		//like so:
		//        ^
		//      /   \
		//     /-----\
		//    / \   / \
		//   /___\ /___\
			var newVerts = new Array();
			var patchSize = 9;
			for (var i = 0; i < verts.length; i += patchSize)
			{
				//bottom left triangle
				newVerts.push(verts[i+3]  ); //x
				newVerts.push( (verts[i+4]));
				newVerts.push( RecalcCoord(((verts[i+5])), radius));
				
				newVerts.push( (verts[i+3] + verts[i]) / 2);
				newVerts.push( (verts[i+4] + verts[i+1]) / 2);
				newVerts.push( RecalcCoord(((verts[i+5] + verts[i+2]) / 2), radius));
	
				newVerts.push( (verts[i+3] + verts[i+6]) / 2);
				newVerts.push( (verts[i+4] + verts[i+7]) / 2);
				newVerts.push( RecalcCoord(((verts[i+5] + verts[i+8]) / 2), radius));
				//top triangle
				newVerts.push( (verts[i+3] + verts[i]) / 2);
				newVerts.push( (verts[i+4] + verts[i+1]) / 2);
				newVerts.push( RecalcCoord(((verts[i+5] + verts[i+2]) / 2), radius));
				
				newVerts.push(verts[i]  ); //x
				newVerts.push( (verts[i+1]));
				newVerts.push( RecalcCoord(((verts[i+2])), radius));
	
				newVerts.push( (verts[i] + verts[i+6]) / 2);
				newVerts.push( (verts[i+1] + verts[i+7]) / 2);
				newVerts.push( RecalcCoord(((verts[i+2] + verts[i+8]) / 2), radius));
				//bottom right triangle
				newVerts.push( (verts[i+3] + verts[i+6]) / 2);
				newVerts.push( (verts[i+4] + verts[i+7]) / 2);
				newVerts.push( RecalcCoord(((verts[i+5] + verts[i+8]) / 2), radius));
				
				newVerts.push( (verts[i] + verts[i+6]) /2 ); //x
				newVerts.push( (verts[i+1] + verts[i+7]) /2 );
				newVerts.push( RecalcCoord(((verts[i+2] + verts[i+8]) /2), radius));
	
				newVerts.push(verts[i+6]);
				newVerts.push(verts[i+7]);
				newVerts.push(RecalcCoord((verts[i+8]), radius));
				//middle triangle
				newVerts.push( (verts[i+3] + verts[i]) / 2);
				newVerts.push( (verts[i+4] + verts[i+1]) / 2);
				newVerts.push( RecalcCoord(((verts[i+5] + verts[i+2]) / 2), radius));
				
				newVerts.push( (verts[i] + verts[i+6]) /2 ); //x
				newVerts.push( (verts[i+1] + verts[i+7]) /2 );
				newVerts.push( RecalcCoord(((verts[i+2] + verts[i+8]) /2), radius));
	
				newVerts.push( (verts[i+3] + verts[i+6]) / 2);
				newVerts.push( (verts[i+4] + verts[i+7]) / 2);
				newVerts.push( RecalcCoord(((verts[i+5] + verts[i+8]) / 2), radius));
			}
			
			return newVerts;

    	}
    
    	function RecalcCoord(coord, radius) {
			return coord;
    	}
    
	var _tesselationDepth = 1;
		
    	this.generate = function (radius) {
        	_buffer = gl.createBuffer();
        	gl.bindBuffer(gl.ARRAY_BUFFER, _buffer);
        	_vertices = [
            	//face 1 - forward facing
	    	0.0,  1.0,  0.0,
               -1.0, -1.0,  -1.0,
            	1.0, -1.0,  -1.0,
	    	//face 2 - right side facing
	    	1.0, -1.0, -1.0,
	    	1.0, -1.0, 1.0,
	    	0.0, 1.0, 0.0,
	    	//face 3 - left side facing
	       -1.0, -1.0, -1.0,
	       -1.0, -1.0, 1.0,
	    	0.0, 1.0, 0.0,
	    	//face 4 - rear side facing
	    	0.0,  1.0,  0.0,
               -1.0, -1.0,  1.0,
            	1.0, -1.0,  1.0,
			   
	    	//reflect in y-axis
          	//face 1 - forward facing
	    	0.0,  -3.0,  0.0,
               -1.0, -1.0,  -1.0,
            	1.0, -1.0,  -1.0,
	    	//face 2 - right side facing
	    	1.0, -1.0, -1.0,
	    	1.0, -1.0, 1.0,
	    	0.0, -3.0, 0.0,
	    	//face 3 - left side facing
	       -1.0, -1.0, -1.0,
	       -1.0, -1.0, 1.0,
	    	0.0, -3.0, 0.0,
	    	//face 4 - rear side facing
	    	0.0,  -3.0,  0.0,
               -1.0, -1.0,  1.0,
            	1.0, -1.0,  1.0,
        	];
		
			for (var i = 0; i < _tesselationDepth; i++)
			{
				_vertices = CreateSphere(_vertices, radius);
			}	
		
	        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(_vertices), gl.STATIC_DRAW);
	        _buffer.itemSize = 3; //patch size i.e we're sending 3 sets of coordinates
	    	_buffer.numItems = _vertices.length/3;//24; //this can be caluclated as itemSize * number of faces
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
	
	var _speed = 0.1;
	
	this.moveLeft = function() {
		this.worldX -= _speed;
	}
	
	this.moveRight = function() {
		this.worldX += _speed;
	}
	
	this.moveUp = function() {
		this.worldY += _speed;
	}
	
	this.moveDown = function() {
		this.worldY -= _speed;
	}
	
	var _rotation = 0;
	
	this.rotateClockwise = function() {
		_rotation += _speed;
	}
	
	this.rotateAnticlockwise = function() {
		_rotation -= _speed;
	}
    
    	this.draw = function (pMatrix, mvMatrix) {
        	mat4.translate(mvMatrix, [this.worldX, this.worldY, this.worldZ]);
		mat4.rotate(mvMatrix, _rotation, [0, 1, 0]);
        	gl.bindBuffer(gl.ARRAY_BUFFER, _buffer);
        	gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, _buffer.itemSize, gl.FLOAT, false, 0, 0);
        	gl.uniformMatrix4fv(shaderProgram.pMatrixUniform, false, pMatrix);
        	gl.uniformMatrix4fv(shaderProgram.mvMatrixUniform, false, mvMatrix);
        	gl.drawArrays(gl.TRIANGLES, 0, _buffer.numItems);
    	}
}
