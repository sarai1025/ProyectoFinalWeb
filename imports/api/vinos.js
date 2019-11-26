import { Mongo } from 'meteor/mongo'
import { Meteor } from 'meteor/meteor'

export const VinosCollection = new Mongo.Collection('vinos')

if (Meteor.isServer) {
    Meteor.publish('vinos', function () {
        return VinosCollection.find({});
    })
}
Meteor.methods({
    /* Nombre del método: vinos.add(vino)
    Objetivo:Permite al usuario administrador registrar un nuevo vino
    Entradas:  El nuevo vino a agregar 
    Salidas: retorna la colección de vinos actualizada con el nuevo elemento*/
    'vinos.add'(vino) {
        VinosCollection.insert({
            ...vino,
            date: new Date()
        })
    },
    /* Nombre del método: vinos.delete(vino)
    Objetivo:Permite al usuario administrador borrar un vino
    Entradas: el vino en específico a borrar 
    Salidas: retorna la colección de vinos actualizada con el elemento eliminado*/
    'vinos.delete'(vino) {
        VinosCollection.remove({ _id: vino._id })
    },
    /* Nombre del método: vinos.edit(vino)
    Objetivo:Permite al usuario administrador editar un tipo de comida
    Entradas: el tipo de comida del plato de comida a editar y el nombre nuevo que se le quiere colocar
    Salidas: retorna la colección de comidas actualizada con el elemento editado*/
    'vinos.edit'(vino) {
        console.log("aqui")
        VinosCollection.update({ _id: vino._id }, { $set: { nombre: vino.nombre, precio: vino.precio, cantidad: vino.cantidad, descripcion: vino.descripcion, comida: vino.comida, imagen: vino.imagen, fotos: vino.fotos } })
    },
       /*  Nombre del método: tipoComidas.findOneTipoComida'(datoTipoComida)
    Objetivo:Permite encontrar un tipo de comida en específico
    Entradas: el dato con el que se quiere buscar el tipo de comida del plato de comida
    Salidas: retorna la lista de los tipos de comidas encontrados con el dato en específico*/
    'vinos.findOneVino'(datoVino) {
        try {
            return VinosCollection.findOne({ comida: datoVino })
        } catch (e) {
            console.log(e)
        }
    },
  
       /*  Nombre del método: vinos.findOneNombre'(dnombre)
    Objetivo:Permite encontrar un vino en específico
    Entradas: el dato con el que se quiere buscar el vino
    Salidas: retorna la lista de los vinos encontrados con el dato en específico*/
    'vinos.findOneNombre'(dnombre){
        try{
            return VinosCollection.findOne({nombre: dnombre})
        }catch(e){
            console.log(e)
        }
       
    },
})

