import supertest from "supertest";
import { expect } from "chai";
import { app } from "../server/server";

const request = supertest(app);

describe("Routine API", () => {
  it("Debe devolver una lista de rutinas", async () => {
    const response = await request.get("/routine");

    expect(response.status).to.equal(200);
    //expect(response.body.length).to.be.greaterThan(0);
  });
});