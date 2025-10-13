import { Event, Participant } from "@/lib/types";
import useOrderStore from "@/store/useOrderStore";
import { useRouter } from "next/router";
import { useEffect } from "react";

export function useCheckFullfilledSteps() {
  const router = useRouter();
  const store = useOrderStore();
  useEffect(() => {
    const { form, pkg, fullfilledSteps, setFullfilledSteps } = store;

    const isEventComplete = (ev: Event) =>
      ev.name &&
      ev.address &&
      ev.address_url &&
      ev.date &&
      ev.start_time &&
      ev.end_time;

    const isParticipantComplete = (p: Participant) =>
      p?.name &&
      p?.nickname &&
      p?.parents_male &&
      p?.parents_female &&
      p?.child &&
      p?.address;

    const checks = [
      // Step 0: Data utama
      !!(form.slug && form.package_id && form.name && form.phone),

      // Step 1: Acara
      !!(form.events?.length && form.events.every(isEventComplete)),

      // Step 2: Peserta 1
      !!isParticipantComplete(form.participants?.[0]),

      // Step 3: Peserta 2
      !!isParticipantComplete(form.participants?.[1]),

      // Step 4: Galeri
      !!form.media?.image_link,
    ];

    if (pkg && pkg.name !== "Basic")
      checks.push(router.pathname === "/order/[slug]" ? true : false);

    checks.push(
      !!(
        form.opening_title &&
        form.opening_description &&
        form.closing_title &&
        form.closing_description
      )
    );

    console.log({ checks });

    // Cek hanya update jika memang ada perubahan
    const isDifferent = checks.some(
      (fulfilled, i) => fulfilled !== fullfilledSteps[i]
    );

    if (isDifferent) {
      setFullfilledSteps(checks);
    }
  }, [store.form]);
}
