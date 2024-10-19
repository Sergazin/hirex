import React, { ReactNode } from "react";

export const ThinTopBar: React.FC<{ title: string; actions?: ReactNode }> = ($) => {
  return (
    <header className="sticky top-0 z-10 bg-background border-b flex items-center justify-center">
      <div className="container flex items-center justify-between py-2 px-4">
        <h1 className="text-xl font-bold">{$.title}</h1>
        {$.actions}
      </div>
    </header>
  );
};
