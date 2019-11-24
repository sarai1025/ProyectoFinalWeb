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
    'comidas.add'(tipoComida, comida) {
        return ComidasCollection.update({ _id: tipoComida._id }, { $push: { comidas: comida } })
    },
    'tiposComidas.delete'(tipoComida) {
        return ComidasCollection.remove({ _id: tipoComida._id })
    },
    'comidas.delete'(tipoComida, comida) {
        return ComidasCollection.update({ _id: tipoComida._id }, { $pull: { comidas: comida } })
    },
    'tipoComidas.edit'(tipoComida, nombreNuevo) {
        return ComidasCollection.update({ _id: tipoComida._id }, { $set: { nombre: nombreNuevo } })
    },
    'comidas.edit'(tipoComida, comida, indice) {
        return ComidasCollection.update({ _id: tipoComida._id }, { $set: { [`comidas.${indice}`]: comida } })
    }
})

