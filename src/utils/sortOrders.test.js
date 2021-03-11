import React from 'react'
import {sortByItemCount} from './sortOrders';
import {sortByDate} from './sortOrders';
import {getSortFunction} from './sortOrders';
import {sortOrders} from './sortOrders';
import {sortTypes} from './sortOrders';

describe('sortByItemCount function', () => {
	it('First lenght is bigger', () => {
		const first = {
			items: ['one', 'two'],
		};

		const second = {
			items: ['ont', 'two', 'three'],
		};

		const result = sortByItemCount(first, second);

		expect(result).toEqual(-1);
	});

	it('Second length is bigger', () => {
		const first = {
			items: ['one', 'two', 'three'],
		};

		const second = {
			items: ['ont', 'two'],
		};

		const result = sortByItemCount(first, second);

		expect(result).toEqual(1);
	});

	test.each([
		[null, null, 0],
		[1, 2, 0],
		[{items: []}, {items: []}, 0],
		[{items: ['item1', 'item2']}, {items: ['1', '2']}, 0],
		[{values: ['somevalue']}, {values: ['somevalue']}, 0]
	])('Zero output', (a, b, expected) => {
		const result = sortByItemCount(a, b);
		expect(result).toBe(expected);
	});
});

describe('sortByDate function', () => {
	it('Second date is bigger', () => {
		const first = {
			date: new Date("1995-12-17T03:24:00"),
		};

		const second = {
			date: new Date("1996-12-17T03:24:00"),
		};

		const result = sortByDate(first, second);

		expect(result).toEqual(1);
	});

	it('First date is bigger', () => {
		const first = {
			date: new Date("1996-12-17T03:24:00"),
		};

		const second = {
			date: new Date("1991-11-17T03:24:00"),
		};

		const result = sortByDate(first, second);

		expect(result).toEqual(-1);
	});

	
	test.each([
		[null, null, 0],
		[1, 2, 0],
		[{items: []}, {items: []}, 0],
		[{date: new Date("1996-12-17T03:24:00")}, {date: new Date("1996-12-17T03:24:00")}, 0],
		[{time: new Date("1996-12-17T03:24:00")}, {time: new Date("1996-12-17T03:24:00")}, 0]
	])('Zero output', (a, b, expected) => {
		const result = sortByDate(a, b);
		expect(result).toBe(expected);
	});
});

describe('getSortFunction function', () => {
	it('Sort by item count', () => {
		const result = getSortFunction(sortTypes.COUNT);

		expect(result).toEqual(sortByItemCount);
	});

	it('Sort by date', () => {
		const result = getSortFunction(sortTypes.DATE);

		expect(result).toEqual(sortByDate);
	});

	it('Return undefined', () => {
		const result = getSortFunction(1);

		expect(result).toEqual(undefined);  // != 
	});
});

describe('SortOrders function', () => {
	it('Sort DESC', () => {
		const desc_input = [
			{date: new Date("1990-12-17T03:24:00")},
			{date: new Date("1996-12-17T03:24:00")},
		];

		const acs_input = [
			{date: new Date("1996-12-17T03:24:00")},
			{date: new Date("1990-12-17T03:24:00")},
		];

		const expected = [
			{date: new Date("1996-12-17T03:24:00")},
			{date: new Date("1990-12-17T03:24:00")},
		];

		sortOrders(acs_input, sortByDate);
		sortOrders(desc_input, sortByDate);

		expect(acs_input).toEqual(expected);
		expect(desc_input).toEqual(expected);
	});
});

