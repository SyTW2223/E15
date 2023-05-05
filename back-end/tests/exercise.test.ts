import supertest from "supertest";
import { expect } from "chai";
import { app } from "../server/server";
import { after } from "mocha";

const request = supertest(app);

describe("Exercise API", () => {
  it("Debe devolver una lista de ejercicios", async () => {
    const response = await request.get("/exercise");
    
    expect(response.status).to.equal(200);
  });

  it("Debe devolver un ejercicio específico", async () => { 
    const response = await request.get("/exercise/6442d4aa677db19baea771c1");
    
    expect(response.status).to.equal(200);
  });

  it("Debe crear un nuevo ejercicio", async () => {
    const response = await request.post("/exercise").send({
        id: "1",
        name: "Jalon al pecho",
        author: "Jose",
        short_description: "Jalar al pecho",
        long_description: "Tira de la barra hacia la parte superior del pecho mientras aprietas los omóplatos. Los codos deben moverse hacia abajo y no hacia atrás. De forma lenta y controlada, lleva la barra a la posición inicial estirando completamente los brazos y estirando los dorsales. Repite el proceso las veces indicadas.",
        initial_position: "Sentado con la espalda recta y agarrando el aparato par hacer el jalon, nunca moverse hacia adelante mantenerse firme",
        category: "Musculacion pecho",
        equipment_needed: true,
        picture: "algo",
        likes: 37,
        comments: []
    });

    expect(response.status).to.equal(200);
  });

  it("Debe actualizar un ejercicio", async () => {
    const response = await request.patch("/exercise/6442d4aa677db19baea771c1").send({
        id: "1",
        name: "Jalon al ganso", //TODO: jiji
    });
    expect(response.status).to.equal(200);
  });
});

// TODO: comprobar esto para que se haga bien (:
after(() => {
  process.exit(0);
});
