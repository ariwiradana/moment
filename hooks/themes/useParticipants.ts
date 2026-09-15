import { Participant } from "@/lib/types";
import useClientStore from "@/store/useClientStore";
import { useMemo } from "react";

const useParticipants = () => {
  const { client } = useClientStore();

  const participantsMap = useMemo(() => {
    const map: Record<string, Participant[]> = {};

    client?.participants?.forEach((p) => {
      if (!map[p.role]) {
        map[p.role] = [];
      }

      map[p.role].push(p);
    });

    return map;
  }, [client?.participants]);

  const groom = participantsMap["groom"]?.[0] || null;
  const bride = participantsMap["bride"]?.[0] || null;
  const participants = participantsMap["participant"] || [];

  return {
    state: {
      groom,
      bride,
      participants,
    },
  };
};

export default useParticipants;
