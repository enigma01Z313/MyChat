"use strict";

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
    permissions: [
      { lable: "چتر", permission: "CHATTER" },
    ],
  },
];

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "options",
      [
        {
          key: "permissions",
          value: JSON.stringify(defaultPermissions),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("options", null, {});
  },
};
