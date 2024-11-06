import { Participant } from "@/lib/types";

export const getParticipantNames = (participants: Participant[]) => {
  const sortedParticipants = participants.sort((a, b) =>
    a.gender === "male" && b.gender === "female" ? -1 : 1
  );

  const participantNames =
    sortedParticipants.length === 0
      ? ""
      : sortedParticipants.length === 1
      ? sortedParticipants[0].nickname
      : sortedParticipants.length === 2
      ? sortedParticipants.map((e) => e.nickname).join(" & ")
      : `${sortedParticipants
          ?.slice(0, -1)
          .map((e) => e.nickname)
          .join(", ")} & ${
          sortedParticipants[sortedParticipants.length - 1]?.nickname
        }`;

  return participantNames;
};
