import supertest from "supertest";
import { app } from "../index";
import { describe } from "mocha";

describe("Routine API", () => {
  let trial_routine = {
    id: "",
    name: "rutina de prueba",
    description: "Descripción de prueba",
    category: "prueba",
    author: "64875cee47b25860b5b9301e",
    exercises: ["6489ec15bf6fd4826e1fea44","6489ec15bf6fd4826e1fea44","6489ec15bf6fd4826e1fea44"],
    equipment_needed: true,
    sets: 3,
    reps: 10,
    avg_duration: 3,
    likes: 0,
    comments: [
      {
        username: "usuario de prueba",
        comment: "comentario de prueba"
      },
      {
        username: "usuario de prueba 2",
        comment: "comentario de prueba 2"
      }
    ],
    picture: ""
  };

  let trial_routine2 = {
    id: "",
    name: "rutina de prueba 2",
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

  it ("Debe devolver una lista de las rutinas", async () => {
    await supertest(app)
      .get("/routine")
      .set("Authorization", "Bearer " + token)
      .expect(200)
  });

  it ("Debe crear una nueva rutina", async () => {
    await supertest(app)
      .post("/routine")
      .set("Authorization", "Bearer " + token)
      .send(trial_routine)
      .expect(200)
  });

  it ("Debe devolver un error al crear una rutina, rutina no valida", async () => {
    await supertest(app)
      .post("/routine")
      .set("Authorization", "Bearer " + token)
      .send(trial_routine2)
      .expect(500)
  });

  it ("Debe devolver una rutina específica", async () => {
    await supertest(app)
      .get("/routine/" + trial_routine.name)
      .set("Authorization", "Bearer " + token)
      .expect(200)
  });

  it ("Debe devolver un error al buscar una rutina, rutina no valida", async () => {
    await supertest(app)
      .get("/routine/prueba_fallo")
      .set("Authorization", "Bearer " + token)
      .expect(404)
  });

  it ("Debe actualizar una rutina", async () => {
     await supertest(app)
       .patch("/routine/" + trial_routine.name)
       .set("Authorization", "Bearer " + token)
       .send({ description: "Descripción de prueba actualizada" ,  exercises: ["6442d4aa677db19baea771c1","6442d84b53af6d36441838c1","6442d88753af6d36441838c7"]})
       .expect(200)
  });

  it ("Debe devolver un error al actualizar una rutina, rutina no valida", async () => {
    await supertest(app)
      .patch("/routine/prueba_fallo")
      .set("Authorization", "Bearer " + token)
      .send({ description: "Descripción de prueba actualizada"})
      .expect(404)
  });

  it ("Debe eliminar una rutina", async () => {
    await supertest(app)
      .delete("/routine/" + trial_routine.name)
      .set("Authorization", "Bearer " + token)
      .expect(200)
  });

  it ("Debe devolver un error al eliminar una rutina, rutina no valida", async () => {
    await supertest(app)
      .delete("/routine/prueba_fallo")
      .set("Authorization", "Bearer " + token)
      .expect(404)
  });
});