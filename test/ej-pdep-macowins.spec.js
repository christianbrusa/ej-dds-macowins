const {
    Macowins,
    Prenda,
    Nueva,
    Promocion,
    Liquidacion,
    Venta,
    Efectivo,
    Tarjeta
} = require("../tsc/ej-pdep-macowins.js");
require("should");

//Instancio estados
const nueva = new Nueva();
const promocion = new Promocion(1200);
const liquidacion = new Liquidacion();

//Instancio pagos
const pagoDePruebaConEfectivo = new Efectivo();
const pagoDePruebaConTarjeta = new Tarjeta(3, 1.1);

//Instancio prendas
const camisaFloreada = new Prenda(4350, "Camisa", nueva);

describe("Se desea saber el tipo de una prenda", () => {
    it("El de una camisa floreada deberia ser: 'Camisa'", () => {
        camisaFloreada.tipo.should.be.eql("Camisa");
    });
});