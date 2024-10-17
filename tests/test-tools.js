import { it } from "@std/testing/bdd";
/**
 * 
 * @param {Case[]} cases 
 * @param {(case: Case) => void} testFunc 
 */
export function multiTest(cases, testFunc){
	cases.forEach(test => {
		it(test.name ?? `should get ${test.expected} for ${JSON.stringify(test.args)}`, () => testFunc(test));
	});
}
