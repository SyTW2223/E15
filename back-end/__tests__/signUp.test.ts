import supertest from "supertest";
import { expect } from "chai";
import { app } from "../server/server";

const request = supertest(app);

describe("signUp API", () => {
  // TODO: Esto se cambia a fondo
  it("Registrarse en la aplicación", async () => {
    const response = await request.get("/signUp");

    expect(response.status).to.equal(200);
  });
});