import React, { memo } from "react";

export type TooltipProps = {
  text: string;
  children: React.ReactNode;
};

const Tooltip: React.FC<TooltipProps> = memo(({ text, children }) => {
  return (
    <span className="group relative">
      <span className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-[#6e7984] px-2 py-1.5 text-sm text-white opacity-0 shadow-sm transition before:absolute before:left-1/2 before:top-full before:-translate-x-1/2 before:border-4 before:border-transparent before:border-t-secondary before:content-[''] group-hover:opacity-60">
        {text}
      </span>

      {children}
    </span>
  );
});

Tooltip.displayName = "Tooltip";

export default Tooltip;
