import nodemailer from "nodemailer";

export const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const html = `
    <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9; border-radius: 8px;">
      <div style="text-align: center; margin-bottom: 30px;">
        <h1 style="color: #02457A; margin: 0; font-size: 24px;">HamroMobile<span style="color: #018ABE;">Hub</span></h1>
      </div>
      <div style="background-color: #ffffff; padding: 30px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
        <h2 style="color: #001B48; margin-top: 0;">Verification Code</h2>
        <p style="color: #333; font-size: 16px; line-height: 1.5;">Hello,</p>
        <p style="color: #333; font-size: 16px; line-height: 1.5;">${options.message}</p>
        <div style="margin: 30px 0; text-align: center;">
          <span style="display: inline-block; padding: 15px 30px; font-size: 28px; font-weight: bold; color: #02457A; background-color: #D6E8EE; border-radius: 8px; letter-spacing: 5px;">${options.otp}</span>
        </div>
        <p style="color: #666; font-size: 14px; margin-bottom: 0;">This code will expire in 10 minutes. If you did not request this, please ignore this email.</p>
      </div>
      <div style="text-align: center; margin-top: 20px;">
        <p style="color: #999; font-size: 12px;">&copy; ${new Date().getFullYear()} HamroMobileHub. All rights reserved.</p>
      </div>
    </div>
  `;

  const message = {
    from: `"HamroMobileHub" <${process.env.EMAIL_USER}>`,
    to: options.email,
    subject: options.subject,
    html: html,
  };

  await transporter.sendMail(message);
};
