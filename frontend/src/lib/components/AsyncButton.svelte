<script>
let {
	label = '',
	handler,
	classes = '',
} = $props();
let loading = $state(false);

async function handleClick() {
	loading = true;
	await handler();
	loading = false;
}
</script>

<button onclick={handleClick} class={classes}>
	{#if loading}
		LOADING
	{:else}
		{label}
	{/if}</button
>

<style>
.fullWidth {
	width: 100%;
	text-align: center;
	margin: auto;
}
</style>