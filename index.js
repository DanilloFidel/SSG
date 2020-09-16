const axios = require("axios");
const Vue = require("vue");
const server = require("express")();
const cors = require("cors");
const renderer = require("vue-server-renderer").createRenderer({
  template: require("fs").readFileSync("a.html", "utf-8")
});

const context = {
  title: "vue ssr",
  metas: `
      <meta name="keyword" content="vue,ssr">
      <meta name="description" content="vue srr demo">
  `
};

server.use(cors());

server.get("*", (req, res) => {
  const app = new Vue({
    data: {},
    template: `<div>Cheguei do server</div>`
  });

  renderer.renderToString(app, context, (err, html) => {
    axios.get("http://localhost:8000/page-builder").then(response => {
      if (err) {
        res.status(500).end("Internal Server Error");
        return;
      }
      res.end(`${response.data}`);
    });
  });
});

server.listen(5000);
