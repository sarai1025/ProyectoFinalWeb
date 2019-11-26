import { Mongo } from 'meteor/mongo'
import { Meteor } from 'meteor/meteor'

export const PedidosCollection = new Mongo.Collection('pedidos')

if (Meteor.isServer) {
    Meteor.publish('pedidos', function () {
        return PedidosCollection.find({});
    })
}
Meteor.methods({

    'pedidos.add'(pedidos) {
        PedidosCollection.insert({
            ...pedidos,
            date: new Date()
        })
    },
    'pedidos.edit'(pedido){
        PedidosCollection.update({_id: pedido._id},{$set:{pendiente:pedido.pendiente}})
    },
    'pedidos.findOneId'(datoUsuario){
        try{
            return PedidosCollection.findOne({_id: datoUsuario})
        }catch(e){
            console.log(e)
        }
       
    },

    'pedidos.delete'(pedido){
        PedidosCollection.remove({_id: pedido._id})
    },
   
})