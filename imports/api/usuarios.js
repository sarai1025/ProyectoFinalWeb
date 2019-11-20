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

    'usuarios.find'(dUsario){
        UsuariosCollection.findOne({
            ...dUsario
        })
    }

})