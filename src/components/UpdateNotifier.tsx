"use client";

import { useEffect } from "react";
import { toast } from "sonner";

interface UpdateNotifierProps {
  latestId: string | undefined;
  latestTitle: string | undefined;
}

export function UpdateNotifier({ latestId, latestTitle }: UpdateNotifierProps) {
  useEffect(() => {
    if (!latestId || !latestTitle) return;

    const lastSeenId = localStorage.getItem("lastSeenUpdateId");

    if (lastSeenId !== latestId) {
      // Show notification for new update
      setTimeout(() => {
        toast("Pengumuman Baru!", {
          description: latestTitle,
          action: {
            label: "Lihat",
            onClick: () => window.location.href = "/gunadarma/baak/pengumuman",
          },
        });
        
        // Update local storage
        localStorage.setItem("lastSeenUpdateId", latestId);
      }, 1500); // slight delay so it doesn't instantly pop up jarringly on first paint
    }
  }, [latestId, latestTitle]);

  return null;
}
