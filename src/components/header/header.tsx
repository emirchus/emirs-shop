import { api } from "@/api";
import Image from "next/image";
import React from "react";

export const Header = async () => {
  const categories = await api.categories.getAll();
  // console.log(categories);

  return (
    <div className="w-full">
      <Image src="/logo.svg" alt="Logo" width={80} height={80} />
    </div>
  );
};
