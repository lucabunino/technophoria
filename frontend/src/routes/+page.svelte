<script>
import { addToCart } from '$lib/utils/cart';
import Media from "$lib/components/Media.svelte";
import QuickBuyDialog from "$lib/components/QuickBuyDialog.svelte";
import ProductCard from "$lib/components/ProductCard.svelte";
import AsyncButton from "$lib/components/AsyncButton.svelte";
import { goto } from '$app/navigation';

// Cart
import { getCartStore } from '$lib/cart.svelte.js';
const cart = getCartStore();


let innerWidth = $state()
let personHover = $state(false)
let domLoaded = $state(false);

let options = $state(data.product.options);
let title = $state(data.product.title);
let variants = $state(data.product.variants);
let quantity = $state(1);
let selectedOptions = $state({});
let errorMessage = $state();
let optionNames = options?.map((option) => option.name);

let mouse = getPosition()
import { getPosition } from "$lib/utils/mouse.svelte.js";

const { data, children } = $props()
$inspect(data)

const cities = { berlin: 'Europe/Berlin', lisbon: 'Europe/Lisbon', london: 'Europe/London', marseille: 'Europe/Paris', seoul: 'Asia/Seoul', tokyo: 'Asia/Tokyo' };
let times = $state(Object.fromEntries(Object.keys(cities).map(city => [city, ''])));
const getTime = (tz) => new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false, timeZone: tz }).format(new Date());

// Lifecycle
$effect(() => {
  setTimeout(() => {
    domLoaded = true
  }, 300);
  const updateTimes = () => {
    for (const city in cities) {
      times[city] = getTime(cities[city]);
    }
  };
  updateTimes();
  const interval = setInterval(updateTimes, 1000);
  return () => clearInterval(interval);
})

async function addToCartHandler() {
	try {
		if (!variants?.length) {
			throw new Error("No variants available for this product");
		}

		// Ensure selectedOptions is populated even if there's only one option
		if (optionNames.length === 1) {
			selectedOptions[optionNames[0]] = variants[0]?.title; // Assign default value
		}

		const cartItems = await addToCart(quantity, cart.id, variants, selectedOptions, optionNames);
		cart.setItems(cartItems);
    console.log(cart.items);
    
    goto(`/products/${data.product.handle}`)
	} catch (error) {
		errorMessage = error.message;
	}
}

function handleMouseMove(e) {
  mouse.position.x = e.clientX;
}
// Marquee
function marquee(node, speed) {
  let scrollAmount = 0;
  let frame;

  function step() {
    scrollAmount -= speed; // Adjust speed here
    if (scrollAmount <= -node.firstElementChild.offsetWidth) {
      scrollAmount = 0; // Reset when fully scrolled
    }
    node.style.transform = `translateX(${scrollAmount}px)`;
    frame = requestAnimationFrame(step);
  }

  step();

  return {
    destroy() {
      cancelAnimationFrame(frame);
    }
  };
}
</script>

<svelte:window bind:innerWidth onmousemove={(e) => handleMouseMove(e)}></svelte:window>

