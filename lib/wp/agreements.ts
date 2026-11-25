import { agreementsMock } from "./mock/agreements";
import type { Agreement, AgreementCategory } from "./types";

export async function getAgreements(category: AgreementCategory): Promise<Agreement[]> {
  return agreementsMock.filter((agreement) => agreement.category === category);
}
