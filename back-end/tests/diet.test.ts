import supertest from "supertest";
import { app } from "../index";
import { describe } from "mocha";

describe("Diet API", () => {

  let trial_diet = {
    id: "",
    name: "dieta de prueba",
    category: "prueba",
    author: "64875cee47b25860b5b9301e",
    breakfast: "Desayuno de prueba",
    lunch: "Almuerzo de prueba",
    snacks: "Merienda de prueba",
    dinner: "Cena de prueba",
    short_description: "Descripción corta de prueba",
    long_description: "Descripción larga de prueba",
    picture: "",
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
    ]
  };

  let trial_diet2 = {
    id: "",
    name: "dieta de prueba 2",
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

  it("Debe devolver una lista de las dietas", async () => {
    await supertest(app)
      .get("/diet")
      .set("Authorization", "Bearer " + token)
      .expect(200)
  });
  

  it ("Debe crear una nueva dieta", async () => {
    await supertest(app)
      .post("/diet")
      .set("Authorization", "Bearer " + token)
      .send(trial_diet)
      .expect(200)
  });

  it ("Debe devolver un error al crear una dieta, dieta no valida", async () => {
    await supertest(app)
      .post("/diet")
      .set("Authorization", "Bearer " + token)
      .send(trial_diet2)
      .expect(500)
  });


  it("Debe devolver una dieta específica", async () => {
    await supertest(app)
    .get("/diet/" + trial_diet.name)
    .set("Authorization", "Bearer " + token)
    .expect(200)
  });

  it("Debe devolver un error al buscar una dieta", async () => {
    await supertest(app)
    .get("/diet/prueba_fallo")
    .set("Authorization", "Bearer " + token)
    .expect(404)
  });
  
  it("Debe actualizar una dieta", async () => {
    await supertest(app)
    .patch("/diet/" + trial_diet.name)
    .set("Authorization", "Bearer " + token)
    .send({breakfast: "Desayuno de prueba actualizado"})
    .expect(200) 
  });

  it("Debe devolver un error al actualizar una dieta", async () => {
    await supertest(app)
    .patch("/diet/prueba_fallo")
    .set("Authorization", "Bearer " + token)
    .send({breakfast: "Desayuno de prueba actualizado"})
    .expect(404)
  });
  
  
  it("Debe borrar una dieta", async () => {
    await supertest(app)
    .delete("/diet/" + trial_diet.name)
    .set("Authorization", "Bearer " + token)
    .expect(200)
  });

  it("Debe devolver un error al borrar una dieta", async () => {
    await supertest(app)
    .delete("/diet/prueba_fallo")
    .set("Authorization", "Bearer " + token)
    .expect(404)
  });
});