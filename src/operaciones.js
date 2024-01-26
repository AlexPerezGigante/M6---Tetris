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

	// “27 enero 2022 - 18:05:12”
	console.log("modificaData")
	const mes=["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre"]
	const fecha=(""+fechaStr[2]).substr(1) + " " + mes[fechaStr[1]-1] + " " + "20"+fechaStr[0] + " - " + fechaSplit[1]
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
