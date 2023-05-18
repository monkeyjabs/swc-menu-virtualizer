import {
  customElement
} from "lit-element";
import { LitVirtualizer } from "@lit-labs/virtualizer/LitVirtualizer.js";
export { ScrollDirection } from "@lit-labs/virtualizer/layouts/shared/Layout.js";

@customElement("x-virtualizer")
export class Virtualizer extends LitVirtualizer {}