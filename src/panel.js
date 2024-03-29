import { ModeloPieza } from "./clase";
import { models } from "./models";
import { ranking } from "./vistas/ranking";
import { jugar } from "./vistas/jugar";
import { modificaNick, modificaData, modificaData2, insertaNuevaPartida } from "./operaciones";

let movimiento = ''
let modal
export const panel = {
    matriz: [
        [1,1,1,1,1,1,1,1,1,1,1,1],
        [1,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,1],
        [1,1,1,1,1,1,1,1,1,1,1,1]
    ],
    bg: [
        ["bg-primary"],
        ["bg-danger"],
        ["bg-success"],
        ["bg-warning"],
        ["bg-light"],
        ["bg-info"],
        ["bg-secondary"]
    ],
    puntos: 0,
    puntosNecesarios: 5000,
    nivel: 1,
    lineas: 0,
    piezasSiguientes: [
        [],
        [],
        []
    ],
    piezaGuardada: '',
    acabarPartida: 0,
    partida: 0,
    pintaPanel: () => {
        let html = ''

        panel.matriz.forEach((element, index) => {
            html+='<div class="d-flex m-0 col-12">'
            if(index!=0&&index!=21){
                element.forEach((celda, index) => {
                    if(index!=0&&index!=11){
                        //  console.log(celda)
                        if(celda>=1){
                            html+=`<div style=" width: 40px;  height: 40px;"  class="border border-light-subtle m-0 col-1 ${panel.bg[celda-1]}"></div>`
                        }else{
                        html+='<div style=" width: 40px;  height: 40px;"  class="border border-light-subtle m-0 col-1"></div>'
                        }
                    }
                });
            }
            // console.log('')
            html+='</div>'            
        });
        document.querySelector('#panel').innerHTML = html
        
    },
    crearNuevaPieza: ()  => {
        const modelo =  Math.floor(Math.random() * 7);
        const matriz = models[modelo][0]
        const longitud = matriz[0].length

        let x = Math.floor(Math.random() * 12-longitud);
        if(x<1){
            x=x+longitud+1;
        }
        let pieza = new ModeloPieza(modelo, x)
        return pieza
        
    },
    nuevaPieza: [
        
    ]
    ,
    insertarPieza: (pieza)  => {
        const x = pieza.x
        const y = pieza.y
        // console.log(pieza)
        const indiceY = pieza.altura
        const indiceX = pieza.longitud
        let piezaY = 0
        let piezaX = 0
        let error=0
        for(let i=pieza.y;i<=pieza.y+(indiceY-1);i++){
            for(let longitud=pieza.x;longitud<=pieza.x+(indiceX-1);longitud++){
                if(pieza.matriz[piezaY][piezaX]>=1){
                    if(panel.matriz[i][longitud]>=1){
                        error++
                        // console.log( i)
                    }
                }     
                piezaX=piezaX+1
            }
            piezaX=0;
            piezaY=piezaY+1
        }
        piezaY = 0
        piezaX = 0
        if(error==0){
            for(let i=pieza.y;i<=pieza.y+(indiceY-1);i++){
                for(let longitud=pieza.x;longitud<=pieza.x+(indiceX-1);longitud++){
                    if(pieza.matriz[piezaY][piezaX]>=1){
                        panel.matriz[i][longitud]=pieza.matriz[piezaY][piezaX]
                    }     
                    piezaX=piezaX+1
                }
                piezaX=0;
                piezaY=piezaY+1
            }  
            return true
            
        }else{
            
            if(pieza.y==1){
                // console.log(pieza.x, 11-pieza.longitud)
                if(pieza.x==0 || pieza.x==(11-pieza.longitud+1)){    
                }else{
                    panel.acabarPartida=1
                    console.log('Has perdido')
                    panel.abrirModal()
                    panel.guardarPartida()
                    panel.pararMovimiento()
                }
                
            }
            return false
        }
        

        // console.log(panel.matriz)
    },

    borrarPieza:(pieza) =>{
        const indiceY = pieza.altura
        const indiceX = pieza.longitud
        let piezaY = 0
        let piezaX = 0
        for(let i=pieza.y;i<=pieza.y+(indiceY-1);i++){
            for(let longitud=pieza.x;longitud<=pieza.x+(indiceX-1);longitud++){
                if(pieza.matriz[piezaY][piezaX]>=1){
                    panel.matriz[i][longitud]=0
                }
                piezaX=piezaX+1
            }
            piezaX=0;
            piezaY=piezaY+1
        }

        // console.log(panel.matriz)
    },

    controlTeclas:()=>{
        document.addEventListener("keydown", function(event){
            if(panel.acabarPartida==0){
                switch (event.key) {
                    case 'ArrowLeft':
                        event.preventDefault()
                        panel.moverIzq()
                        return false;
                    break;
                    case 'ArrowUp':
                        event.preventDefault()
                        panel.girar()
                        return false;
                    break;
                    case 'ArrowRight':
                        event.preventDefault()
                        panel.moverDra()
                        return false;
                    break;
                    case 'ArrowDown':
                        event.preventDefault()
                        panel.bajar()
                        panel.puntos++
                        panel.mostrarPuntos()
                        return false;
                    break;
                    case 'Control':
                        event.preventDefault()
                        panel.cambiarPieza()
                        return false
                    break;
                    case ' ':
                        event.preventDefault()
                        return false
                
                    default:
                        //   console.log(event.key)
                        
                    break;
                }
            } 
            
        })
    },

    moverIzq:() =>{
        panel.borrarPieza(panel.nuevaPieza)
        panel.nuevaPieza.x=panel.nuevaPieza.x-1
         

        const resul = panel.insertarPieza(panel.nuevaPieza)

        if(resul == true){
            panel.pintaPanel()
            panel.mostrarPuntos() 
            panel.subirNivel()
        }else{
            panel.nuevaPieza.x=panel.nuevaPieza.x+1
            panel.insertarPieza(panel.nuevaPieza)
        }
        
    },
    moverDra:() =>{
        
        panel.borrarPieza(panel.nuevaPieza)
        panel.nuevaPieza.x=panel.nuevaPieza.x+1
         

        const resul = panel.insertarPieza(panel.nuevaPieza)

        if(resul == true){
            panel.pintaPanel()
            panel.mostrarPuntos() 
            panel.subirNivel()
        }else{
            panel.nuevaPieza.x=panel.nuevaPieza.x-1
            panel.insertarPieza(panel.nuevaPieza)
        }
    },
    bajar:() =>{
                panel.borrarPieza(panel.nuevaPieza)
                panel.nuevaPieza.y=panel.nuevaPieza.y+1
             

            const resul = panel.insertarPieza(panel.nuevaPieza)

            if(resul == true){
                
                panel.pintaPanel()
                
            }else{
                panel.nuevaPieza.y=panel.nuevaPieza.y-1
                panel.insertarPieza(panel.nuevaPieza)
                panel.limpiarLineas()
                const piezaNueva = panel.crearNuevaPieza()
                panel.insertarPieza(panel.nuevaPieza)

                panel.nuevaPieza = panel.piezasSiguientes[0]
                panel.piezasSiguientes[0]=panel.piezasSiguientes[1]
                panel.piezasSiguientes[1]=panel.piezasSiguientes[2]
                panel.piezasSiguientes[2]=piezaNueva
                panel.mostrarPiezas()
                panel.puntos=panel.puntos+50
            }
            panel.mostrarPuntos() 
            panel.subirNivel()
            
    },
    girar:() =>{        
        panel.borrarPieza(panel.nuevaPieza)
        panel.nuevaPieza.girar()
         
        const resul = panel.insertarPieza(panel.nuevaPieza)

        if(resul == true){
            panel.pintaPanel()
            panel.mostrarPuntos() 
            panel.subirNivel()
        }else{
            if(panel.nuevaPieza.longitud==3){
                panel.nuevaPieza.x=panel.nuevaPieza.x-panel.nuevaPieza.longitud+2
            }else{
                panel.nuevaPieza.x=panel.nuevaPieza.x-panel.nuevaPieza.longitud+1
            }
            

            const resulPared = panel.insertarPieza(panel.nuevaPieza)

            if(resulPared == true){
                panel.pintaPanel()
                panel.mostrarPuntos() 
                panel.subirNivel() 
            }else{
                panel.nuevaPieza.x=panel.nuevaPieza.x+panel.nuevaPieza.longitud-1
                panel.nuevaPieza.girar()
                panel.nuevaPieza.girar()
                panel.nuevaPieza.girar()
                panel.insertarPieza(panel.nuevaPieza)
            }
            
        }
    },
    limpiarLineas:()=>{
        let hueco = 0
        let filas = 0
        let nuevoPanel=[
            // [1,1,1,1,1,1,1,1,1,1,1,1],
        ]
        
        
            panel.matriz.map((linea, index) =>{ 
                hueco = 0
                for (let x = 1; x <= 10; x++) {
                    if(linea[x]==0){
                         hueco++    
                    }
                }
                if(hueco==0 && index != 0 && index != 21){ 
                    filas++
                }else{
                    nuevoPanel.push(linea)
                }  
                })

                if(filas>=1){
                    panel.puntos=panel.puntos+100
                    panel.lineas = panel.lineas+filas
                    panel.mostrarLineas()
                    panel.mostrarPuntos()
                    nuevoPanel.reverse()
                    nuevoPanel.pop()
                    while(filas>0){
                        nuevoPanel.push([1,0,0,0,0,0,0,0,0,0,0,1])
                        filas--
                    }
                    nuevoPanel.push([1,1,1,1,1,1,1,1,1,1,1,1])
                    nuevoPanel.reverse()
                    panel.matriz = nuevoPanel
                }
    },

    mostrarPuntos:()=>{
        document.querySelector('#puntos').innerHTML = panel.puntos
        document.querySelector('#nivel').innerHTML = panel.nivel
    },

    mostrarLineas:()=>{
        document.querySelector('#lineas').innerHTML = panel.lineas
    },

    mostrarPiezas:()=>{
        let html =''
        // console.log(panel.piezasSiguientes)
        panel.piezasSiguientes.forEach((pieza) => {
            html += `<div class="piezaSiguiente m-2 ms-2 mt-1">
            `
            pieza.matriz.forEach((element) => {
                html+=`<div class="d-flex ms-3  ">`
                element.forEach((casilla) =>{
                    
                    if(casilla>=1){
                        html+=`<div style=" width: 30px;  height: 30px;"  class="border border-light-subtle m-0 col-6 ${panel.bg[casilla-1]}"></div>`
                    }else{
                        html+=`<div style=" width: 30px;  height: 30px;"  class=" m-0 col-6"></div>`
                    }
                })
                html+=`</div>`
                
            });
            html+=`
        </div>
        `
        });

        
        if(panel.piezaGuardada!=''){
            let htmlPiezaGuardada=''

            htmlPiezaGuardada += `<div class="piezaSiguiente m-2 ms-2 mt-1">
            `
            panel.piezaGuardada.matriz.forEach((element) => {
                htmlPiezaGuardada+=`<div class="d-flex ms-3  ">`
                element.forEach((casilla) =>{
                    // console.log(casilla)
                    if(casilla>=1){
                        htmlPiezaGuardada+=`<div style=" width: 40px;  height: 40px;"  class="border border-light-subtle m-0 col-6 ${panel.bg[casilla-1]}"></div>`
                    }else{
                        htmlPiezaGuardada+=`<div style=" width: 40px;  height: 40px;"  class=" m-0 col-6"></div>`
                    }
                })
                htmlPiezaGuardada+=`</div>`
                
            });
            

            document.querySelector('.piezaGuardada').innerHTML = htmlPiezaGuardada
        }
        
        document.querySelector('#piezaSiguiente').innerHTML = html
    },

    cambiarPieza:()=>{
        // console.log(panel.nuevaPieza)
        panel.borrarPieza(panel.nuevaPieza)
        // console.log(panel.matriz)
        if(panel.piezaGuardada==''){
            panel.piezaGuardada=panel.nuevaPieza
            panel.nuevaPieza = panel.piezasSiguientes[0]
            panel.nuevaPieza.y = panel.piezaGuardada.y
            panel.nuevaPieza.x = panel.piezaGuardada.x
            const resul = panel.insertarPieza(panel.nuevaPieza)

            if(resul == true){
                panel.pintaPanel()
                const piezaNueva = panel.crearNuevaPieza()
                panel.piezasSiguientes[0]=panel.piezasSiguientes[1]
                panel.piezasSiguientes[1]=panel.piezasSiguientes[2]
                panel.piezasSiguientes[2]=piezaNueva
            }else{
                panel.nuevaPieza=panel.piezaGuardada
                panel.piezaGuardada=''
                panel.insertarPieza(panel.nuevaPieza)
            }     
        }else{
            const aux = panel.nuevaPieza
            panel.nuevaPieza = panel.piezaGuardada
            panel.nuevaPieza.y = aux.y
            panel.nuevaPieza.x = aux.x
            panel.piezaGuardada = aux
            const resul = panel.insertarPieza(panel.nuevaPieza)
            if(resul == true){
                panel.pintaPanel()
                
            }else{
                panel.piezaGuardada=panel.nuevaPieza
                panel.nuevaPieza=aux
                panel.insertarPieza(panel.nuevaPieza)
            }
        }
        panel.mostrarPiezas()
    },

    subirNivel:() =>{
        if(panel.puntos>=panel.puntosNecesarios){
            const panelVacio = [
                [1,1,1,1,1,1,1,1,1,1,1,1],
                [1,0,0,0,0,0,0,0,0,0,0,1],
                [1,0,0,0,0,0,0,0,0,0,0,1],
                [1,0,0,0,0,0,0,0,0,0,0,1],
                [1,0,0,0,0,0,0,0,0,0,0,1],
                [1,0,0,0,0,0,0,0,0,0,0,1],
                [1,0,0,0,0,0,0,0,0,0,0,1],
                [1,0,0,0,0,0,0,0,0,0,0,1],
                [1,0,0,0,0,0,0,0,0,0,0,1],
                [1,0,0,0,0,0,0,0,0,0,0,1],
                [1,0,0,0,0,0,0,0,0,0,0,1],
                [1,0,0,0,0,0,0,0,0,0,0,1],
                [1,0,0,0,0,0,0,0,0,0,0,1],
                [1,0,0,0,0,0,0,0,0,0,0,1],
                [1,0,0,0,0,0,0,0,0,0,0,1],
                [1,0,0,0,0,0,0,0,0,0,0,1],
                [1,0,0,0,0,0,0,0,0,0,0,1],
                [1,0,0,0,0,0,0,0,0,0,0,1],
                [1,0,0,0,0,0,0,0,0,0,0,1],
                [1,0,0,0,0,0,0,0,0,0,0,1],
                [1,0,0,0,0,0,0,0,0,0,0,1],
                [1,1,1,1,1,1,1,1,1,1,1,1]
            ]

            panel.matriz = panelVacio
            panel.puntosNecesarios=panel.puntosNecesarios+5000
            panel.nivel++
            const piezaNueva = panel.crearNuevaPieza()

            panel.nuevaPieza = panel.piezasSiguientes[0]
            panel.piezasSiguientes[0]=panel.piezasSiguientes[1]
            panel.piezasSiguientes[1]=panel.piezasSiguientes[2]
            panel.piezasSiguientes[2]=piezaNueva
            panel.mostrarPiezas()
        }
    },
    segundos: 0,
    minutos: 0,
    reloj:'',
    contarReloj:()=>{
        if(panel.segundos<59){
            panel.segundos++
        }else{
            panel.segundos=0
            panel.minutos++
        }
        let html = ''
        if(panel.minutos<10){
           html +='0' + panel.minutos + ':'
        }
        else{
            html += panel.minutos + ':'
        }
        if(panel.segundos<10){
            html +='0' + panel.segundos
        }else{
            html += panel.segundos
        }
        

        document.querySelector('#tiempo').innerHTML = html

    },
    abrirModal:()=>{
        modal = new bootstrap.Modal('#exampleModal');
        modal.show();
    },
    quitarModal:()=>{
        // console.log(modal)
		modal.hide()
    },

    iniciarMovimiento:() =>{
        movimiento = setInterval(panel.bajar, 1000)
        panel.reloj = setInterval(panel.contarReloj, 1000)
    },
    
    pararMovimiento:()=>{
        clearInterval(movimiento)
        clearInterval(panel.reloj)
        // document.removeEventListener("keydown", panel.controlTeclas(), true)
    },
     guardarPartida:()=>{
        console.log('guardando')
        panel.pararMovimiento()
        document.querySelector('#formGuardar').classList.remove('d-none')
        panel.partida=0
        
        const botonEnviar = document.querySelector('#enviar')
        botonEnviar.addEventListener('click', () => {
            event.preventDefault()
            const nombre = document.querySelector('#nombre').value.toUpperCase()
            const puntos = panel.puntos
            // console.log(nombre, puntos)
            const fecha = new Date()

            const partida = {
                avatar : 'https://www.svgrepo.com/show/384669/account-avatar-profile-user-13.svg',
                nick : modificaNick(nombre) ,
                puntos : puntos,
                fecha : modificaData(modificaData2(fecha))
            }
            insertaNuevaPartida(partida)


             document.querySelector('main').innerHTML = ranking.template;
             ranking.script();

        })

        const botonCerrar = document.querySelector('#cerrar')
        botonCerrar.addEventListener('click', () => {
            // console.log('cerrando partida')
            panel.partida=0
            jugar.script()
        })
    }
    
}