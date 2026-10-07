import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export const exportCanvasToPNG = async (): Promise<boolean> => {
  const element = document.getElementById('canvas-printable-area');
  if (!element) {
    return false;
  }
  try {
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      backgroundColor: '#ffffff',
      logging: false,
    });
    const imgData = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = imgData;
    link.download = `canvas-modelo-negocio-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    return true;
  } catch (err) {
    console.error('Error al exportar PNG:', err);
    return false;
  }
};

export const exportCanvasToPDF = async (): Promise<boolean> => {
  const element = document.getElementById('canvas-printable-area');
  if (!element) {
    return false;
  }
  try {
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      backgroundColor: '#ffffff',
      logging: false,
    });
    const imgData = canvas.toDataURL('image/png');
    // A4 Landscape: 297mm x 210mm
    const pdf = new jsPDF('l', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    // Fit canvas image nicely within landscape A4 with 10mm margins
    const margin = 10;
    const availWidth = pdfWidth - margin * 2;
    const availHeight = pdfHeight - margin * 2;

    const imgProps = pdf.getImageProperties(imgData);
    const imgRatio = imgProps.width / imgProps.height;

    let renderWidth = availWidth;
    let renderHeight = availWidth / imgRatio;

    if (renderHeight > availHeight) {
      renderHeight = availHeight;
      renderWidth = availHeight * imgRatio;
    }

    const posX = margin + (availWidth - renderWidth) / 2;
    const posY = margin + (availHeight - renderHeight) / 2;

    pdf.addImage(imgData, 'PNG', posX, posY, renderWidth, renderHeight);
    pdf.save(`canvas-modelo-negocio-${Date.now()}.pdf`);
    return true;
  } catch (err) {
    console.error('Error al exportar PDF:', err);
    return false;
  }
};
