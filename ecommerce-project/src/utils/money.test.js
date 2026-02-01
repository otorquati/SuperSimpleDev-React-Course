import { test, expect, describe } from 'vitest';
import { formatMoney } from './money.js';

describe('formatMoney',() => {
	test('formats 1999 cents as $19.99', () => {
		expect(formatMoney({amountCents:1999})).toBe('$19.99')
	});
	
	test('display 2 decimals',() => {
		expect(formatMoney({amountCents: 1090})).toBe('$10.90');
		expect(formatMoney({amountCents: 100})).toBe('$1.00');
	})
})