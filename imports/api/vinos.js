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
    'vinos.delete'(vino) {
        VinosCollection.remove({ _id: vino._id })
    },
<<<<<<< HEAD
    'vinos.edit'(vino) {
        console.log("aqui")
        VinosCollection.update({ _id: vino._id }, { $set: { nombre: vino.nombre, precio: vino.precio, cantidad: vino.cantidad, descripcion: vino.descripcion, comida: vino.comida, imagen: vino.imagen, fotos: vino.fotos } })
    },
    'vinos.findOneVino'(datoVino) {
        try {
            return VinosCollection.findOne({ comida: datoVino })
        } catch (e) {
            console.log(e)
        }
    }
=======
    'vinos.edit'(vino){
        VinosCollection.update({_id: vino._id},{$set:{nombre:vino.nombre, precio:vino.precio, cantidad:vino.cantidad, descripcion:vino.descripcion, comida:vino.comida, imagen: vino.imagen, fotos: vino.fotos}})
    },
    'vinos.findOneNombre'(dnombre){
        try{
            return VinosCollection.findOne({nombre: dnombre})
        }catch(e){
            console.log(e)
        }
       
    },
>>>>>>> f344d7d6ba7d35a7f9932d37ae4d60d4b75994a9
})

