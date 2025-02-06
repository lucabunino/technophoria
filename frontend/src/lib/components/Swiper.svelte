<script>
let { images = [] } = $props();
import { register } from 'swiper/element/bundle';
import Media from '$lib/components/Media.svelte';
register();

$effect(() => {
	const swiperEl = document.querySelector('swiper-container');
	const params = {
		// array with CSS styles
		injectStyles: [
			`
			.swiper-button-prev>svg,
			.swiper-button-next>svg {
				display: none;
			}
			`,
		],

		// array with CSS urls
		injectStylesUrls: ['path/to/one.css', 'path/to/two.css'],
	};

	Object.assign(swiperEl, params);

	swiperEl.initialize();
})
</script>

<swiper-container init="false" class="swiper" thumbs-swiper=".thumbs" navigation={true} loop={true}>
	{#each images as image, i}
		<swiper-slide>
				 <div class="media-container">
					<Media lowRes={image.src} contain={true} highRes={image.src} alt={image.alt}/>
				 </div>
		</swiper-slide>
	{/each}
</swiper-container>

<swiper-container class="thumbs" slidesPerView=4 spaceBetween={15}>
	{#each images as image, i}
		<swiper-slide>
				 <div class="media-container">
					<Media lowRes={image.src} contain={true} highRes={image.src} alt={image.alt}/>
				 </div>
		</swiper-slide>
	{/each}
</swiper-container>

<style>
.swiper {
	width: 100%;
	height: 60vh;
}
.swiper swiper-slide {
	overflow: hidden;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: var(--white);
}
.swiper .media-container {
	width: 75%;
	height: 75%;
	overflow: hidden;
}
.thumbs {
	margin-top: 15px;
	width: 100%;
}
.thumbs swiper-slide {
	overflow: hidden;
	display: flex;
	align-items: center;
	justify-content: center;
	aspect-ratio: 1;
	background-color: var(--white);
	cursor: pointer;
}
.thumbs .media-container {
	width: 75%;
	height: 75%;
	overflow: hidden;
}
swiper-container::part(button-prev),
swiper-container::part(button-next) {
	position: absolute;
	top: 0;
	right: 0;
	height: 100%;
  width: 50%;
	background-color: transparent;
	margin: 0;
}
:global(.thumbs swiper-slide:not(.swiper-slide-thumb-active)) {
	opacity: .5;
}
</style>
