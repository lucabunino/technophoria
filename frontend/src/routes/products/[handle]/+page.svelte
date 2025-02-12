<script>
const { data } = $props()
$inspect(data)
let product = data.product;

import Swiper from '$lib/components/Swiper.svelte';
import Media from '$lib/components/Media.svelte';
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
<div class="product-images desktop-only">
	<!-- <Swiper images={product.images} /> -->
</div>

<div class="product-info mobile-europa-18">
	<h2 class="europa-24 uppercase mobile-europa-32">{product.title}</h2>
	<p class="europa-18 price mobile-europa-18">
		{formatPrice(product.price.amount, product.price.currencyCode)}
	</p>
	<!-- <ProductOptions {product.options} bind:selectedOptions /> -->
	<div class="btns">
		<div class="btn product-counter europa-22 fullWidth desktop-only">
			<button onclick={() => {decrementQuantity(quantity)}}>–</button>
			<span>{quantity}</span>
			<button onclick={() => {incrementQuantity(quantity)}}>+</button>
		</div>
		<AsyncButton
		classes="btn border-white europa-18 fullWidth desktop-only"
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

	<div class="product-images mobile-only">
		{#each product.images as image}
		<div class="media-container-wrapper">
			<div class="media-container">
				<Media low={image.src} high={image.src} contain={true} blur={3} alt={product.images[0].alt}/>
			</div>
		</div>
		{/each}
	</div>

	<div class="mobile-only">
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
		</div>
	</div>
	
	<div class="info-container mobile-only europa-36 mobile-europa-24">
		{#if product.descriptionHtml}
			{@html product.descriptionHtml}
		{/if}
	</div>
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
	display: -webkit-box;
	display: -ms-flexbox;
	display: flex;
	gap: var(--gutter);
	width: 100%;
	margin-bottom: calc(var(--gutter)*3);
}
.product-counter {
	border: solid 3px var(--white);
	width: 100%;
	display: -webkit-box;
	display: -ms-flexbox;
	display: flex;
	-webkit-box-pack: space-evenly;
	    -ms-flex-pack: space-evenly;
	        justify-content: space-evenly;
	-webkit-box-align: center;
	    -ms-flex-align: center;
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
	-ms-grid-column: 1;
	-ms-grid-column-span: 6;
	grid-column: 1 / span 6;
	padding: 5vw;
}
.product-info {
	-ms-grid-column: 7;
	-ms-grid-column-span: 6;
	grid-column: 7 / span 6;
	padding: 5vw;
	display: -webkit-box;
	display: -ms-flexbox;
	display: flex;
	-webkit-box-orient: vertical;
	-webkit-box-direction: normal;
	    -ms-flex-direction: column;
	        flex-direction: column;
	-webkit-box-align: start;
	    -ms-flex-align: start;
	        align-items: flex-start;
	-webkit-box-pack: start;
	    -ms-flex-pack: start;
	        justify-content: flex-start;
}
.error {
	color: red;
}
.price {
	margin: 3em 0;
}

@media screen and (max-width: 900px) {
	.product-images {
		-ms-grid-column: 1;
		-ms-grid-column-span: 12;
		grid-column: 1 / span 12;
		padding: var(--gutter);
		margin-bottom: calc(var(--gutter)*3);
	}
	.product-info {
		-ms-grid-column: 1;
		-ms-grid-column-span: 12;
		grid-column: 1 / span 12;
		padding: var(--gutter);
		-webkit-box-align: center;
		    -ms-flex-align: center;
		        align-items: center;
		-webkit-box-pack: center;
		    -ms-flex-pack: center;
		        justify-content: center;
		text-align: center;
		margin-top: calc(var(--gutter)*7);
		margin-bottom: calc(var(--gutter)*3);
	}
	.media-container-wrapper {
		height: auto;
		margin-bottom: var(--gutter);
		background-color: var(--white);
		padding: 10% 5%;
	}
	.media-container {
		width: 90%;
		overflow: hidden;
		margin: auto;
	}
	.price {
		margin: 1em 0;
	}
	.btns {
		-webkit-box-orient: vertical;
		-webkit-box-direction: normal;
		    -ms-flex-direction: column;
		        flex-direction: column;
		width: 30%;
		min-width: 150px;
		margin-bottom: calc(var(--gutter)*5);
	}
	:global(.body) {
		padding: 0 calc(var(--gutter)*3);
		line-height: .85;
	}
	:global(.info) {
		display: none;
	}
	.info-container {
		-ms-flex-item-align: start;
		    align-self: flex-start;
	}
	:global(.info-container .body) {
		display: none;
	}
	:global(.info-container .info) {
		display: inherit;
		text-align: left;
	}
}
</style>
