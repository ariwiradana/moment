import { Event, Participant } from "@/lib/types";
import useOrderStore from "@/store/useOrderStore";
import { useEffect } from "react";

export function useStepValidation() {
  const store = useOrderStore();
  useEffect(() => {
    const { activeStep, form, pkg, setDisabledButton } = store;
    let disabled = true;

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

    const giftCase = pkg?.name === "Basic" ? 5 : 6;

    switch (activeStep) {
      case 0: {
        const { slug, package_id, name, phone } = form;
        disabled = !(slug && package_id && name && phone);
        break;
      }
      case 1: {
        const { events } = form;
        disabled = !(events?.length && events.every(isEventComplete));
        break;
      }
      case 2: {
        disabled = !isParticipantComplete(form.participants?.[0]);
        break;
      }
      case 3: {
        disabled = !isParticipantComplete(form.participants?.[1]);
        break;
      }
      case 4: {
        const { media } = form;
        disabled = !media?.image_link;
        break;
      }
      case giftCase: {
        const {
          opening_title,
          opening_description,
          closing_title,
          closing_description,
        } = form;
        disabled = !(
          opening_title &&
          opening_description &&
          closing_title &&
          closing_description
        );
        break;
      }
      default:
        disabled = false;
    }

    setDisabledButton(disabled);
  }, [store.form, store.activeStep]);
}
