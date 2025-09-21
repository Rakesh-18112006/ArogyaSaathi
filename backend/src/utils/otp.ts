import config from "../config";
import Twilio from "twilio";

const client = config.twilio.accountSid
  ? Twilio(config.twilio.accountSid, config.twilio.authToken)
  : null;

export async function sendOtpSms(phone: string, otp: string): Promise<void> {
  if (!client) {
    console.warn("Twilio not configured. OTP would be:", otp);
    return;
  }
  await client.messages.create({
    body: `Your Arogya Saathi OTP is ${otp}`,
    from: config.twilio.phoneFrom,
    to: phone,
  });
}

export function generateOtp(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}
