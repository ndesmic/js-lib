QUnit.module(".chainPromise");
QUnit.test("chainsPromise", function(assert){
    let done = assert.async();
    let i = 0;
    let promises = [
        new Promise((resolve, reject) => {
            setTimeout(() => {
                assert.equal(i, 0);
                i++;
                resolve();
            }, 1000)
        }),
        new Promise((resolve, reject) => {
            assert.equal(i, 1);
            i++;
            resolve();
        }),
        new Promise((resolve, reject) => {
            setTimeout(() => {
                assert.equal(i, 2);
                i++;
                resolve();
            }, 500)
        }),
    ];
    PromiseTools.chainPromise(promises).then(() =>{
        assert.equal(i, 3);
        done();
    })
});
