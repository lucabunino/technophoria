<script>
  const {
    low = null,
    high = null,
    video = null,
    alt = '',
    cover = false,
    contain = false,
    hidden = false,
    delay = 0,
    blur = 7,
    originTop = false,
  } = $props();

  import { onMount } from 'svelte';

  let imgSrc = $state(low);
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
    const highImg = new Image();    
    highImg.src = high;
    highImg.onload = () => {
      imgSrc = high;
      loaded = true;
      if (isInViewport(img)) blurred = false;
    };
    return () => observer?.disconnect();
  });
</script>

{#if video}
  <video loop autoplay playsinline muted
    use:entersViewport
    class="media"
    poster={imgSrc}
    class:cover={cover}
    class:contain={contain}
    class:blurred={blurred}
    class:hidden={hidden}
    src={video}
    alt={alt}
    style="--delay:{delay}ms; --blur:{blur}vw;"
  ></video>
{:else}
  <img
    use:entersViewport
    class:originTop={originTop}
    class="media"
    class:cover={cover}
    class:contain={contain}
    class:blurred={blurred}
    class:hidden={hidden}
    src={imgSrc}
    alt={alt}
    style="--delay:{delay}ms; --blur:{blur}vw;"
  />
{/if}

<style>
  .media {
    width: 100%;
    height: 100%;
    transition: var(--transition);
    transform: scale(1.01);
  }

  .media.cover {
    position: absolute;
    left: 0;
    top: 0;
    z-index: -1;
    object-fit: cover;
  }

  .media.contain {
    object-fit: contain;
  }

  .blurred {
    filter: blur(var(--blur)) contrast(5);
  }
  .originTop {
    transform-origin: top;
    object-position: top;
  }
</style>
