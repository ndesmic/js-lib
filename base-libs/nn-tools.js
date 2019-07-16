export const sigmoid = value => 1 / (1 + Math.exp(-value));

export const relu = value => Math.max(0, value);

export const identity = value => value;

export const binaryThreshold = threshold => value => value >= threshold ? 1 : 0;
