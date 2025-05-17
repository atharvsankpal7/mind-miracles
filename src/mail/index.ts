import nodemailer from 'nodemailer';

const Transporter = nodemailer.createTransport({
  host: process.env.ENDPOINT || 'email-smtp.eu-north-1.amazonaws.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USERNAME || 'AKIAW3MEBDWDAQYVRSW2',
    pass:
      process.env.SMTP_PASSWORD ||
      'BKQf6ArmUEcHwznX3UEW8HXPJqU8vPFSCTbLtvzcYso/',
  },
});

export async function getMailonRegister(data: any) {
  const { firstName, lastName, mobileNo, email, age, place } = data;
  await Transporter.sendMail({
    from: 'dipakhade214@gmail.com',
    sender: 'dipakhade214@gmail.com',
    to: 'mindmiracles1707@gmail.com',
    subject: 'new registration',
    html: `<div>
      <h1>New Registration</h1>
      <p><b>Name:</b> <span>${firstName} ${lastName}</span></p>
      <p><b>Mobile No:</b> <span>${mobileNo}</span></p>
      <p><b>Email:</b> <span>${email}</span></p>
      <p><b>Age:</b> <span>${age}</span></p>
      <p><b>Place:</b> <span>${place}</span></p>
    </div>`,
  });
}

export async function sendCounsellingConfirmation(data: any) {
  const { name, email, whatsapp, age, amountPaid } = data;
  
  // Send email to user
  await Transporter.sendMail({
    from: 'mindmiracles1707@gmail.com',
    to: email,
    subject: 'Personal Counselling Session Confirmation',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #2F5A32;">Counselling Session Confirmation</h1>
        <p>Dear ${name},</p>
        <p>Thank you for booking a personal counselling session with Mind Miracles. Your payment has been successfully processed.</p>
        <p>Session Details:</p>
        <ul>
          <li>Amount Paid: ₹${amountPaid}</li>
        </ul>
        <p>We will contact you shortly on your WhatsApp number (${whatsapp}) to schedule your session.</p>
        <p>Best regards,<br>Mind Miracles Team</p>
      </div>
    `
  });

  // Send notification to admin
  await Transporter.sendMail({
    from: 'mindmiracles1707@gmail.com',
    to: 'mindmiracles1707@gmail.com',
    subject: 'New Counselling Session Booking',
    html: `
      <div style="font-family: Arial, sans-serif;">
        <h1>New Counselling Session Booking</h1>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>WhatsApp:</b> ${whatsapp}</p>
        <p><b>Age:</b> ${age}</p>
        <p><b>Amount Paid:</b> ₹${amountPaid}</p>
      </div>
    `
  });
}