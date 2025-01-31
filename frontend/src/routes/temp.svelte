<!-- header.on {
  pointer-events: all;
}
.logo {
  display: flex;
  height: 4.444rem;
  z-index: 2;
  gap: .5rem;
  cursor: pointer;
  pointer-events: all;
  width: fit-content;
}
.logo>div {
  height: 100%;
}
.logo>div:first-of-type {
  background-color: var(--grayOpacity);
  fill: var(--black);
}
.logo>div:first-of-type::after {
  content: '';
  display: block;
  width: 100%;
  height: 100%;
  position: relative;
  top: -100%;
  left: 0;
  background-color: var(--blackOpacity);
  transition: var(--transition);
}
.logo.type>div:first-of-type::after,
.logo:hover>div:first-of-type::after {
  width: 0%;
}
.logo>div svg {
  width: auto;
  height: 100%;
  transition: var(--transition);
  vertical-align: middle;
}
.logo>div:last-of-type svg {
  background-color: var(--black);
  border-radius: 50%;
  fill: var(--white);
}
.logo.type>div:last-of-type svg,
.logo:hover>div:last-of-type svg {
  background-color: var(--grayOpacity);
  fill: var(--black);
  transform: rotate3d(0, 0, 1, -1turn)
}
nav {
  display: flex;
  width: -webkit-fill-available;
  padding-top: .7rem;
}
.submenu-container {
  left: 100%;
  top: 0;
  position: absolute;
}
.menu,
.submenu {
  display: flex;
  flex-direction: column;
  gap: .7rem;
  list-style: none;
  padding: 0;
  width: max-content;
  position: relative;
  /* border: solid green; */
}
.submenu {
  position: absolute;
  padding-left: .7rem;
  pointer-events: none;
}
.submenu.on {
  pointer-events: all;
}
.submenu .menu-item {
  pointer-events: all;
}
.menu-container.off .menu-item,
.submenu:not(.on) .menu-item {
  transform: translateX(-101%);
}
.menu-item-container {
  overflow: hidden;
  transition: var(--transition);
  transition-delay: .3s;
}
.menu-item-container.undelayed {
  transition-delay: 0s;
}
.menu-item {
  display: inline-block;
  width: auto;
  position: relative;
  background-color: var(--grayOpacity);
  width: fit-content;
  transition: var(--transition);
  line-height: 1;
  padding: .1em .1em;
}
.menu-item-container:nth-child(1) .menu-item {transition-delay: 0.00s;}
.menu-item-container:nth-child(2) .menu-item {transition-delay: 0.03s;}
.menu-item-container:nth-child(3) .menu-item {transition-delay: 0.06s;}
.menu-item-container:nth-child(4) .menu-item {transition-delay: 0.09s;}
.menu-item-container:nth-child(5) .menu-item {transition-delay: 0.12s;}
.menu-item:before {
  content: '';
  display: block;
  height: 1.3em;
  top: -.1em;
  background-color: var(--blackOpacity);
  position: absolute;
  left: 0;
  z-index: 1;
  transition: var(--transition);
}
.menu-item.off::before {
  width: 100%;
}
.menu-item:not(.off)::before {
  width: 0;
}

/* Main */
main {
  transition: var(--transition);
  opacity: 0;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  column-gap: var(--gutter);
}



main.loaded {
  opacity: 1;
}
main>div {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  column-gap: var(--gutter);
  padding: var(--gutter) var(--gutter);
}
@media screen and (max-width: 1200px) {
  main {
    min-height: calc(100vh - (.777rem*4*1.2 + 6rem + var(--gutter)*6));
  }
  main>div {
    margin-top: 6rem;
  }
}
@media screen and (max-width: 900px) {
  nav {
    height: calc(100vh - var(--gutter)*2);
    overflow: scroll;
    scrollbar-width: none;
    -ms-overflow-style: none;
    overflow-y: scroll;
  }
  nav::-webkit-scrollbar {
    display: none; /* For Chrome, Safari, and Edge */
  }
  .menu-item {
    cursor: pointer;
  }
  p.menu-item:hover::before {
    width: 0;
  }
  /* .menu-container {
    pointer-events: none;
  }
  .menu-container * {
    pointer-events: all;
  } */
  .menu-item-container {
    width: calc(100vw - var(--gutter)*2);
  }
  .submenu-container {
    position: unset;
  }
  .submenu {
    padding-left: 0;
    padding-top: .7rem;
  }
  .desktop-only {
    display: none !important;
  }
  .mobile-only {
    display: flex !important;
  }
}


/* Footer */
footer {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  padding: calc(var(--gutter)*5) var(--gutter) var(--gutter);
  column-gap: var(--gutter);
}
/* footer>*:nth-child(1) {
  grid-column: 1 / span 2;
} */
footer>*:nth-child(1) {
  grid-column: 3 / span 4;
  display: flex;
  column-gap: var(--gutter);
  justify-content: space-between;
  align-items: flex-end;
}
footer>*:nth-child(1) div {
  display: flex;
  column-gap: var(--gutter);
  width: 100%;
}
footer ul {
  list-style: none;
  padding: 0;
  width: max-content;
}
footer img {
  height: 2.2rem;
  width: auto;
}
footer button {
  padding: 0;
  color: var(--black);
  transition: none;
}
footer button:hover {
  color: var(--gray);
  transition: none;
}
#credits {
  padding: var(--gutter);
  background-color: var(--black);
  color: var(--white);
}

@media screen and (max-width: 1200px) {
  footer>*:nth-child(1) {
    grid-column: 1 / span 6;
  }
}


@media screen and (max-width: 900px) {
  footer div,
  footer p {
    grid-column: 1 / 4;
  }
}

@media screen and (max-width: 600px) {
  section:not(#hero) {
    grid-template-columns: repeat(1, 1fr);
  }
  section:not(#hero)>div {
    grid-column: unset;
  }
  footer ul {
    width: 25%
  }
}
</style> -->