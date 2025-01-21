import { Participant } from "@/lib/types";
import useClientStore from "@/store/useClientStore";
import React from "react";

const useParticipants = () => {
  const { client } = useClientStore();

  const groom: Participant | null =
    client?.participants?.find((p) => p.role === "groom") || null;
  const bride: Participant | null =
    client?.participants?.find((p) => p.role === "bride") || null;

  return {
    state: {
      groom,
      bride,
    },
  };
};

export default useParticipants;
