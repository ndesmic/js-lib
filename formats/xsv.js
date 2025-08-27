/**
 * @typedef {{ valueDelimiter: string, lineDelimiter: string }} ParseXsvOptions
 * 
 * @param {string} xsv 
 * @param {ParseXsvOptions} options 
 * @returns {string[][]}
 */
export function parseXsv(xsv, { valueDelimiter = "\t", lineDelimiter = "\n" } = {}) {
	return xsv.split(lineDelimiter)
		.filter(x => x.trim() !== "")
		.map(line => line.split(valueDelimiter)
			.filter(v => v.trim())
			.map(v => v.trim()));
}