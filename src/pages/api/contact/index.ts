import { NextApiRequest, NextApiResponse } from 'next';
import { createTransport } from 'nodemailer';
import { Options } from 'nodemailer/lib/mailer';

import { ContactFormParam, ReqBody } from '@/lib/type/contact';
import { __log } from '@/lib/util/log';

const sendEmail = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const reqBody = req.body as ReqBody<ContactFormParam>;

  const data = reqBody.body;

  // 改行のエスケープシーケンス(\n)を <br> に置換
  const htmlBody = data.body.replace(/\n/g, '<br>');

  // 送信用アカウントの設定（ここではGmail）
  const transporter = createTransport({
    port: 465,
    host: 'smtp.gmail.com',
    auth: {
      user: process.env.MAIL_SENDER,
      // Googleアカウントでアプリパスワードを取得して入れる
      pass: process.env.MAIL_PASS,
    },
    secure: true,
  });

  // 管理人に送るお問い合わせメッセージ通知メール
  const toHostMailData: Options = {
    from: process.env.MAIL_SENDER,
    to: process.env.MAIL_RECEIVER,
    replyTo: data.email,
    subject: `【プライム】${data.name}様：お問い合わせフォーム`,
    html: `
      <p>プライムお問い合わせページのフォームよりお問い合わせがありました。</p>
      <p>名前*:<br>${data.name}</p>
      <p>メールアドレス*:<br>${data.email}</p>
      <p>電話番号*:<br>${data.tel}</p>
      <p>会社名・事業者名*:<br>${data.company}</p>
      <p>詳しいお問い合わせ内容*:<br>${htmlBody}</p>
    `,
  };

  // 送信する
  try {
    await transporter.sendMail(toHostMailData);
  } catch (error) {
    __log('ERROR!!!!!!', { error });
    return res.status(500).json({ success: false });
  }

  res.status(200).json({ success: true });
};

export default sendEmail;
