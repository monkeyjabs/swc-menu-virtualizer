# Spectrum Web Components

The Spectrum Web Components project is an implementation of Spectrum, Adobe’s design system. It's designed to work with any web framework — or even without one.

### Links

- [Official website (https://opensource.adobe.com/spectrum-web-components/)](https://opensource.adobe.com/spectrum-web-components/)
- [Spectrum](https://spectrum.adobe.com/)
- [Spectrum CSS](https://opensource.adobe.com/spectrum-css/index.html)
- [GitHub](https://github.com/adobe/spectrum-web-components)
- [Issues](https://github.com/adobe/spectrum-web-components/issues)

### Playground info

Trying to get the keyboard navigation to work with `sp-menu` when we use a LitVirtualizer to render the `sp-menu-item`.

Two issues we need to solve here:
1. When to tell the Virtualizer to scroll up or scroll down during Arrow key navigation
2. How to get `sp-menu` to register new `sp-menu-item` when they are scroll into view.