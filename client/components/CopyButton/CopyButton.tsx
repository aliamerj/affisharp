"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { CheckCheck, CopyIcon } from "lucide-react";

export const CopyButton = ({ text }: { text: string }) => {
  const [isCopied, setIsCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(text);
    setIsCopied(true);

    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  };

  return (
    <Button type="button" size="sm" className="w-full sm:w-auto" onClick={copy}>
      {isCopied ? (
        <CheckCheck className="h-4 w-4" />
      ) : (
        <CopyIcon className="h-4 w-4" />
      )}
      <span className="sr-only">Copy</span>
    </Button>
  );
};
