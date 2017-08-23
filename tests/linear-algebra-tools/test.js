import { dot } from "../../base-libs/linear-algebra-tools.js";

QUnit.module(".linear algebra tools");

QUnit.test("properly dots matricies (2x3, 3x2)", assert => {
    const x = [[1,2,3],
               [4,5,6]];
    const y = [[7, 8],
               [9, 10],
               [11,12]];
    const result = dot(x,y);

    assert.deepEqual(result, [[58 , 64 ],
                              [139, 154]], "got correct result");
});

QUnit.test("properly dots matricies (1x3, 3x1)", assert => {
    const x = [[4,6,8]];
    const y = [[10], [11], [12]];
    const result = dot(x,y);

    assert.deepEqual(result, [[202]], "got correct result");
});

QUnit.test("throws when sides are mismached (1x2, 1x2)", assert => {
    const x = [[10,11]];
    const y = [[13,14]];

    assert.throws(() => dot(x,y), "got correct result");
});
