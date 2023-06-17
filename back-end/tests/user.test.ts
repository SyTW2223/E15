import supertest from "supertest";
import { app } from "../index";
import { describe } from "mocha";

describe("User API", () => {
  it("Debe devolver una lista de usuarios", async () => {
    await supertest(app)
      .get("/user")
      .expect(200)
  });

  it("Debe devolver un usuario específico", async () => {
    await supertest(app)
      .get("/user/64875cee47b25860b5b9301e")
      .expect(200)
  });

  it("Debe actualizar un usuario", async () => {
    await supertest(app)
      .patch("/user/64875cee47b25860b5b9301e")
      .send({id: "1212121212" })
      .expect(200)
  });
});