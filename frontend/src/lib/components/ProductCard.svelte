<script>
import { formatPrice } from '$lib/utils/format';
import Media from '$lib/components/Media.svelte';

let mouse = getPosition()
let innerWidth = $state()
let domLoaded = $state(false)
import { getPosition } from "$lib/utils/mouse.svelte.js";

let {
	product = [],
} = $props();
$inspect(product)

let showDialog = $state(false);

function handleMouseMove(e) {
  mouse.position.x = e.clientX;
}

import AsyncButton from './AsyncButton.svelte';
// import ProductOptions from './ProductOptions.svelte';
import { addToCart, checkoutItem } from '$lib/utils/cart';
import { goto } from '$app/navigation';
// import Counter from './Counter.svelte';

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

		const cartItems = await addToCart(quantity, cart.id, variants, selectedOptions, optionNames);
		cart.setItems(cartItems);
		cart.setDialog(false);
	} catch (error) {
		errorMessage = error.message;
	}
}

$effect(() => {
	setTimeout(() => {
    domLoaded = true		
  }, 300);
})
</script>

<svelte:window bind:innerWidth onmousemove={(e) => handleMouseMove(e)}></svelte:window>

<div class="card-parent-container">
	<a class="bookCover" href="/products/{product.handle}">
		{#if product.images}
			<Media low={product.images[0].src} high={product.images[0].src} contain={true} blur={3} hidden={mouse.position.x < innerWidth/2 && innerWidth > 900} alt={product.images[0].alt}/>
		{:else}
			<img src="/images/placeholder-big.png" alt="Product thumbnail placeholder" />
		{/if}
	</a>
	<!-- <ProductOptions {options} bind:selectedOptions /> -->
	<!-- <Counter bind:quantity /> -->
	<AsyncButton label="Add to cart" classes="btn hero border-white {domLoaded ? '' : 'hidden'}" handler={addToCartHandler} />
	<!-- <AsyncButton label="Buy now" handler={buyNowHandler} /> -->
	{#if errorMessage}
		<p class="error">{errorMessage}</p>
	{/if}



	<!-- <button class:hidden={!domLoaded} class="btn hero border-white">Add to cart</button> -->
	<!-- <div class="price-buy-container flex-center">
		<p class="price">
			{formatPrice(product.price.amount, product.price.currencyCode)}
		</p>
		<button
			class="cl-btn df-btn flex-center"
			onclick={() => {
				showDialog = true;
			}}><span>+</span></button
		>
	</div>
	<a href="/products/{product.handle}">
		<h2 class="title">{product.title}</h2>
	</a> -->
</div>
<!-- {#if showDialog}
	<QuickBuyDialog options={product.options} variants={product.variants} title={product.title} bind:showDialog />
{/if} -->

<style>
	a {
		display: block;
	}
	.card-parent-container {
		width: 100%;
		height: 100%;
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-orient: vertical;
		-webkit-box-direction: normal;
		    -ms-flex-direction: column;
		        flex-direction: column;
		-webkit-box-align: center;
		    -ms-flex-align: center;
		        align-items: center;
		-webkit-box-pack: center;
		    -ms-flex-pack: center;
		        justify-content: center;
	}
	.bookCover {
    width: 65%;
    height: 65%;
    -o-object-fit: contain;
       object-fit: contain;
		margin-bottom: 10%;
  }
	.price-buy-container {
		-webkit-box-pack: justify;
		    -ms-flex-pack: justify;
		        justify-content: space-between;
		width: 100%;
		margin-top: 2rem;
	}
	.price {
		color: var(--accent-color);
		margin: 0;
	}
	.image-container {
		width: 100%;
		height: 100%;
		max-height: 250px;
		overflow: hidden;
		background-color: var(--primary-color);
		-webkit-box-pack: center;
		    -ms-flex-pack: center;
		        justify-content: center;
		border: var(--primary-border);
	}
	img {
		max-height: 250px;
	}
	h2 {
		margin: 0;
		font-size: 1rem;
		font-weight: normal;
	}
	button {
		font-weight: bold;
		font-size: 1.7rem;
		padding: 0.1rem 0.6rem;
		-webkit-box-pack: center;
		    -ms-flex-pack: center;
		        justify-content: center;
		text-align: center;
	}

@media screen and (max-width: 900px) {
	.bookCover {
    width: 75%;
    height: 50%;
		margin-top: 15%;
    margin-bottom: 10%;
  }
}
@media screen and (max-width: 600px) {
	.bookCover {
    height: auto;
  }
}
</style>
