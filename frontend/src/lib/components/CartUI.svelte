<script>
	import { run } from 'svelte/legacy';
	import { closeCartDialog } from '$lib/stores';
	import LineItem from './LineItem.svelte';

	// Cart
	import { getCartStore } from '$lib/cart.svelte.js';
	const cart = getCartStore();

	let element = $state();

	let { cartUrl, cartItems = [] } = $props();

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

<div style:--right={right} class="cart-container europa-24" bind:this={element}>
	<div class="cart-header uppercase">
		{#if cartItems.length === 0}
		<p>Cart is empty</p>
		{:else}
			<h1 class="flex-center">Cart ({cartItems[0] ? cartItems[0].node.quantity : 0})</h1>
		{/if}
		<button class="close-btn" onclick={() => { cart.setDialog(true) }}>Close</button>
	</div>
	
	{#if cartItems.length !== 0}
		<ul class="cart-content">
			{#each cartItems as item (item.node.id)}
				<li>
					<LineItem {item} />
				</li>
			{/each}
		</ul>

		<div class="checkout">
			<p>Shipment and discount codes are added at checkout</p>
			<a class="uppercase" href={cartUrl}>Checkout</a>
		</div>
	{/if}
</div>


<style>
.cart-container {
	box-sizing: border-box;
	height: 100vh;
	width: 33vw;
	position: fixed;
	top: 0;
	transition: var(--transition);
	right: var(--right);
	z-index: 5;
	border-left: solid 1px var(--black);
	background-color: var(--white);
	color: var(--black);
	display: flex;
	flex-direction: column;
}
.cart-header {
	display: flex;
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


@media (max-width: 440px) {
	.cart-parent-container {
		width: 100vw;
	}
}
</style>