import supertest from "supertest";
import { expect } from "chai";
import { app } from "../server/server";

const request = supertest(app);

describe("Exercise API", () => {
  it("Debe devolver una lista de ejercicios", async () => {
    const response = await request.get("/exercise");

    expect(response.status).to.equal(200);
    //expect(response.body.length).to.be.greaterThan(0);
  });

/*   it("Debe devolver un usuario específico", async () => {
    const response = await request.get("/api/usuarios/1");

    expect(response.status).to.equal(200);
    expect(response.body.id).to.equal(1);
  });

  it("Debe crear un nuevo usuario", async () => {
    const response = await request.post("/api/usuarios").send({
      nombre: "Juan",
      edad: 30,
    });

    expect(response.status).to.equal(201);
    expect(response.body.id).to.be.a("number");
  }); */
  
});