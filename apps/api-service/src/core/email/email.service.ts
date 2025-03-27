import { BadRequestException, Injectable } from "@nestjs/common"
import { SendEmailDto } from "./dto/send-email.dto"
import * as nodemailer from "nodemailer"
import { google } from "googleapis"
import { config } from "../../config"
import SMTPTransport from "nodemailer/lib/smtp-transport"

@Injectable()
export class EmailService {
  async sendEmail(sendEmailDto: SendEmailDto) {
    try {
      const { email, subject, body } = sendEmailDto
      const {
        GCLOUD_CLIENT_ID,
        GCLOUD_CLIENT_SECRET,
        GCLOUD_REDIRECT_URI,
        GCLOUD_REFRESH_TOKEN,
        MAILER_EMAIL,
      } = config
      const oAuth2Client = new google.auth.OAuth2(
        GCLOUD_CLIENT_ID,
        GCLOUD_CLIENT_SECRET,
        GCLOUD_REDIRECT_URI
      )
      oAuth2Client.setCredentials({ refresh_token: GCLOUD_REFRESH_TOKEN })
      const accessToken = await oAuth2Client.getAccessToken()

      const transporter: nodemailer.Transporter<SMTPTransport.SentMessageInfo> =
        nodemailer.createTransport({
          host: "smtp.gmail.com",
          port: 465,
          secure: true,
          auth: {
            type: "OAuth2",
            user: MAILER_EMAIL,
            accessToken: accessToken.token,
          },
        })

      await transporter.sendMail({
        from: MAILER_EMAIL,
        to: email,
        subject,
        html: body,
      })
    } catch (error) {
      throw new BadRequestException()
    }
  }
}
