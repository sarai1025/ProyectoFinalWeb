import { Mongo } from 'meteor/mongo'
import { Meteor } from 'meteor/meteor'

export const PCarritoCollection = new Mongo.Collection('pCarrito')

if (Meteor.isServer) {
    Meteor.publish('notificaciones', function () {
        return PCarritoCollection.find({});
    })
}
Meteor.methods({
    'pCarrito.add'(pedido) {
        PCarritoCollection.insert({
            ...pedido,
            date: new Date()
        })
    },

    'pCarrito.deleteAll'(){
        PCarritoCollection.remove({})
    },

    'pCarrito.delete'(pedido){
        PCarritoCollection.remove({_id: pedido._id})
    },


})