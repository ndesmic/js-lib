QUnit.module(".getTimezone");

QUnit.test("gets time Zone", function(assert){
	var result = TimeTools.getTimezone();
	assert.equal(result, "Mountain Standard Time", "value");
});