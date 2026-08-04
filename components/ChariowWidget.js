"use client";

import { useEffect } from "react";

const SCRIPT_SRC = "https://js.chariowcdn.com/v1/widget.min.js";
const STYLE_HREF = "https://js.chariowcdn.com/v1/widget.min.css";

export default function ChariowWidget() {
  useEffect(() => {
    if (!document.querySelector(`link[href="${STYLE_HREF}"]`)) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = STYLE_HREF;
      document.head.appendChild(link);
    }

    // Re-appended on every mount so the widget re-initialises after client-side navigation.
    const script = document.createElement("script");
    script.src = SCRIPT_SRC;
    script.async = true;
    document.head.appendChild(script);

    return () => script.remove();
  }, []);

  return (
    <div
      id="chariow-widget"
      data-product-id="prd_824w69na"
      data-store-domain="bundledeals.store"
      data-style="tap"
      data-border-style="rounded"
      data-cta-width="xs"
      data-background-color="#FFFFFF"
      data-cta-animation="shine"
      data-locale="en"
      data-primary-color="#ffcc00"
    />
  );
}
