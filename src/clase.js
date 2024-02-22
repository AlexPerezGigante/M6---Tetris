import { models } from "./models"


export class ModeloPieza{
    constructor(modelo, x){
        this.modelo = modelo    
        this.x = x
        this.matriz = models[this.modelo][this.angulo]
        this. y = 0
        this.longitud = this.matriz[0].length
        this.altura = this.matriz.length
    }
    angulo = 0
    girar = () =>{
        console.log('Estas girando')
        if(this.angulo<3){
            this.angulo++
        }else{
            this.angulo=0;
        }
        this.matriz = models[this.modelo][this.angulo]
        this.longitud = this.matriz[0].length
        this.altura = this.matriz.length
    }
    
}