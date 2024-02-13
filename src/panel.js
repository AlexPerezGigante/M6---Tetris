import { ModeloPieza } from "./clase";
import { models } from "./models";
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
    ]
    ,
    pintaPanel: () => {
        let html = ''

        panel.matriz.forEach((element, index) => {
            html+='<div class="d-flex m-0 col-12">'
            if(index!=0&&index!=21){
                element.forEach((celda, index) => {
                    if(index!=0&&index!=11){
                        //  console.log(celda)
                        if(celda==1){
                            html+='<div style=" width: 40px;  height: 40px;"  class="border border-light-subtle m-0 col-1 bg-danger"></div>'
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
        const modelo =  Math.floor(Math.random() * 6);
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
        for(let i=pieza.y;i<=pieza.y+(indiceY-1);i++){
            for(let longitud=pieza.x;longitud<=pieza.x+(indiceX-1);longitud++){
                panel.matriz[i][longitud]=pieza.matriz[piezaY][piezaX]
                piezaX=piezaX+1
            }
            piezaX=0;
            piezaY=piezaY+1
            
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
                if(pieza.matriz[piezaY][piezaX]==1){
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
        document.addEventListener("keydown", function(event) {
            switch (event.key) {
                case 'ArrowLeft':
                    panel.moverIzq()
                break;
                case 'ArrowUp':
                    panel.borrarPieza(panel.nuevaPieza)
                    panel.nuevaPieza.girar()
                    panel.insertarPieza(panel.nuevaPieza)
                    panel.pintaPanel()
                break;
                case 'ArrowRight':
                    panel.moverDra()
                break;
                case 'ArrowDown':
                    panel.bajar()
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
            
        }
        
    },
    moverDra:() =>{
        if(panel.nuevaPieza.x+panel.nuevaPieza.longitud<=10){
        panel.borrarPieza(panel.nuevaPieza)
        panel.nuevaPieza.x=panel.nuevaPieza.x+1
        console.log(panel.nuevaPieza.x)
        panel.insertarPieza(panel.nuevaPieza)
        panel.pintaPanel()
       
        }
    },
    bajar:() =>{
        // if(panel.nuevaPieza.y+panel.nuevaPieza.altura<=20){
            panel.borrarPieza(panel.nuevaPieza)
            // panel.nuevaPieza.y=panel.nuevaPieza.y+1
            const indiceY = panel.nuevaPieza.altura
            const indiceX = panel.nuevaPieza.longitud
            let piezaY = 0
            let piezaX = 0
            let ocupado = 0
            // let i=panel.nuevaPieza.y+indiceY-1
            
            // for(let longitud=panel.nuevaPieza.x;longitud<=panel.nuevaPieza.x+(indiceX-1);longitud++){
            //     console.log[piezaX]

            //     if(panel.matriz[i][longitud]==1){
            //         ocupado++
            //     }
            // }
            for(let longitud=panel.nuevaPieza.x;longitud<=panel.nuevaPieza.x+(indiceX-1);longitud++){
                piezaY=0;
                for(let index=panel.nuevaPieza.y;index<=panel.nuevaPieza.y+(indiceY-1);index++){
                    // if(panel.nuevaPieza.matriz[piezaY][piezaX]==1){
                    //     piezaY=piezaY+1;
                    //     panel.matriz[index][longitud]=0
                    // }
                    // console.log(panel.nuevaPieza.altura-1)
                    if(panel.nuevaPieza.matriz[piezaY][piezaX]==1){
                       
                        // if(piezaY==panel.nuevaPieza.altura-1){
                            if((panel.matriz[index+1][longitud])==1){
                                ocupado++
                            }
                            

                        // }
                        piezaY=piezaY+1;
                        console.log(index+1, longitud, piezaY, index, panel.nuevaPieza.altura-1, piezaX)
                        console.log(panel.matriz[index+1][longitud])
                    }else{
                        // console.log(panel.matriz[panel.nuevaPieza.Y+piezaY+1])
                        if((panel.matriz[index+piezaY][longitud])==1){
                            ocupado++
                        }
                    }
                    
                }
                piezaX=piezaX+1
            }
            // }
            console.log(ocupado)
            if(ocupado>0){
                panel.nuevaPieza = panel.crearNuevaPieza()
                // panel.nuevaPieza.y=panel.nuevaPieza.y-1
            }else{
                panel.nuevaPieza.y=panel.nuevaPieza.y+1
            }

            panel.insertarPieza(panel.nuevaPieza)
            panel.pintaPanel()
            
            
            
    },

    iniciarMovimiento:() =>{
        setInterval(panel.bajar, 1000)
    }
    
    
}