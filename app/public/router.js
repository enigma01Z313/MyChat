const path = require("path");
const express = require("express");
const router = express.Router();

router.get("/*", (req, res, next) => {
  const { url: requstedUrl } = req;
  // console.log(requstedUrl);

  if (requstedUrl.includes("robots.txt")) return res.end("robots.txt");
  if (requstedUrl.includes("favicon.ico")) return res.send("favicon.ico");

  if (requstedUrl.includes("assets"))
    return res.sendFile(
      path.join(
        path.resolve("./"),
        "app/public",
        requstedUrl.match(/\assets(.*)/)[0]
      )
    );

  //general pages handles
  if (requstedUrl[requstedUrl.length - 1] === "/")
    return res.render(`pages${requstedUrl}index`);

  return res.render(`pages${requstedUrl}`);
});

module.exports = router;
