import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { PdfData } from '@/types';

export async function generateCasePdf(data: PdfData): Promise<Buffer> {
  const pdf = new jsPDF();
  let yPosition = 20;
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const margin = 15;
  const maxWidth = pageWidth - 2 * margin;

  // Título
  pdf.setFontSize(16);
  pdf.setFont(undefined, 'bold');
  pdf.text('SUMÁRIO DO CASO JURÍDICO', margin, yPosition);
  yPosition += 15;

  // Caso ID e Data
  pdf.setFontSize(10);
  pdf.setFont(undefined, 'normal');
  pdf.text(`ID do Caso: ${data.caseId}`, margin, yPosition);
  yPosition += 7;
  pdf.text(`Data: ${new Date().toLocaleDateString('pt-BR')}`, margin, yPosition);
  yPosition += 15;

  // Título do Caso
  pdf.setFont(undefined, 'bold');
  pdf.text('Título:', margin, yPosition);
  pdf.setFont(undefined, 'normal');
  const titleLines = pdf.splitTextToSize(data.title, maxWidth - 20);
  pdf.text(titleLines, margin + 20, yPosition);
  yPosition += titleLines.length * 7 + 10;

  // Dados do Cliente
  pdf.setFont(undefined, 'bold');
  pdf.text('DADOS DO CLIENTE', margin, yPosition);
  yPosition += 10;
  pdf.setFont(undefined, 'normal');

  Object.entries(data.clientData).forEach(([key, value]) => {
    if (yPosition > pageHeight - 30) {
      pdf.addPage();
      yPosition = 20;
    }
    const label = key.charAt(0).toUpperCase() + key.slice(1);
    const text = `${label}: ${value}`;
    const lines = pdf.splitTextToSize(text, maxWidth);
    pdf.text(lines, margin, yPosition);
    yPosition += lines.length * 5 + 3;
  });

  yPosition += 10;

  // Sumário
  if (yPosition > pageHeight - 50) {
    pdf.addPage();
    yPosition = 20;
  }

  pdf.setFont(undefined, 'bold');
  pdf.setFontSize(12);
  pdf.text('SUMÁRIO', margin, yPosition);
  yPosition += 10;
  pdf.setFont(undefined, 'normal');
  pdf.setFontSize(10);

  const summaryLines = pdf.splitTextToSize(data.summary, maxWidth);
  pdf.text(summaryLines, margin, yPosition);
  yPosition += summaryLines.length * 5 + 10;

  // Recomendações
  if (yPosition > pageHeight - 40) {
    pdf.addPage();
    yPosition = 20;
  }

  pdf.setFont(undefined, 'bold');
  pdf.text('PRÓXIMAS AÇÕES RECOMENDADAS', margin, yPosition);
  yPosition += 10;
  pdf.setFont(undefined, 'normal');

  data.recommendations.forEach((rec, index) => {
    if (yPosition > pageHeight - 20) {
      pdf.addPage();
      yPosition = 20;
    }
    const recText = `${index + 1}. ${rec}`;
    const lines = pdf.splitTextToSize(recText, maxWidth - 10);
    pdf.text(lines, margin + 5, yPosition);
    yPosition += lines.length * 5 + 3;
  });

  // Rodapé
  pdf.setFontSize(8);
  pdf.text(
    `Documento gerado automaticamente pelo JurisChat em ${new Date().toLocaleDateString('pt-BR')} às ${new Date().toLocaleTimeString('pt-BR')}`,
    margin,
    pageHeight - 10
  );

  return Buffer.from(pdf.output('arraybuffer'));
}

export async function generateHtmlToPdf(htmlElement: HTMLElement, filename: string): Promise<Blob> {
  const canvas = await html2canvas(htmlElement);
  const imgData = canvas.toDataURL('image/png');
  const pdf = new jsPDF();
  const imgWidth = 210;
  const pageHeight = 295;
  const imgHeight = (canvas.height * imgWidth) / canvas.width;
  let heightLeft = imgHeight;
  let position = 0;

  pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
  heightLeft -= pageHeight;

  while (heightLeft >= 0) {
    position = heightLeft - imgHeight;
    pdf.addPage();
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;
  }

  return pdf.output('blob');
}