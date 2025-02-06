<script>
	import Media from '$lib/components/Media.svelte';
	import { removeLineItem, updateLineItem } from '$lib/api/shopify';
	import { formatPrice } from '$lib/utils/format';

	// Cart
	import { getCartStore } from '$lib/cart.svelte.js';
	let { item } = $props();
	const cart = getCartStore();

	async function incrementQuantity(item) {
		const response = await updateLineItem({
			cartId: cart.idStore,
			lines: [
				{
					id: item?.node?.id,
					merchandiseId: item?.node?.merchandise?.id,
					quantity: item?.node?.quantity + 1
				}
			]
		});
		cart.setItemsStore(response?.cartLinesUpdate?.cart?.lines?.edges);
	}

	async function decrementQuantity(item) {
		const response = await updateLineItem({
			cartId: cart.idStore,
			lines: [
				{
					id: item?.node?.id,
					merchandiseId: item?.node?.merchandise?.id,
					quantity: item?.node?.quantity - 1
				}
			]
		});
		cart.setItemsStore(response?.cartLinesUpdate?.cart?.lines?.edges);
	}

	async function removeCartItem(itemToRemove, i) {
		await removeLineItem({
			cartId: cart.idStore,
			lineIds: [i]
		});

		cart.setItemsStore(cart.itemsStore.filter((item) => item !== itemToRemove));
	}
</script>

<div class="line-item-container">
	<div class="product-img">
		{#if item?.node?.merchandise?.product?.images?.edges[0]?.node}
			<Media lowRes={item?.node?.merchandise?.product?.images?.edges[0]?.node?.originalSrc} highRes={item?.node?.merchandise?.product?.images?.edges[0]?.node?.originalSrc} alt={item?.node?.merchandise?.product?.images?.edges[0]?.node?.altText}/>
		{:else}
			<img src="/images/placeholder-big.png" alt="Placeholder" />
		{/if}
	</div>
	<div class="product-info">
			<div>
			<p class="title uppercase">{item?.node?.merchandise?.product?.title}</p>
			<p class="price">
				{formatPrice(
					item?.node?.cost?.totalAmount?.amount,
					item?.node?.cost?.totalAmount?.currencyCode
				)}
			</p>
		</div>
		<div class="counter europa-22">
			<button onclick={() => {decrementQuantity(item)}}>–</button>
			<span>{item.node.quantity}</span>
			<button onclick={() => {incrementQuantity(item)}}>+</button
			>
		</div>
	</div>
</div>

<style>
.line-item-container {
	display: flex;
	border-top: solid 1px var(--black);
	padding: var(--gutter);
	gap: var(--gutter);
}
/* .line-item-container .delete {
	position: absolute;
	right: var(--gutter);
} */
.product-img {
	width: 30%;
	max-height: 200px;
	overflow: hidden;
}
.product-info {
	display: flex;
	flex-direction: column;
	justify-content: space-between;
}
.price {
	margin-top: var(--gutter);
}
.variant {
	font-size: 0.9rem;
	margin-bottom: 1rem;
	color: var(--color-3);
}
.counter span {
	margin: 0 .5em;
}
.counter button {
	border: solid 1px var(--black);
	width: 1.1em;
}
.counter button:hover {
	background-color: var(--black);
	color: var(--white);
}
.price-q-counter-container {
	justify-content: space-between;
}
</style>