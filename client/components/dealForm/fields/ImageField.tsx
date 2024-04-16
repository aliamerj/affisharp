import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { DealSchema } from "@/schemas/deal_schema";
import Image from "next/image";
import React, { ChangeEvent, useState } from "react";
import { Control } from "react-hook-form";
import { z } from "zod";

type Controler = z.infer<typeof DealSchema>;

export const ImageField = ({ control }: { control: Control<Controler> }) => {
  const [inputUrl, setInputUrl] = useState("");
  const [validImageUrl, setValidImageUrl] = useState<string | null>(null);

  const handleImageUrlChange = (e: ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    setInputUrl(url);
    if (isValidUrl(url)) {
      setValidImageUrl(url);
    } else {
      setValidImageUrl(null);
    }
  };

  function isValidUrl(url: string) {
    return /^(https?:\/\/|\/)/.test(url);
  }
  return (
    <div className="md:flex md:items-center md:justify-between">
      <FormField
        control={control}
        name="logo"
        render={({ field }) => (
          <FormItem className="flex-1">
            <FormLabel htmlFor="logoLink">Deal Logo URL (optional)</FormLabel>
            <FormControl>
              <Input
                {...field}
                id="logoLink"
                type="url"
                placeholder="https://affi.com/logo.png"
                onChange={handleImageUrlChange}
                value={inputUrl}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <div className="mt-4 md:mt-0 md:ml-4 border-2 w-40 h-40 flex justify-center items-center rounded overflow-hidden">
        {validImageUrl ? (
          <Image
            src={validImageUrl}
            alt="Company logo"
            objectFit="cover"
            width={100}
            height={100}
          />
        ) : (
          <div className="text-gray-400 flex justify-center items-center w-full h-full">
            No Logo
          </div>
        )}
      </div>
    </div>
  );
};
