"use client";

import { useState, useEffect } from "react";
import { buttonVariants } from "@/components/ui/Button";
import Link from "next/link";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("cookie_consent")) setVisible(true);
  }, []);

  function accept() {
    localStorage.setItem("cookie_consent", "accepted");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4">
      <div className="max-w-3xl mx-auto bg-warm-brown text-cream rounded-2xl p-5 shadow-2xl flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <p className="text-sm text-cream/80 flex-1">
          Folosim cookie-uri pentru a-ți oferi o experiență mai bună. Prin continuarea navigării ești de acord cu{" "}
          <Link href="/privacy" className="underline text-amber">politica noastră de confidențialitate</Link>.
        </p>
        <button
          onClick={accept}
          className={buttonVariants("primary", "sm", "flex-shrink-0")}
        >
          Accept
        </button>
      </div>
    </div>
  );
}