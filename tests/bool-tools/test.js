QUnit.module(".mapTruth");
var tables = [
  {
      "TT" : true,
      "TF" : false,
      "FT" : false,
      "FF" : false
  },
  {
      "TT?" : true,
      "TF?" : false,
      "FT?" : true,
      "FFF" : false,
      "FFT" : true
  }
];
var tests = [
  { 
    name : "simple map",
    table : tables[0],
    values : [true, true], 
    result :  true
  },
  { 
    name : "simple map 2",
    table : tables[0], 
    values : [true, false], 
    result :  false
  },
  { 
    name : "simple map 3",
    table : tables[0], 
    values : [false, false], 
    result :  false
  },
  { 
    name : "simple map 4",
    table : tables[0], 
    values : [false, true], 
    result :  false
  },
  { 
    name : "variable map 1",
    table : tables[1],
    values : [true, true, true], 
    result :  true
  },
  { 
    name : "variable map 2",
    table : tables[1], 
    values : [true, true, false], 
    result :  true
  },
  { 
    name : "variable map 3",
    table : tables[1], 
    values : [false, false, false], 
    result :  false
  },
  { 
    name : "variable map 4",
    table : tables[1], 
    values : [false, false, true], 
    result :  true
  }
];
tests.forEach(function(test){
  QUnit.test(test.name, function(assert){
    var result = BoolTools.mapTruth(test.table, ...test.values);
    assert.equal(result, test.result);
  });
});