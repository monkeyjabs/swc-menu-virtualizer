import {
  LitElement,
  html,
  css,
  TemplateResult,
} from "lit";
import "@spectrum-web-components/button/sp-button.js";
import '@spectrum-web-components/menu/sp-menu.js';
import '@spectrum-web-components/menu/sp-menu-group.js';
import '@spectrum-web-components/menu/sp-menu-item.js';
import '@spectrum-web-components/menu/sp-menu-divider.js';
import '@spectrum-web-components/popover/sp-popover.js';
import { Menu } from "@spectrum-web-components/menu";
import headingStyles from "@spectrum-web-components/styles/heading.js";
import { flow } from "@lit-labs/virtualizer/layouts/flow.js";
import "./Virtualizer.js";
import { customElement, query } from "lit/decorators.js";
import { LitVirtualizer } from "@lit-labs/virtualizer/LitVirtualizer.js";

@customElement("my-menu")
export default class VirtualizedMenu extends LitElement {
  static styles = [
    css`
      :host {
        display: block;
      }
      .large-menu {
        width: 320px;
        height: 300px;
        overflow-y: auto;
        background-color: black;
      }
      sp-menu-item {
        width: 100%;
      }
      x-virtualizer {
        height: 100%;
      }
    `, headingStyles,
  ];

  @query("x-virtualizer")
  private virtualizer !:LitVirtualizer;

  @query("sp-menu")
  private menu !: Menu;

  private items = [];

  private firstIndex = 0;
  private lastIndex = 0;

  constructor() {
    super();
    this.items = Array(100).fill('menu-item ').map((_, i) => ({
      label: `item ${i + 1}`,
    }));
  }

  override connectedCallback() {
    super.connectedCallback();
  this.addEventListener('keydown', this.onKeyDown);
}

  renderMenuList(): TemplateResult {
    return html`
      <sp-menu class="large-menu" @change=${(event) => console.log("Menu Change", event)}>
        <x-virtualizer
          .layout=${flow({ direction: "vertical" })}
          scroller
          .items=${this.items}
          .renderItem=${(item, index) => html`<sp-menu-item id=${index}>${item.label}</sp-menu-item>`}
          @scroll=${this.scollEventHandler}
          @rangeChanged=${this.rangeChanged}
          @visibilityChanged=${this.visibilityChanged}
        ></x-virtualizer>
      </sp-menu>
    `
  }

  scollEventHandler(event) {
    // console.log("hocus pocus", event); 
    // const focusedItem = event.detail.item;
    // if (focusedItem && !this.virtualizer.isItemInBounds(focusedItem)) {
    //   this.virtualizer.scrollToItem(focusedItem);
    // }
  }

  rangeChanged(event) {
    // console.log("rangeChange", event);
  }

  visibilityChanged(event) {
    console.log("visibilityChange", event);
    this.firstIndex = event.first;
    this.lastIndex = event.last;
  }

  handleClick() {
    this.virtualizer.element(9).scrollIntoView({
      block: 'end',
      behavior: 'smooth',
    });
    // this.virtualizer.scrollToIndex(200, "nearest");
  }

  async onKeyDown(event) {
    // console.log("Keydown:", event.keyCode);
    const currentIndex = parseInt(this.menu.getAttribute("aria-activedescendant"));
    console.log("Current index:", currentIndex, "last index:", this.lastIndex);
    if (event.keyCode === 40) {
      if (currentIndex && ((currentIndex + 2) === this.lastIndex)) {
        const scrollToIndex = currentIndex + 5;
        console.log("scroll to index:",scrollToIndex, this.virtualizer);
        await this.virtualizer.scrollToIndex(scrollToIndex, "end");
        // this.virtualizer.element(scrollToIndex).scrollIntoView({
        //   block: 'end',
        //   behavior: 'smooth',
        // });
        await this.menu.requestUpdate();
      }
    }
  }
  
  protected render(): TemplateResult {
    return html`
      <h4 class="spectrum-Heading spectrum-Heading--sizeS">Menu with Virtualizer</h4>
      <p class="spectrum-Body spectrum-Body-sizeS">(Tab focus into the menu item, then use down arrow keys to scroll down the list)</p>
      <sp-button @click=${this.handleClick}>Scroll Into View</sp-button>
      ${this.renderMenuList()}
    `;
  }
}
