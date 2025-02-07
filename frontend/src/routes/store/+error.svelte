<script>
	import { page } from '$app/stores';
</script>

<div class="center">
	<h1>{$page.status}</h1>
	<p>{$page.error.message}</p>
</div>

<style>
div {
	margin: 0;
	text-align: center;
}
</style>
