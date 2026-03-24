const express = require("express");
const fetch = require("node-fetch");

const app = express();

app.get("/", async (req, res) => {
  const issue = req.query.issue;
  const action = req.query.action;

  let webhook = "";
  let secret = "";

  if (action === "approve") {
    webhook = "https://api-private.atlassian.com/automation/webhooks/jira/a/bff8d70c-fdc8-4c09-bb88-554f98722f0b/019d1c7e-1baf-7dfa-8575-bcd37ce33794";
    secret = "fcaf02de235288d4c091996acce6cff112f2a1ad";
  }

  if (action === "reject") {
    webhook = "https://api-private.atlassian.com/automation/webhooks/jira/a/bff8d70c-fdc8-4c09-bb88-554f98722f0b/019d1c7e-af76-7d20-bca5-a1a6bc2aeb80";
    secret = "0a2bc0e99d3feedc9c64b07c2f2fa58fffadd461";
  }

  try {
    await fetch(webhook, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Automation-Webhook-Token": secret
      },
      body: JSON.stringify({
        issueKey: issue
      })
    });

    res.send("Ação executada com sucesso!");
  catch (err) {
  res.send("Erro ao executar ação");
}
});

app.listen(3000, () => {
  console.log("Servidor rodando");
});
