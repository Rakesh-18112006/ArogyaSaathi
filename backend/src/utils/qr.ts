import QRCode from "qrcode";

export async function generateQR(data: string): Promise<string> {
  // returns data URL (base64 png)
  return QRCode.toDataURL(data, { errorCorrectionLevel: "M" });
}
