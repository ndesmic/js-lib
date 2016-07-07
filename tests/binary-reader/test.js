QUnit.module(".readUint8");
QUnit.test("gets uint8", function(assert) {
    var arrayBuffer = BinaryTools.byteArrayToArrayBuffer([112, 88]);
    var binaryReader = BinaryReader.create(arrayBuffer);
    assert.equal(binaryReader.readUint8(), 112);
    assert.equal(binaryReader.readUint8(), 88);
    assert.equal(binaryReader.index, 2);
});
QUnit.test("gets uint8 with bit offset", function(assert) {
    var arrayBuffer = BinaryTools.byteArrayToArrayBuffer([171, 88, 255]); //10101011 01011100 11111111
    var binaryReader = BinaryReader.create(arrayBuffer);
    binaryReader.bitOffset = 2;
    assert.equal(binaryReader.readUint8(), 173);
    assert.equal(binaryReader.readUint8(), 99);
    assert.equal(binaryReader.index, 2);
    assert.equal(binaryReader.bitOffset, 2);
});
QUnit.module(".peekUint8");
QUnit.test("gets uint8 and does not advance", function(assert) {
    var arrayBuffer = BinaryTools.byteArrayToArrayBuffer([112, 88]);
    var binaryReader = BinaryReader.create(arrayBuffer);
    assert.equal(binaryReader.peekUint8(), 112);
    assert.equal(binaryReader.peekUint8(1), 88);
    assert.equal(binaryReader.index, 0);
});
QUnit.test("gets uint8 with bit offset", function(assert) {
    var arrayBuffer = BinaryTools.byteArrayToArrayBuffer([171, 88, 255]); //10101011 01011100 11111111
    var binaryReader = BinaryReader.create(arrayBuffer);
    binaryReader.bitOffset = 2;
    assert.equal(binaryReader.peekUint8(), 173);
    assert.equal(binaryReader.peekUint8(1), 99);
    assert.equal(binaryReader.index, 0);
    assert.equal(binaryReader.bitOffset, 2);
});
QUnit.module(".peekSnappedUint8");
QUnit.test("gets uint8 without bit offset", function(assert) {
    var arrayBuffer = BinaryTools.byteArrayToArrayBuffer([112, 88]);
    var binaryReader = BinaryReader.create(arrayBuffer);
    binaryReader.bitOffset = 2;
    assert.equal(binaryReader.peekSnappedUint8(), 112);
    assert.equal(binaryReader.peekSnappedUint8(1), 88);
    assert.equal(binaryReader.index, 0);
});
QUnit.module(".readBit");
QUnit.test("gets bit", function(assert) {
    var arrayBuffer = BinaryTools.byteArrayToArrayBuffer([128]);
    var binaryReader = BinaryReader.create(arrayBuffer);
    assert.equal(binaryReader.readBit(), 1);

    arrayBuffer = BinaryTools.byteArrayToArrayBuffer([1]);
    binaryReader = BinaryReader.create(arrayBuffer);
    assert.equal(binaryReader.readBit(), 0);
});
QUnit.test("gets bit and advances", function(assert) {
    var arrayBuffer = BinaryTools.byteArrayToArrayBuffer([171, 88]);
    var binaryReader = BinaryReader.create(arrayBuffer);
    assert.equal(binaryReader.readBit(), 1);
    assert.equal(binaryReader.readBit(), 0);
    assert.equal(binaryReader.readBit(), 1);
    assert.equal(binaryReader.readBit(), 0);
    assert.equal(binaryReader.readBit(), 1);
    assert.equal(binaryReader.index, 0);
    assert.equal(binaryReader.bitOffset, 5);
});
QUnit.test("reads across 2 bytes", function(assert) {
    var arrayBuffer = BinaryTools.byteArrayToArrayBuffer([171, 88]); //10101011 01011100
    var binaryReader = BinaryReader.create(arrayBuffer);
    assert.equal(binaryReader.readBit(), 1);
    assert.equal(binaryReader.readBit(), 0);
    assert.equal(binaryReader.readBit(), 1);
    assert.equal(binaryReader.readBit(), 0);
    assert.equal(binaryReader.readBit(), 1);
    assert.equal(binaryReader.readBit(), 0);
    assert.equal(binaryReader.readBit(), 1);
    assert.equal(binaryReader.readBit(), 1);
    assert.equal(binaryReader.readBit(), 0);
    assert.equal(binaryReader.readBit(), 1);
    assert.equal(binaryReader.readBit(), 0);
    assert.equal(binaryReader.readBit(), 1);
    assert.equal(binaryReader.readBit(), 1);
    assert.equal(binaryReader.readBit(), 0);
    assert.equal(binaryReader.readBit(), 0);
    assert.equal(binaryReader.readBit(), 0);
    assert.equal(binaryReader.index, 2);
    assert.equal(binaryReader.bitOffset, 0);
});
QUnit.module(".peekBit");
QUnit.test("gets bit and advances to next byte", function(assert) {
    var arrayBuffer = BinaryTools.byteArrayToArrayBuffer([171, 88]);
    var binaryReader = BinaryReader.create(arrayBuffer);
    assert.equal(binaryReader.readBit(), 1);
    assert.equal(binaryReader.readBit(), 0);
    assert.equal(binaryReader.readBit(), 1);
    assert.equal(binaryReader.readBit(), 0);
    assert.equal(binaryReader.readBit(), 1);
    assert.equal(binaryReader.readBit(), 0);
    assert.equal(binaryReader.readBit(), 1);
    assert.equal(binaryReader.readBit(), 1);
    assert.equal(binaryReader.index, 1);
    assert.equal(binaryReader.bitOffset, 0);
});
QUnit.test("gets bit and doesn't advance", function(assert) {
    var arrayBuffer = BinaryTools.byteArrayToArrayBuffer([171, 88]);
    var binaryReader = BinaryReader.create(arrayBuffer);
    assert.equal(binaryReader.peekBit(), 1);
    assert.equal(binaryReader.peekBit(1), 0);
    assert.equal(binaryReader.peekBit(2), 1);
    assert.equal(binaryReader.peekBit(3), 0);
    assert.equal(binaryReader.peekBit(4), 1);
    assert.equal(binaryReader.index, 0);
    assert.equal(binaryReader.bitOffset, 0);
});
QUnit.test("peeks across 2 bytes", function(assert) {
    var arrayBuffer = BinaryTools.byteArrayToArrayBuffer([171, 88]);
    var binaryReader = BinaryReader.create(arrayBuffer);
    assert.equal(binaryReader.peekBit(), 1);
    assert.equal(binaryReader.peekBit(1), 0);
    assert.equal(binaryReader.peekBit(2), 1);
    assert.equal(binaryReader.peekBit(3), 0);
    assert.equal(binaryReader.peekBit(4), 1);
    assert.equal(binaryReader.peekBit(5), 0);
    assert.equal(binaryReader.peekBit(6), 1);
    assert.equal(binaryReader.peekBit(7), 1);
    assert.equal(binaryReader.peekBit(8), 0);
    assert.equal(binaryReader.peekBit(9), 1);
    assert.equal(binaryReader.peekBit(10), 0);
    assert.equal(binaryReader.peekBit(11), 1);
    assert.equal(binaryReader.peekBit(12), 1);
    assert.equal(binaryReader.peekBit(13), 0);
    assert.equal(binaryReader.peekBit(14), 0);
    assert.equal(binaryReader.peekBit(15), 0);
    assert.equal(binaryReader.index, 0);
    assert.equal(binaryReader.bitOffset, 0);
});
QUnit.module(".readFlag");
QUnit.test("gets flag", function(assert) {
    var arrayBuffer = BinaryTools.byteArrayToArrayBuffer([128]);
    var binaryReader = BinaryReader.create(arrayBuffer);
    assert.equal(binaryReader.readFlag(), true);
    assert.equal(binaryReader.bitOffset, 1);

    arrayBuffer = BinaryTools.byteArrayToArrayBuffer([1]);
    binaryReader = BinaryReader.create(arrayBuffer);
    assert.equal(binaryReader.readFlag(), false);
    assert.equal(binaryReader.bitOffset, 1);
});
QUnit.module(".peekFlag");
QUnit.test("gets flag no advance", function(assert) {
    var arrayBuffer = BinaryTools.byteArrayToArrayBuffer([128]);
    var binaryReader = BinaryReader.create(arrayBuffer);
    assert.equal(binaryReader.peekFlag(), true);
    assert.equal(binaryReader.bitOffset, 0);

    arrayBuffer = BinaryTools.byteArrayToArrayBuffer([1]);
    binaryReader = BinaryReader.create(arrayBuffer);
    assert.equal(binaryReader.peekFlag(), false);
    assert.equal(binaryReader.bitOffset, 0);
});
QUnit.module(".readUnsignedBits");
QUnit.test("gets bits as unsigned value", function(assert) {
    var arrayBuffer = BinaryTools.byteArrayToArrayBuffer([160]);
    var binaryReader = BinaryReader.create(arrayBuffer);
    assert.equal(binaryReader.readUnsignedBits(3), 5);
    assert.equal(binaryReader.bitOffset, 3);

    arrayBuffer = BinaryTools.byteArrayToArrayBuffer([216]);
    binaryReader = BinaryReader.create(arrayBuffer);
    assert.equal(binaryReader.readUnsignedBits(5), 27);
    assert.equal(binaryReader.bitOffset, 5);
});
