import { Mongo } from 'meteor/mongo'
import { Meteor } from 'meteor/meteor'

export const pCarritoCollection = new Mongo.Collection('pedidosCarrito')

if (Meteor.isServer) {
    Meteor.publish('pedidosCarrito', function () {
        return pCarritoCollection.find({});
    })
}
Meteor.methods({
    'pedidosCarrito.add'(pCarrito) {
        pCarritoCollection.insert({
            ...pCarrito,
            date: new Date()
        })
    },

})