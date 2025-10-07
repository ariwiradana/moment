import { Participant } from "@/lib/types";
import useClientStore from "@/store/useClientStore";
import React, { useMemo } from "react";

const useParticipants = () => {
  const { client } = useClientStore();

  const participantsMap = useMemo(() => {
    const map: Record<string, Participant> = {};
    client?.participants?.forEach((p) => {
      map[p.role] = p;
    });
    return map;
  }, [client?.participants]);

  const groom = participantsMap["groom"] || null;
  const bride = participantsMap["bride"] || null;

  return {
    state: {
      groom,
      bride,
    },
  };
};

export default useParticipants;
