"use strict";

require("dotenv").config();
const validator = require("../../../../app/api/src/middleware/validate/validatorFunction");
const authonticatedUserSchema = require("../../../../app/api/src/utils/schema/authonticatedUser");
const authonticationMiddleware = require("../../../../app/api/src/middleware/auth/authentication");

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjQ4MzAyODU1LTI0NjctNGViNC1hNzhhLTE1N2Y4NDdiOGNjMSIsInBob25lIjoiMDkzMzM5NTA4ODkiLCJpYXQiOjE2NDkxMzYyNjIsImV4cCI6MTY0OTIyNjI2Mn0.8xR2eTs0uMrFDMp3UTRTddwF7FAnYLWMFNyX4SuQ0G4";

describe("UNIT: AUTHONTICATION MIDDLEWARE:", () => {

  test(`without header authorization`, async () => {
    const mockedReq = {
      headers: {},
    };
    const mockedRes = {};
    const mockedNext = jest.fn();

    const result = await authonticationMiddleware(
      mockedReq,
      mockedRes,
      mockedNext
    );

    const calls = mockedNext.mock.calls;
    expect(calls.length).toBe(1);
    expect(calls[0][0].status).toBe(401);
    expect(calls[0][0].message).toBe("Authorization not sent");
  });

  test(`with invalid header authorization`, async () => {
    const mockedReq = {
      headers: {
        authorization: "123",
      },
    };
    const mockedRes = {};
    const mockedNext = jest.fn();

    const result = await authonticationMiddleware(
      mockedReq,
      mockedRes,
      mockedNext
    );

    const calls = mockedNext.mock.calls;
    expect(calls.length).toBe(1);
    expect(calls[0][0].status).toBe(403);
    expect(calls[0][0].message).toBe("Token not valid");
  });

  test(`with valid header authorization`, async () => {
    const mockedReq = {
      headers: {
        authorization: token,
      },
    };
    const mockedRes = {};
    const mockedNext = jest.fn();

    const result = await authonticationMiddleware(
      mockedReq,
      mockedRes,
      mockedNext
    );

    const resBody = mockedRes.authenticatedUser.toJSON();
    const isDataValid = validator(resBody, authonticatedUserSchema);
    if (!!isDataValid) throw `Data recieved has validation error: ${isDataValid.message}`;
  });
});
