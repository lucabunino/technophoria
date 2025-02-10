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

		// Ensure selectedOptions is populated even if there's only one option
		if (optionNames.length === 1) {
			selectedOptions[optionNames[0]] = variants[0]?.title; // Assign default value
		}

		const cartItems = await addToCart(quantity, cart.id, variants, selectedOptions, optionNames);
		cart.setItems(cartItems);
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

		// Ensure selectedOptions is populated even if there's only one option
		if (optionNames.length === 1) {
			selectedOptions[optionNames[0]] = variants[0]?.title; // Assign default value
		}

		const cartItems = await addToCart(quantity, cart.id, variants, selectedOptions, optionNames);
		cart.setItems(cartItems);
		if (!cartItems) {
			throw new Error("No cart items!");
		}

		window.location.href = cart.checkoutUrl;
		
		// cart.setDialog(false);
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
		<div class="btn product-counter europa-22 fullWidth">
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
			classes="btn border-white europa-18 fullWidth active"
			handler={buyNowHandler}
			label="Preorder now"
		/>
	</div>

	{#if product.descriptionHtml}
		{@html product.descriptionHtml}
	{/if}

	{#if errorMessage != ''}
		<p class="error">{errorMessage}</p>
	{/if}
</div>

<style>
:global(.body) {
	margin-bottom: calc(var(--gutter)*3);
}
:global(.body div + div) {
	margin-top: 1em;
}
:global(.regular) {
	font-weight: 400;
}
.btns {
	display: flex;
	gap: var(--gutter);
	width: 100%;
	margin-bottom: calc(var(--gutter)*3);
}
.product-counter {
	border: solid 3px var(--white);
	width: 100%;
	display: flex;
	justify-content: space-evenly;
	align-items: center;
	padding: 0;
}
:global(.product-counter button) {
	padding: .7rem 0;
}
.product-counter span {
	margin: 0 .5em;
	width: 1em;
	display: inline-block;
	text-align: center;
}
.product-counter:hover {
	background-color: unset;
}
.product-counter:hover button, .product-counter:hover span {
	color: var(--white);
}
.product-counter button {
	width: 1.1em;
}
.product-counter button:hover {
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
