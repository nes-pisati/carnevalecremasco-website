import type { Partner } from "../types";

function partner(name: string): Partner {
  return { name, url: null, logo: { alt: `Logo ${name}`, file: null } };
}

export const partnersMock: Partner[] = [
  partner("Comune di Crema"),
  partner("Pro Loco Crema"),
  partner("Agenzia Cinzia Miraglio"),
  partner("Camper Club Crema"),
  partner("Teatro San Domenico"),
];
