"use client";

import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { get } from "http";
import { useState } from "react";

export default function Home() {
  const [address, setAddress] = useState('');
  const handler = async () => {
    const res = await fetch('/api/location-enrichment?' + new URLSearchParams({name: address}));
    const location = await res.json();
    console.log(location)
  }
  return (
    <div>
        <input value={address} onChange={(e) => setAddress(e.target.value)}></input>
        <button onClick={handler}>submit</button>
    </div>
  )
}