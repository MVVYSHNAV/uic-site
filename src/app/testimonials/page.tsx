import type { Metadata } from 'next';
import { TestimonialMarquee } from '@/components/testimonials/TestimonialMarquee';

export const metadata: Metadata = {
  title: 'Testimonials — UIC Studio',
  description:
    'Client feedback and production testimonials across brand strategy, web architecture, and connected experiences.',
};

export default function TestimonialsPage() {
  return <TestimonialMarquee />;
}
