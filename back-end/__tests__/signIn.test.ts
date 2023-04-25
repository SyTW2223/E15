import supertest from "supertest";
import { expect } from "chai";
import { app } from "../server/server";

const request = supertest(app);

describe("SignIn API", () => {
  // TODO: Esto se cambia a fondo
  it("Loguearse en la aplicacion", async () => {
    const response = await request.post("/signIn");

    expect(response.status).to.equal(200);
    //expect(response.body.length).to.be.greaterThan(0);
  });
});