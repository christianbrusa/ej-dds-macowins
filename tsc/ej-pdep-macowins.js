var Macowins = /** @class */ (function () {
    function Macowins(listadoDeVentas) {
        this.listadoDeVentas = listadoDeVentas;
    }
    Macowins.prototype.obtenerGananciasDelDia = function (dia) {
        var gananciasTotal = 0;
        this.listadoDeVentas.forEach(function (venta) {
            if (venta.fecha === dia) {
                gananciasTotal += venta.montoTotal();
            }
        });
        return gananciasTotal;
    };
    return Macowins;
}());
var Prenda = /** @class */ (function () {
    function Prenda(precioBase, tipo, estado) {
        this.precioBase = precioBase;
        this.tipo = tipo;
        this.estado = estado;
    }
    Prenda.prototype.precioFinal = function () {
        return this.estado.precioFinal(this.precioBase);
    };
    return Prenda;
}());
var Nueva = /** @class */ (function () {
    function Nueva() {
    }
    Nueva.prototype.precioFinal = function (precioBase) {
        return precioBase;
    };
    return Nueva;
}());
var Promocion = /** @class */ (function () {
    function Promocion(valorFijo) {
        if(valorFijo < 0) {
            throw new Error("El valor fijo de promoción debe ser mayor o igual a cero");
        }
        this.valorFijo = valorFijo;
    }
    Promocion.prototype.precioFinal = function (precioBase) {
        return precioBase - this.valorFijo;
    };
    return Promocion;
}());
var Liquidacion = /** @class */ (function () {
    function Liquidacion() {
    }
    Liquidacion.prototype.precioFinal = function (precioBase) {
        return precioBase / 2;
    };
    return Liquidacion;
}());
var Venta = /** @class */ (function () {
    function Venta(fecha, prendas, tipoPago) {
        this.fecha = fecha;
        this.prendas = prendas;
        this.tipoPago = tipoPago;
    }
    Venta.prototype.montoTotal = function () {
        var subtotal = 0;
        this.prendas.forEach(function (prenda) {
            subtotal += prenda.nombre.precioBase * prenda.cantidad;
        });
        return this.tipoPago.recargo(subtotal, this.prendas);
    };
    return Venta;
}());
var Efectivo = /** @class */ (function () {
    function Efectivo() {
    }
    Efectivo.prototype.recargo = function (subtotal, prendasVendidas) {
        return subtotal;
    };
    return Efectivo;
}());
var Tarjeta = /** @class */ (function () {
    function Tarjeta(cantidadDeCuotas, coeficienteFijo) {
        if(coeficienteFijo < 0) {
            throw new Error("El coeficiente fijo debe ser mayor o igual a cero");
        }
        if(cantidadDeCuotas < 1) {
            throw new Error("La cantidad de cuotas debe ser mayor o igual a uno");
        }
        this.coeficienteFijo = coeficienteFijo;
        this.cantidadDeCuotas = cantidadDeCuotas;
    }
    Tarjeta.prototype.valorAgregado = function (prendasVendidas) {
        var valorAgregadoTotal = 0;
        prendasVendidas.forEach(function (prenda) {
            valorAgregadoTotal += (prenda.nombre.precioBase * 1.01);
        });
        return valorAgregadoTotal;
    };
    Tarjeta.prototype.recargo = function (subtotal, prendasVendidas) {
        return subtotal + (this.coeficienteFijo * this.cantidadDeCuotas + this.valorAgregado(prendasVendidas));
    };
    return Tarjeta;
}());

module.exports = {
    Macowins,
    Prenda,
    Nueva,
    Promocion,
    Liquidacion,
    Venta,
    Efectivo,
    Tarjeta
};