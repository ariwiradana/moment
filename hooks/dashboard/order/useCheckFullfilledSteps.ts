import useSteps from "@/components/dashboard/order/order.steps";
import { Event, Participant } from "@/lib/types";
import useOrderStore from "@/store/useOrderStore";
import { useRouter } from "next/router";
import { useEffect } from "react";

export function useCheckFullfilledSteps() {
  const store = useOrderStore();
  const {
    form,
    pkg,
    fullfilledSteps,
    activeStep,
    setFullfilledSteps,
    maxStepReached,
  } = store;

  const steps = useSteps();
  const router = useRouter();

  useEffect(() => {
    const isEventComplete = (ev: Event) =>
      ev.name &&
      ev.address &&
      ev.address_url &&
      ev.date &&
      ev.start_time &&
      ev.end_time;

    const isParticipantComplete = (p: Participant) =>
      p?.image &&
      p?.name &&
      p?.nickname &&
      p?.parents_male &&
      p?.parents_female &&
      p?.child &&
      p?.address;

    const checks = [
      // Step 0: Data utama
      !!(form.slug && form.package_id && form.name && form.phone && form.email),

      // Step 1: Acara
      !!(form.events?.length && form.events.every(isEventComplete)),

      // Step 2: Peserta 1
      !!isParticipantComplete(form.participants?.[0]),

      // Step 3: Peserta 2
      !!isParticipantComplete(form.participants?.[1]),

      // Step 4: Galeri
      !!form.gallery?.length,
    ];

    // Step 5: Digital Envelope
    if (pkg?.name !== "Basic" && router.pathname === "/[slug]/order")
      checks.push(maxStepReached >= 5);

    checks.push(
      !!(
        form.opening_title &&
        form.opening_description &&
        form.closing_title &&
        form.closing_description
      )
    );

    // Step Terakhir: Pembayaran
    const totalSteps = steps.length;
    const isAllPreviousFulfilled = checks
      .slice(0, totalSteps - 1)
      .every(Boolean);
    const hasReachedLastStep = maxStepReached >= totalSteps - 1;
    const isLastStepFulfilled =
      (isAllPreviousFulfilled && hasReachedLastStep) ||
      router.pathname !== "/[slug]/order";
    checks.push(isLastStepFulfilled);

    const isDifferent = checks.some(
      (fulfilled, i) => fulfilled !== fullfilledSteps[i]
    );

    if (isDifferent) {
      setFullfilledSteps(checks);
    }
  }, [form, pkg, activeStep, fullfilledSteps, maxStepReached, steps]);
}
