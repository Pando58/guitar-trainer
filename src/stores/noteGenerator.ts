import { writable } from "svelte/store";
import { scales } from "@/data/scales";


let displayAmount = 5;
let selectedScale = scales.major;

const bag: number[] = [];
const nextBag: number[] = [];

fillNextNotes();


function fillNextNotes() {
	while (nextBag.length < displayAmount) {
		nextBag.push(pullFromBag());
	}
}

function pullFromBag() {
	if (bag.length <= 1) {
		bag.push(...selectedScale
			.map(value => ({ value, sort: Math.random() }))
			.sort((a, b) => a.sort - b.sort)
			.map(({ value }) => value)
		);
	}

	return bag.pop();
}

function reset() {
	bag.length = 0;
	nextBag.length = 0;

	fillNextNotes();
}


function getStoreObject() {
	return {
		displayAmount,
		selectedScale: Object.keys(scales).find(key => scales[key] === selectedScale),
		nextBag
	};
}

const { subscribe, set, update } = writable(getStoreObject());

export const noteGenerator = {
	subscribe,
	selectScale: (scl: string) => {
		if (scales[scl]) {
			selectedScale = scales[scl];
		} else {
			selectedScale = scales.major;
		}

		reset();

		set(getStoreObject());
	},
	setDisplayAmount: (amount: number) => {
		displayAmount = Math.min(Math.max(amount, 1), 20);

		reset();

		set(getStoreObject());
	},
	pullNote: () => {
		nextBag.shift();
		fillNextNotes();

		set(getStoreObject());
	},
	reset: () => {
		reset();

		set(getStoreObject());
	}
}
