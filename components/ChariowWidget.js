"use client";

import { useEffect } from "react";

const SCRIPT_SRC = "https://js.chariowcdn.com/v1/widget.min.js";
const STYLE_HREF = "https://js.chariowcdn.com/v1/widget.min.css";

// Module-level guard: the script must only ever be requested once per page
// load, no matter how many <ChariowWidget> instances mount.
let scriptRequested = false;

const DATA_ATTR_MAP = {
  productId: "data-product-id",
  storeDomain: "data-store-domain",
  style: "data-style",
  borderStyle: "data-border-style",
  ctaWidth: "data-cta-width",
  ctaAnimation: "data-cta-animation",
  locale: "data-locale",
  primaryColor: "data-primary-color",
  backgroundColor: "data-background-color",
  customCtaText: "data-custom-cta-text",
};

export default function ChariowWidget({
  productId,
  storeDomain,
  style,
  borderStyle,
  ctaWidth,
  ctaAnimation,
  locale,
  primaryColor,
  backgroundColor,
  customCtaText,
  className,
}) {
  useEffect(() => {
    if (!document.querySelector(`link[href="${STYLE_HREF}"]`)) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = STYLE_HREF;
      document.head.appendChild(link);
    }

    if (window.Chariow) {
      // Script already loaded (by another widget instance or a previous
      // navigation): just re-scan the DOM for new widget divs.
      window.Chariow.initializeWidget();
    } else if (!scriptRequested && !document.querySelector(`script[src="${SCRIPT_SRC}"]`)) {
      // Script not yet requested: inject it once. Its own load handler
      // scans the whole DOM, so it will pick up every widget div already
      // present, including ones from other instances mounted in the same
      // tick.
      scriptRequested = true;
      const script = document.createElement("script");
      script.src = SCRIPT_SRC;
      script.async = true;
      document.head.appendChild(script);
    }
    // If the script has been requested but hasn't loaded yet, do nothing:
    // its pending load will initialize every widget div present in the DOM.
  }, []);

  const props = { productId, storeDomain, style, borderStyle, ctaWidth, ctaAnimation, locale, primaryColor, backgroundColor, customCtaText };
  const dataAttrs = {};
  for (const [propName, attrName] of Object.entries(DATA_ATTR_MAP)) {
    const value = props[propName];
    if (value !== undefined) {
      dataAttrs[attrName] = value;
    }
  }

  return <div id="chariow-widget" className={className} {...dataAttrs} />;
}
