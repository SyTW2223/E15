import supertest from "supertest";
import { app } from "../index";
import { describe } from "mocha";

describe("Exercise API", () => {
  let trial_exercise = {
    id: "",
    name: "ejercicio de prueba",
    author: "64875cee47b25860b5b9301e",
    short_description: "Descripción corta de prueba",
    long_description: "Descripción larga de prueba",
    initial_position: "Posición inicial de prueba",
    category: "prueba",
    picture: "",
    likes: 0,
    equipment_needed: false,
    comments: [
      {
        username: "usuario de prueba",
        comment: "comentario de prueba"
      },
      {
        username: "usuario de prueba 2",
        comment: "comentario de prueba 2"
      }
    ]
  };

  let trial_exercise2 = {
    id: "",
    name: "ejercicio de prueba 2",
    category: "prueba",
    author : "64875cee47b25860b5b9301e",
  };

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

  it("Debe devolver una lista de los ejercicios", async () => {
    await supertest(app)
      .get("/exercise")
      .set("Authorization", "Bearer " + token)
      .expect(200)
  });

  it ("Debe crear un nuevo ejercicio", async () => {
    await supertest(app)
      .post("/exercise")
      .set("Authorization", "Bearer " + token)
      .send(trial_exercise)
      .expect(200)
  });

  it ("Debe devolver un error al crear un ejercicio, ejercicio no valido", async () => {
    await supertest(app)
      .post("/exercise")
      .set("Authorization", "Bearer " + token)
      .send(trial_exercise2)
      .expect(500)
  });

  it ("Debe devolver un ejercicio especifico", async () => {
    await supertest(app)
      .get("/exercise/" + trial_exercise.name)
      .set("Authorization", "Bearer " + token)
      .expect(200)
  });

  it ("Debe devolver un error al devolver un ejercicio especifico, ejercicio no valido", async () => {
    await supertest(app)
      .get("/exercise/ejercicio_fallo")
      .set("Authorization", "Bearer " + token)
      .expect(404)
  });

  it ("Debe actualizar un ejercicio", async () => {
    await supertest(app)
      .patch("/exercise/" + trial_exercise.name)
      .set("Authorization", "Bearer " + token)
      .send({category: "prueba 2"})
      .expect(200)
  });

  it ("Debe devolver un error al actualizar un ejercicio, ejercicio no valido", async () => {
    await supertest(app)
      .patch("/exercise/ejercicio_fallo")
      .set("Authorization", "Bearer " + token)
      .send({category: "prueba 2"})
      .expect(404)
  });

  it("Debe borrar un ejercicio", async () => {
    await supertest(app)
      .delete("/exercise/" + trial_exercise.name)
      .set("Authorization", "Bearer " + token)
      .expect(200)
  });

  it("Debe devolver un error al borrar un ejercicio, ejercicio no valido", async () => {
    await supertest(app)
      .delete("/exercise/ejercicio_fallo")
      .set("Authorization", "Bearer " + token)
      .expect(404)
  });
});
