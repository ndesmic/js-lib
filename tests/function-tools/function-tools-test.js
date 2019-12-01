import { memo } from "../../libs/function-tools.js";
import { recursiveFibanocci as fibanocci } from "../../libs/algorithms.js";

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
});