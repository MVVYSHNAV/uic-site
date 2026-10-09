import type { Metadata } from 'next';
import { CardStudio } from '@/components/nfc/CardStudio';

export const metadata: Metadata = {
  title: 'UIC Connect — Your card. Your character.',
  description:
    'Create your own NFC card concept. Explore colors, customize your identity, and preview the tap-to-connect experience. No account needed.',
};

export default function NfcPage() {
  return <CardStudio />;
}
