import { memo, getFunctionName, getFunctionParams, debounce, exponentialBackoff } from "../libs/function-tools.js";
import { recursiveFibanocci as fibanocci } from "../libs/algorithms.js";

describe("function-tools", () => {
    describe("memo", () => {
        it("should at least not break the function", () =>{
            const id = memo(x => x);
            expect(id(1), 3);
            expect(id(2), 3);
            expect(id(3), 3);
            expect(id(2), 2);
            expect(id(4), 4);
        });
        it("should improve CPU bound functions", () =>{
            const fib = memo(fibanocci);
            const startNonMemo = performance.now();
            fib(20);
            const nonMemoTime = performance.now() - startNonMemo;
            const startMemo = performance.now();
            fib(20);
            const memoTime = performance.now() - startMemo;
            expect(memoTime).toBeLessThan(nonMemoTime);
        });
    });
    describe("getFunctionName", () => {
        it("should get function name", function () {
            expect(getFunctionName("function noop(){}")).toEqual("noop");
            expect(getFunctionName("function add(arg1, arg2){ return arg1 + arg2; }")).toEqual("add");
        });
    });


    describe("getFunctionParams", () => {
        it("should get the function parameter names", () => {
            expect(getFunctionParams(getFunctionParams)).toEqual(["func"]);
            expect(getFunctionParams(debounce)).toEqual(["func", "ms"]);
        });
    });

    describe("exponentialBackoff", () => {
        it("should succeed if function works", async () => {
            const returnsTrue = () => true;
            expect(await exponentialBackoff(returnsTrue)()).toEqual(true);
        });
        it("should succeed if function on retry", async () => {
            let t = 0;
            const returnsTrue = () => {
                if(t === 2) return true;
                t++;
                return null;
            };
            expect(await exponentialBackoff(returnsTrue, { baseTimeoutMs: 2 })()).toEqual(true);
        });
        it("should fail if too many tries", async () => {
            const returnsFalse = () => false;
            try{
                await exponentialBackoff(returnsFalse, { baseTimeoutMs: 2 })();
                fail();
            } catch(e){
                expect(e.message).toEqual("");
            }
        });
        it("should count errors as fails", async () => {
            const alwaysThrows = () => {
                throw new Error("foo")
            };
            try {
                await exponentialBackoff(alwaysThrows, { baseTimeoutMs: 2 })();
                fail();
            } catch (e) {
                expect(e.message).toEqual("foo, foo, foo, foo, foo");
            }
        });
        it("should return a default if supplied and fails", async () => {
            const returnsFalse = () => false;
            expect(await exponentialBackoff(returnsFalse, { baseTimeoutMs: 2, defaultValue: "foo" })())
                .toEqual("foo")
        });
    });
});