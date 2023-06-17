import supertest from "supertest";
import { app } from "../index";
import { describe } from "mocha";

describe("User API", () => {
  
  let test_user = {
    email: "bumstead@gmail.com",
    password: "bumstead",
  };

  let token = "";

  it ("Debe loguearse en la aplicacion", async () => {
    const response = await supertest(app)
      .post("/signIn")
      .send(test_user)
      .expect(200)
    token = response.body.token;
    
  });

  it("Debe devolver una lista de usuarios", async () => {
    await supertest(app)
      .get("/user")
      .set("Authorization", "Bearer " + token)
      .expect(200)
  });

  it("Debe devolver un usuario específico", async () => {
    await supertest(app)
      .get("/user/64875cee47b25860b5b9301e")
      .set("Authorization", "Bearer " + token)
      .expect(200)
  });

  it("Debe actualizar un usuario", async () => {
    await supertest(app)
      .patch("/user/64875cee47b25860b5b9301e")
      .set("Authorization", "Bearer " + token)
      .send({id: "1212121212" })
      .expect(200)
  });
});