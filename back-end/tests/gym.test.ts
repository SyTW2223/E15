import supertest from "supertest";
import { app } from "../index";
import { describe } from "mocha";

describe("Gym API", () => {
  let trial_gym = {
    name: "gimnasio prueba",
    owner: "64875cee47b25860b5b9301e",
    latitude: 37.7749,
    longitude: -122.4194,
    address: "prueba",
    phone_number: "123456789",
    website: "prueba@gmail.com",
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
    picture: "",
    schedule: {
      monday: "8:00 - 20:00",
      tuesday: "8:00 - 20:00",
      wednesday: "8:00 - 20:00",
      thursday: "8:00 - 20:00",
      friday: "8:00 - 20:00",
      saturday: "8:00 - 20:00",
      sunday: "8:00 - 20:00"
    }};

  let trial_gym2 = {
    name: "gimnasio prueba 2",
    owner: "6439aa0ace6fbb3cd24a990f",
    latitude: 37.7749,
    longitude: -122.4194,
    picture: "",
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

  it ("Debe devolver una lista de gimnasios", async () => {
    await supertest(app)
      .get("/gym")
      .set("Authorization", "Bearer " + token)
      .expect(200)
  });

  it ("Debe crear un nuevo gimnasio", async () => {
    await supertest(app)
      .post("/gym")
      .set("Authorization", "Bearer " + token)
      .send(trial_gym)
      .expect(200)
  });

  // it ("Debe devolver un error al crear un gimnasio, gimnasio no valido", async () => {
  //   await supertest(app)
  //     .post("/gym")
  //     .send(trial_gym2)
  //     .expect(500)
  // });

  it ("Debe devolver un gimnasio especifico", async () => {
    await supertest(app)
      .get("/gym/" + trial_gym.name)
      .set("Authorization", "Bearer " + token)
      .expect(200)
  });

  it ("Debe devolver un error al buscar un gimnasio especifico, gimnasio no encontrado", async () => {
    await supertest(app)
      .get("/gym/gim_fallo")
      .set("Authorization", "Bearer " + token)
      .expect(404)
  });

  it ("Debe actualizar un gimnasio", async () => {
    await supertest(app)
      .patch("/gym/" + trial_gym.name)
      .set("Authorization", "Bearer " + token)
      .send({address: "prueba 2"})
      .expect(200)
  });

  it ("Debe devolver un error al actualizar un gimnasio, gimnasio no encontrado", async () => {
    await supertest(app)
      .patch("/gym/gim_fallo")
      .set("Authorization", "Bearer " + token)
      .send({address: "prueba 2"})
      .expect(404)
  });

  it ("Debe eliminar un gimnasio", async () => {
    await supertest(app)
      .delete("/gym/" + trial_gym.name)
      .set("Authorization", "Bearer " + token)
      .expect(200)
  });

  it ("Debe devolver un error al eliminar un gimnasio, gimnasio no encontrado", async () => {
    await supertest(app)
      .delete("/gym/gim_fallo")
      .set("Authorization", "Bearer " + token)
      .expect(404)
  });
});