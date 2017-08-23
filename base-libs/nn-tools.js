export sigmoid = value => 1 / (1 + Math.exp(-value));

export relu = value => Math.max(0, value);

export identity = value => value;

export binaryThreshold = threshold => value => value >= threshold ? 1 : 0;
