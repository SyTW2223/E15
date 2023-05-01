import supertest from "supertest";
import { expect } from "chai";
import { app } from "../server/server";

const request = supertest(app);

describe("Gym API", () => {
  it("Debe devolver una lista de gimnasios", async () => {
    const response = await request.get("/gym");

    expect(response.status).to.equal(200);
  });
});