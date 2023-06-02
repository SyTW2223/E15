import supertest from "supertest";
import { app } from "../server/server";

describe("Diet API", () => {

  let trial_diet = {
    id: "",
    name: "dieta de prueba",
    category: "prueba",
    author: "6439aa0ace6fbb3cd24a990f",
    breakfast: "Desayuno de prueba",
    lunch: "Almuerzo de prueba",
    snacks: "Merienda de prueba",
    dinner: "Cena de prueba",
    short_description: "Descripción corta de prueba",
    long_description: "Descripción larga de prueba",
    picture: "imagen de prueba",
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
    author : "6439aa0ace6fbb3cd24a990f",
  };

  it("Debe devolver una lista de las dietas", async () => {
    await supertest(app)
      .get("/diet")
      .expect(200)
  });
  

  it ("Debe crear una nueva dieta", async () => {
    await supertest(app)
      .post("/diet")
      .send(trial_diet)
      .expect(200)
  });

  it ("Debe devolver un error al crear una dieta, dieta no valida", async () => {
    await supertest(app)
      .post("/diet")
      .send(trial_diet2)
      .expect(500)
  });


  it("Debe devolver una dieta específica", async () => {
    await supertest(app)
    .get("/diet/" + trial_diet.name)
    .expect(200)
  });

  it("Debe devolver un error al buscar una dieta", async () => {
    await supertest(app)
    .get("/diet/prueba_fallo")
    .expect(404)
  });
  
  it("Debe actualizar una dieta", async () => {
    await supertest(app)
    .patch("/diet/" + trial_diet.name)
    .send({breakfast: "Desayuno de prueba actualizado"})
    .expect(200) 
  });

  it("Debe devolver un error al actualizar una dieta", async () => {
    await supertest(app)
    .patch("/diet/prueba_fallo")
    .send({breakfast: "Desayuno de prueba actualizado"})
    .expect(404)
  });
  
  
  it("Debe borrar una dieta", async () => {
    await supertest(app)
    .delete("/diet/" + trial_diet.name)
    .expect(200)
  });

  it("Debe devolver un error al borrar una dieta", async () => {
    await supertest(app)
    .delete("/diet/prueba_fallo")
    .expect(404)
  });
});