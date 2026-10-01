// Server/Edge replacement only; browser builds use the real docx package.
// Fail explicitly if a future change tries to generate Word documents on SSR.
function browserOnly() {
  throw new Error('Word document generation requires a browser.');
}

module.exports = {
  Document: browserOnly,
  Paragraph: browserOnly,
  TextRun: browserOnly,
  Packer: { toBuffer: browserOnly },
};
