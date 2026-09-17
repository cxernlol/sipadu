"use client";

import { useState, useEffect } from "react";
import { Button } from "./ui/button";

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookieConsent", "true");
    setIsVisible(false);
  };

  const declineCookies = () => {
    localStorage.setItem("cookieConsent", "false");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-slate-900 text-white p-4 border-t border-slate-700 shadow-xl">
      <div className="container mx-auto max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-sm">
          <p>
            Kami menggunakan cookie untuk meningkatkan pengalaman Anda di SiPadu. 
            Dengan melanjutkan, Anda menyetujui penggunaan cookie kami sesuai dengan <a href="/privacy" className="underline hover:text-blue-300">Kebijakan Privasi</a> kami.
          </p>
        </div>
        <div className="flex gap-3 shrink-0">
          <Button 
            variant="outline" 
            className="text-slate-900 bg-white hover:bg-slate-100" 
            onClick={declineCookies}
          >
            Tolak
          </Button>
          <Button 
            className="bg-blue-600 hover:bg-blue-700 text-white" 
            onClick={acceptCookies}
          >
            Terima
          </Button>
        </div>
      </div>
    </div>
  );
}
