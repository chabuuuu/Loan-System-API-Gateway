import BaseError from "@/utils/baseError";
import { transporter } from "@/utils/email/transporter.nodemailer";
export async function sendEmail (email : string, subject : string, html : any){
    const mailOptions = {
        from: {
          name: 'Dịch vụ cho vay',
          address: process.env.EMAIL_USERNAME,
        },
        to: email,
        subject: subject,
        html: html,
      };

      await transporter.sendMail(mailOptions, (error: any, info: any) => {
        if (error) {
          console.log(error);
          throw new BaseError(500, "fail", "Email not sent")
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
      return;
}