export const ARM_SLUGS = [
  "single-arm",
  "double-arm",
  "triple-arm",
  "quad-arm",
  "workstation",
  "five-arm",
  "six-arm",
];

export const ARM_NAMES: Record<string, { en: string; ar: string }> = {
  "single-arm": { en: "Single Arm", ar: "ذراع واحدة" },
  "double-arm": { en: "Double Arm", ar: "ذراع مزدوج" },
  "triple-arm": { en: "Triple Arm", ar: "الذراع الثلاثية" },
  "quad-arm": { en: "Quad Arm", ar: "ذراع رباعية" },
  "workstation": { en: "Workstation", ar: "محطة عمل" },
  "five-arm": { en: "Five Arm", ar: "خمسة ذراع" },
  "six-arm": { en: "Six Arm", ar: "ستة ذراع" },
};

export const ARM_ALIASES: Record<string, string> = {
  single: "single-arm",
  double: "double-arm",
  triple: "triple-arm",
  four: "quad-arm",
  quad: "quad-arm",
  six: "six-arm",
};
