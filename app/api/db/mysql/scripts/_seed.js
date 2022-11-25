"use strict";

const { v4: uuidv4 } = require("uuid");
const { Option, User, Role, Artist, Group } = require("../models");

const defaultPermissions = [
  {
    name: "مدیرت نقش ها",
    permissions: [
      {
        lable: "نمایش نقش ها",
        permission: "SEE_ROLES",
      },
      {
        lable: "افزودن نقش جدید",
        permission: "ADD_ROLES",
      },
      {
        lable: "ویرایش نقش ها",
        permission: "EDIT_ROLES",
      },
    ],
  },
  {
    name: "مدیرت کاربران",
    permissions: [
      {
        lable: "نمایش کابران",
        permission: "SEE_USERS",
      },
      {
        lable: "افزودن کابر",
        permission: "ADD_USERS",
      },
      {
        lable: "ویرایش کابران",
        permission: "EDIT_USERS",
      },
    ],
  },
  {
    name: "پیشخوان مدیریت",
    permissions: [
      {
        lable: "نمایش همه پورتفولیو",
        permission: "SEE_ALL_CRYPTO_PORTFOLIO",
      },
      {
        lable: "نمایش همه ژورنال",
        permission: "SEE_ALL_JOURNAL",
      },
      {
        lable: "نمایش پورتفولیو",
        permission: "SEE_CRYPTO_PORTFOLIO",
      },
      {
        lable: "نمایش ژورنال",
        permission: "SEE_JOURNAL",
      },
      {
        lable: "مدیریت پکیج ها",
        permission: "MANAGE_PACKAGES",
      },
      {
        lable: "نمایش پکیج ها",
        permission: "SEE_PACKAGES",
      },
    ],
  },
  {
    name: "عمومی",
    permissions: [{ lable: "چتر", permission: "CHATTER" }],
  },
];
const password =
  "e10659603e1219ad9ab5b55794977be4c5a021b234aaa8629fe0ab780807e77a";

(async function () {
  await Option.create({
    key: "permissions",
    value: JSON.stringify(defaultPermissions),
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  console.log("Option seed has been finished");

  await Role.create({
    uuid: uuidv4(),
    name: "SUPMIN",
    permissions: `["SEE_ROLES","ADD_ROLES","EDIT_ROLES","SEE_USERS","ADD_USERS","EDIT_USERS","UPLOAD_RECEIPTS","SEE_ALL_RECEIPTS","SEE_OWN_RECEIPTS","SEND_BROADCAST_SMS"]`,
    status: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  await Role.create({
    uuid: uuidv4(),
    name: "USER",
    permissions: `["CHATTER", "SEE_USERS"]`,
    status: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  console.log("Roles seed has been finished");

  await User.create({
    uuid: uuidv4(),
    username: "f.ahmadyf94@gmail.com",
    phone: "09333950889",
    email: "f.ahmadyf94@gmail.com",
    password,
    firstName: "Farzin",
    lastName: "Ahmady",
    roleId: 1,
    imageId: 1,
    status: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  await User.create({
    uuid: uuidv4(),
    username: "f.ahmadyf944@gmail.com",
    phone: "09333950881",
    email: "f.ahmadyf944@gmail.com",
    password,
    firstName: "Farzin",
    lastName: "Ahmady",
    roleId: 2,
    imageId: 1,
    status: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  console.log("User seed has been finished");

  const artist1 = await Artist.create({ name: "Lee Taemin" });
  const artist2 = await Artist.create({ name: "Kai" });
  const artist3 = await Artist.create({ name: "Baekhyun" });
  const artist4 = await Artist.create({ name: "Ten" });
  const artist5 = await Artist.create({ name: "Taeyong" });
  const artist6 = await Artist.create({ name: "Lucas" });
  const artist7 = await Artist.create({ name: "Mark" });
  const artist8 = await Artist.create({ name: "Jimin" });
  const artist9 = await Artist.create({ name: "Jung Kook" });
  const artist10 = await Artist.create({ name: "Taehyung" });
  console.log("Artists seed has been finished");

  const group1 = await Group.create({ name: "SuperM" });
  const group2 = await Group.create({ name: "EXO" });
  const group3 = await Group.create({ name: "NCT" });
  const group4 = await Group.create({ name: "BTS" });
  console.log("Groups seed has been finished");

  await group1.addArtist(artist1);
  await group1.addArtist(artist2);
  await group1.addArtist(artist3);
  await group1.addArtist(artist4);
  await group1.addArtist(artist5);
  await group1.addArtist(artist6);
  await group1.addArtist(artist7);
  await group2.addArtist(artist2);
  await group2.addArtist(artist3);
  await group3.addArtist(artist4);
  await group3.addArtist(artist5);
  await group3.addArtist(artist6);
  await group3.addArtist(artist7);
  await group4.addArtist(artist8);
  await group4.addArtist(artist9);
  await group4.addArtist(artist10);
  console.log("Groups Artists seed has been finished");

  process.exit();
})();
