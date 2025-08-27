import { asyncTreeAll } from "../../libs/promise-tools.js";

describe("asyncTreeAll", () => {
    it("should chain a promise", async () => {
        const p = {
            foo : {
                bar: Promise.resolve(1)    
            },
            baz: Promise.resolve(2),
            qux: {
                dal: {
                    ist: {
                        vex: Promise.resolve(3)
                    }
                }
            },
            el: {
                eth: 4
            },
            zod: 5
        };
        const r = await asyncTreeAll(p);

        expect(r.foo.bar).toBe(1);
        expect(r.baz).toBe(2);
        expect(r.qux.dal.ist.vex).toBe(3);
        expect(r.el.eth).toBe(4);
        expect(r.zod).toBe(5);
    });
});
