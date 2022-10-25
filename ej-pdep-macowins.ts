class Prenda {
  constructor(precioBase: number, tipo: string, estado: Estado) {
    this.precioBase = precioBase;
    this.tipo = tipo;
    this.estado = estado;
  }
  
  precioFinal() {
    this.estado.precioFinal(this.precioBase);
  }
}

interface Estado {
  precioFinal(precioBase: number) : number;
}

class Nueva implements Estado {
  precioFinal(precioBase: number) {
    return precioBase;
  }
}

class Promocion implements Estado {
  
  constructor(valorFijo: number) {
    this.valorFijo = valorFijo;
  }
  
  precioFinal(precioBase: number) {
    return precioBase - this.valorFijo;
  }
}

class Liquidacion implements Estado {
  precioFinal(precioBase: number) {
    return precioBase / 2;
  }
}

const estadoCamisaFloreada = new Nueva();
const estadoJean = new Promocion(1200);
const estadoSacoSlim = new Liquidacion();

const camisaFloreada = new Prenda(4350, "Camisa", estadoCamisaFloreada);
const jean = new Prenda(9000, "Pantalon", estadoJean);
const sacoSlim = new Prenda(11500, "Saco", estadoSacoSlim);

//Se desea saber el precio de venta de una prenda.
camisaFloreada.precioFinal();
jean.precioFinal();
sacoSlim.precioFinal();

//Se desea saber el tipo de una prenda.
camisaFloreada.tipo;
jean.tipo;
sacoSlim.tipo;