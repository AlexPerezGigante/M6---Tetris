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
                        // console.log(celda)
                        html+='<div style=" width: 40px;  height: 40px;"  class="border border-light-subtle m-0 col-1""></div>'
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
        const modelo = pieza.martiz
        const x = pieza.x
        const y = pieza.y
        // const longitud = modelo.lenght
        const panelTablero = panel.matriz
        let indiceY = 0
        let indiceX = 0
        let array =''
        console.log(modelo)
        panelTablero.forEach((element, index) => {
            if(index==y){
                element.forEach((index) => {
                        if(index==x){
                            // element[y][index]=modelo[indiceY][indiceX]
                        }else{
                            // element[y][index]=element[y][index]
                        }
                        if(indiceX<modelo[indiceY].lenght){
                            indiceX++
                        }
                        array+=element
                });
            }else{
                array+=element
            }
            // if(indiceY<modelo[0].lenght){
                // indiceY++
            // }
        });
        console.log(array)

        let html = ''

        panel.forEach((element, index) => {
            html+='<div class="d-flex m-0 col-12">'
            if(index!=0&&index!=21){
                element.forEach((celda, index) => {
                    if(index!=0&&index!=11){
                        if(index==x){
                            html+='<div style=" width: 40px;  height: 40px;"  class="border border-light-subtle m-0 col-1 bg-danger "></div>'
                        }else{
                            html+='<div style=" width: 40px;  height: 40px;"  class="border border-light-subtle m-0 col-1"></div>'
                        }
                        // console.log(celda) 
                    }
                });
            }
            // console.log('')
            html+='</div>'            
        });
        document.querySelector('#panel').innerHTML = html
    }
    
    // let prueba = new ModeloPieza(4,3)
}