import config from "../config";

import { NodeMailgun } from "ts-mailgun";

const mailer = new NodeMailgun();
mailer.apiKey = String(config.mailgun.privateApiKey);
mailer.domain = String(config.mailgun.domain);
mailer.fromEmail = `postmaster@${config.mailgun.domain}`;
mailer.fromTitle = "Generic Server";

mailer.init();

export default mailer;
