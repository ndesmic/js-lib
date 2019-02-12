QUnit.module(".trampoline");

function num(n){
	function impl(b, n){
		if(b === n){
			return b;
		}
		return impl(b + 1, n);
	}
	return impl(0, n);
}

function tnum(n){
	function impl(b, n){
		if(b === n){
			return b;
		}
		return () => impl(b + 1, n);
	}
	return FunctionTools.trampoline(() => impl(0, n));
}

QUnit.test("recursive function works", function(assert){
	assert.equal(num(5), 5, "inner function works");
});

QUnit.test("recursive function exceeds stack if too deep", function(assert){
	assert.throws(() => num(100000), "throws on deep recursion");
});

QUnit.test("trampolined function does not exceed stack", function(assert){
	assert.equal(tnum(100000), 100000, "trampoline did not error");
});
