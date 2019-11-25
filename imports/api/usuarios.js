import { Mongo } from 'meteor/mongo'
import { Meteor } from 'meteor/meteor'

export const UsuariosCollection = new Mongo.Collection('usuarios')

if (Meteor.isServer) {
    Meteor.publish('usuarios', function () {
        return UsuariosCollection.find({});
    })
}
Meteor.methods({
    'usuarios.add'(usuario) {
        UsuariosCollection.insert({
            ...usuario,
            date: new Date()
        })
    },

    'usuarios.findOneCorreo'(datoUsuario){
        try{
            return UsuariosCollection.findOne({correo: datoUsuario})
        }catch(e){
            console.log(e)
        }
       
    },

    'usuarios.edit'(usuario){
        UsuariosCollection.update({correo: usuario.correo},{$set:{activo:usuario.activo}})
    }

})