<section class="left">
  <div class="times-container">
    <div class="times uppercase eurostile-14 mobile-eurostile-7" class:loaded={domLoaded && !personHover}>
      <div>
        <p>London {times.london}</p>
        <p>Berlin {times.berlin}</p>
        <p>Seoul {times.seoul}</p>
      </div>
      <div>
        <p>Lisbon {times.lisbon}</p>
        <p>Tokyo {times.tokyo}</p>
        <p>Marseille {times.marseille}</p>
      </div>
    </div>
  </div>

  <div class="marquee europa-45-regular">
    <div use:marquee={1}>
      <p>BOOK RELEASE AT PARIS LAUNCH PARTY // 6th MARCH 2025 - Oddity Paris - 27 Rue Notre Dame de Nazareth, Paris 75003, France // </p>
      <p>BOOK RELEASE AT PARIS LAUNCH PARTY // 6th MARCH 2025 - Oddity Paris - 27 Rue Notre Dame de Nazareth, Paris 75003, France // </p>
    </div>
  </div>
    
  <div class="block vertical hero">
    <Media low="/img/vertical-1-low.webp" high="/img/vertical-1-2560w.webp" cover={true} alt="A beautiful landscape"/>
    <ul class="top-credits europa-22">
      <li>Photographer<br><a class="europa-28 uppercase" href="https://www.felicityingram.com/" target="_blank" rel="noopener noreferrer">Felicity Ingram</a></li>
      <li>Casting<br><a class="europa-28 uppercase" href="https://www.instagram.com/emmamatell" target="_blank" rel="noopener noreferrer">Emma Matell</a></li>
      <li>Creative Direction<br><a class="europa-28 uppercase" href="https://www.sarah-bassett.com/" target="_blank" rel="noopener noreferrer">Sarah Bassett</a></li>
    </ul>
    <h2 class="uppercase europa-66">“Technophoria”<br>By Felicity Ingram<br><span class="lowercase">6th</span> March 2025</h2>
    <AsyncButton
		classes="{domLoaded ? 'btn hero' : 'btn hero hidden'}"
		handler={addToCartHandler}
		label="Preorder now"
		/>
    <!-- <a class="btn hero" class:hidden={!domLoaded} href="/products/{data.product.handle}">Preorder now</a> -->
  </div>

  <div class="block auto horizontal-big quote-img bottom europa-95 mobile-europa-48">
    <Media low="/img/horizontal-1-low.webp" high="/img/horizontal-1-2560w.webp" cover={true} alt="A beautiful landscape"/>
    <p style="transform: rotate(1deg) translateY(-5%);"><span>‘Rave culture</span> <span>embodies</span> <span>freedom, diversity</span> <span>and creativity.’</span></p>
  </div>

  <div class="block auto double">
    <div>
      <Media low="/img/double-17-low.webp" high="/img/double-17-2560w.webp" alt="A beautiful landscape"/>
    </div>
    <div>
      <Media low="/img/double-22-low.webp" high="/img/double-22-2560w.webp" alt="A beautiful landscape"/>
    </div>
  </div>

  <div class="block quote europa-36">
    <p>‘I want to express to the world with my unique make up and musicality, and I hope many people can feel it. Inspiration is my past and also my life experience. I wanted to express the painful and sad things without forgetting them.’</p>
    <p class="author times-27 left">( Unknown, Tokyo )</p>
  </div>

  <div class="block auto">
    <Media video="/video/footage-1.mp4" high="/video/footage-1-poster.webp" alt="A beautiful landscape"/>
  </div>

  <div class="block auto double">
    <div>
      <Media low="/img/double-19-low.webp" high="/img/double-19-2560w.webp" alt="A beautiful landscape"/>
    </div>
    <div>
      <Media low="/img/double-20-low.webp" high="/img/double-20-2560w.webp" alt="A beautiful landscape"/>
    </div>
  </div>

  <div class="block vertical">
    <Media low="/img/vertical-6-low.webp" high="/img/vertical-6-2560w.webp" cover={true} alt="A beautiful landscape"/>
  </div>

  <div class="block auto double">
    <div>
      <Media low="/img/double-13-low.webp" high="/img/double-13-2560w.webp" alt="A beautiful landscape"/>
    </div>
    <div>
      <Media low="/img/double-1-low.webp" high="/img/double-1-2560w.webp" alt="A beautiful landscape"/>
    </div>
  </div>

  <div class="block vertical">
    <Media low="/img/vertical-5-low.webp" high="/img/vertical-5-2560w.webp" cover={true} alt="A beautiful landscape"/>
  </div>

  <div class="block auto double">
    <div>
      <Media low="/img/double-4-low.webp" high="/img/double-4-2560w.webp" alt="A beautiful landscape"/>
    </div>
    <div>
      <Media low="/img/double-16-low.webp" high="/img/double-16-2560w.webp" alt="A beautiful landscape"/>
    </div>
  </div>

  <div class="block auto quote-img bottom europa-75">
    <Media video="/video/footage-3.mp4" high="/video/footage-3-poster.webp"  alt="A beautiful landscape"/>
    <p><span>An ode to the power</span> <span>of music and the spaces</span> <span>it creates’</span></p>
  </div>

  <div class="block auto double">
    <div>
      <Media low="/img/double-5-low.webp" high="/img/double-5-2560w.webp" alt="A beautiful landscape"/>
    </div>
    <div>
      <Media low="/img/double-23-low.webp" high="/img/double-23-2560w.webp" alt="A beautiful landscape"/>
    </div>
  </div>
  
  <div class="block auto double">
    <div>
      <Media low="/img/double-2-low.webp" high="/img/double-2-2560w.webp" alt="A beautiful landscape"/>
    </div>
    <div>
      <Media low="/img/double-24-low.webp" high="/img/double-24-2560w.webp" alt="A beautiful landscape"/>
    </div>
  </div>

  <div class="block vertical">
    <Media low="/img/vertical-8-low.webp" high="/img/vertical-8-2560w.webp" cover={true} alt="A beautiful landscape"/>
  </div>

  <div class="block auto horizontal-big quote-img europa-64">
    <Media low="/img/horizontal-2-low.webp" high="/img/horizontal-2-2560w.webp" cover={true} alt="A beautiful landscape"/>
    <p>‘Technophoria is an ode to these moments of transcendence, where the collective energy of a crowd becomes something greater than the sum of its parts.’</p>
  </div>

  <div class="block vertical">
    <Media low="/img/vertical-7-low.webp" high="/img/vertical-7-2560w.webp" cover={true} alt="A beautiful landscape"/>
  </div>

  <div class="block quote europa-36">
    <p>‘It’s a culture where people gather together and cheer for each other.’</p>
    <p class="author times-27 right">( Jihoon Lee, Seoul )</p>
  </div>

  <div class="block auto double">
    <div>
      <Media low="/img/double-10-low.webp" high="/img/double-10-2560w.webp" alt="A beautiful landscape"/>
    </div>
    <div>
      <Media low="/img/double-21-low.webp" high="/img/double-21-2560w.webp" alt="A beautiful landscape"/>
    </div>
  </div>

  <div class="block vertical">
    <Media low="/img/vertical-2-low.webp" high="/img/vertical-2-2560w.webp" cover={true} alt="A beautiful landscape"/>
  </div>

  <div class="block auto double">
    <div>
      <Media low="/img/double-9-low.webp" high="/img/double-9-2560w.webp" alt="A beautiful landscape"/>
    </div>
    <div>
      <Media low="/img/double-7-low.webp" high="/img/double-7-2560w.webp" alt="A beautiful landscape"/>
    </div>
  </div>

  <div class="block auto">
    <Media video="/video/footage-2.mp4" high="/video/footage-2-poster.webp"  alt="A beautiful landscape"/>
  </div>

  <div class="block auto double">
    <div>
      <Media low="/img/double-12-low.webp" high="/img/double-12-2560w.webp" alt="A beautiful landscape"/>
    </div>
    <div>
      <Media low="/img/double-6-low.webp" high="/img/double-6-2560w.webp" alt="A beautiful landscape"/>
    </div>
  </div>

  <div class="block vertical">
    <Media low="/img/vertical-9-low.webp" high="/img/vertical-9-2560w.webp" cover={true} alt="A beautiful landscape"/>
  </div>

  <div class="block auto double">
    <div>
      <Media low="/img/double-3-low.webp" high="/img/double-3-2560w.webp" alt="A beautiful landscape"/>
    </div>
    <div>
      <Media low="/img/double-8-low.webp" high="/img/double-8-2560w.webp" alt="A beautiful landscape"/>
    </div>
  </div>

  <div class="block quote europa-36">
    <p>‘That’s what i like about it, being free. I think it’s the most important thing to me. I like going alone, meeting people or not. It makes me feel better. ’</p>
    <p class="author times-27 right">( Val, Marseille )</p>
  </div>

  <div class="block vertical">
    <Media low="/img/vertical-3-low.webp" high="/img/vertical-3-2560w.webp" cover={true} alt="A beautiful landscape"/>
  </div>

  <div class="block auto double">
    <div>
      <Media low="/img/double-15-low.webp" high="/img/double-15-2560w.webp" alt="A beautiful landscape"/>
    </div>
    <div>
      <Media low="/img/double-18-low.webp" high="/img/double-18-2560w.webp" alt="A beautiful landscape"/>
    </div>
  </div>

  <div class="block vertical">
    <Media low="/img/vertical-4-low.webp" high="/img/vertical-4-2560w.webp" cover={true} alt="A beautiful landscape"/>
  </div>

  <div class="block auto double launch">
    <div>
      <Media low="/img/double-14-low.webp" high="/img/double-14-2560w.webp" alt="A beautiful landscape"/>
    </div>
    <div>
      <Media low="/img/double-11-low.webp" high="/img/double-11-2560w.webp" alt="A beautiful landscape"/>
    </div>
    <div class="launch-info europa-30">
      <p class="europa-45 uppercase">Paris Launch Party</p>
      <p>6th March 2025</p>
      <p>Oddity Paris • 27 rue Notre Dame de Nazareth, Paris 45003, France • contact@oddityparis.fr • +33 (0)1 88 61 02 67 • <a href="https://www.instagram.com/oddityparis" target="_blank" rel="noopener noreferrer">@oddityparis</a></p>
    </div>
  </div>







  <!-- <div class="block people">
    <div class="grid">
      {#each people as person, i}
        <div class="person" onmouseenter={(e) => {personHover = i+1}} onmouseleave={(e) => {personHover = false}}>
          <div>
            <Media low="/img/people/{i+1}-low.webp" high="/img/people/{i+1}-thumb.webp" hidden={personHover &&personHover !== i+1} blur={1} delay={i*50} alt="A beautiful landscape"/>
          </div>
        </div>
      {/each}
      {#each people as person, i}
        <Media low="/img/people/{i+1}-low.webp" high="/img/people/{i+1}.webp" hidden={personHover !== i+1} blur={1} cover={true} alt="A beautiful landscape"/>
        <div class="person-bg"></div>
        <div class="person-info uppercase" class:hidden={personHover !== i+1}>
          <p>{person.name}</p>
          <p><a href={person.instagram} target="_blank" rel="noopener noreferrer">{person.handle}</a></p>
          <p>{person.location}</p>
          <p>{person.pronoun}</p>
        </div>
      {/each}
    </div>
  </div> -->

  <!-- <div class="block quote europa-43">
    <p>‘That’s what i like about it, being free. I think it’s the most important thing to me. I like going alone, meeting people or not. It makes me feel better.’</p>
    <p class="author times-27 right">( Val, Marseille )</p>
  </div> -->

  <div class="block credits europa-43">
    <p>Photographer <a href="https://www.felicityingram.com/" target="_blank" rel="noopener noreferrer">Felicity Ingram</a></p>
    <p>Casting Director <a href="https://www.instagram.com/emmamatell" target="_blank" rel="noopener noreferrer">Emma Mattell</a></p>
    <p>Creative Director <a href="https://www.sarah-bassett.com/" target="_blank" rel="noopener noreferrer">Sarah Bassett</a></p>
    <p>Studio Manager <a href="https://www.dinnage.uk/" target="_blank" rel="noopener noreferrer">Zac Dinnage</a></p>
    <p>Video <a href="https://www.davidjenewein.com/" target="_blank" rel="noopener noreferrer">David Jenewein</a></p>
    <p>Casting Assistant <a href="https://www.instagram.com/oliwiajancerowicz" target="_blank" rel="noopener noreferrer">Oliwia Jancerowicz</a></p>
    <p>Local Production (Seoul) <a href="https://www.instagram.com/m1m1y" target="_blank" rel="noopener noreferrer">Mi Kim</a></p>
    <p>Local Production (Tokyo) <a href="https://www.instagram.com/____a_k_o____" target="_blank" rel="noopener noreferrer">Ako Suzuki</a></p>
    <p>Digital Art Director <a href="https://www.linkedin.com/in/virgilia-ramella-5714a7130/" target="_blank" rel="noopener noreferrer">Virgilia Ramella</a></p>
    <p>Web Design <a href="https://liver.studio/" target="_blank" rel="noopener noreferrer">LIVER Studio</a><span>{@html ' + '}</span><a href="https://www.lucabunino.com" target="_blank" rel="noopener noreferrer">Luca Bunino</a></p>
  </div>
</section>


<section class="right">
  <Media cover={true} video="/video/book-1.mp4" high="/video/book-1-poster.webp" blur={3} hidden={mouse.position.x > innerWidth/2} alt="A beautiful landscape"/>
  <div class="book">
    <ProductCard product={data.product}/>
  </div>
</section>

<style>
/* Common */
:global(.btn.hero) {
  position: absolute;
  top: 76vh;
}
span {
  display: inline-block;
}

/* Times */
.times-container {
  position: sticky;
  /* top: calc(100vh - 1.2*2.5rem - .777rem - var(--gutter)*1); */
  top: calc(var(--vh) - 1.2*2.5rem - .777rem - var(--gutter)*1);
  z-index: 3;
  margin-bottom: calc(1.2*2.5rem);
  mix-blend-mode: difference;
}
.times {
  width: 100vw;
  display: flex;
  justify-content: space-between;
  filter: blur(100px);
  transition: var(--transition);
  transition-property: filter;
}
.times.loaded {
  filter: blur(0px);
}
.times div {
  width: 50%;
  padding: calc(var(--gutter)/2) var(--gutter);
  display: flex;
  justify-content: space-between;
}
@media screen and (max-width: 900px) {
  .times-container {
    position: fixed;
    top: 0;
  }
  .times div {
    position: absolute;
    width: 100%;
  }
  .times div:first-of-type {
    top: 0;
    margin-top: calc(var(--gutter)/2);
  }
  .times div:last-of-type {
    top: calc(100dvh - 1.2*2.5rem - .777rem - var(--gutter)*1);
  }
  /* .times div:last-child {
    position: absolute;
    margin-top: 10rem;
  } */
}

/* Marquee */
.marquee {
  position: sticky;
  top: calc(100vh - 1.2*2.5rem);
  top: calc(100dvh - 1.2*2.5rem);
  will-change: transform;
  background-color: var(--black);
  padding: .1em 0;
  overflow: hidden;
  z-index: 4;
  white-space: nowrap;
  display: flex;
  width: 100vw;
}
.marquee div {
  width: max-content;
}
.marquee p {
  width: max-content;
  display: inline-block;
}

/* Left */
section.left {
  grid-column: 1 / span 6;
}
@media screen and (max-width: 900px) {
  section.left {
    grid-column: 1 / span 12;
  }
}
section.left > .block,
section.right,
.people .grid,
.double > div:not(.launch-info) {
  overflow: hidden;
  position: relative;
}
.vertical {
  height: calc(100vh - 1.2*2.5rem);
  height: calc(100dvh - 1.2*2.5rem);
  min-height: 700px;
  position: relative;
}
.vertical.hero {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: var(--black);
  gap: calc(var(--gutter)*3);
  margin-top: calc((-.777rem - var(--gutter)*1) - 1.2*5rem);
}
.vertical.hero .top-credits {
  display: flex;
  width: 100%;
  padding: calc(var(--gutter)/2) var(--gutter);
  justify-content: space-between;
  gap: calc(var(--gutter)*2);
  list-style: none;
  top: 0;
  position: absolute;
  text-align: center;
}
h2 {
  text-align: center;
}
.horizontal-small {
  aspect-ratio: 756/272;
}
.horizontal-big {
  aspect-ratio: 756/465;
}
.double {
  width: 100%;
  display: flex;
}
.double > div:not(.launch-info) {
  width: 50%;
  overflow: hidden;
}
.quote {
  background-color: var(--white);
  color: var(--black);
  padding: 3rem 1rem;
  text-align: center;
}
.quote .author.left {
  text-align: left;
  padding-left: 2.3em;
}
.quote .author.right {
  text-align: right;
  padding-right: 2.3em;
}
.quote-img {
  position: relative;
}
.quote-img p {
  position: absolute;
  top: 0;
  padding: calc(var(--gutter)/2) var(--gutter) var(--gutter);
  hyphens: auto;
}
.quote-img.bottom p {
  top: unset;
  bottom: 0;
}
.people .grid {
  grid-template-columns: repeat(5, 1fr);
  display: grid;
  padding: calc(var(--gutter)*7) calc(var(--gutter)*4) calc(var(--gutter)*4);
}
.person {
  padding: calc(var(--gutter)*2) calc(var(--gutter)*.5);
}
.person>div {
  overflow: hidden;
}
.person-bg {
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: -2;
  background-color: var(--white);
}
.person-info {
  position: absolute;
  left: var(--gutter);
  bottom: var(--gutter);
  color: var(--white);
  z-index: 3;
  transition: var(--transition);
}
.launch {
  /* position: relative;
  display: flex;
  justify-content: center;
  align-items: center; */
}
.launch-info {
  transform: rotate(1deg);
  opacity: .95;
  padding: 0 calc(var(--gutter)*6);
  text-align: center;
  position: absolute;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.launch-info p {
  margin-top: .6em;
}
.credits {
  background-color: var(--white);
  color: var(--black);
  padding: var(--gutter) var(--gutter) calc(1.2*2.5rem + .777rem + var(--gutter)*2);
  line-height: .800;
}
.credits a {
  font-weight: 400;
}
.credits span {
  display: inline;
  font-weight: 400;
}

@media screen and (max-width: 1400px) {
  .people .grid { grid-template-columns: repeat(4, 1fr); }
}
@media screen and (max-width: 1300px) {
  .people .grid { grid-template-columns: repeat(3, 1fr); }
}
@media screen and (max-width: 900px) {
  section.left {
    grid-column: 1 / span 12;
    grid-row: 2;
  }
  .vertical.hero {
    margin-top: calc((-.777rem - var(--gutter)*1) - 1.2rem);
    height: 30vh;
    height: 30dvh;
    min-height: unset;
  }
  .vertical.hero .top-credits {
    margin-top: 20vh;
  }
  h2 {
    position: fixed;
    text-align: center;
    display: block;
    width: 100%;
    color: var(--black);
    top: calc(100vh - 1.2*2.5rem - .777rem - var(--gutter)*1);
    top: calc(100dvh - 1.2*2.5rem - .777rem - var(--gutter)*1);
    transform: translateY(-100%);
    z-index: 3;
  }
  .credits {
    padding: var(--gutter) var(--gutter) calc(1.2*2.5rem + .777rem + var(--gutter)*5);
  }
}

/* Right */
section.right {
  grid-column: 7 / span 6;
  height: calc(100vh - 1.2*2.5rem);
  height: calc(100dvh - 1.2*2.5rem);
  display: flex;
  justify-content: center;
  align-items: center;
  position: sticky;
  top: 0;
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
@media screen and (max-width: 900px) {
  section.right {
    grid-column: 1 / span 12;
    position: relative;
    height: 80vh;
    height: 80dvh;
  }
}
</style>