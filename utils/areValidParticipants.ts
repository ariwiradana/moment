import { Participant } from "@/lib/types";

export function areValidParticipants(item: Participant): boolean {
  const requiredFields: (keyof Participant)[] = [
    "name",
    "nickname",
    "gender",
    "child",
    "address",
    "parents_female",
    "parents_male",
    "role",
  ];

  return requiredFields.every(
    (field) => item[field] !== null && item[field] !== ""
  );
}
