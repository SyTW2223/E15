import supertest from "supertest";
import { expect } from "chai";
import { app } from "../server/server";

const request = supertest(app);

describe("Routine API", () => {
  it("Debe devolver una lista de rutinas", async () => {
    const response = await request.get("/routine");

    expect(response.status).to.equal(200);
  });

  it("Debe devolver una rutina específica", async () => { 
    const response = await request.get("/routine/64554733be32f08427b7d840");
    
    expect(response.status).to.equal(200);
  });

  it("Debe crear un nueva rutina", async () => {
    const response = await request.post("/routine").send({
      name: "Megamix",
      description: "Mega rutina",
      category: "Piernas",
      author: "Bruno",
      exercises: ["6442d4aa677db19baea771c1","6442d84b53af6d36441838c1","6442d88753af6d36441838c7"],
      equipment_needed: true,
      avg_duration: 3,
      reps: 4,
      sets: 2,
      picture: "Imagen",
      likes: 40,
      comments: []
    });

    expect(response.status).to.equal(200);
  });

  it("Debe actualizar un rutina", async () => {
    const response = await request.patch("/routine/64554733be32f08427b7d840").send({
        id: "1",
    });
    expect(response.status).to.equal(200);
  });

  // TODO: DELETE RUTINE
});