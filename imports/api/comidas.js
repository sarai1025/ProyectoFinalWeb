import { Mongo } from 'meteor/mongo'
import { Meteor } from 'meteor/meteor'

export const ComidasCollection = new Mongo.Collection('comidas')

if (Meteor.isServer) {
    Meteor.publish('tipoComidas', function () {
        return ComidasCollection.find({});
    })
}
Meteor.methods({
    'tiposComidas.add'(comida) {
        ComidasCollection.insert({
            ...comida,
            date: new Date()
        })
    },
    /* Nombre del método: comidas.add(tipoComida, comida)
    Objetivo:Permite al usuario administrador registrar un plato de comida
    Entradas: el tipo de comida que tendra la comida y tambien el nuevo plato de comida a agregar 
    Salidas: retorna la colección de comidas actualizada con el nuevo elemento*/
    'comidas.add'(tipoComida, comida) {
        return ComidasCollection.update({ _id: tipoComida._id }, { $push: { comidas: comida } })
    },
     /* Nombre del método: tiposComidas.delete(tipoComida)
    Objetivo:Permite al usuario administrador borrar un tipo de comida
    Entradas: el tipo de comida a borrar 
    Salidas: retorna la colección de comidas actualizada con el elemento eliminado*/
    'tiposComidas.delete'(tipoComida) {
        return ComidasCollection.remove({ _id: tipoComida._id })
    },
    /* Nombre del método: comidas.delete(tipoComida, comida)
    Objetivo:Permite al usuario administrador borrar un plato de comida
    Entradas: el tipo de comida del plato de comida a borrar y el plato de comida a borrar 
    Salidas: retorna la colección de comidas actualizada con el elemento eliminado*/
    'comidas.delete'(tipoComida, comida) {
        return ComidasCollection.update({ _id: tipoComida._id }, { $pull: { comidas: comida } })
    },
    /* Nombre del método: tipoComidas.edit(tipoComida, nombreNuevo)
    Objetivo:Permite al usuario administrador editar un tipo de comida
    Entradas: el tipo de comida del plato de comida a editar y el nombre nuevo que se le quiere colocar
    Salidas: retorna la colección de comidas actualizada con el elemento editado*/
    'tipoComidas.edit'(tipoComida, nombreNuevo) {
        return ComidasCollection.update({ _id: tipoComida._id }, { $set: { nombre: nombreNuevo } })
    },
    /*  Nombre del método: comidas.edit(tipoComida, comida, indice)
    Objetivo:Permite al usuario administrador editar un plato de comida
    Entradas: el tipo de comida del plato de comida a editar, el plato de comida a editar y su respectivo indice
    Salidas: retorna la colección de comidas actualizada con el elemento editado*/
    'comidas.edit'(tipoComida, comida, indice) {
        return ComidasCollection.update({ _id: tipoComida._id }, { $set: { [`comidas.${indice}`]: comida } })
    },
     /*  Nombre del método: tipoComidas.findOneTipoComida'(datoTipoComida)
    Objetivo:Permite encontrar un tipo de comida en específico
    Entradas: el dato con el que se quiere buscar el tipo de comida del plato de comida
    Salidas: retorna la lista de los tipos de comidas encontrados con el dato en específico*/
    'tipoComidas.findOneTipoComida'(datoTipoComida) {
        try {
            return comidasCollection.findOne({ nombre: datoTipoComida })
        } catch (e) {
            console.log(e)
        }
    } 
})

