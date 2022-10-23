class Prenda {
  constructor(precioBase: number, tipo: string, estado: Estado) {
    this.precioBase = precioBase;
    this.tipo = tipo;
    this.estado = estado;
  }
  
  precioFinal() {
    
  }
}

interface Estado {
  precioFinal(precioBase: number) : number;
}