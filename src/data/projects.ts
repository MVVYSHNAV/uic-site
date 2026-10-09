export interface Project {
  title: string;
  description: string;
  tags: string;
}

export const projects: Project[] = [
  {
    title: 'Forma — a quieter kind of bold',
    description:
      'An exploratory identity and website direction for an architecture studio. Warm materials, sculptural typography and generous space build a calm, confident digital presence. This is an original concept study, not a commissioned client project.',
    tags: 'Brand strategy / Art direction / Website experience',
  },
  {
    title: 'Connect — beyond the business card',
    description:
      'A concept for a connected identity product: a tactile NFC card paired with a focused digital profile. The direction explores how a single tap can make introductions easier, with a QR fallback and details that can evolve over time.',
    tags: 'Product concept / NFC / Digital profile',
  },
  {
    title: 'Flow — clarity in the everyday',
    description:
      'An interface exploration for a connected business workspace. Clear hierarchy and a restrained visual language bring operations and workflows into one view. The dashboard illustrates a design direction; it is not a live ERP product.',
    tags: 'ERP concept / Dashboard / Product design',
  },
];
