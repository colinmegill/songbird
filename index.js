require('dotenv').config();

var Botkit = require('botkit');
var GitHubApi = require("github4");
// var Witbot = require('witbot');

var slackToken = process.env.SLACK_TOKEN;

var songbird = Botkit.slackbot({
  debug: false
});

// var witToken = process.env.WIT_TOKEN;

var github = new GitHubApi({
  // optional
  // debug: true,
  // protocol: "https",
  // host: "github.my-GHE-enabled-company.com", // should be api.github.com for GitHub
  // pathPrefix: "/api/v3", // for some GHEs; none for GitHub
  // timeout: 5000,
  // headers: {
  //     "user-agent": "My-Cool-GitHub-App" // GitHub is happy with a unique user agent
  // }
});

github.authenticate({
  type: "basic",
  username: process.env.GITHUB_USERNAME,
  password: process.env.GITHUB_TOKEN
});



songbird.spawn({
  token: slackToken
}).startRTM(function (err, bot, payload) {
  if (err) {
    throw new Error('Error connecting to slack: ', err)
  }
  console.log('Connected to Slack');
});
// github.issues.createLabel({
//   user: "colinmegill",
//   repo: "songbird",
//   name: message.match[1],
//   color: "#BADA55",
// });
// var witbot = Witbot(witToken);
songbird.hears(['hello','hi', 'hey'], 'direct_message', function (bot, message) {
  console.log(message.match)
  bot.reply(message, "hey there!")
});

songbird.hears([
  'issue (.*)',
],[
  'direct_message',
  'direct_mention',
  'mention',
], function(bot, message) {

  console.log()

  github.issues.create({
    user: "colinmegill",
    repo: "songbird",
    title: message.match[1],
    body: "Slow-carb ethical single-origin coffee gluten-free actually swag. Cronut health goth polaroid chicharrones everyday carry, hoodie hashtag kale chips brunch drinking vinegar 90's flexitarian. Blog tofu VHS whatever aesthetic +1. Kombucha poutine trust fund marfa pug pinterest.",
    // milestone: "null",
    assignee: "colinmegill",
    // labels: [""]
  });
});
