import mailer from "../../loaders/mailgun";

export const sendEmail = async (
  email: string,
  title: string,
  content: string
) => {
  try {
    const result = await mailer.send(email, title, content);
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
