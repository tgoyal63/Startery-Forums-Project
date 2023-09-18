const axios = require("axios");
const { mailAPIKey } = require("../config/config");

const sendMail = async ({ email, name, subject, content }) => {
  let data = JSON.stringify({
    sender: {
      name: "Startery Team",
      email: "no-reply@startery.io",
    },
    to: [{ email, name}],
    subject,
    htmlContent: `<html><head></head><body><p>Hello,</p>${content}</p></body></html>`,
  });
  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "https://api.brevo.com/v3/smtp/email",
    headers: {
      accept: "application/json",
      "api-key": mailAPIKey,
      "content-type": "application/json",
    },
    data: data,
  };

  const response = await axios.request(config);
  return response.data;
};

module.exports = {
  sendMail,
};
