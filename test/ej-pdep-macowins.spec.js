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
const jean = new Prenda(9000, "Pantalon", estadoJean);
const sacoSlim = new Prenda(11500, "Saco", estadoSacoSlim);

//Instancio ventas
const ventaPrueba1 = new Venta("25-10-2022", [{nombre: camisaFloreada, cantidad: 1}, {nombre: jean, cantidad: 1}, {nombre: sacoSlim, cantidad: 2}], pagoDePruebaConTarjeta);
const ventaPrueba2 = new Venta("26-10-2022", [{nombre: camisaFloreada, cantidad: 1}], pagoDePruebaConTarjeta);
const ventaPrueba3 = new Venta("25-10-2022", [{nombre: camisaFloreada, cantidad: 1}], pagoDePruebaConEfectivo);

//Instancio listado de ventas
const listadoDeVentasPrueba = new Macowins([ventaPrueba1, ventaPrueba2, ventaPrueba3]);