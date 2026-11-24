// Entry for make.fun's "The Long Roast: Lawmakers and the File They
// Cannot Convert".
//
// The whole program is one job: put a single satirical sentence roasting
// lawmakers who would regulate AI, crypto or the internet but cannot
// convert a file to PDF into entry.txt inside the output directory,
// byte for byte the same on every run. The grader points
// MAKEFUN_OUTPUT_DIR at its own scratch output folder; on a plain
// machine the fallback is /output, the path the competition reads.
//
// Run it locally with:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
// and the line lands in out/entry.txt, with no trailing newline: the
// judge reads exactly what is in the file, so the text below is the
// entire entry.

import { writeFileSync } from 'node:fs';
import { join } from 'node:path';

// The roast itself: the committee claims authority to license every AI
// model, yet spends its morning recess asking staff how to turn a Word
// file into a PDF — and then votes anyway. The setup is their power,
// the undercut is the file they cannot convert, and the punch lands on
// the last two words.
const ROAST =
  "The committee that wants to license every AI model spent its morning recess asking staff how to turn a Word file into a PDF \u2014 then voted anyway.";

const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

// Competition limits ("The Long Roast"): the entry must be a single
// sentence of at most 320 characters. Enforced here so a bad edit
// fails loudly instead of silently producing an entry the judge rejects.
const MIN_LINE_LENGTH = 1;
const MAX_LINE_LENGTH = 320;

function validateLine(line) {
  if (line.length < MIN_LINE_LENGTH || line.length > MAX_LINE_LENGTH) {
    throw new Error(
      `Line must be ${MIN_LINE_LENGTH}-${MAX_LINE_LENGTH} characters, got ${line.length}.`,
    );
  }
  if (line.includes('\n') || line.includes('\r')) {
    throw new Error('Line must be a single line (no newline characters).');
  }
  // The gate rejects whitespace-only text, so fail loudly here too.
  if (line.trim().length === 0) {
    throw new Error('Line must not be only whitespace.');
  }
}

validateLine(ROAST);

writeFileSync(join(outputDir, 'entry.txt'), ROAST, 'utf8');
