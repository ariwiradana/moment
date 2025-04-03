import { Participant } from "@/lib/types";
import useClientStore from "@/store/useClientStore";
import React, { useMemo } from "react";

const useParticipants = () => {
  const { client } = useClientStore();

  const groom = useMemo(
    () => client?.participants?.find((p) => p.role === "groom") || null,
    [client?.participants]
  );

  const bride = useMemo(
    () => client?.participants?.find((p) => p.role === "bride") || null,
    [client?.participants]
  );

  return {
    state: {
      groom,
      bride,
    },
  };
};

export default useParticipants;
