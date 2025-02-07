import { checkAttributesExist } from '$lib/utils/misc';
import { findVariantId } from '$lib/utils/product';
import { addLineItem, createCheckout } from '../api/shopify';

export async function addToCart(quantity, cartId, variants, selectedOptions, optionNames) {
	if (!checkAttributesExist(selectedOptions, optionNames)) {
		throw new Error('Please select a value for each option');
	} else {
		// let variantId = findVariantId(variants, selectedOptions);
		let variantId = variants?.[0]?.id;
		try {
			const response = await addLineItem({
				cartId,
				lines: [
					{
						merchandiseId: variantId,
						quantity
					}
				]
			});
			if (response) {
				return response.cartLinesAdd?.cart?.lines.edges;
			}
		} catch {
			throw new Error('Error adding item to cart');
		}
	}
}

export async function checkoutItem(quantity, variants) {
	// const variantId = variants?.[0]?.id;
	// if (!variantId) throw new Error('Invalid variant ID');
	let variantId = variants?.[0]?.id;
	try {
		const response = await fetch('https://your-shopify-store.myshopify.com/api/2023-04/graphql.json', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'X-Shopify-Storefront-Access-Token': 'your-access-token'
			},
			body: JSON.stringify({
				query: `
					mutation cartCreate($input: CartInput!) {
						cartCreate(input: $input) {
							cart {
								id
								checkoutUrl
							}
						}
					}
				`,
				variables: {
					input: {
						lines: [{ merchandiseId: variantId, quantity }]
					}
				}
			})
		});

		const json = await response.json();
		const checkoutUrl = json.data?.cartCreate?.cart?.checkoutUrl;

		if (!checkoutUrl) throw new Error('Checkout URL not created');
		
		if (response) {
			return response.cartLinesAdd?.cart?.lines.edges;
		}
	} catch (error) {
		console.error('Error creating checkout:', error);
	}
}


// export async function checkoutItem(quantity, cartId, variants, selectedOptions, optionNames) {
// 	if (!checkAttributesExist(selectedOptions, optionNames)) {
// 		throw new Error('Please select a value for each option');
// 	} else {
// 		let variantId = variants?.[0]?.id;
// 		try {
// 			const response = await createCheckout({
// 				input: {
// 					lineItems: [
// 						{
// 							quantity,
// 							variantId
// 						}
// 					]
// 				}
// 			});
// 			if (response) {
// 				return response?.checkoutCreate?.checkout?.webUrl;
// 			}
// 		} catch (error) {
// 			throw new Error('Error creating checkout: ' + error);
// 		}
// 	}
// }

// export async function checkoutItem(quantity, cartId, variants, selectedOptions, optionNames) {
// 	if (!checkAttributesExist(selectedOptions, optionNames)) {
// 		throw new Error('Please select a value for each option');
// 	} else {
// 		// let variantId = findVariantId(variants, selectedOptions);
// 		let variantId = variants?.[0]?.id;
// 		console.log(variantId, quantity);
// 		try {
// 			const response = await createCheckout({
// 				input: {
// 					lineItems: [
// 						{
// 							quantity,
// 							variantId
// 						}
// 					]
// 				}
// 			});
// 			if (response) {
// 				return response?.checkoutCreate?.checkout?.webUrl;
// 			}
// 		} catch {
// 			throw new Error('Error creating checkout');
// 		}
// 	}
// }