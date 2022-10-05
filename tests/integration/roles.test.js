"use strict";

const request = require("supertest");
const app = require("../../app/app");
const generateRandom = require("../../app/api/src/utils/generateRandom");
const { roleSchema, rolesListSchema } = require("../../app/api/src/utils/schema");
const validator = require("../../app/api/src/middleware/validate/validatorFunction");
const fError = require("../../app/api/src/utils/fError");

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjQ4MzAyODU1LTI0NjctNGViNC1hNzhhLTE1N2Y4NDdiOGNjMSIsInBob25lIjoiMDkzMzM5NTA4ODkiLCJpYXQiOjE2NDkxMzYyNjIsImV4cCI6MTY0OTIyNjI2Mn0.8xR2eTs0uMrFDMp3UTRTddwF7FAnYLWMFNyX4SuQ0G4";
const newRoleName = generateRandom();

describe("Roles api tests", () => {
  test("GET /api/roles/permissions", async () => {
    await request(app)
      .get("/api/roles/permissions")
      .set("Authorization", token)
      .expect("Content-Type", "application/json; charset=utf-8")
      .expect(500)
      .expect((res) => {
        console.log(res);
        const data = res.body;
        if (data.length !== 4)
          return new Error(
            `data length error: expected '4', recieved '${data.length}'`
          );

        let index = 0;
        for (item of data) {
          const { name, permissions } = item;
          if (!name)
            return new Error(
              `Parameter 'name' does not exist on permissions index'${index}'`
            );

          if (!permissions)
            return new Error(
              `Parameter 'permissions' does not exist on permissions index'${index}'`
            );

          index++;
        }
      });
  });

  // /////////////////////////
  // //    adding roles     //
  // /////////////////////////
  // //check for name duplication
  // test("POST /api/roles", async () => {
  //   await request(app)
  //     .post("/api/roles")
  //     .send({
  //       name: "USER1",
  //       permissions: ["SEE_ROLES", "ADD_ROLES"],
  //     })
  //     .set("Authorization", token)
  //     .expect("Content-Type", "application/json; charset=utf-8")
  //     .expect(400)
  //     .expect((res) => {
  //       const {
  //         body: {
  //           error: { message },
  //         },
  //       } = res;
  //       if (!message.includes("Duplicate entry: another 'Role' with name "))
  //         return new Error(`Error should be dublicate role name entry`);
  //     });
  // });

  // //check for wrong permission sent
  // test("POST /api/roles", async () => {
  //   await request(app)
  //     .post("/api/roles")
  //     .send({
  //       name: newRoleName,
  //       permissions: ["SEE_ROLES", "ADD_ROLESW"],
  //     })
  //     .set("Authorization", token)
  //     .expect("Content-Type", "application/json; charset=utf-8")
  //     .expect(400)
  //     .expect((res) => {
  //       const {
  //         body: {
  //           error: { message },
  //         },
  //       } = res;
  //       if (!message.includes("Permission sent is not valid: "))
  //         return new Error(`Error should be permissions sent not allowed`);
  //     });
  // });

  // //check for adding new role
  // test("POST /api/roles", async () => {
  //   await request(app)
  //     .post("/api/roles")
  //     .send({
  //       name: newRoleName,
  //       permissions: ["SEE_ROLES", "ADD_ROLES"],
  //     })
  //     .set("Authorization", token)
  //     .expect("Content-Type", "application/json; charset=utf-8")
  //     .expect(201)
  //     .expect((res) => {
  //       const data = res.body;
  //       if (!!validator(data, roleSchema)) return new Error(`aaaaaaaaaaaaaaa`);
  //     });
  // });

  // /////////////////////////
  // //    getting roles    //
  // /////////////////////////
  // //get all roles
  // test("GET /api/roles", async () => {
  //   await request(app)
  //     .get("/api/roles")
  //     .set("Authorization", token)
  //     .expect("Content-Type", "application/json; charset=utf-8")
  //     .expect(200)
  //     .expect((res) => {
  //       console.log(res.body);
  //       // const data = res.body;
  //       // const isDataValid = validator(data, rolesListSchema);
  //       // if (!!isDataValid) return isDataValid;
  //     });
  // });

  // //get all roles with status filter
  // test(`GET /api/roles?status=?`, async () => {
  //   const randomBooleanInts = await randomBooleanInt();
  //   await request(app)
  //     .get(`/api/roles?status=${randomBooleanInts}`)
  //     .set("Authorization", token)
  //     .expect("Content-Type", "application/json; charset=utf-8")
  //     .expect(200)
  //     .expect((res) => {
  //       const data = res?.body?.data;
  //       if (!data) return new Error("data not exist");
  //       for (item of data) {
  //         const status = item?.status?.code;
  //         if (!status) return new Error("data does not have status");
  //         if (status !== randomBooleanInts)
  //           return new Error(`data status does not match status given ${randomBooleanInts}`);
  //       }
  //     });
  // });

  // /////////////////////////
  // //   get single role   //
  // /////////////////////////
  // let roleId;
  // //not valid roleId
  // roleId = "123";
  // test(`GET /api/roles/${roleId}`, async () => {
  //   await request(app)
  //     .get(`/api/roles/${roleId}`)
  //     .set("Authorization", token)
  //     .expect("Content-Type", "application/json; charset=utf-8")
  //     .expect(404)
  //     .expect((res) => {
  //       if (
  //         res.body.error.message.includes("Not found: 'Role' with id") ||
  //         res.body.error.message.includes("does not exist")
  //       )
  //         return "Wrong Error giver";
  //     });
  // });

  // //valid roleId
  // test(`GET /api/roles/{validRoleId}`, async () => {
  //   const {
  //     body: { data: rolesList },
  //   } = await request(app)
  //     .get("/api/roles")
  //     .set("Authorization", token)
  //     .expect("Content-Type", "application/json; charset=utf-8")
  //     .expect(200)
  //     .expect((res) => res.body);
  //   const randomIndex = Math.floor(Math.random() * (rolesList.length - 1));
  //   const randomId = rolesList[randomIndex].id;
  //   await request(app)
  //     .get(`/api/roles/${randomId}`)
  //     .set("Authorization", token)
  //     .expect("Content-Type", "application/json; charset=utf-8")
  //     .expect(200)
  //     .expect((res) => {
  //       const isDataValid = validator(res.body, roleSchema);
  //       if (!!isDataValid) return isDataValid;
  //     });
  // });

  // /////////////////////////
  // //     update role     //
  // /////////////////////////
  // //not valid roleId
  // test(`PUT /api/roles/{validRoleId}`, async () => {
  //   const randomBooleanInt = () =>
  //     new Promise((resolve, reject) => {
  //       resolve(Math.random() >= 0.5 ? 1 : 0);
  //     });

  //   const {
  //     body: { data: rolesList },
  //   } = await request(app)
  //     .get("/api/roles")
  //     .set("Authorization", token)
  //     .expect("Content-Type", "application/json; charset=utf-8")
  //     .expect(200)
  //     .expect((res) => res.body);
  //   const randomIndex = Math.floor(Math.random() * (rolesList.length - 1));
  //   const randomRole = rolesList[randomIndex];
  //   await request(app)
  //     .put(`/api/roles/${randomRole.id}`)
  //     .set("Authorization", token)
  //     .send({
  //       status: randomRole.status.code,
  //     })
  //     .expect(204);

  //   const booleanInt = await randomBooleanInt();
  //   const randomName = generateRandom();
  //   await request(app)
  //     .put(`/api/roles/${randomRole.id}`)
  //     .set("Authorization", token)
  //     .expect("Content-Type", "application/json; charset=utf-8")
  //     .send({
  //       name: randomName,
  //       status: booleanInt,
  //     })
  //     .expect(200)
  //     .expect((res) => {
  //       console.log(res.body);
  //     });
  // });


});
