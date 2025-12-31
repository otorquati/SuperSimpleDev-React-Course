export function formatMoney({ amountCents }) {
	/* console.log('amountCents', amountCents); */
	return `$${(amountCents / 100).toFixed(2)}`
}