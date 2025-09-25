import { Parser } from "json2csv";
import PDFDocument from "pdfkit";

export function toCSV(res, filename, rows) {
  const parser = new Parser();
  const csv = parser.parse(rows);
  res.setHeader("Content-Type", "text/csv");
  res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
  res.send(csv);
}

export function toPDF(res, filename, title, rows) {
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
  const doc = new PDFDocument();
  doc.pipe(res);
  doc.fontSize(18).text(title, { underline: true });
  doc.moveDown();
  rows.forEach(r => doc.fontSize(11).text(JSON.stringify(r)));
  doc.end();
}
