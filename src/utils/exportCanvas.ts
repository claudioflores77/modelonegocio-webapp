import { toPng } from 'html-to-image';
import jsPDF from 'jspdf';

const sanitizeFilename = (name?: string): string => {
  if (!name || !name.trim()) return 'modelo-negocio';
  return name
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

export const exportCanvasToPNG = async (projectName?: string): Promise<boolean> => {
  const element = await waitForElement('canvas-printable-area', 2500);
  if (!element) {
    return false;
  }

  const wasDark = document.documentElement.classList.contains('dark');
  if (wasDark) {
    document.documentElement.classList.remove('dark');
  }

  try {
    // Wait brief frame for CSS repaint to light mode if dark mode was active
    await new Promise((resolve) => setTimeout(resolve, 120));

    const imgData = await toPng(element, {
      pixelRatio: 2,
      backgroundColor: '#ffffff',
      cacheBust: true,
    });

    const safeName = sanitizeFilename(projectName);
    const link = document.createElement('a');
    link.href = imgData;
    link.download = `canvas-${safeName}-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    return true;
  } catch (err) {
    console.error('Error al exportar PNG:', err);
    return false;
  } finally {
    if (wasDark) {
      document.documentElement.classList.add('dark');
    }
  }
};

export const exportCanvasToPDF = async (projectName?: string): Promise<boolean> => {
  const element = await waitForElement('canvas-printable-area', 2500);
  if (!element) {
    return false;
  }

  const wasDark = document.documentElement.classList.contains('dark');
  if (wasDark) {
    document.documentElement.classList.remove('dark');
  }

  try {
    // Wait brief frame for CSS repaint to light mode if dark mode was active
    await new Promise((resolve) => setTimeout(resolve, 120));

    const imgData = await toPng(element, {
      pixelRatio: 2,
      backgroundColor: '#ffffff',
      cacheBust: true,
    });

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
    const safeName = sanitizeFilename(projectName);
    pdf.save(`canvas-${safeName}-${Date.now()}.pdf`);
    return true;
  } catch (err) {
    console.error('Error al exportar PDF:', err);
    return false;
  } finally {
    if (wasDark) {
      document.documentElement.classList.add('dark');
    }
  }
};

async function waitForElement(elementId: string, timeoutMs = 2500): Promise<HTMLElement | null> {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    const element = document.getElementById(elementId);
    if (element) {
      return element;
    }
    await new Promise((resolve) => setTimeout(resolve, 50));
  }
  return null;
}
