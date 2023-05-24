import supertest from "supertest";
import { expect } from "chai";
import { app } from "../server/server";

const request = supertest(app);

describe("User API", () => {
  it("Debe devolver una lista de usuarios", async () => {
    const response = await request.get("/user");

    expect(response.status).to.equal(200);
  });

  it("Debe devolver un usuario específico", async () => { 
    const response = await request.get("/user/6439aa0ace6fbb3cd24a990f");
    
    expect(response.status).to.equal(200);
  });

  it("Debe actualizar un usuario", async () => {
    const response = await request.patch("/user/6439aa0ace6fbb3cd24a990f").send({
        id: "1212121212",
    });
    expect(response.status).to.equal(200);
  });
});