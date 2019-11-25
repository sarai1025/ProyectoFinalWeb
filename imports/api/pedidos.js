import { Mongo } from 'meteor/mongo'
import { Meteor } from 'meteor/meteor'

export const PedidosCollection = new Mongo.Collection('pedidos')

if (Meteor.isServer) {
    Meteor.publish('pedidos', function () {
        return PediddsCollection.find({});
    })
}
Meteor.methods({

    'pedidos.add'(pedidos) {
        PedidosCollection.insert({
            ...pedidos,
            date: new Date()
        })
    },

   
})