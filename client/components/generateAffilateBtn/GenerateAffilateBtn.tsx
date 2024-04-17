"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";

export const GenerateAffilateBtn = () => {
  const [isLoading, setIsloading] = useState(false);

  const handleClick = () => {
    setIsloading(true);
  };

  return (
    <Button
      disabled={isLoading}
      onClick={handleClick}
      size="lg"
      className="bg-white text-[#135d66] hover:bg-gray-100 font-bold py-2 px-4 rounded-lg text-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1 shadow-lg"
    >
      {isLoading ? (
        <>
          <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
          Generating Your Affiliate Link
        </>
      ) : (
        "Generate Affiliate Link"
      )}
    </Button>
  );
};
