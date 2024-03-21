const ingresos = [
    new Ingreso('Salario', 2100.00),
    new Ingreso('Venta coche', 1500)
];

const gastos = [
    new gasto('Renta departamento', 900),
    new gasto('Ropa', 400)
];

let cargarApp = ()=>{
    cargarCabecero();
    cargarIngresos();
    cargargastos();
}

let totalIngresos = ()=>{
    let totalIngreso = 0;
    for(let ingreso of ingresos){
        totalIngreso += ingreso.valor;
    }
    return totalIngreso;
}

let totalgastos = ()=>{
    let totalgasto = 0;
    for(let gasto of gastos){
        totalgasto += gasto.valor;
    }
    return totalgasto;
}

let cargarCabecero = ()=>{
    let presupuesto = totalIngresos() - totalgastos();
    let porcentajegasto = totalgastos()/totalIngresos();
    document.getElementById('presupuesto').innerHTML = formatoMoneda(presupuesto);
    document.getElementById('porcentaje').innerHTML = formatoPorcentaje(porcentajegasto);
    document.getElementById('ingresos').innerHTML = formatoMoneda(totalIngresos());
    document.getElementById('gastos').innerHTML = formatoMoneda(totalgastos());
}

const formatoMoneda = (valor)=>{
    return valor.toLocaleString('es-ES',{style:'currency', currency:'EUR', minimumFractionDigits:2});
}

const formatoPorcentaje = (valor)=>{
    return valor.toLocaleString('en-US',{style:'percent', minimumFractionDigits:2});
}

const cargarIngresos = ()=>{
    let ingresosHTML = '';
    for(let ingreso of ingresos){
        ingresosHTML += crearIngresoHTML(ingreso);
    }
    document.getElementById('lista-ingresos').innerHTML = ingresosHTML;
}

const crearIngresoHTML = (ingreso)=>{
    let ingresoHTML = `
    <div class="elemento limpiarEstilos">
    <div class="elemento_descripcion">${ingreso.descripcion}</div>
    <div class="derecha limpiarEstilos">
        <div class="elemento_valor">+ ${formatoMoneda(ingreso.valor)}</div>
        <div class="elemento_eliminar">
            <button class='elemento_eliminar--btn'>
                <ion-icon name="close-circle-outline"
                onclick='eliminarIngreso(${ingreso.id})'></ion-icon>
            </button>
        </div>
    </div>
</div>
    `;
    return ingresoHTML;
}

const eliminarIngreso = (id)=>{
    let indiceEliminar = ingresos.findIndex( ingreso => ingreso.id === id);
    ingresos.splice(indiceEliminar, 1);
    cargarCabecero();
    cargarIngresos();
}

const cargargastos = ()=>{
    let gastosHTML = '';
    for(let gasto of gastos){
        gastosHTML += creargastoHTML(gasto);
    }
    document.getElementById('lista-gastos').innerHTML = gastosHTML;
}

const creargastoHTML = (gasto)=>{
    let gastoHTML = `
    <div class="elemento limpiarEstilos">
    <div class="elemento_descripcion">${gasto.descripcion}</div>
    <div class="derecha limpiarEstilos">
        <div class="elemento_valor">- ${formatoMoneda(gasto.valor)}</div>
        <div class="elemento_porcentaje">${formatoPorcentaje(gasto.valor/totalgastos())}</div>
        <div class="elemento_eliminar">
            <button class='elemento_eliminar--btn'>
                <ion-icon name="close-circle-outline"
                onclick='eliminargasto(${gasto.id})'></ion-icon>
            </button>
        </div>
    </div>
</div>
    `;
    return gastoHTML;
}

let eliminargasto = (id)=>{
    let indiceEliminar = gastos.findIndex(gasto => gasto.id === id);
    gastos.splice(indiceEliminar, 1);
    cargarCabecero();
    cargargastos();
}

let agregarDato = ()=>{
    let forma = document.forms['forma'];
    let tipo = forma['tipo'];
    let descripcion = forma['descripcion'];
    let valor = forma['valor'];
    if(descripcion.value !== '' && valor.value !== ''){
        if(tipo.value === 'ingreso'){
            ingresos.push( new Ingreso(descripcion.value, +valor.value));
            cargarCabecero();
            cargarIngresos();
        }
        else if(tipo.value === 'gasto'){
           gastos.push( new gasto(descripcion.value, +valor.value));
           cargarCabecero();
           cargargastos();
        }
    }
}