<script>
// Import
import '../app.css'
import { page } from '$app/stores';
import { onMount } from "svelte";
const { children } = $props()

// Stores
import { getPosition } from "$lib/mouse.svelte.js";
let mouse = getPosition()

// Variables
let innerWidth = $state()
let activeMenu = $state(true)
let isLoaded = $state(false);
const cities = { berlin: 'Europe/Berlin', lisbon: 'Europe/Lisbon', london: 'Europe/London', marseille: 'Europe/Paris', seoul: 'Asia/Seoul', tokyo: 'Asia/Tokyo' };
let times = $state(Object.fromEntries(Object.keys(cities).map(city => [city, ''])));

// Function to get formatted time
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

// Grid (not needed in production)
let viewGrid = $state(false)
const gridColumnsDesktop = 12
const gridColumnsMobile = 4
function handleKey({key}) {if (key === 'G') {viewGrid = !viewGrid}}

function toggleCredits() {
  creditsOpen = !creditsOpen;
  setTimeout(() => {
    const pageHeight = document.body.scrollHeight
    console.log(creditsHeight);
    
    window.scrollTo({
      top: pageHeight + creditsHeight,
      behavior: "smooth" // Smooth scrolling effect
    });
  }, 200);
}
</script>
  
<svelte:head>
  <title>Technophoria</title>
  <meta name="description" content="To be done">
  <link rel="canonical" href={$page.url}>
  <meta name="robots" content="index,follow">
  <meta name="googlebot" content="index,follow">
  <meta property="og:title" content="Technophoria">
  <meta property="og:description" content="To be done">
  <meta property="og:url" content={$page.url}>
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="Technophoria">
</svelte:head>

<svelte:window bind:innerWidth onkeyup={handleKey}></svelte:window>

{#if viewGrid}
<div id="layout"
      style="grid-template-columns:repeat({innerWidth > 800 ? gridColumnsDesktop : gridColumnsMobile}, 1fr);pointer-events:none;display: grid;position:fixed; z-index:999;width: -moz-available;width: -webkit-fill-available;height: -moz-available;height: -webkit-fill-available;margin:0 var(--gutter);gap:var(--gutter);opacity:.2;">
  {#each Array(innerWidth > 800 ? gridColumnsDesktop : gridColumnsMobile) as _, i}
    <div style="background-color:red"></div>
  {/each}
</div>
{/if}

<header>
  <nav>
    <ul class="menu uppercase europa-24">
      {#if $page.url.pathname !== "/"}<li class="menu-item"><a href="/">Home</a></li>{/if}
      <li class="menu-item" class:white={mouse.position.x > innerWidth/2}><button class="transition">Cart (0)</button></li>
    </ul>
  </nav>
</header>

<main class:loaded={isLoaded}>
  {@render children()}
</main>

{#if $page.url.pathname === "/"}
<div class="times uppercase eurostile-14" class:loaded={isLoaded}>
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
<div class="marquee europa-45">
  <p>BOOK RELEASE AT PARIS LAUNCH PARTY // 6th MARCH 2025 - Oddity Paris - 27 Rue Notre Dame de Nazareth, Paris 75003, France // </p>
</div>
{/if}

<footer class="europa-10 uppercase">
  <ul>
    <li>To be done</li>
  </ul>
  <ul>
    <li><a class:active={$page.url.pathname == '/technophoria'} href="/technophoria">Technophoria</a></li>
  </ul>
</footer>
  
  
  
<style>
/* Header */
header {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 3;
  margin: calc(var(--gutter)/2) var(--gutter);
  width: -webkit-fill-available;
}
.menu {
  list-style: none;
  padding: 0;
  display: flex;
  justify-content: flex-end;
  gap: calc(var(--gutter)*3);
}
.menu-item {
  color: var(--black);
}
.menu-item.white button {
  color: var(--white);
}
.menu-item.white button:hover {
  color: var(--gray);
}
main {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  width: 100%;
}

/* Times */
.times {
  position: fixed;
  top: calc(100vh - 1.2*2.5rem - .777rem - var(--gutter)*2);
  top: calc(100svh - 1.2*2.5rem - .777rem - var(--gutter)*2);
  width: 100%;
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
  position: fixed;
  top: calc(100vh - 1.2*2.5rem);
  top: calc(100svh - 1.2*2.5rem);
  background-color: var(--black);
  padding: .1em 0;
  overflow: hidden;
}
.marquee p {
  width: max-content;
}

/* Footer */
footer {
  height: 50vh;
  height: 50svh;
  background-color: var(--white);
  color: var(--black);
}
footer ul {
  list-style: none;
  padding: 0;
}
</style>