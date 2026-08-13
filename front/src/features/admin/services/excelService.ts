import type { AdminRegistration } from "./registrationsService";

const escapeXml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const xmlCell = (value: string | number, isText = true) =>
  `<Cell><Data ss:Type="${isText ? "String" : "Number"}">${escapeXml(
    String(value),
  )}</Data></Cell>`;

const buildSheet = (headers: string[], rows: (string | number)[][]) => {
  const head = headers.map((h) => xmlCell(h)).join("");
  const body = rows
    .map(
      (row) =>
        `<Row>${row
          .map((cell, index) => xmlCell(cell, !numericColumns[headers[index]]))
          .join("")}</Row>`,
    )
    .join("");

  return [
    '<?xml version="1.0"?>',
    '<?mso-application progid="Excel.Sheet"?>',
    '<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet" xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet">',
    `<Worksheet ss:Name="Inscritos"><Table>`,
    `<Row>${head}</Row>`,
    body,
    `</Table></Worksheet></Workbook>`,
  ].join("");
};

const numericColumns: Record<string, boolean> = {
  Bib: true,
};

export const downloadRegistrationsExcel = (
  registrations: AdminRegistration[],
  filename: string,
) => {
  const headers = [
    "Bib",
    "Corredor",
    "Teléfono",
    "Documento",
    "EPS",
    "Contacto emergencia",
    "Tel. emergencia",
    "Inscrito",
  ];

  const rows = registrations.map((r) => [
    r.bibNumber,
    r.profile.fullName,
    r.phone,
    r.document,
    r.eps,
    r.emergencyContactName,
    r.emergencyContactPhone,
    new Date(r.createdAt).toLocaleDateString("es-CO"),
  ]);

  const xml = buildSheet(headers, rows);

  const blob = new Blob(["\ufeff", xml], {
    type: "application/vnd.ms-excel;charset=utf-8",
  });

  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
};