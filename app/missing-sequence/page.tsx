import { MissingSequencePrototype } from '@/components/missing-sequence-prototype';

export const metadata = {
  title: 'ROSE Agency | What Am I Missing Sequence',
  description: 'A standalone motion prototype for the ROSE Agency brand video insert.',
};

export default function MissingSequencePage() {
  return (
    <main className="min-h-screen bg-roseBlack text-roseCream">
      <MissingSequencePrototype />
    </main>
  );
}
