import { useRouter } from "next/router";
import { useEffect } from "react";

export const usePreventLeave = (enabled: boolean = true) => {
  const router = useRouter();

  useEffect(() => {
    if (!enabled) return;

    const message =
      "Perubahan belum disimpan. Yakin ingin meninggalkan halaman ini?";

    // 🔸 Saat reload atau close tab
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = message;
      return message;
    };

    // 🔸 Saat navigasi antar halaman (termasuk tombol back)
    const handleRouteChangeStart = (url: string) => {
      const confirmLeave = confirm(message);
      if (!confirmLeave) {
        router.events.emit("routeChangeError");
        throw "Route change aborted.";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    router.events.on("routeChangeStart", handleRouteChangeStart);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      router.events.off("routeChangeStart", handleRouteChangeStart);
    };
  }, [enabled, router]);
};
