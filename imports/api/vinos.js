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
        vinosCollection.insert({
            ...vino,
            date: new Date()
        })
    }
})

