export type Doctor = {
  slug: string;
  name: string;
  qualification: string;
  specialization: string;
  expertise: string[];
  serviceSlugs: string[];
  consultation: string;
};

export const doctors: Doctor[] = [
  {
    slug: "dr-suresh-naik",
    name: "Dr. Suresh Naik",
    qualification: "MS General Surgeon",
    specialization: "General Surgery, Endoscopic Surgery and Laparoscopic Surgery",
    expertise: ["General Surgery", "Endoscopic Surgery", "Laparoscopic Surgery"],
    serviceSlugs: ["general-surgery", "endoscopic-surgery", "laparoscopic-surgery", "surgery"],
    consultation: "Contact the hospital team to request a surgical consultation and confirm appointment availability. Treatment options are discussed following individual assessment.",
  },
  {
    slug: "dr-neha-naik",
    name: "Dr. Neha Naik",
    qualification: "MD Pediatrics, DNB Pediatrics",
    specialization: "Paediatrics / Pediatrics",
    expertise: ["Paediatrics / Pediatrics"],
    serviceSlugs: ["pediatrics"],
    consultation: "Contact the hospital team to request a paediatric consultation for your child and confirm appointment availability.",
  },
];
