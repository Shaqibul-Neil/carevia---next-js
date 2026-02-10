import nodemailer from "nodemailer";

// Create a transporter (The Postman)
const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  secure: false, // Use true for port 465, false for port 587
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Send an email using async/await
export const sendEmail = async (to, subject, htmlContent) => {
  try {
    const info = await transporter.sendMail({
      from: `"Carevia Support" <${process.env.EMAIL_USER}>`, // Sender address
      to: to, // Receiver
      subject: subject, // Subject line
      html: htmlContent, // HTML body
    });
    console.log("Message sent: %s", info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false, error: error.message };
  }
};
