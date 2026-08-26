import { Injectable, Logger } from '@nestjs/common';
import Mailgun from 'mailgun.js';
import FormData from 'form-data';

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);

  private readonly mailgunClient;

  constructor() {
    const mailgun = new Mailgun(FormData);

    this.mailgunClient = mailgun.client({
      username: 'api',
      key: process.env.MAILGUN_SECRET || '',
      url: `https://${process.env.MAILGUN_ENDPOINT}`,
    });
  }

  async sendMail(to: string, subject: string, html: string) {
    try {
      const response = await this.mailgunClient.messages.create(
        process.env.MAILGUN_DOMAIN,
        {
          from: `${process.env.MAIL_FROM_NAME} <${process.env.MAIL_FROM_ADDRESS}>`,
          to,
          subject,
          html,
        },
      );

      this.logger.log(`Email sent successfully to ${to}`);

      return response;
    } catch (error) {
      this.logger.error(`Failed to send email to ${to}`, error || error);

      throw error;
    }
  }

//   async sendQueryConfirmation(email: string, name: string, course: string) {
//     return this.sendMail(
//       email,
//       'Query Received - The House Caller',
//       `
//         <h2>Hello ${name},</h2>

//         <p>
//           Thank you for contacting <strong>The House Caller</strong>.
//         </p>

//         <p>
//           We have successfully received your query regarding:
//         </p>

//         <p>
//           <strong>Course:</strong> ${course}
//         </p>

//         <p>
//           Our team will get back to you shortly.
//         </p>

//         <br />

//         <p>
//           Regards,<br />
//           The House Caller Team
//         </p>
//       `,
//     );
//   }


async sendQueryConfirmation(
  email: string,
  name: string,
  course: string,
) {
  return this.sendMail(
    email,
    `Hi ${name}, We Received Your Query`,
    `
      <div style="
        font-family: Arial, sans-serif;
        background-color: #f4f6f8;
        padding: 30px 15px;
      ">
        <div style="
          max-width: 600px;
          margin: 0 auto;
          background: #ffffff;
          border-radius: 10px;
          overflow: hidden;
          border: 1px solid #e5e7eb;
        ">

          <!-- Header -->
          <div style="
            background-color: #111827;
            padding: 25px;
            text-align: center;
          ">
            <h2 style="
              color: #ffffff;
              margin: 0;
              font-size: 24px;
            ">
              The Freyza Academy
            </h2>

            <p style="
              color: #d1d5db;
              margin: 8px 0 0;
              font-size: 14px;
            ">
              Query Confirmation
            </p>
          </div>

          <!-- Body -->
          <div style="padding: 30px;">

            <h3 style="
              margin: 0 0 15px;
              color: #111827;
              font-size: 20px;
            ">
              Hello ${name},
            </h3>

            <p style="
              color: #4b5563;
              font-size: 15px;
              line-height: 1.6;
            ">
              Thank you for contacting <strong>The Freyza Academy</strong>.
              We have successfully received your query.
            </p>

            <!-- Query Details -->
            <table style="
              width: 100%;
              border-collapse: collapse;
              margin: 25px 0;
              border: 1px solid #e5e7eb;
            ">
              <tr>
                <td style="
                  padding: 14px;
                  background-color: #f9fafb;
                  border-bottom: 1px solid #e5e7eb;
                  font-weight: bold;
                  color: #374151;
                  width: 35%;
                ">
                  Customer
                </td>

                <td style="
                  padding: 14px;
                  border-bottom: 1px solid #e5e7eb;
                  color: #111827;
                ">
                  ${name}
                </td>
              </tr>

              <tr>
                <td style="
                  padding: 14px;
                  background-color: #f9fafb;
                  font-weight: bold;
                  color: #374151;
                ">
                  Course
                </td>

                <td style="
                  padding: 14px;
                  color: #111827;
                ">
                  ${course}
                </td>
              </tr>
            </table>

            <p style="
              color: #4b5563;
              font-size: 15px;
              line-height: 1.6;
            ">
              Our team will review your query and get back to you shortly.
            </p>

            <p style="
              color: #4b5563;
              font-size: 15px;
              line-height: 1.6;
              margin-top: 25px;
            ">
              Regards,<br />
              <strong>The Freyza Academy Team</strong>
            </p>

          </div>

          <!-- Footer -->
          <div style="
            background-color: #f9fafb;
            padding: 18px;
            text-align: center;
            border-top: 1px solid #e5e7eb;
          ">
            <p style="
              margin: 0;
              color: #6b7280;
              font-size: 12px;
            ">
              This is an automated email. Please do not reply directly to this email.
            </p>
          </div>

        </div>
      </div>
    `,
  );
}

//   async sendQueryNotification(
//     name: string,
//     email: string,
//     number: string,
//     course: string,
//     message: string,
//   ) {
//     return this.sendMail(
//       process.env.RECEPTIONIST_EMAIL || '',
//       'New Course Query Received',
//       `
//         <h2>New Course Query</h2>

//         <p><strong>Name:</strong> ${name}</p>
//         <p><strong>Email:</strong> ${email}</p>
//         <p><strong>Phone:</strong> ${number}</p>
//         <p><strong>Course:</strong> ${course}</p>

