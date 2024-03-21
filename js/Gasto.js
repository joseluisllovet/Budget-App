class gasto extends Dato{
    static contadorgastos = 0;

    constructor(descripcion, valor){
        super(descripcion, valor);
        this._id = ++gasto.contadorgastos;
    }
    get id(){
        return this._id;
    }
}