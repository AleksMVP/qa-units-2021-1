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

		expect(result).toBeUndefined();  // != 
	});
});

describe('SortOrders function', () => {
	it('Check function call', () => {
		const desc_input = [1, 2];
		const fn = jest.fn();

		sortOrders(desc_input, fn);
		expect(fn).toBeCalledTimes(1);
	});

	it('Check null input array', function () {
		const fn = jest.fn();
		sortOrders(null, fn);
		expect(fn).not.toBeCalled();
	});

	it('Check null input function', function () {
		const input = [2, 1];
		sortOrders(input, null);
		expect(input).toEqual(input);
	});
});

