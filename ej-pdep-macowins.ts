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
    console.log(precioBase);
  }
}

class Liquidacion implements Estado {
  precioFinal(precioBase: number) {
    console.log(precioBase / 2);
  }
}

const estadoCamisaFloreada = new Nueva();

const camisaFloreada = new Prenda(4350, "Camisa", estadoCamisaFloreada);

//Se desea saber el precio de venta de una prenda.
camisaFloreada.precioFinal();