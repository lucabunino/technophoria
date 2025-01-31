<script>
let innerWidth = $state()
let personHover = $state(false)
let isLoaded = $state(false);

import Image from "$lib/image.svelte";
import { getPosition } from "$lib/mouse.svelte.js";
let mouse = getPosition()


const cities = { berlin: 'Europe/Berlin', lisbon: 'Europe/Lisbon', london: 'Europe/London', marseille: 'Europe/Paris', seoul: 'Asia/Seoul', tokyo: 'Asia/Tokyo' };
let times = $state(Object.fromEntries(Object.keys(cities).map(city => [city, ''])));
const getTime = (tz) => new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false, timeZone: tz }).format(new Date());

// Lifecycle
$effect(() => {
  isLoaded = true

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
</script>

<svelte:window bind:innerWidth onmousemove={(e) => handleMouseMove(e)}></svelte:window>
<section class="left">
  <div class="times-container">
    <div class="times uppercase eurostile-14" class:loaded={isLoaded && !personHover}>
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
  <div class="block vertical hero">
    <Image lowRes="/img/1-lowres.webp" highRes="/img/1.webp" cover={true} alt="A beautiful landscape"/>
    <ul class="credits europa-22">
      <li>Photographer<br><a class="europa-28 uppercase" href="https://www.felicityingram.com/" target="_blank" rel="noopener noreferrer">Felicity Ingram</a></li>
      <li>Casting<br><a class="europa-28 uppercase" href="https://www.instagram.com/emmamatell" target="_blank" rel="noopener noreferrer">Emma Matell</a></li>
      <li>Creative Direction<br><a class="europa-28 uppercase" href="https://www.sarah-bassett.com/" target="_blank" rel="noopener noreferrer">Sarah Bassett</a></li>
    </ul>
    <h2 class="uppercase europa-66">Technophoria<br>By Felicity Ingram<br><span class="lowercase">6th</span> March 2025</h2>
    <a class="btn" class:hidden={!isLoaded} href="/technophoria">Preorder now</a>
  </div>
  
  <div class="block quote-img europa-66">
    <Image lowRes="/img/3-lowres.webp" highRes="/img/3.webp" alt="A beautiful landscape"/>
    <p>‘Technophoria is an ode to these moments of transcendence, where the colletive energy or a crowd becomes something greater than the sum of its parts.’</p>
  </div>

  <div class="block auto">
    <Image lowRes="/img/4-lowres.webp" highRes="/img/4.webp" alt="A beautiful landscape"/>
  </div>
  <div class="block quote europa-43">
    <p>‘This book is my contribution to the legacy of the rave, a chronicle of the nights that shaped me and countless others around.’</p>
    <p class="author times-27 left">( Felicity Ingram )</p>
  </div>
  <div class="block vertical">
    <Image lowRes="/img/1-lowres.webp" highRes="/img/1.webp" alt="A beautiful landscape"/>
  </div>
  <div class="block people">
    <div class="grid">
      {#each people as person, i}
        <div class="person" onmouseenter={(e) => {personHover = i+1}} onmouseleave={(e) => {personHover = false}}>
          <div>
            <Image lowRes="/img/people/{i+1}-lowres.webp" highRes="/img/people/{i+1}-thumb.webp" hidden={personHover &&personHover !== i+1} blur={1} delay={i*50} alt="A beautiful landscape"/>
          </div>
        </div>
      {/each}
      {#each people as person, i}
        <Image lowRes="/img/people/{i+1}-lowres.webp" highRes="/img/people/{i+1}.webp" hidden={personHover !== i+1} blur={1} cover={true} alt="A beautiful landscape"/>
        <div class="person-bg"></div>
        <div class="person-info uppercase" class:hidden={personHover !== i+1}>
          <p>{person.name}</p>
          <p><a href={person.instagram} target="_blank" rel="noopener noreferrer">{person.handle}</a></p>
          <p>{person.location}</p>
          <p>{person.pronoun}</p>
        </div>
      {/each}
    </div>
  </div>
  <div class="block quote europa-43">
    <p>‘It’s the only thing that has allowed me to express who I really am and to find a  place to heal.’</p>
    <p class="author times-27 right">( Selva, Marseille )</p>
  </div>
  <div class="block launch">
    <Image lowRes="/img/3-lowres.webp" highRes="/img/3.webp" cover={true} alt="A beautiful landscape"/>
    <div class="launch-info europa-28">
      <p class="europa-36 uppercase">Paris Launch Party</p>
      <p>6th March 2025</p>
      <p>Oddity Paris • 27 rue Notre Dame de Nazareth, Paris 45003, France • contact@oddityparis.fr • +33 (0)1 88 61 02 67 • <a href="https://www.instagram.com/oddityparis" target="_blank" rel="noopener noreferrer">@oddityparis</a></p>
    </div>
  </div>
</section>


<section class="right">
  <!-- <video class="video" src=""></video> -->
  <Image lowRes="/img/2-lowres.webp" highRes="/img/2.webp" cover={true} hidden={mouse.position.x > innerWidth/2} alt="A beautiful landscape"/>
  <div class="book">
    <Image lowRes="/img/cover-lowres.webp" highRes="/img/cover.webp" bookCover={true} blur={3} hidden={mouse.position.x < innerWidth/2} alt="A beautiful landscape"/>
    <button class:hidden={!isLoaded} class="btn border-white">Add to cart</button>
  </div>
</section>

<style>
/* Times */
.times-container {
  position: sticky;
  top: calc(100vh - 1.2*2.5rem - .777rem - var(--gutter)*2);
  top: calc(100svh - 1.2*2.5rem - .777rem - var(--gutter)*2);
  z-index: 3;
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

/* Left */
section.left {
  grid-column: 1 / span 6;
}
section.left > .block,
section.right,
.people .grid {
  overflow: hidden;
  position: relative;
}
.vertical {
  height: 100vh;
  height: 100svh;
  position: relative;
}
.vertical.hero {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: var(--black);
  gap: calc(var(--gutter)*3);
  margin-top: calc((-.777rem - var(--gutter)*2));
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
  padding: calc(var(--gutter)/2) var(--gutter);
  hyphens: auto;
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