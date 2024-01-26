export function modificaNick(nick){
	if(nick==""){
		//alert("El nick no pot estar en blanc")
		return(null)
	}
	else{
        
        let nuevoNick=nick.trim().replaceAll(" ","_")
		nuevoNick=nuevoNick.toUpperCase()
		return(nuevoNick)
	}
}
export function modificaData(data){
    const fechaSplit=data.split("T")
    const fechaStr=fechaSplit[0].split("/")
    let dia
    if(fechaStr[2]<10){
        dia= fechaStr[2].substring(1)
    }
    else{
        dia=fechaStr[2]
    }

	// “27 enero 2022 - 18:05:12”
	console.log("modificaData")
	const mes=["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre"]
	const fecha=dia + " " + mes[fechaStr[1]-1] + " " + "20"+fechaStr[0] + " - " + fechaSplit[1]
	return(fecha)
}
export function modificaData2(objectedata){
    const data = ""+objectedata
    const datasplit = data.split(" ")
	const fecha=(""+objectedata.getFullYear()).substr(2)+"/"+(objectedata.getMonth()+1)+"/"+datasplit[2]+"T"+datasplit[4]
	return(fecha)
}
export function dias(dataText){
	// 2023-09-17T03:24:00
    const dataSplit = dataText.split("T")
	const fechaStr=dataSplit[0].split("/")
	const fecha=+fechaStr[0]+"-"+fechaStr[1]+"-"+fechaStr[2] + "T" + dataSplit[1]

	const miData = new Date(fecha)
	if(isNaN(miData.getTime())){
		return  {
			error: true,
			missatge: "El format no és correcte"
		}
	}
	

	const fechaActual = new Date()
	const diferencia=fechaActual.getTime()- miData.getTime()

	const diasTranscurridos=diferencia/86400000
	return(Math.floor(diasTranscurridos))

    
    
}

// Array de objetos con los registros de los objetos
export const partidas = [
    {
        avatar: "https://www.svgrepo.com/show/384669/account-avatar-profile-user-13.svg",
        nick: "ANDER",
        puntos: 10,
        fecha: "13 ABRIL 2023",
    },
    {
        avatar: "https://www.svgrepo.com/show/384669/account-avatar-profile-user-13.svg",
        nick: "ANDER",
        puntos: 600,
        fecha: "13 FEBRERO 2023",
    },
    {
        avatar: "https://www.svgrepo.com/show/384669/account-avatar-profile-user-13.svg",
        nick: "MIKE",
        puntos: 888,
        fecha: "1 ENERO 2023",
    },
];
// Objeto con un registro nuevo
 export const datosPartida = {
    avatar: "https://www.svgrepo.com/show/384672/account-avatar-profile-user-7.svg",
    nick: "MANUEL",
    puntos: 100,
    fecha: "21 MAYO 2023",
};

// Esta función recibe los datos nuevos y los mete en el array de objetos
export function insertaNuevaPartida(datosPartida) {
    console.log("Guardando partida...");
    console.log(datosPartida);
    partidas.push(datosPartida);
    console.log(partidas);
}

// Esta función nos dice si queremos guardar la partida, si la queremos guardar
//  llamará a la función que mete los datos en el array de objetos y luego llamará a la función que pinta las tablas. Si no solo mostrará un mensaje por consola
export function pintaDatosPartida(partidas) {
    if (confirm("Guardar partida?") == true) {
        insertaNuevaPartida(partidas);
    } else {
        console.log("No has guardado la partida!");
    }
}

export function buscador(texto){
    if(texto!=''){
        const nombre = texto.toUpperCase()
        console.log(nombre)
        const busqueda = partidas.filter((element) => {
            return element.nick==nombre
        })
    return busqueda
    }
    else{
        return partidas
    }
}

export function orden(campo, tipo){
    let array
    switch(campo){
        case 'nick':
            array = partidas.sort((a,b) => a.nick.localeCompare(b.nick))
            if(tipo=='up'){
                console.log('Ordenado')
            }
            else{
                console.log('desordenado')
                array = array.reverse()
            }
        break
        case 'puntuacion':
            
            if(tipo=='up'){
                console.log('Ordenado')
                array = partidas.sort((element, registro) => element.puntos - registro.puntos)
            }
            else{
                console.log('desordenado')
                array = partidas.sort((element, registro) => registro.puntos - element.puntos)
            }
        break
        case 'fecha':
            array = modificaData3('up')
            array = array.sort((a,b)=>a.getTime()-b.getTime());
            const arrayFecha = []
            const arrayOrdenado = []

            array.forEach(element => {
                // const dateString = element.toISOString()
                // console.log('element: ', dateString.slice(0, dateString.length - 1))
                let dateTransformado = modificaData2(element)
                dateTransformado = modificaData(dateTransformado)
                dateTransformado = dateTransformado.split('-')[0].trim()
                dateTransformado = dateTransformado.split(' ')
                dateTransformado = '' + dateTransformado[0] + ' ' + dateTransformado[1].toUpperCase() + ' ' + dateTransformado[2]
                arrayFecha.push(dateTransformado)
                
            });
            console.log(arrayFecha)
            arrayFecha.forEach((element, index) => {
                console.log('index: ', index)
                partidas.forEach(array => {
                    if(element==array.fecha){
                        arrayOrdenado.push(array)
                    }
                });
                
            });
            console.log('array arrayOrdenado: ',arrayOrdenado)
            array = arrayOrdenado

            if(tipo=='up'){
                console.log('Ordenado')
            }
            else{
                console.log('desordenado')
                array = array.reverse()
            }
        break
    }
    console.log('array ordenado: ',array)
    return array
}

export function modificaData3(type){
    // Conseguimos un array solo de fechas 1 ENERO 2023
    const data =  partidas.map((element) =>{
        return element.fecha
    })
    console.log('data: ',data)
    const arrayFecha=[]
    data.forEach(element => {
        const division = element.split(' ')
        const dia = division[0]
        const mes = division[1]
        const year = division[2]

        const arrayMes=["ENERO","FEBRERO","MARZO","ABRIL","MAYO","JUNIO","JULIO","AGOSTO","SEPTIEMBRE","OCTUBRE","NOVIEMBRE","DICIEMBRE"]
        let diaMes=''
        let fecha=''

        arrayMes.forEach((element, index) => {
            if(mes==element){

                diaMes=index+1
                fecha =year + '-'
                if(diaMes<10){
                    fecha += '0' + diaMes + '-'
                }
                else{
                    fecha += diaMes + '-'
                }
                if(dia<10){
                    fecha += '0' + dia + 'T00:00:00'
                }
                else{
                    fecha += dia + 'T00:00:00'
                }
                const fechaDate=new Date(fecha)
                arrayFecha.push(fechaDate)
            }
        });
    });
    return(arrayFecha)
    
}