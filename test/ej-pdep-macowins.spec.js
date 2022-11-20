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

describe("Se desea saber el precio de venta de una prenda", () => {
    describe("- Si se encuentra nueva, deberia ser igual al precio base", () => {
        it("El precio de la camisa floreada deberia ser: $4350", () => {
            camisaFloreada.precioFinal().should.be.eql(4350);
        });
    });
    describe("- Si se encuentra en promoción, deberia ser igual al precio base menos el valor fijo decicido por el usuario", () => {
        beforeEach(function() {
            camisaFloreada.estado = new Promocion(1400);
        });
        it("El valor fijo de promoción es de $1400 por lo que el precio de la camisa floreada deberia ser: $2950", () => {
            camisaFloreada.precioFinal().should.be.eql(2950);
        });
    });
    describe("- Si se encuentra en liquidación, deberia ser la mitad de su precio base", () => {
        beforeEach(function() {
            camisaFloreada.estado = new Liquidacion();
        });
        it("El precio de la camisa floreada deberia ser: $2175", () => {
            camisaFloreada.precioFinal().should.be.eql(2175);
        });
    });
});