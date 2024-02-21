import { ModeloPieza } from "./clase";
import { models } from "./models";
let movimiento = ''
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
    lineas: 0,
    piezasSiguientes: [],
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
                        console.log( i)
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
                    return false;
                break;
            
                default:
                    // console.log(event.key)
                    
                break;
            }
            
        })
    },

    moverIzq:() =>{
        panel.borrarPieza(panel.nuevaPieza)
        panel.nuevaPieza.x=panel.nuevaPieza.x-1
         

        const resul = panel.insertarPieza(panel.nuevaPieza)

        if(resul == true){
            panel.pintaPanel()
            panel.puntos=panel.puntos+10
            panel.mostrarPuntos() 
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
            panel.puntos=panel.puntos+10
            panel.mostrarPuntos() 
        }else{
            panel.nuevaPieza.x=panel.nuevaPieza.x-1
            panel.insertarPieza(panel.nuevaPieza)
        }
    },
    bajar:() =>{
            if(panel.nuevaPieza.y>0){
                panel.borrarPieza(panel.nuevaPieza)
                panel.nuevaPieza.y=panel.nuevaPieza.y+1
             }

            const resul = panel.insertarPieza(panel.nuevaPieza)

            if(resul == true){
                panel.pintaPanel()
                panel.puntos=panel.puntos+10
                panel.mostrarPuntos() 
            }else{
                panel.nuevaPieza.y=panel.nuevaPieza.y-1
                panel.insertarPieza(panel.nuevaPieza)
                panel.limpiarLineas()
                const piezaNueva = panel.crearNuevaPieza()

                panel.nuevaPieza = piezasSiguientes[0]
                piezasSiguientes[0]=piezasSiguientes[1]
                piezasSiguientes[1]=piezasSiguientes[2]
                piezasSiguientes[2]=piezaNueva
                panel.mostrarPiezas()
                panel.puntos=panel.puntos+50
            }
    },
    girar:() =>{        
        panel.borrarPieza(panel.nuevaPieza)
        panel.nuevaPieza.girar()
         

        const resul = panel.insertarPieza(panel.nuevaPieza)

        if(resul == true){
            panel.pintaPanel()
            panel.puntos=panel.puntos+20
            panel.mostrarPuntos() 
        }else{
            panel.nuevaPieza.girar()
            panel.nuevaPieza.girar()
            panel.nuevaPieza.girar()
            panel.insertarPieza(panel.nuevaPieza)
        }
    },
    limpiarLineas:()=>{
        let hueco = 0
        let filas = 0
        let nuevoPanel=[
            // [1,1,1,1,1,1,1,1,1,1,1,1],
        ]
        let panelMap
        
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
                    console.log(linea)
                }  
                })

                if(filas>=1){
                    panel.lineas = panel.lineas+filas
                    panel.mostrarLineas()
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
    },

    mostrarLineas:()=>{
        document.querySelector('#lineas').innerHTML = panel.lineas
    },

    mostrarPiezas:()=>{
        let html = `<div class="piezaSiguiente m-2 d-flex">
        `
        panel.piezasSiguientes.forEach((pieza, index) => {
            
            pieza.matriz.forEach(element => {
                console.log(element)
                if(element[index]>=1){
                    html+=`<div style=" width: 40px;  height: 40px;"  class="border border-light-subtle m-0 col-1 ${panel.bg[pieza.modelo-1]}"></div>`
                }
            });
            html+=`
        </div>
        `
            
        });
        
        document.querySelector('#piezaSiguiente').innerHTML = html
    },

    iniciarMovimiento:() =>{
        movimiento = setInterval(panel.bajar, 1000)
    },
    
    pararMovimiento:()=>{
        clearInterval(movimiento)
    },
 
}