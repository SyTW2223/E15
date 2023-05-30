import supertest from "supertest";
import { expect } from "chai";
import { app } from "../server/server";

//const request = supertest(app);

describe("Diet API", () => {
  it("Debe devolver una lista de las dietas", async () => {
    await supertest(app)
      .get("/diet")
      .expect(200)
      
  });

  /*
   it("Debe devolver una lista de las dietas", async () => {
    const response = await request.get("/diet");

    expect(response.status).to.equal(200);
  });

  it("Debe devolver una dieta específica", async () => { 
    const response = await request.get("/diet/64554a87816a9a6f3289fa55");
    
    expect(response.status).to.equal(200);
  });

  it("Debe crear una nueva dieta", async () => {
    const response = await request.post("/diet").send({
        id: "",
        name: "Baja calorica",
        category: "Dieta para bajar de peso",
        author: "Bruno",
        breakfast: "Tostadas de aguacate con pimienta y sal",
        lunch: "Pollo a la plancha con verduras al gusto y una pequeña porcion de arroz o papas guisadas",
        snacks: "pieza de fruta o frutos secos",
        dinner: "tortilla francesa con dos huevos",
        short_description: "Dieta sencilla para una baja de peso progresiva y saludable",
        long_description: "Dieta no estricta para un estilo de vida saludable y una baja de peso progresiva, recuerda siempre llevar un consumo de agua adecuado y realizar actividades fisicas de su preferencia",
        picture: "siguiendolasdietitas.jpg",
        likes: 69,
        comments: []
    });

    expect(response.status).to.equal(200);
  });

  it("Debe actualizar una dieta", async () => {
    const response = await request.patch("/diet/64554a87816a9a6f3289fa55").send({
        id: "1212121212",
        name: "Esta dieta no se borra", 
    });
    expect(response.status).to.equal(200);
  }); */
});

/* // TODO: comprobar esto para que se haga bien (:
after(() => {
  process.exit(0);
});
 */