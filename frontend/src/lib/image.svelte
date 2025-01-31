<script lang="ts">
  const {
    lowRes = null,
    highRes = null,
    alt = '',
    cover = false,
    bookCover = false,
    hidden = false,
  } = $props();

  import { onMount } from 'svelte';

  let imgSrc = $state(lowRes);  // Initially show low-res image
  let blurred = $state(true);  // Apply blur by default
  let loaded = $state(false);  // Track if the high-res image is loaded
  let root;  // Reference to the image element

  // Immediately load the high-res image
  onMount(() => {
    const highResImg = new Image();
    highResImg.src = highRes;  // Set high-res image source
    highResImg.onload = () => {
      imgSrc = highRes;  // Update src once the image is loaded
      loaded = true;  // Set loaded to true
    };
  });

  // IntersectionObserver to detect when image comes into the viewport
  $effect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        // Check if image top is within viewport minus 200px
        if (loaded) {
          blurred = false;  // Remove blur when image top is within the desired range and loaded
          console.log(root);
          
          observer.disconnect();  // Stop observing once image is unblurred
        }
      });
    });

    if (root) observer.observe(root);  // Observe the image element

    return () => {
      observer.disconnect();  // Cleanup on component destruction
    };
  });
</script>

<img
  bind:this={root}
  class="image"
  class:cover={cover}
  class:bookCover={bookCover}
  class:blurred={blurred}
  class:hidden={hidden}
  src={imgSrc}
  alt={alt}
/>

<style>
  .image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: var(--transition);
    transform: scale(1.1);
  }

  .image.cover {
    position: absolute;
    z-index: -1;
  }

  .image.bookCover {
    width: 60%;
    height: 50%;
    object-fit: contain;
  }

  .blurred {
    filter: blur(20px);  /* Apply blur by default */
    transition: filter 0.5s ease;  /* Smooth transition to unblur */
  }
</style>