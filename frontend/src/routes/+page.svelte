<script>
let innerWidth = $state()
import Image from "$lib/image.svelte";
import { getPosition } from "$lib/mouse.svelte.js";
let mouse = getPosition()

function handleMouseMove(e) {
  mouse.position.x = e.clientX;
}
</script>

<svelte:window bind:innerWidth onmousemove={(e) => handleMouseMove(e)}></svelte:window>

<section class="left">
  <div class="vertical hero">
    <Image lowRes="/img/1-lowres.webp" highRes="/img/1.webp" cover={true} alt="A beautiful landscape"/>
    <!-- <img src="/img/1.webp" alt="" sizes="" srcset=""> -->
    <ul class="credits europa-22">
      <li>Photographer<br><a class="europa-28 uppercase" href="https://www.felicityingram.com/" target="_blank" rel="noopener noreferrer">Felicity Ingram</a></li>
      <li>Casting<br><a class="europa-28 uppercase" href="https://www.instagram.com/emmamatell" target="_blank" rel="noopener noreferrer">Emma Matell</a></li>
      <li>Creative Direction<br><a class="europa-28 uppercase" href="https://www.sarah-bassett.com/" target="_blank" rel="noopener noreferrer">Sarah Bassett</a></li>
    </ul>
    <h2 class="uppercase europa-66">Technophoria<br>By Felicity Ingram<br><span class="lowercase">6th</span> March 2025</h2>
    <a class="btn" href="/technophoria">Preorder now</a>
  </div>
  
  <div class="quote-img europa-66">
    <Image lowRes="/img/3-lowres.webp" highRes="/img/3.webp" alt="A beautiful landscape"/>
    <p>‘Technophoria is an ode to these moments of transcendence, where the colletive energy or a crowd becomes something greater than the sum of its parts.’</p>
  </div>

  <div class="auto">
    <Image lowRes="/img/4-lowres.webp" highRes="/img/4.webp" alt="A beautiful landscape"/>
  </div>
  <div class="quote europa-43">
    <p>‘This book is my contribution to the legacy of the rave, a chronicle of the nights that shaped me and countless others around.’</p>
    <p class="author times-27">( Felicity Ingram )</p>
  </div>
  <div class="vertical">
    <Image lowRes="/img/1-lowres.webp" highRes="/img/1.webp" alt="A beautiful landscape"/>
  </div>
  <div class="people">Left</div>
  <div class="launch">Left</div>
</section>


<section class="right">
  <!-- <video class="video" src=""></video> -->
  <Image lowRes="/img/2-lowres.webp" highRes="/img/2.webp" cover={true} hidden={mouse.position.x > innerWidth/2} alt="A beautiful landscape"/>
  <div class="book">
    <Image lowRes="/img/cover-lowres.webp" highRes="/img/cover.webp" bookCover={true} hidden={mouse.position.x < innerWidth/2} alt="A beautiful landscape"/>
    <button class="btn border-white">Add to cart</button>
  </div>
</section>

<style>
section {
  position: sticky;
  top: 0;
}

/* Left */
section.left {
  grid-column: 1 / span 6;
}
section.left > * {
  overflow: hidden;
}
img {
  width: 100%;
  height: auto;
}
.vertical {
  height: 100vh;
  height: 100svh;
  position: relative;
}
.vertical img {
  height: 100vh;
  object-fit: cover;
}
.vertical.hero img {
  position: absolute;
  z-index: -1;
}
.vertical.hero {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: var(--black);
  gap: calc(var(--gutter)*3);
}
.vertical.hero .credits {
  display: flex;
  width: 100%;
  padding: calc(var(--gutter)/2) var(--gutter);
  justify-content: space-between;
  gap: calc(var(--gutter)*2);
  list-style: none;
  top: 0;
  position: absolute;
}
.vertical.hero h2 {
  text-align: center;
}
.quote {
  background-color: var(--white);
  color: var(--black);
  padding: 3rem 1rem;
  text-align: center;
}
.quote .author {
  text-align: left;
  text-indent: 2.3em;
}
.quote-img {
  position: relative;
}
.quote-img p {
  position: absolute;
  top: 0;
  padding: calc(var(--gutter)/2) var(--gutter);
  hyphens: auto;
}


/* Right */
section.right {
  grid-column: 7 / span 6;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}
.book {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: calc(var(--gutter)*3);
  z-index: -2;
}
</style>