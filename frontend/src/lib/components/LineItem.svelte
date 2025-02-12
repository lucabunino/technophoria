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
			cartId: cart.id,
			lines: [
				{
					id: item?.node?.id,
					merchandiseId: item?.node?.merchandise?.id,
					quantity: item?.node?.quantity + 1
				}
			]
		});
		cart.setItems(response?.cartLinesUpdate?.cart?.lines?.edges);
	}

	async function decrementQuantity(item) {
		const response = await updateLineItem({
			cartId: cart.id,
			lines: [
				{
					id: item?.node?.id,
					merchandiseId: item?.node?.merchandise?.id,
					quantity: item?.node?.quantity - 1
				}
			]
		});
		cart.setItems(response?.cartLinesUpdate?.cart?.lines?.edges);
	}

	async function removeCartItem(itemToRemove, i) {
		await removeLineItem({
			cartId: cart.id,
			lineIds: [i]
		});

		cart.setItems(cart.items.filter((item) => item !== itemToRemove));
	}
</script>

<div class="line-item-container">
	<div class="product-img">
		{#if item?.node?.merchandise?.product?.images?.edges[0]?.node}
			<div class="media-container">
				<Media low={item?.node?.merchandise?.product?.images?.edges[0]?.node?.originalSrc} high={item?.node?.merchandise?.product?.images?.edges[0]?.node?.originalSrc} alt={item?.node?.merchandise?.product?.images?.edges[0]?.node?.altText} contain={true}/>
			</div>
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
			<button onclick={() => {incrementQuantity(item)}}>+</button>
		</div>
	</div>
</div>

<style>
.media-container {
	width: 95%;
	height: 75%;
	overflow: hidden;
}
.line-item-container {
	display: -webkit-box;
	display: -ms-flexbox;
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
	width: 25%;
	overflow: hidden;
	overflow: hidden;
	display: -webkit-box;
	display: -ms-flexbox;
	display: flex;
	-webkit-box-align: center;
	    -ms-flex-align: center;
	        align-items: center;
	-webkit-box-pack: center;
	    -ms-flex-pack: center;
	        justify-content: center;
	background-color: var(--black);
}
.product-info {
	display: -webkit-box;
	display: -ms-flexbox;
	display: flex;
	-webkit-box-orient: vertical;
	-webkit-box-direction: normal;
	    -ms-flex-direction: column;
	        flex-direction: column;
	-webkit-box-pack: justify;
	    -ms-flex-pack: justify;
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
	-webkit-box-pack: justify;
	    -ms-flex-pack: justify;
	        justify-content: space-between;
}
@media screen and (max-width: 900px) {
  .line-item-container {
		padding: calc(var(--gutter)*3) var(--gutter);
	}
}
</style>