import nodemailer from 'nodemailer';

export class EmailService {
    private transporter = nodemailer.createTransport({
        host: 'sandbox.smtp.mailtrap.io', // ou 'smtp.gmail.com'
        port: 2525,
        auth: {
            user: 'aac5ddcbdf1585',
            pass: 'dd7b65e7e5db79',
        },
    });

    async sendConfirmationEmail(email: string, token: string) {
        const confirmationLink = `https://seusite.com/confirm-email?token=${token}`;

        const mailOptions = {
            from: 'ILearning',
            to: email,
            subject: 'Confirmação de e-mail',
            html: `
                <p>Olá,</p>
                <p>Obrigado por se registrar! Confirme seu e-mail clicando no link abaixo:</p>
                <a href="${confirmationLink}">Confirmar Email</a>
                <p>Esse link expira em 15 minutos.</p>
            `,
        };

        await this.transporter.sendMail(mailOptions);
    }

    async sendMagicLink(email: string, token: string) {
        const magicLink = `http://localhost:3000/auth/callback?token=${token}`;

        const mailOptions = {
            from: 'ILearning',
            to: email,
            subject: 'Magic Link',
            html: `
                <p>Olá,</p>
                <p>Para realizar seu login clique no link abaixo:</p>
                <a href="${magicLink}">Magic Link</a>
                <p>Esse link expira em 15 minutos.</p>
            `,
        };

        await this.transporter.sendMail(mailOptions);
    }
}
