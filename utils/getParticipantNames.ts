import { Participant } from "@/lib/types";

export const getParticipantNames = (participants: Participant[]) => {
  const participantNames =
    participants.length === 0
      ? ""
      : participants.length === 1
      ? participants[0].nickname
      : participants.length === 2
      ? participants.map((e) => e.nickname).join(" & ")
      : `${participants
          ?.slice(0, -1)
          .map((e) => e.nickname)
          .join(", ")} & ${participants[participants.length - 1]?.nickname}`;

  return participantNames;
};
