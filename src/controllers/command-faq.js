const fs = require('fs');

module.exports = () => {
  return async ctx => {
    const { replyWithMarkdown } = ctx;
    const faq = fs.readFileSync('src/controllers/faq.md', 'utf8');

    replyWithMarkdown(`${faq}`);
  };
};
