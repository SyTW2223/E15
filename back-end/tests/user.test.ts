import supertest from "supertest";
import { app } from "../index";

describe("User API", () => {
  it("Debe devolver una lista de usuarios", async () => {
    await supertest(app)
      .get("/user")
      .expect(200)
  });

  it("Debe devolver un usuario específico", async () => {
    await supertest(app)
      .get("/user/6439aa0ace6fbb3cd24a990f")
      .expect(200)
  });

  it("Debe actualizar un usuario", async () => {
    await supertest(app)
      .patch("/user/6439aa0ace6fbb3cd24a990f")
      .send({id: "1212121212" })
      .expect(200)
  });
});