<script>
// Import
import '../app.css'
import { page } from '$app/stores';
import { onMount } from "svelte";
import { browser } from '$app/environment';
import { navigating } from '$app/stores';

// Shop
import CartUI from '$lib/components/CartUI.svelte';
import { createCart, getCart } from '$lib/api/shopify';

// Cart
import { getCartStore } from '$lib/cart.svelte.js';
const cart = getCartStore();

const { data, children } = $props()
$inspect(data)

// Stores
import { getPosition } from "$lib/utils/mouse.svelte.js";
let mouse = getPosition()

// Variables
let innerWidth = $state()
let activeMenu = $state(true)
let domLoaded = $state(false);

// Lifecycle
$effect(() => {
  setTimeout(() => {
    domLoaded = true
  }, 200);
})

let cartId = $state();
let cartUrl = $state();
let innerHeight = $state();

onMount(async () => {
  if (browser) {
    cartId = localStorage.getItem('cart_id');
    cart.setId(cartId)
  }
  if (!cartId) {
    const response = await createCart();
    cartId = response.cartCreate.cart.id;    
    if (browser) {
      localStorage.setItem('cart_id', cartId);
      cart.setId(cartId)
    }
    cart.setCheckoutUrl(response.cartCreate.cart.checkoutUrl);
    console.log("CART: " + cart.checkoutUrl);
    
  } else {
    const response = await getCart({ cartId: cartId });
    if (response.cart) {
      cartId = response.cart.id;
      cart.setCheckoutUrl(response.cart.checkoutUrl);
      cart.setItems(response.cart.lines.edges);
    } else {
      const response = await createCart();
      cartId = response.cartCreate.cart.id;
      if (browser) {
        localStorage.setItem('cart_id', cartId);
        cart.setId(cartId)
      }
    }
  }
});

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
  <link rel="preconnect" href="https://cdn.shopify.com">
  <link rel="preconnect" href="https://technophoria-felicity-ingram.myshopify.com">
</svelte:head>

<svelte:window bind:innerWidth bind:innerHeight onkeyup={handleKey}></svelte:window>

{#if viewGrid}
<div id="layout"
      style="grid-template-columns:repeat({innerWidth > 800 ? gridColumnsDesktop : gridColumnsMobile}, 1fr);pointer-events:none;display: grid;position:fixed; z-index:999;width: -moz-available;width: -webkit-fill-available;height: -moz-available;height: -webkit-fill-available;margin:0 var(--gutter);gap:var(--gutter);opacity:.2;">
  {#each Array(innerWidth > 800 ? gridColumnsDesktop : gridColumnsMobile) as _, i}
    <div style="background-color:red"></div>
  {/each}
</div>
{/if}

{#if domLoaded}
<header>
  <nav>
    <ul class="menu uppercase europa-24 mobile-europa-24">
      {#if $page.url.pathname !== "/"}<li class="menu-item" class:white={$page.url.pathname !== "/"}><a href="/">Home</a></li>{/if}
      {#if $page.url.pathname === "/"}<li class="mobile-only menu-item"><a href="/products/technophoria-by-felicity-ingram">Shop</a></li>{/if}
      <li class="menu-item cart" class:white={mouse.position.x > innerWidth/2 || $page.url.pathname !== "/"}><button class="transition" onclick={() => { cart.setDialog(false); }}>Cart ({cart.items[0] ? cart.items[0].node.quantity : 0})</button></li>
    </ul>
  </nav>
</header>

<CartUI/>

<main class:loaded={domLoaded}>
  {@render children()}
</main>

<!-- {#if $page.url.pathname === "/"}
<div class="marquee europa-45" use:marquee={1}>
  <p>OOK RELEASE AT PARIS LAUNCH PARTY // 6th MARCH 2025 - Oddity Paris - 27 Rue Notre Dame de Nazareth, Paris 75003, France //{@html ' B'}</p>
  <p>OOK RELEASE AT PARIS LAUNCH PARTY // 6th MARCH 2025 - Oddity Paris - 27 Rue Notre Dame de Nazareth, Paris 75003, France //{@html ' B'}</p>
</div>
{/if} -->

<footer class="europa-10">
  <ul>
    <li><a href="" class="uppercase">Terms and condition</a></li>
    <li><p>Felicity Ingram Rapideye, 79 Leonard Street, London</p><p>EC2A 4QS <a href="https://www.felicityingram.com/" target="_blank" rel="noopener noreferrer">felicityingram.com</a></p></li>
    <li><p>Date of Pubblication: XXX</p></li>
    <li><p>A editorial project by Felicity Ingram</p><p class="uppercase">First Edition © 2025</p></li>
  </ul>
</footer>
{/if}
  
  
  
<style>
/* Header */
header {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 3;
  margin: calc(var(--gutter)/1.5) var(--gutter);
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
.menu-item button {
  line-height: inherit;
}
.menu-item.white button,
.menu-item.white a {
  color: var(--white);
}
.menu-item.white button:hover,
.menu-item.white a:hover {
  color: var(--gray);
}
.menu-item.cart button {
  transition: none;
}
main {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  width: 100%;
}

@media screen and (max-width: 900px) {
  header {
    top: var(--gutter);
    margin-top: var(--gutter);
  }
  .menu {
    justify-content: space-between;
  }
  .menu-item {
    color: var(--white);
  }
  header {
    mix-blend-mode: difference;
  }
}

/* Footer */
footer {
  background-color: var(--black);
  z-index: 4;
  position: relative;
}
footer ul {
  list-style: none;
  padding: var(--gutter);
  display: flex;
  justify-content: space-between;
  border-top: solid 1px var(--white);
}

@media screen and (max-width: 900px) {
  footer ul {
    display: grid;
    gap: var(--gutter);
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>