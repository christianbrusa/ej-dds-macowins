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
const estadoCamisaFloreada = new Nueva();
const estadoJean = new Promocion(1200);
const estadoSacoSlim = new Liquidacion();

//Instancio pagos
const pagoDePruebaConEfectivo = new Efectivo();
const pagoDePruebaConTarjeta = new Tarjeta(3, 1.1);

//Instancio prendas
const camisaFloreada = new Prenda(4350, "Camisa", estadoCamisaFloreada);

describe("Se desea saber el tipo de una prenda", () => {
    it("El de una camisa floreada deberia ser: 'Camisa'", () => {
        camisaFloreada.tipo.should.be.eql("Camisa");
    });
});