var BinaryReader = (function(){
	function create(arrayBuffer, index){
		var binaryReader = {};
    binaryReader.arrayBuffer = arrayBuffer;
		binaryReader.dataView = new DataView(arrayBuffer);
		binaryReader.index = index || 0;
		binaryReader.bitOffset = 0;
		bind(binaryReader);
		return binaryReader;
	}
	function bind(binaryReader){
		binaryReader.readInt8 = readInt8.bind(binaryReader);
    binaryReader.peekInt8 = peekInt8.bind(binaryReader);
    //peekSnappedInt8
		binaryReader.readInt8Array = readInt8Array.bind(binaryReader);
		//peekInt8Array
    binaryReader.readUint8 = readUint8.bind(binaryReader);
    binaryReader.peekUint8 = peekUint8.bind(binaryReader);
    binaryReader.peekSnappedUint8 = peekSnappedUint8.bind(binaryReader);
    binaryReader.readUint8Array = readUint8Array.bind(binaryReader);
		binaryReader.peekUint8Array = peekUint8Array.bind(binaryReader);
    binaryReader.readInt16 = readInt16.bind(binaryReader);
		//peekInt16
		binaryReader.readInt16Array = readInt16Array.bind(binaryReader);
		//peekInt16Array
		binaryReader.readUint16 = readUint16.bind(binaryReader);
		//peekUint16
		binaryReader.readUint16Array = readUint16Array.bind(binaryReader);
		//peekUint16Array
		binaryReader.readInt32 = readInt32.bind(binaryReader);
		//peekInt32
		binaryReader.readInt32Array = readInt32Array.bind(binaryReader);
		//peekUint32Array
		binaryReader.readUint32 = readUint32.bind(binaryReader);
		//peekUint32
		binaryReader.readUint32Array = readUint32Array.bind(binaryReader);
		//peekUint32Array
		binaryReader.readFloat32 = readFloat32.bind(binaryReader);
		//peekFloat32
		//readFloat32Array
		//peekFloat32Array
		binaryReader.readFloat64 = readFloat64.bind(binaryReader);
		//peekFloat64
		//readFloat64Array
		//peekFloat64Array
    binaryReader.readAsciiChar = readAsciiChar.bind(binaryReader);
    binaryReader.peekAsciiChar = peekAsciiChar.bind(binaryReader);
    binaryReader.readAsciiString = readAsciiString.bind(binaryReader);
    binaryReader.peekAsciiString = peekAsciiString.bind(binaryReader);
    binaryReader.readCString = readCString.bind(binaryReader);
    //peekCString
		//readPascalString
		//peekPascalString
    binaryReader.skip = skip.bind(binaryReader);
		binaryReader.rewind = rewind.bind(binaryReader);
    binaryReader.getSubreader = getSubreader.bind(binaryReader);
    binaryReader.getStringRemaining = getStringRemaining.bind(binaryReader);
    binaryReader.readBit = readBit.bind(binaryReader);
    binaryReader.peekBit = peekBit.bind(binaryReader);
    binaryReader.readFlag = readFlag.bind(binaryReader);
    binaryReader.peekFlag = peekFlag.bind(binaryReader);
    binaryReader.readUnsignedBits = readUnsignedBits.bind(binaryReader);
    binaryReader.peekUnsignedBits = peekUnsignedBits.bind(binaryReader);
    //readBitArray
    //peekBitArray
    //readFlagArray
    //peekFlagArray
    //readSignedBits
    //peekSignedBits
    binaryReader.advanceBit = advanceBit.bind(binaryReader);
	}

	function readInt8(){
		var byte = this.dataView.getInt8(this.index);
		this.index++;
		return byte;
	}

  function peekInt8(offset){
    offset = offset || 0;
    var value = this.dataView.getInt8(this.index + offset);
    return value;
  }

	function readInt8Array(count){
		var array = [];
		for(var i = 0; i < count; i++){
			array.push(this.readInt8());
		}
		return array;
	}

  function readUint8(){
		var byte;
		if(this.bitOffset === 0){
		  byte = this.dataView.getUint8(this.index);
		  this.index++;
		}else{
      byte = this.readUnsignedBits(8);
		}
		
		return byte;
	}

  function peekUint8(offset){
    offset = offset || 0;
    var byte;
    if(this.bitOffset === 0){
      byte = this.dataView.getUint8(this.index + offset);
    }else{
      byte = this.peekUnsignedBits(8, offset * 8);
    }
    return byte;
  }
  
  function peekSnappedUint8(offset){
    offset = offset || 0;
    var byte = this.dataView.getUint8(this.index + offset);
    return byte;
  }

  function readUint8Array(count){
    var array = [];
    for(var i = 0; i < count; i++){
      array.push(this.readUint8());
    }
    return array;
  }

	function peekUint8Array(count){
		var array = [];
		for(var i = 0; i < count; i++){
			array.push(this.peekUint8(i));
		}
		return array;
	}

  function readInt16(){
    var value = this.dataView.getInt16(this.index);
    this.index += 2;
    return value;
  }

	function readInt16Array(count){
		var array = [];
		for(var i = 0; i < count; i++){
			array.push(this.readInt16());
		}
		return array;
	}

  function readUint16(){
    var value = this.dataView.getUint16(this.index);
    this.index += 2;
    return value;
  }

	function readUint16Array(count){
		var array = [];
		for(var i = 0; i < count; i++){
			array.push(this.readUint16());
		}
		return array;
	}

  function readInt32(){
    var value = this.dataView.getInt32(this.index);
    this.index += 4;
    return value;
  }

	function readInt32Array(count){
		var array = [];
		for(var i = 0; i < count; i++){
			array.push(this.readInt32());
		}
		return array;
	}

  function readUint32(){
    var value = this.dataView.getUint32(this.index);
    this.index += 4;
    return value;
  }

  function readUint32Array(count){
    var array = [];
    for(var i = 0; i < count; i++){
      array.push(this.readUint32());
    }
    return array;
  }

  function readFloat32(){
    var value = this.dataView.getUint32(this.index);
    this.index += 4;
    return value;
  }

  function readFloat64(){
    var value = this.dataView.getUint32(this.index);
    this.index += 8;
    return value;
  }

  function readAsciiChar(){
    return String.fromCharCode(this.readUint8());
  }

  function peekAsciiChar(offset){
    return String.fromCharCode(this.peekUint8(offset));
  }

  function readAsciiString(length){
    var text = "";
    for(var i = 0; i < length; i++){
      text += this.readAsciiChar();
    }
    return text;
  }

  function peekAsciiString(length){
    var text = "";
    for(var i = 0; i < length; i++){
      text += this.peekAsciiChar(i);
    }
    return text;
  }

  function readCString(){
    var text = "";
    while(this.peekUint8() !== 0){
      text += this.readAsciiChar();
    }
    this.readUint8(); //consume 0
    return text;
  }

  function skip(bytes){
    this.index += bytes;
  }

	function rewind(bytes){
		this.index -= bytes;
	}

  function getStringRemaining(){
    return this.readAsciiString(this.dataView.byteLength - this.index);
  }

  function getSubreader(){
    return create(this.arrayBuffer, this.index);
  }

  function canReadMore(){
    return this.index < this.dataView.byteLength;
  }

  function readBit(){
    var byte = this.peekSnappedUint8();
    var bit = (byte >> (7 - this.bitOffset)) & (1);
    this.advanceBit();
    return bit;
  }
  
  function readFlag(){
    return this.readBit() === 1 ? true : false;
  }
  
  function peekBit(offset){
    offset = offset || 0;
    var bitOffset = (this.bitOffset + offset) % 8;
    var byteOffset = Math.floor((this.bitOffset + offset) / 8);
    var byte = this.peekSnappedUint8(byteOffset);
    var bit = (byte >> (7 - bitOffset)) & (1);
    return bit;
  }
  
  function peekFlag(offset){
    return this.peekBit(offset) === 1 ? true : false;
  }
  
  function advanceBit(){
    if(this.bitOffset == 7){
      this.bitOffset = 0;
      this.index++;
    }else{
      this.bitOffset++;
    }
  }
  
  function readUnsignedBits(length){
    var value = 0;
    for(var i = 0; i < length; i++){
      value = (value << 1) | this.readBit();
    }
    return value;
  }

  function peekUnsignedBits(length, offset){
    var value = 0;
    for(var i = 0; i < length; i++){
      value = (value << 1) | this.peekBit(offset + i);
    }
    return value;
  }

	return {
		create : create
	};
})();
