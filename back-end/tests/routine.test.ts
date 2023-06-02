import supertest from "supertest";
import { app } from "../server/server";

describe("Routine API", () => {
  let trial_routine = {
    id: "",
    name: "rutina de prueba",
    description: "Descripción de prueba",
    category: "prueba",
    author: "6439aa0ace6fbb3cd24a990f",
    exercises: ["6442d4aa677db19baea771c1","6442d84b53af6d36441838c1","6442d88753af6d36441838c7"],
    equipment_needed: true,
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
    picture: "imagen de prueba"
  };

  let trial_routine2 = {
    id: "",
    name: "rutina de prueba 2",
    category: "prueba",
    author : "6439aa0ace6fbb3cd24a990f",
  };

  it ("Debe devolver una lista de las rutinas", async () => {
    await supertest(app)
      .get("/routine")
      .expect(200)
  });

  it ("Debe crear una nueva rutina", async () => {
    await supertest(app)
      .post("/routine")
      .send(trial_routine)
      .expect(200)
  });

  it ("Debe devolver un error al crear una rutina, rutina no valida", async () => {
    await supertest(app)
      .post("/routine")
      .send(trial_routine2)
      .expect(500)
  });

  it ("Debe devolver una rutina específica", async () => {
    await supertest(app)
      .get("/routine/" + trial_routine.name)
      .expect(200)
  });

  it ("Debe devolver un error al buscar una rutina, rutina no valida", async () => {
    await supertest(app)
      .get("/routine/prueba_fallo")
      .expect(404)
  });

  it ("Debe actualizar una rutina", async () => {
    await supertest(app)
      .patch("/routine/" + trial_routine.name)
      .send({ description: "Descripción de prueba actualizada" })
      .expect(200)
  });

  it ("Debe devolver un error al actualizar una rutina, rutina no valida", async () => {
    await supertest(app)
      .patch("/routine/prueba_fallo")
      .send({ description: "Descripción de prueba actualizada"})
      .expect(404)
  });

  it ("Debe eliminar una rutina", async () => {
    await supertest(app)
      .delete("/routine/" + trial_routine.name)
      .expect(200)
  });

  it ("Debe devolver un error al eliminar una rutina, rutina no valida", async () => {
    await supertest(app)
      .delete("/routine/prueba_fallo")
      .expect(404)
  });
});