import { Mongo } from 'meteor/mongo'
import { Meteor } from 'meteor/meteor'

export const VinosCollection = new Mongo.Collection('vinos')

if (Meteor.isServer) {
    Meteor.publish('vinos', function () {
        return VinosCollection.find({});
    })
}
Meteor.methods({
    'vinos.add'(vino) {
        VinosCollection.insert({
            ...vino,
            date: new Date()
        })
    },
    'vinos.delete'(vino){
        VinosCollection.remove({_id: vino._id})
    },
    'vinos.edit'(vino){
        console.log("aqui")
        VinosCollection.update({_id: vino._id},{$set:{nombre:vino.nombre, precio:vino.precio, cantidad:vino.cantidad, descripcion:vino.descripcion, comida:vino.comida, imagen: vino.imagen, fotos: vino.fotos}})
    }
})

