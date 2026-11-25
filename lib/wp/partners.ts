import { partnersMock } from "./mock/partners";
import type { Partner } from "./types";

export async function getPartners(): Promise<Partner[]> {
  return partnersMock;
}
