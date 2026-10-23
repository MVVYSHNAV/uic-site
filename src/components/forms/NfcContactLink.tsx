import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

export function NfcContactLink() {
  return (
    <Link className="pill" href="/nfc">
      <span>Explore NFC solutions</span>
      <ArrowUpRight size={14} strokeWidth={2.2} aria-hidden="true" />
    </Link>
  );
}
