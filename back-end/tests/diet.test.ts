import supertest from "supertest";
import { expect } from "chai";
import { app } from "../server/server";

const request = supertest(app);

describe("Diet API", () => {

  it("Debe devolver una lista de las dietas", async () => {
    const response = await request.get("/diet");

    expect(response.status).to.equal(200);
  });
});