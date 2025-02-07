<script>
const { data } = $props()
$inspect(data)
let product = data.product;

import Swiper from '$lib/components/Swiper.svelte';
import ProductOptions from '$lib/components/ProductOptions.svelte';
import { addToCart, checkoutItem } from '$lib/utils/cart';
import AsyncButton from '$lib/components/AsyncButton.svelte';
import { goto } from '$app/navigation';
import { formatPrice } from '$lib/utils/format';

// Cart
import { getCartStore } from '$lib/cart.svelte.js';
const cart = getCartStore();

let options = $state(product.options);
let title = $state(product.title);
let variants = $state(product.variants);
let quantity = $state(1);
let selectedOptions = $state({});
let errorMessage = $state();
let optionNames = options?.map((option) => option.name);

async function addToCartHandler() {
	try {
		if (!variants?.length) {
			throw new Error("No variants available for this product");
		}

		const variantId = variants[0]?.id; // Use first variant's ID

		// Ensure selectedOptions is populated even if there's only one option
		if (optionNames.length === 1) {
			selectedOptions[optionNames[0]] = variants[0]?.title; // Assign default value
		}

		const cartItems = await addToCart(quantity, cart.idStore, variants, selectedOptions, optionNames);
		cart.setItemsStore(cartItems);
		cart.setDialog(false);
	} catch (error) {
		errorMessage = error.message;
	}
}

async function buyNowHandler() {
	try {
		if (!variants?.length) {
			throw new Error("No variants available for this product");
		}

		const variantId = variants[0]?.id; // Use first variant's ID

		// Ensure selectedOptions is populated even if there's only one option
		if (optionNames.length === 1) {
			selectedOptions[optionNames[0]] = variants[0]?.title;
		}
		
		const checkoutUrl = await checkoutItem(quantity, cart.idStore, variants, selectedOptions, optionNames);
		goto(checkoutUrl);
	} catch (error) {
		errorMessage = error.message;
	}
}

async function incrementQuantity(q) {
	quantity++
}

async function decrementQuantity(item) {
	if (quantity > 1) {
		quantity--	
	}
}
</script>

<svelte:head>
	<title>{product.title}</title>
	{#if product.description}
		<meta name="description" content={product.description} />
	{/if}
</svelte:head>
<div class="product-images">
	<Swiper images={product.images} />
</div>

<div class="product-info">
	<h2 class="europa-24 uppercase">{product.title}</h2>
	<p class="europa-18 price">
		{formatPrice(product.price.amount, product.price.currencyCode)}
	</p>
	<!-- <ProductOptions {product.options} bind:selectedOptions /> -->
	<div class="btns">
		<div class="btn counter europa-22">
			<button onclick={() => {decrementQuantity(quantity)}}>–</button>
			<span>{quantity}</span>
			<button onclick={() => {incrementQuantity(quantity)}}>+</button>
		</div>
		<AsyncButton
		classes="btn border-white europa-18 fullWidth"
		handler={addToCartHandler}
		label="Add to cart"
		/>
		<AsyncButton
			classes="btn border-white europa-18 fullWidth"
			handler={buyNowHandler}
			label="Buy now"
		/>
	</div>

	<!-- {#if product.description}
		<p>
			{product.description}
		</p>
	{/if} -->

	<p>INFORMATION:</p>
	<p>Editorial Size: 260mm x 300mm</p>
	<p>Number of copies: xxx</p>
	<p>Photographer: Felicity Ingram</p>
	<p>Casting: Emma Mattell</p>
	<p>Creative Director: Sarah Bassett</p>
	<p>Printing: Roy Killen, printed in London SW1</p>
	<p>First Edition Limited to 500 copies</p>
	<p>@felicityingram</p>

	{#if errorMessage != ''}
		<p class="error">{errorMessage}</p>
	{/if}
</div>

<style>
.btns {
	display: flex;
	flex-direction: column;
	gap: var(--gutter);
	width: 100%;
	margin-bottom: calc(var(--gutter)*5);
}
.counter {
	border: solid 3px var(--white);
	width: fit-content;
}
.counter span {
	margin: 0 .5em;
}
.counter:hover {
	background-color: unset;
}
.counter:hover button, .counter:hover span {
	color: var(--white);
}
.counter button {
	width: 1.1em;
}
.counter button:hover {
	color: var(--gray);
}
.product-images {
	grid-column: 1 / span 6;
	padding: 5vw;
}
.product-info {
	grid-column: 7 / span 6;
	padding: 5vw;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: flex-start;
}
.error {
	color: red;
}
.price {
	margin: 3em 0;
}
</style>
