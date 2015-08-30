function Planet( settings) {
	console.log(settings);
		this.worldX = settings.position.x;
    this.worldY = settings.position.y;
    this.worldZ = settings.position.z;
	console.log(this.worldX);

   	this._orbitX = settings.orbit.x;
   	this._orbitZ = settings.orbit.y;
		this._orbitY = settings.orbit.z;
		this._speed = settings.speed;

	this.setSpeed = function(v)
	{
		this._speed = v;
	}

  this.orbit = function(t) {
  	//orbit in a circle in XY plane only
  	//can overide this to give more specialised/eccentric orbits in the future
  	//but because there are no complex orbits in the solar system just gonna fake it and move everything around in a circle
  	this.worldX = ( ( Math.sin(t * this._speed ) * this._orbitX ));
  	this.worldZ = ( ( Math.cos(t * this._speed ) * this._orbitZ ));
		this.worldY = ( ( Math.sin(t * this._speed)) * this._orbitY );
  }

  this.CreateSphere = function(verts, radius) {
	//tesselate triangle faces
	//aka subdivide each triangle face into 4 triangle faces
	//like so:
	//        ^
	//      /   \
	//     /-----\
	//    / \   / \
	//   /___\ /___\

	var patchSize = 9;
	var newVerts = new Array();
	var that = this;

		function RecalcCoord(coords, radius) {
				var result = [];
				var dist = that.VectorLength(coords[0], coords[1], coords[2]);
				if (dist <= radius) {
					var normalizedX = that.Normalize(coords[0], dist);
					var normalizedY = that.Normalize(coords[1], dist);
					var normalizedZ = that.Normalize(coords[2], dist);
					result.push(normalizedX * radius);
					result.push(normalizedY * radius);
					result.push(normalizedZ * radius);
				} else {
					result = coords;
				}
			return result;
		}
		function RecalcProcedure(x, y, z) {
			var coords =	RecalcCoord([x, y, z], radius);
			newVerts.push(coords[0]); //x
			newVerts.push(coords[1]);
			newVerts.push(coords[2]);
		}
		function RecalcProc(coord) { RecalcProcedure(coord[0], coord[1], coord[2]); }
		function RecalcProcHalf(coord1, coord2) {
			RecalcProcedure( (coord1[0] + coord2[0]) / 2,
											 (coord1[1] + coord2[1]) / 2,
											 (coord1[2] + coord2[2]) / 2);
		}

		for (var i = 0; i < verts.length; i += patchSize)
		{
				//bottom left triangle
				var left = [verts[i+3], verts[i+4], verts[i+5]];
				var top = [verts[i], verts[i+1], verts[i+2]];
				var right = [verts[i+6], verts[i+7], verts[i+8]];

			 	RecalcProc(left);
				RecalcProcHalf(left, top);
				RecalcProcHalf(left, right);
				RecalcProcHalf(left, top);

				RecalcProc(top);
				RecalcProcHalf(top, right);
				RecalcProcHalf(left, right);
				RecalcProcHalf(top, right);

				RecalcProc(right);
				RecalcProcHalf(left, top);
				RecalcProcHalf(top, right);
				RecalcProcHalf(left, right);
		}

		return newVerts;
  }


	this.VectorLength = function(vectorX, vectorY, vectorZ) {
		return Math.sqrt( (vectorX*vectorX ) + (vectorY * vectorY) + (vectorZ * vectorZ) );
	}

	this.Normalize = function(vector, Distance)
	{
		if (Distance == 0) {
			alert("Divide by Zero in Normalize function");
			return -1;
		} else {
			return vector/Distance;
		}
	}

  var _buffer;
	var _vertices = [
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
							1.0, -1.0,  1.0
	];

	var _tessellationDepth = 5;
	var _radius = 1;

  this.generate = function (radius) {
    	_buffer = gl.createBuffer();
    	gl.bindBuffer(gl.ARRAY_BUFFER, _buffer);

			for (var i = 0; i < _tessellationDepth; i++) {
				_vertices = this.CreateSphere(_vertices, radius);
			}

       gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(_vertices), gl.STATIC_DRAW);
       _buffer.itemSize = 3; //patch size i.e we're sending 3 sets of coordinates
   		_buffer.numItems = _vertices.length/3;//24; //this can be caluclated as itemSize * number of faces
			_radius = radius;
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

	this.shaderProgram;

  this.draw = function (pMatrix, mvMatrix) {
  	gl.useProgram(this.shaderProgram);
  	gl.enableVertexAttribArray(this.shaderProgram.vertexPositionAttribute);
   	mat4.translate(mvMatrix, [this.worldX, this.worldY, this.worldZ]);
  	gl.bindBuffer(gl.ARRAY_BUFFER, _buffer);
   	gl.vertexAttribPointer(this.shaderProgram.vertexPositionAttribute, _buffer.itemSize, gl.FLOAT, false, 0, 0);
   	gl.uniformMatrix4fv(this.shaderProgram.pMatrixUniform, false, pMatrix);
   	gl.uniformMatrix4fv(this.shaderProgram.mvMatrixUniform, false, mvMatrix);
   	gl.drawArrays(gl.TRIANGLES, 0, _buffer.numItems);
   	mat4.translate(mvMatrix, [-this.worldX, -this.worldY, -this.worldZ]);

		gl.disableVertexAttribArray(this.shaderProgram.vertexPositionAttribute);
		gl.bindBuffer(gl.ARRAY_BUFFER, null);
 	}
}
