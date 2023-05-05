import supertest from "supertest";
import { expect } from "chai";
import { app } from "../server/server";

const request = supertest(app);

describe("Gym API", () => {
  it("Debe devolver una lista de gimnasios", async () => {
    const response = await request.get("/gym");

    expect(response.status).to.equal(200);
  });

  it("Debe crear un nuevo gimnasio", async () => {
    const response = await request.post("/gym").send({
        name: "Gymnasio Royale",
        owner: "Bruno",
        latitude: 37.7749,
        longitude: -122.4194,
        address: "santa cruz",
        phone_number: "123456789",
        website: "si",
        likes: 10,
        comments: [
            {
              username: "Usuario 1",
              comment: "Este ejercicio es genial!"
            },
            {
              username: "Usuario 2",
              comment: "Me encanta este ejercicio!"
            }
          ],
        picture: "cosa",
        schedule: {
          monday: "8:00 AM - 9:00 PM",
          tuesday: "8:00 AM - 9:00 PM",
          wednesday: "8:00 AM - 9:00 PM",
          thursday: "8:00 AM - 9:00 PM",
          friday: "8:00 AM - 9:00 PM",
          saturday: "10:00 AM - 6:00 PM",
          sunday: "10:00 AM - 6:00 PM"
        }
      });
    });

    it("Debe buscar un gimnasio por id", async() =>{
      const response = await request.get("/gym/64554b77d5be2441bce44496");
      expect(response.status).to.equal(200);
    });

    it("Debe actualizar un gimnasio", async() =>{
      const response = await request.patch("/gym/64554b77d5be2441bce44496").send({
        id:"1",
        name: "Gimnasio Bros",
      });
      expect(response.status).to.equal(200);
    });

    //TODO: Eliminar un gimnasio
});