//         <p>
//           <strong>Message:</strong>
//         </p>

//         <p>
//           ${message}
//         </p>

//         <br />

//         <p>
//           Please follow up with the customer.
//         </p>
//       `,
//     );
//   }

async sendQueryNotification(
  name: string,
  email: string,
  number: string,
  course: string,
  price:number,
  message: string,
) {
  return this.sendMail(
    process.env.RECEPTIONIST_EMAIL || '',
    `New Course Query - ${name}`,
    `
      <div style="
        font-family: Arial, sans-serif;
        background-color: #f4f6f8;
        padding: 30px 15px;
      ">
        <div style="
          max-width: 650px;
          margin: 0 auto;
          background-color: #ffffff;
          border-radius: 10px;
          overflow: hidden;
          border: 1px solid #e5e7eb;
        ">

          <!-- Header -->
          <div style="
            background-color: #111827;
            padding: 25px;
            text-align: center;
          ">
            <h2 style="
              margin: 0;
              color: #ffffff;
              font-size: 24px;
            ">
              The Freyza Academy
            </h2>

            <p style="
              margin: 8px 0 0;
              color: #d1d5db;
              font-size: 14px;
            ">
              New Course Query
            </p>
          </div>

          <!-- Body -->
          <div style="padding: 30px;">

            <h3 style="
              margin: 0 0 10px;
              color: #111827;
              font-size: 20px;
            ">
              New Query Received
            </h3>

            <p style="
              color: #4b5563;
              font-size: 15px;
              line-height: 1.6;
            ">
              A new course query has been submitted by
              <strong>${name}</strong>.
              Please review the details below and follow up with the customer.
            </p>

            <!-- Customer Details -->
            <table style="
              width: 100%;
              border-collapse: collapse;
              margin: 25px 0;
              border: 1px solid #e5e7eb;
              border-radius: 6px;
            ">

              <tr>
                <td style="
                  padding: 14px;
                  background-color: #f9fafb;
                  border-bottom: 1px solid #e5e7eb;
                  font-weight: bold;
                  color: #374151;
                  width: 30%;
                ">
                  Customer Name
                </td>

                <td style="
                  padding: 14px;
                  border-bottom: 1px solid #e5e7eb;
                  color: #111827;
                  font-weight: 600;
                ">
                  ${name}
                </td>
              </tr>

              <tr>
                <td style="
                  padding: 14px;
                  background-color: #f9fafb;
                  border-bottom: 1px solid #e5e7eb;
                  font-weight: bold;
                  color: #374151;
                ">
                  Email
                </td>

                <td style="
                  padding: 14px;
                  border-bottom: 1px solid #e5e7eb;
                  color: #111827;
                ">
                  ${email}
                </td>
              </tr>

              <tr>
                <td style="
                  padding: 14px;
                  background-color: #f9fafb;
                  border-bottom: 1px solid #e5e7eb;
                  font-weight: bold;
                  color: #374151;
                ">
                  Phone
                </td>

                <td style="
                  padding: 14px;
                  border-bottom: 1px solid #e5e7eb;
                  color: #111827;
                ">
                  ${number}
                </td>
              </tr>

               <tr>
                <td style="
                  padding: 14px;
                  background-color: #f9fafb;
                  border-bottom: 1px solid #e5e7eb;
                  font-weight: bold;
                  color: #374151;
                ">
                  Price
                </td>

                <td style="
                  padding: 14px;
                  border-bottom: 1px solid #e5e7eb;
                  color: #111827;
                ">
                  ${price}
                </td>
              </tr>

              <tr>
                <td style="
                  padding: 14px;
                  background-color: #f9fafb;
                  font-weight: bold;
                  color: #374151;
                ">
                  Course
                </td>

                <td style="
                  padding: 14px;
                  color: #111827;
                  font-weight: 600;
                ">
                  ${course}
                </td>
              </tr>

            </table>

            <!-- Customer Message -->
            <div style="
              margin-top: 25px;
            ">
              <h4 style="
                margin: 0 0 10px;
                color: #111827;
                font-size: 16px;
              ">
                Customer Message
              </h4>

              <div style="
                background-color: #f9fafb;
                border-left: 4px solid #111827;
                padding: 15px;
                color: #4b5563;
                font-size: 14px;
                line-height: 1.6;
              ">
                ${message}
              </div>
            </div>

            <p style="
              margin-top: 30px;
              color: #4b5563;
              font-size: 14px;
              line-height: 1.6;
            ">
              Please contact the customer and follow up on this query.
            </p>

            <p style="
              color: #4b5563;
              font-size: 14px;
              line-height: 1.6;
            ">
              Regards,<br />
              <strong>The Freyza Salon Team</strong>
            </p>

          </div>

          <!-- Footer -->
          <div style="
            background-color: #f9fafb;
            padding: 18px;
            text-align: center;
            border-top: 1px solid #e5e7eb;
          ">
            <p style="
              margin: 0;
              color: #6b7280;
              font-size: 12px;
            ">
              This is an automated notification from The Freyza Salon.
            </p>
          </div>

        </div>
      </div>
    `,
  );
}
}
