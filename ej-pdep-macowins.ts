class macowins {
  constructor(listadoDeVentas: Array){
    this.listadoDeVentas = listadoDeVentas;
  }
  
  obtenerGananciasDelDia(dia: string) {
    let gananciasTotal = 0;
    this.listadoDeVentas.forEach(venta => {
      if(venta.fecha === dia) {
        gananciasTotal += venta.montoTotal();
      }
    })
    return gananciasTotal;
  }
  
}

class Prenda {
  constructor(precioBase: number, tipo: string, estado: IEstado) {
    this.precioBase = precioBase;
    this.tipo = tipo;
    this.estado = estado;
  }
  
  precioFinal() {
    this.estado.precioFinal(this.precioBase);
  }
}

interface IEstado {
  precioFinal(precioBase: number) : number;
}

class Nueva implements IEstado {
  precioFinal(precioBase: number) {
    return precioBase;
  }
}

class Promocion implements IEstado {
  
  constructor(valorFijo: number) {
    this.valorFijo = valorFijo;
  }
  
  precioFinal(precioBase: number) {
    return precioBase - this.valorFijo;
  }
}

class Liquidacion implements IEstado {
  precioFinal(precioBase: number) {
    return precioBase / 2;
  }
}

class Venta {
  constructor(fecha: string, prendas: Array, tipoPago: ITipoPago) {
    this.fecha = fecha;
    this.prendas = prendas;
    this.tipoPago = tipoPago;
  }
  
  montoTotal() {
    let subtotal = 0;
    this.prendas.forEach(prenda => {
      subtotal += prenda.nombre.precioFinal() * prenda.cantidad;
    })
    return this.tipoPago.recargo(subtotal, this.prendas);
  }
}

interface ITipoPago {
  recargo(subtotal: number, prendasVendidas: Array) : number;
}

class Efectivo implements ITipoPago {
  recargo(subtotal: number, prendasVendidas: Array) {
   return subtotal;
  }
}

class Tarjeta implements ITipoPago {
  
  constructor(cantidadDeCuotas: number, coeficienteFijo: number) {
    this.coeficienteFijo = coeficienteFijo;
    this.cantidadDeCuotas = cantidadDeCuotas;
  }

  valorAgregado(prendasVendidas: Array) {
    let valorAgregadoTotal = 0;
    prendasVendidas.forEach(prenda => {
      valorAgregadoTotal += (prenda.nombre.precioFinal() * 1.01);
    })
    return valorAgregadoTotal;
  }
  
  recargo(subtotal: number, prendasVendidas: Array) {
    return subtotal + (this.coeficienteFijo * this.cantidadDeCuotas + this.valorAgregado(prendasVendidas));
  }
}

const estadoCamisaFloreada = new Nueva();
const estadoJean = new Promocion(1200);
const estadoSacoSlim = new Liquidacion();
const pagoDePruebaConEfectivo = new Efectivo();
const pagoDePruebaConTarjeta = new Tarjeta(3, 1.1);

const camisaFloreada = new Prenda(4350, "Camisa", estadoCamisaFloreada);
const jean = new Prenda(9000, "Pantalon", estadoJean);
const sacoSlim = new Prenda(11500, "Saco", estadoSacoSlim);
const ventaPrueba1 = new Venta("25-10-2022", [{nombre: camisaFloreada, cantidad: 1}, {nombre: jean, cantidad: 1}, {nombre: sacoSlim, cantidad: 2}], pagoDePruebaConTarjeta);
const ventaPrueba2 = new Venta("26-10-2022", [{nombre: camisaFloreada, cantidad: 1}], pagoDePruebaConTarjeta);
const ventaPrueba3 = new Venta("25-10-2022", [{nombre: camisaFloreada, cantidad: 1}], pagoDePruebaConEfectivo);

const listadoDeVentasPrueba = new macowins([ventaPrueba1, ventaPrueba2, ventaPrueba3]);

//Se desea saber el precio de venta de una prenda.
camisaFloreada.precioFinal();
jean.precioFinal();
sacoSlim.precioFinal();

//Se desea saber el tipo de una prenda.
camisaFloreada.tipo;
jean.tipo;
sacoSlim.tipo;

ventaPrueba1.montoTotal();
ventaPrueba2.montoTotal();
ventaPrueba3.montoTotal();

listadoDeVentasPrueba.obtenerGananciasDelDia("25-10-2022");