export const padBib = (bibNumber: number) =>
  String(bibNumber).padStart(3, "0");

export const pad2 = (value: number) => String(value).padStart(2, "0");