import { Resend } from 'resend';
import { env } from './env';

export const resend = new Resend(env.BETTER_AUTH_OTP_RESEND_MAIL_API_KEY);