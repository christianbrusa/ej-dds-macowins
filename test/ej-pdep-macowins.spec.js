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

//Instancio pagos
const pagoDePruebaConEfectivo = new Efectivo();

//Instancio prendas
const camisaFloreada = new Prenda(4350, "Camisa", nueva);

//Instancio venta
const ventaPrueba = new Venta("25-10-2022", [{nombre: camisaFloreada, cantidad: 1}], pagoDePruebaConEfectivo);

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

describe("Se desea saber el monto total de una venta", () => {
    describe("- Si el pago se hizo en efectivo, no hay modificaciones sobre el total", () => {
        it("El total de una venta que contiene una camisa floreada nueva deberia ser: $4350", () => {
            ventaPrueba.montoTotal().should.be.eql(4350);
        });
    });
    describe("- Si el pago se hizo con tarjeta, se le aplica un recargo segun las cuotas seleccionadas (cantidad de cuotas * coeficiente fijo + 0.01 del valor de cada prenda)", () => {
        beforeEach(function() {
            ventaPrueba.tipoPago = new Tarjeta(3, 1.1);
        });
        it("El total de una venta que contiene una camisa floreada nueva, en tres cuotas y con un coeficiente del 1.1 deberia ser: $8746.8", () => {
            ventaPrueba.montoTotal().should.be.eql(8746.8);
        });
    });
});