const request = require("supertest");
const app = require("../app");

describe("User Login Flow", () => {
  test("Body 와 토큰 없는 요청을 반려합니다.", async () => {
    const res = await request(app).post("/auth/login");

    expect(res.body).toEqual({
      success: false,
      message: "unauthorized access",
    });
  });

  test("Body 없이 JWT 만으로 로그인이 가능합니다.", async () => {
    const res = await request(app)
      .post("/auth/login")
      .set(
        "Authorization",
        `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IlZjMjJAeHguY29tIiwiaWF0IjoxNjU0NzQ5MDA3fQ.cTb4QbZjZ8jMSbzwYQ4-RAGCg7LiJFj2s98oQiDFg18`
      );

    expect(res.body.success).toBe(true);
  });

  test("JWT 없이 이메일과 비밀번호를 첨부하면 로그인이 가능합니다.", async () => {
    const body = { email: "Vc22@xx.com", password: "123456" };
    const res = await request(app).post("/auth/login").send(body);

    expect(res.body.success).toBe(true);
  });
});
