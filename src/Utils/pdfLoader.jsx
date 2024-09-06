import { PDFDocument } from 'pdf-lib';

const loadPdf = async () => {
  const lang = document.documentElement.lang;
  const locale = lang!== "en"? `/${lang}` : "";
  const formUrl = `/data${locale}/Federal_Voter_Registration_${lang}.pdf`;
  const formPdfBytes = await fetch(formUrl).then(res => res.arrayBuffer())
  const pdfDoc = await PDFDocument.load(formPdfBytes)
  const form = pdfDoc.getForm()
  return { pdfDoc, form };
};

export default loadPdf;