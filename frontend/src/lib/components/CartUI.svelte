<script>
	import { run } from 'svelte/legacy';
	import LineItem from './LineItem.svelte';

	// Cart
	import { getCartStore } from '$lib/cart.svelte.js';
	const cart = getCartStore();
	$inspect(cart)

	let element = $state();
	let display = $state('none');
	let right = $state('-100%');

	function handleClick(e) {
		if (e.clientX < element?.getBoundingClientRect()?.left) {
			right = '-100%';
			display = 'none';
			cart.setDialog(true);
		}
	}

	run(() => {
		if (cart.dialog) {
			right = '-100%';
			display = 'none';
		} else {
			right = '0';
			display = 'block';
		}
	});
</script>

<svelte:window onclickcapture={handleClick} />

<div style:--right={right} class="cart-container europa-24 mobile-europa-24" bind:this={element}>
	<div class="cart-header uppercase">
		{#if cart.items.length === 0}
		<p>Cart is empty</p>
		{:else}
			<h1 class="flex-center">Cart ({cart.items[0] ? cart.items[0].node.quantity : 0})</h1>
		{/if}
		<button class="close-btn" onclick={() => { cart.setDialog(true) }}>Close</button>
	</div>
	
	{#if cart.items.length !== 0}
		<ul class="cart-content">
			{#each cart.items as item (item.node.id)}
				<li>
					<LineItem {item} />
				</li>
			{/each}
		</ul>

		<div class="checkout">
			<p>Shipment and discount codes are added at checkout</p>
			<a class="uppercase" href={cart.checkoutUrl}>Checkout</a>
		</div>
	{/if}
</div>


<style>
.cart-container {
	-webkit-box-sizing: border-box;
	        box-sizing: border-box;
	height: 100vh;
	height: 100dvh;
	width: 33vw;
	max-width: 400px;
	position: fixed;
	top: 0;
	-webkit-transition: var(--transition);
	-o-transition: var(--transition);
	transition: var(--transition);
	right: var(--right);
	z-index: 5;
	border-left: solid 1px var(--black);
	background-color: var(--white);
	color: var(--black);
	display: -webkit-box;
	display: -ms-flexbox;
	display: flex;
	-webkit-box-orient: vertical;
	-webkit-box-direction: normal;
	    -ms-flex-direction: column;
	        flex-direction: column;
}
.cart-header {
	display: -webkit-box;
	display: -ms-flexbox;
	display: flex;
	-webkit-box-pack: justify;
	    -ms-flex-pack: justify;
	        justify-content: space-between;
	margin: calc(var(--gutter)/1.5) var(--gutter);
}
.close-btn:hover {
	color: var(--gray);
}
.cart-content {
	list-style: none;
	padding: var(--gutter);
	margin: calc(var(--gutter)*-1);
}
.cart-content li:last-of-type {
	border-bottom: solid 1px var(--black);
}
.checkout {
	width: 100%;
	position: absolute;
	bottom: 0;
}
.checkout p {
	padding: var(--gutter) calc(var(--gutter)*2);
	border-top: solid 1px var(--black);
}
.checkout a {
	background-color: var(--black);
	color: var(--white);
	padding: calc(var(--gutter)*2) 0 calc(var(--gutter)*3);
	width: 100%;
	text-align: center;
	border-top: solid 1px var(--black);
}
.checkout a:hover {
	background-color: var(--white);
	color: var(--black);
}
@media screen and (max-width: 900px) {
  .cart-container {
		width: 85vw;
	}
	.cart-header {
		margin-top: calc(var(--gutter)*2);
	}
}
@media (max-width: 440px) {
	.cart-parent-container {
		width: 100vw;
	}
}
</style>