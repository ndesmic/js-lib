QUnit.module(".next");
QUnit.test("should notify subscribers", function(assert){
	const ob = Observable.create();
	let result = "";
	ob.subscribe(x => result = x);
	ob.next("hello");

	assert.equal(result, "hello", "got result");
});
QUnit.module(".filter");
QUnit.test("should create new observer subscribed to filtered values", function(assert){
	const ob = Observable.create();
	let result = [];
	ob.filter(x => x > 10).subscribe(x => result.push(x));
	ob.next(0);
	ob.next(1);
	ob.next(2);
	ob.next(3);
	ob.next(11);
	ob.next(12);
	ob.next(100);

	assert.equal(result[0], 11, "got result 1");
	assert.equal(result[1], 12, "got result 2");
	assert.equal(result[2], 100, "got result 3");
});
QUnit.module(".map");
QUnit.test("should create new observer subscribed to mapped values", function(assert){
	const ob = Observable.create();
	let result = "";
	ob.map(x => x + " yeah").subscribe(x => result = x);
	ob.next("hello");

	assert.equal(result, "hello yeah", "got result");
});
