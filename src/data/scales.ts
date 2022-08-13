export const intervalNames = [
	"P 1st",
	"m 2nd",
	"M 2nd",
	"m 3rd",
	"M 3rd",
	"P 4th",
	"d 5th / A 4th",
	"P 5th",
	"m 6th",
	"M 6th",
	"m 7th",
	"M 7th",
	"P 8th"
];

export const scales: {[key: string]: number[]} = {
	major: [0, 2, 4, 5, 7, 9, 11],
	dorian: [0, 2, 3, 5, 7, 9, 10],
	phrygian: [0, 1, 3, 5, 7, 8, 10],
	lydian: [0, 2, 4, 6, 7, 9, 11],
	mixolydian: [0, 2, 4, 5, 7, 9, 10],
	minor: [0, 2, 3, 5, 7, 8, 10],
	locrian: [0, 1, 3, 5, 6, 8, 10],
	chromatic: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
};

export const scaleNames = Object.keys(scales);