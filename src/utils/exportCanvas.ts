import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export const exportCanvasToPNG = async () => {
  const element = document.getElementById('canvas-printable-area');
  if (!element) return;
  const canvas = await html2canvas(element);
  const imgData = canvas.toDataURL('image/png');
  const link = document.createElement('a');
  link.href = imgData;
  link.download = 'canvas.png';
  link.click();
};

export const exportCanvasToPDF = async () => {
  const element = document.getElementById('canvas-printable-area');
  if (!element) return;
  const canvas = await html2canvas(element);
  const imgData = canvas.toDataURL('image/png');
  const pdf = new jsPDF('p', 'mm', 'a4');
  const imgProps = pdf.getImageProperties(imgData);
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
  pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
  pdf.save('canvas.pdf');
};
