
/*Obtener los elementos del archivo HTML. */
const monto = document.getElementById('monto');
const tiempo = document.getElementById('tiempo');
const interes = document.getElementById('interes');
const btnCalcular = document.getElementById('btnCalcular');
const llenarTabla = document.querySelector('#lista-tabla tbody');


/* Agregar un detector de eventos al botón */
btnCalcular.addEventListener('click', () => {
    calcularCuota(monto.value, interes.value, tiempo.value);
})

function calcularCuota(monto, interes, tiempo){

    /* Eliminando todos los hijos de la tabla. */
    while(llenarTabla.firstChild){
        llenarTabla.removeChild(llenarTabla.firstChild);
    }

   /* Creando un arreglo de fechas. */
    let fechas = [];
    let fechaActual = Date.now();
    let mes_actual = moment(fechaActual);
    mes_actual.add(1, 'month');    

    /* Declarando tres variables. */
    let n_pago, pagoInteres=0, pagoCapital = 0, cuota = 0;

    /* Cálculo del pago mensual */
    cuota = monto * (Math.pow(1+interes/100, tiempo)*interes/100)/(Math.pow(1+interes/100, tiempo)-1);
    
   /* Cálculo de los pagos de capital e intereses de un préstamo.. */
    for(let i = 1; i <= tiempo; i++) {
        n_pago=i;
        pagoInteres = parseFloat(monto*(interes/100));
        pagoCapital = cuota - pagoInteres;
        monto = parseFloat(monto-pagoCapital);

        //Formato fechas
        fechas[i] = mes_actual.format('DD-MM-YYYY');
        mes_actual.add(1, 'month');

        /* Crear una nueva fila en la tabla */
        const row = document.createElement('tr');
        row.innerHTML = `
		    <td>${n_pago}</td>
            <td>${fechas[i]}</td>
            <td>${cuota.toFixed(2)}</td>
            <td>${pagoCapital.toFixed(2)}</td>
            <td>${pagoInteres.toFixed(2)}</td>
            <td>${monto.toFixed(2)}</td>
        `;
        llenarTabla.appendChild(row)
    }
}







