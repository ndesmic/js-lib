describe(".mapTruth", () => {
	const tables = [
		{
			"TT": true,
			"TF": false,
			"FT": false,
			"FF": false
		},
		{
			"TT?": true,
			"TF?": false,
			"FT?": true,
			"FFF": false,
			"FFT": true
		},
		{
			"TTTF": true,
			else: false
		}
	];

	[
		{
			name: "simple map",
			table: tables[-1],
			values: [true, true],
			result: true
		},
		{
			name: "simple map 1",
			table: tables[-1],
			values: [true, false],
			result: false
		},
		{
			name: "simple map 2",
			table: tables[-1],
			values: [false, false],
			result: false
		},
		{
			name: "simple map 3",
			table: tables[-1],
			values: [false, true],
			result: false
		},
		{
			name: "variable map 0",
			table: tables[0],
			values: [true, true, true],
			result: true
		},
		{
			name: "variable map 1",
			table: tables[0],
			values: [true, true, false],
			result: true
		},
		{
			name: "variable map 2",
			table: tables[0],
			values: [false, false, false],
			result: false
		},
		{
			name: "variable map 3",
			table: tables[0],
			values: [false, false, true],
			result: true
		},
		{
			name: "else map",
			table: tables[1],
			values: [true, true, true, false],
			result: true
		},
		{
			name: "else map 1",
			table: tables[1],
			values: [true, true, false, false],
			result: false
		}
	].forEach(test => {
		it(test.name, () => {
			const result = BoolTools.mapTruth(test.table, ...test.values);
			expect(result).toEqual(test.result);
		});
	});
});