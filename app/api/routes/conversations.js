const express = require("express");
const { Op } = require("sequelize");
const router = express.Router();
const use = require("../src/utils/use");
const serveJson = require("../src/middleware/serveJson");
const authentication = require("../src/middleware/auth/authentication");
const authorization = require("../src/middleware/auth/authorization");
const { ValidateF, validator } = require("../src/middleware/validate");
const conversationHasBeenSetup = require("../src/middleware/conversation/conversationHasBeenSetup");
const getConversationByUuid = require("../src/middleware/conversation/getConversationByUuid");

const userById = require("../src/middleware/gets/userById");

const {
  getConversation,
  createConversation,
  addMessage,
} = require("../src/services");

/**************************/
/*   validation schemas   */
/**************************/

/**************************/
/*         routes         */
/**************************/
router.get(
  "/setup/:userId",
  use(authentication),
  use(authorization.def("CHATTER")),
  use(userById),
  use(conversationHasBeenSetup),
  use(createConversation()),
  use(getConversation),
  serveJson
);

router.post(
  "/:uuid",
  use(authentication),
  use(authorization.def("CHATTER")),
  use(getConversationByUuid),
  use(addMessage),
  serveJson
);

// router.get("/:uuid", addMessage);

module.exports = router;
