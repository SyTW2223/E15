import supertest from "supertest";
import { app } from "../index";
import { describe } from "mocha";
const jwt = require('jsonwebtoken')

describe("User API", () => {

  let trial_user = {
    id: "",
    first_name: "Prueba",
    last_name: "Prueba",
    username: "Prueba",
    phone_number: "999999999",
    email: "prueba@gmail.com",
    password: "prueba",
    gender: "Hombre",
    role: "Deportista",
    birthdate: "1999-12-12",
    picture: ""
  };

  let trial_user2 = {
    id: "",
    first_name: "Prueba",
    last_name: "Prueba",
    username: "Prueba",
    phone_number: "999999999",
    email: "prueba@gmail.com",
    password: "prueba",
    genter: "Hombre",
    role: "Deportista",
    birthdate: "1999-12-12",
    picture: ""
  };

  let test_user = {
    email: "prueba@gmail.com",
    password: "prueba",
  };

  let token = "";

  it("Registrarse en la aplicación", async () => {
    await supertest(app)
    .post("/signUp")
    .send(trial_user)
    .expect(200)
  });

  it("Registrarse en la aplicación fallida", async () => {
    await supertest(app)
    .post("/signUp")
    .send(trial_user2)
    .expect(500)
  });
  

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

  it("Debe devolver un error al devolver una lista de usuarios", async () => {
    await supertest(app)
      .get("/user")
      .expect(500)
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

  it("Debe devolver un error al actualizar un usuario, usuario no valido", async () => {
    await supertest(app)
      .patch("/user/1212121212")
      .set("Authorization", "Bearer " + token)
      .send({id: "1212121212" })
      .expect(500)
  });

  it("Borrar un usuario", async () => {
    const payload = jwt.verify(token, "secretkey")
    await supertest(app)
      .delete("/user/" + payload.user._id)
      .set("Authorization", "Bearer " + token)
      .expect(200)
  });

  it("Error al borrar un usuario 404", async () => {
    const payload = jwt.verify(token, "secretkey")
    await supertest(app)
      .delete("/user/" + payload.user._id)
      .set("Authorization", "Bearer " + token)
      .expect(404)
  });


  it("Error al borrar un usuario 500", async () => {
    const payload = jwt.verify(token, "secretkey")
    await supertest(app)
      .delete("/user/" + payload._id)
      .set("Authorization", "Bearer " + token)
      .expect(500)
  });
});