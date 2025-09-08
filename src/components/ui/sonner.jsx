import React from "react";
import { Toaster as Sonner } from "sonner";

const Toaster = (props) => {
  // For plain React.js, you can pass a theme prop manually if needed
  const theme = "light"; // or "dark", or get from your own state

  return (
    <Sonner
      theme={theme}
      className="toaster group"
      style={{
        "--normal-bg": "var(--popover)",
        "--normal-text": "var(--popover-foreground)",
        "--normal-border": "var(--border)",
      }}
      {...props}
    />
  );
};

export { Toaster };
