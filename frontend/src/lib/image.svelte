<script>
  const {
    lowRes = null,
    highRes = null,
    alt = '',
    cover = false,
    bookCover = false,
    hidden = false,
    delay = 0,
    blur = 7,
  } = $props();

  import { onMount } from 'svelte';

  let imgSrc = $state(lowRes);
  let blurred = $state(true);
  let loaded = $state(false);
  let observer;
  let img;

  const observerOptions = {
    root: null,
    rootMargin: "-100px",
    threshold: 0.1,
  };

  function isInViewport(el) {
    if (!el) return false;
    const rect = el.getBoundingClientRect();
    return rect.top <= window.innerHeight - 200 && rect.bottom >= 100;
  }

  function entersViewport(e) {
    img = e;
    if (loaded && isInViewport(img)) {
      blurred = false;
    }
    observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && loaded) {
        blurred = false;
      }
      // if (entries[0].isIntersecting && loaded) {
      //   blurred = false;
      // } else {
      //   blurred = true;
      // }
    }, observerOptions);

    observer.observe(img);
  }

  $effect(() => {
    const highResImg = new Image();
    highResImg.src = highRes;
    highResImg.onload = () => {
      imgSrc = highRes;
      loaded = true;
      if (isInViewport(img)) blurred = false;
    };

    return () => observer?.disconnect();
  });
</script>

<img
  use:entersViewport
  class="image"
  class:cover={cover}
  class:bookCover={bookCover}
  class:blurred={blurred}
  class:hidden={hidden}
  src={imgSrc}
  alt={alt}
  style="--delay:{delay}ms; --blur:{blur}vw;"
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
    left: 0;
    top: 0;
    z-index: -1;
  }

  .image.bookCover {
    width: 60%;
    height: 50%;
    object-fit: contain;
  }

  .blurred {
    filter: blur(var(--blur)) contrast(5);
  }
</style>
