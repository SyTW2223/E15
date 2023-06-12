import supertest from "supertest";
import { app } from "../index";

const request = supertest(app);

describe("SignIn API", () => {
  /*
  // TODO: Esto se cambia a fondo
  it("Loguearse en la aplicacion", async () => {
    const response = await request.post("/signIn").send({
      email: "alu0101123677@ull.edu.es",
      password: "aragon",
    });

    expect(response.status).to.equal(200);
    //expect(response.body.length).to.be.greaterThan(0);
  });
  */
});