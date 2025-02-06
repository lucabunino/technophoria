<script>
let innerWidth = $state()
let personHover = $state(false)
let domLoaded = $state(false);


import Media from "$lib/components/Media.svelte";
import QuickBuyDialog from "$lib/components/QuickBuyDialog.svelte";
import ProductCard from "$lib/components/ProductCard.svelte";

let mouse = getPosition()
import { getPosition } from "$lib/utils/mouse.svelte.js";

const { data, children } = $props()
$inspect(data)

const cities = { berlin: 'Europe/Berlin', lisbon: 'Europe/Lisbon', london: 'Europe/London', marseille: 'Europe/Paris', seoul: 'Asia/Seoul', tokyo: 'Asia/Tokyo' };
let times = $state(Object.fromEntries(Object.keys(cities).map(city => [city, ''])));
const getTime = (tz) => new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false, timeZone: tz }).format(new Date());

// Lifecycle
$effect(() => {
  domLoaded = true
  const updateTimes = () => {
    for (const city in cities) {
      times[city] = getTime(cities[city]);
    }
  };
  updateTimes();
  const interval = setInterval(updateTimes, 1000);
  return () => clearInterval(interval);
})

let people = [
  { name: "Sachi", handle: "@sachishimiz", instagram: "https://www.instagram.com/sachishimiz/", location: "Tokyo", pronoun: "She/Her" },
  { name: "Hiroshi", handle: "@hiroshitanaka", instagram: "https://www.instagram.com/hiroshitanaka/", location: "Osaka", pronoun: "He/Him" },
  { name: "Emiko", handle: "@emikoyamamoto", instagram: "https://www.instagram.com/emikoyamamoto/", location: "Kyoto", pronoun: "She/Her" },
  { name: "Kenji", handle: "@kenjifujimoto", instagram: "https://www.instagram.com/kenjifujimoto/", location: "Sapporo", pronoun: "He/Him" },
  { name: "Naomi", handle: "@naomikobayashi", instagram: "https://www.instagram.com/naomikobayashi/", location: "Nagoya", pronoun: "She/Her" },
  { name: "Takeshi", handle: "@takeshiwatanabe", instagram: "https://www.instagram.com/takeshiwatanabe/", location: "Fukuoka", pronoun: "He/Him" },
  { name: "Yuki", handle: "@yukimatsumoto", instagram: "https://www.instagram.com/yukimatsumoto/", location: "Tokyo", pronoun: "They/Them" },
  { name: "Aiko", handle: "@aikoyamada", instagram: "https://www.instagram.com/aikoyamada/", location: "Hiroshima", pronoun: "She/Her" },
  { name: "Kenta", handle: "@kentatanaka", instagram: "https://www.instagram.com/kentatanaka/", location: "Osaka", pronoun: "He/Him" },
  { name: "Mika", handle: "@mikashirai", instagram: "https://www.instagram.com/mikashirai/", location: "Yokohama", pronoun: "She/Her" },
  { name: "Ryo", handle: "@ryosugimoto", instagram: "https://www.instagram.com/ryosugimoto/", location: "Sendai", pronoun: "He/Him" },
  { name: "Haruka", handle: "@harukafujii", instagram: "https://www.instagram.com/harukafujii/", location: "Kobe", pronoun: "She/Her" },
  { name: "Taro", handle: "@taroyoshida", instagram: "https://www.instagram.com/taroyoshida/", location: "Tokyo", pronoun: "He/Him" },
  { name: "Sayuri", handle: "@sayurikawasaki", instagram: "https://www.instagram.com/sayurikawasaki/", location: "Nagano", pronoun: "She/Her" },
  { name: "Daichi", handle: "@daichisato", instagram: "https://www.instagram.com/daichisato/", location: "Okinawa", pronoun: "He/Him" }
];

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
    <div class="times uppercase eurostile-14" class:loaded={domLoaded && !personHover}>
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

  <div class="marquee europa-45">
    <div use:marquee={1}>
      <p>BOOK RELEASE AT PARIS LAUNCH PARTY // 6th MARCH 2025 - Oddity Paris - 27 Rue Notre Dame de Nazareth, Paris 75003, France // </p>
      <p>BOOK RELEASE AT PARIS LAUNCH PARTY // 6th MARCH 2025 - Oddity Paris - 27 Rue Notre Dame de Nazareth, Paris 75003, France // </p>
    </div>
  </div>

  <div class="block vertical hero">
    <Media lowRes="/img/1-lowres.webp" highRes="/img/1.webp" cover={true} alt="A beautiful landscape"/>
    <ul class="top-credits europa-22">
      <li>Photographer<br><a class="europa-28 uppercase" href="https://www.felicityingram.com/" target="_blank" rel="noopener noreferrer">Felicity Ingram</a></li>
      <li>Casting<br><a class="europa-28 uppercase" href="https://www.instagram.com/emmamatell" target="_blank" rel="noopener noreferrer">Emma Matell</a></li>
      <li>Creative Direction<br><a class="europa-28 uppercase" href="https://www.sarah-bassett.com/" target="_blank" rel="noopener noreferrer">Sarah Bassett</a></li>
    </ul>
    <h2 class="uppercase europa-66">Technophoria<br>By Felicity Ingram<br><span class="lowercase">6th</span> March 2025</h2>
    <a class="btn hero" class:hidden={!domLoaded} href="/products/{data.product.handle}">Preorder now</a>
  </div>
  
  <div class="block quote-img europa-66">
    <Media lowRes="/img/3-lowres.webp" highRes="/img/3.webp" cover={true} alt="A beautiful landscape"/>
    <p>‘Technophoria is an ode to these moments of transcendence, where the colletive energy or a crowd becomes something greater than the sum of its parts.’</p>
  </div>

  <div class="block auto horizontal-small">
    <Media lowRes="/img/3-lowres.webp" highRes="/img/3.webp" cover={true} alt="A beautiful landscape"/>
  </div>

  <div class="block auto horizontal-big">
    <Media lowRes="/img/2-lowres.webp" video="/video/footage-1.mp4" cover={true} highRes="/img/2.webp" alt="A beautiful landscape"/>
  </div>
  
  <div class="block auto double">
    <div>
      <Media lowRes="/img/1-lowres.webp" highRes="/img/1.webp" alt="A beautiful landscape"/>
    </div>
    <div>
      <Media lowRes="/img/1-lowres.webp" highRes="/img/1.webp" alt="A beautiful landscape"/>
    </div>
  </div>
  <div class="block auto double">
    <div>
      <Media lowRes="/img/1-lowres.webp" highRes="/img/1.webp" alt="A beautiful landscape"/>
    </div>
    <div>
      <Media lowRes="/img/1-lowres.webp" highRes="/img/1.webp" alt="A beautiful landscape"/>
    </div>
  </div>

  <div class="block quote europa-43">
    <p>‘I want to express to the world with my unique make up and musicality, and I hope many people can feel it. Inspiration is my past and also my life experience. I wanted to express the painful and sad things without forgetting them.’</p>
    <p class="author times-27 left">( Unknown, Tokyo )</p>
  </div>

  <div class="block vertical">
    <Media lowRes="/img/2-lowres.webp" video="/video/motion-2.mp4" cover={true} highRes="/img/2.webp" alt="A beautiful landscape"/>
  </div>

  <div class="block auto horizontal-big">
    <Media lowRes="/img/2-lowres.webp" video="/video/footage-2.mp4" cover={true} highRes="/img/2.webp" alt="A beautiful landscape"/>
  </div>

  <div class="block vertical">
    <Media lowRes="/img/2-lowres.webp" video="/video/motion-1.mp4" cover={true} highRes="/img/2.webp" alt="A beautiful landscape"/>
  </div>

  <div class="block auto horizontal-small quote-img bottom europa-66">
    <Media lowRes="/img/2-lowres.webp" video="/video/footage-3.mp4" cover={true} highRes="/img/2.webp" alt="A beautiful landscape"/>
    <p><span>‘An ode to the power </span> <span>of music and the spaces</span> <span>it creates.’</span></p>
  </div>

  <!-- <div class="block people">
    <div class="grid">
      {#each people as person, i}
        <div class="person" onmouseenter={(e) => {personHover = i+1}} onmouseleave={(e) => {personHover = false}}>
          <div>
            <Media lowRes="/img/people/{i+1}-lowres.webp" highRes="/img/people/{i+1}-thumb.webp" hidden={personHover &&personHover !== i+1} blur={1} delay={i*50} alt="A beautiful landscape"/>
          </div>
        </div>
      {/each}
      {#each people as person, i}
        <Media lowRes="/img/people/{i+1}-lowres.webp" highRes="/img/people/{i+1}.webp" hidden={personHover !== i+1} blur={1} cover={true} alt="A beautiful landscape"/>
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

  <div class="block quote europa-43">
    <p>‘That’s what i like about it, being free. I think it’s the most important thing to me. I like going alone, meeting people or not. It makes me feel better.’</p>
    <p class="author times-27 right">( Val, Marseille )</p>
  </div>

  <div class="block launch">
    <Media lowRes="/img/3-lowres.webp" highRes="/img/3.webp" cover={true} alt="A beautiful landscape"/>
    <div class="launch-info europa-28">
      <p class="europa-36 uppercase">Paris Launch Party</p>
      <p>6th March 2025</p>
      <p>Oddity Paris • 27 rue Notre Dame de Nazareth, Paris 45003, France • contact@oddityparis.fr • +33 (0)1 88 61 02 67 • <a href="https://www.instagram.com/oddityparis" target="_blank" rel="noopener noreferrer">@oddityparis</a></p>
    </div>
  </div>

  <div class="block credits europa-43">
    <p>Photographer <a href="http://www.lucabunino.com" target="_blank" rel="noopener noreferrer">Felicity Ingram</a></p>
    <p>Casting Director <a href="http://www.lucabunino.com" target="_blank" rel="noopener noreferrer">Emma Mattell</a></p>
    <p>Creative Director <a href="http://www.lucabunino.com" target="_blank" rel="noopener noreferrer">Sarah Bassett</a></p>
    <p>Studio Manager <a href="http://www.lucabunino.com" target="_blank" rel="noopener noreferrer">Zac Dinnage</a></p>
    <p>Video <a href="http://www.lucabunino.com" target="_blank" rel="noopener noreferrer">David Jenewein</a></p>
    <p>Casting Assistant <a href="http://www.lucabunino.com" target="_blank" rel="noopener noreferrer">Oliwia Jancerowicz</a></p>
    <p>Local Production (Seoul) <a href="http://www.lucabunino.com" target="_blank" rel="noopener noreferrer">Mi Kim</a></p>
    <p>Local Production (Tokyo) <a href="http://www.lucabunino.com" target="_blank" rel="noopener noreferrer">Ako Suzuki</a></p>
    <p>Digital Art Director <a href="http://www.lucabunino.com" target="_blank" rel="noopener noreferrer">Virgilia Ramella</a></p>
    <p>Web Design <a href="http://www.lucabunino.com" target="_blank" rel="noopener noreferrer">LIVER</a></p>
    <p>Web Development <a href="http://www.lucabunino.com" target="_blank" rel="noopener noreferrer">Luca Bunino</a></p>
  </div>
</section>


<section class="right">
  <!-- <Media lowRes="/img/2-lowres.webp" highRes="/img/2.webp" cover={true} hidden={mouse.position.x > innerWidth/2} alt="A beautiful landscape"/> -->
  <Media lowRes="/img/2-lowres.webp" highRes="/img/cover.webp" cover={true} video="/video/book-1.mp4" blur={3} hidden={mouse.position.x > innerWidth/2} alt="A beautiful landscape"/>
  <div class="book">
    <ProductCard product={data.product}/>
  </div>
</section>

<style>
/* Common */
:global(.btn.hero) {
  position: absolute;
  top: 80vh;
}
span {
  display: inline-block;
}

/* Times */
.times-container {
  position: sticky;
  top: calc(100vh - 1.2*2.5rem - .777rem - var(--gutter)*2);
  top: calc(100svh - 1.2*2.5rem - .777rem - var(--gutter)*2);
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
  padding: var(--gutter);
  display: flex;
  justify-content: space-between;
}

/* Marquee */
.marquee {
  position: sticky;
  top: calc(100vh - 1.2*2.5rem);
  top: calc(100svh - 1.2*2.5rem);
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
section.left > .block,
section.right,
.people .grid,
.double > div {
  overflow: hidden;
  position: relative;
}
.vertical {
  height: calc(100vh - 1.2*2.5rem);
  height: calc(100svh - 1.2*2.5rem);
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
  margin-top: calc((-.777rem - var(--gutter)*2) - 1.2*5rem);
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
.vertical.hero h2 {
  text-align: center;
}
.horizontal-small {
  aspect-ratio: 756/272;
}
.horizontal-big {
  aspect-ratio: 756/465;
}
.double {
  display: flex;
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
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}
.launch-info {
  padding: calc(var(--gutter)*7) calc(var(--gutter)*6) calc(var(--gutter)*9);
  text-align: center;
}
.launch-info p {
  margin-top: .6em;
}
.credits {
  background-color: var(--white);
  color: var(--black);
  padding: var(--gutter) var(--gutter) calc(1.2*2.5rem + .777rem + var(--gutter)*2);
  line-height: .860;
}
.credits a {
  font-weight: 400;
}

@media screen and (max-width: 1400px) {
  .people .grid { grid-template-columns: repeat(4, 1fr); }
}
@media screen and (max-width: 1300px) {
  .people .grid { grid-template-columns: repeat(3, 1fr); }
}

/* Right */
section.right {
  grid-column: 7 / span 6;
  height: 100vh;
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
</style>