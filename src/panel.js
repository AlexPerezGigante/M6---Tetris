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
                    panel.borrarPieza(panel.nuevaPieza)
                    panel.nuevaPieza.girar()
                    panel.insertarPieza(panel.nuevaPieza)
                    panel.pintaPanel()
                    panel.puntos=panel.puntos+20
                    panel.mostrarPuntos()
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
        if(panel.nuevaPieza.x>1){
            panel.borrarPieza(panel.nuevaPieza)
            panel.nuevaPieza.x=panel.nuevaPieza.x-1
            console.log(panel.nuevaPieza.x)
            panel.insertarPieza(panel.nuevaPieza)
            panel.pintaPanel()
            panel.puntos=panel.puntos+10
            panel.mostrarPuntos()
            
        }
        
    },
    moverDra:() =>{
        if(panel.nuevaPieza.x+panel.nuevaPieza.longitud<=10){
        panel.borrarPieza(panel.nuevaPieza)
        panel.nuevaPieza.x=panel.nuevaPieza.x+1
        console.log(panel.nuevaPieza.x)
        panel.insertarPieza(panel.nuevaPieza)
        panel.pintaPanel()
        panel.puntos=panel.puntos+10
        panel.mostrarPuntos()
        }
    },
    bajar:() =>{
        // if(panel.nuevaPieza.y+panel.nuevaPieza.altura<=20){
             if(panel.nuevaPieza.y>0){
                panel.borrarPieza(panel.nuevaPieza)
                panel.nuevaPieza.y=panel.nuevaPieza.y+1
             }
            // const indiceY = panel.nuevaPieza.altura
            // const indiceX = panel.nuevaPieza.longitud
            // let piezaY = 0
            // let piezaX = 0
            // let ocupado = 0
            // for(let longitud=panel.nuevaPieza.x;longitud<=panel.nuevaPieza.x+(indiceX-1);longitud++){
            //     piezaY=0;
            //     for(let index=panel.nuevaPieza.y;index<=panel.nuevaPieza.y+(indiceY-1);index++){
            //         if(panel.nuevaPieza.matriz[piezaY][piezaX]>=1){
            //             if((panel.matriz[index+1][longitud])>=1){
            //                 ocupado++
            //             }else{
            //                 piezaY=piezaY+1;
            //             }
            //         }else{
            //             // if(panel.nuevaPieza.matriz[piezaY][piezaX]==0 && panel.nuevaPieza.matriz[piezaY+1][piezaX]==0){
            //             //     if((panel.matriz[index][longitud])>=1){  
            //             //         ocupado++
            //             //     }else{
            //             //         piezaY++;
            //             //     }
            //             // }else{
            //                 if((panel.matriz[index][longitud])>=1){  
            //                     ocupado++
            //                 }else{
            //                     piezaY++;
            //                 }
            //             // }
                        
            //         }
            //     }
            //     piezaX=piezaX+1
            // }
            // if(ocupado>0){
            //     panel.insertarPieza(panel.nuevaPieza)
            //     const piezaNueva = panel.crearNuevaPieza()
            //     panel.nuevaPieza = piezaNueva
            //     panel.puntos=panel.puntos+50
            // }else{
            //     panel.nuevaPieza.y=panel.nuevaPieza.y+1
            //     panel.puntos=panel.puntos+10
            // }

            
            const resul = panel.insertarPieza(panel.nuevaPieza)

            if(resul == true){
                panel.pintaPanel()
                panel.puntos=panel.puntos+10
                panel.mostrarPuntos() 
            }else{
                panel.nuevaPieza.y=panel.nuevaPieza.y-1
                panel.insertarPieza(panel.nuevaPieza)
                const piezaNueva = panel.crearNuevaPieza()
                panel.nuevaPieza = piezaNueva
                panel.puntos=panel.puntos+50
            }
    },

    mostrarPuntos:()=>{
        document.querySelector('#puntos').innerHTML = panel.puntos
    },

    iniciarMovimiento:() =>{
        movimiento = setInterval(panel.bajar, 1000)
    },
    
    pararMovimiento:()=>{
        clearInterval(movimiento)
    },
 
}