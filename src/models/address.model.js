import { Schema, model, models } from 'mongoose'


const addressSchema = new Schema({
    street: String,
    city: String,
    state: String,
    country: String
}, {
    timestamps: true,
    versionKey: false
})

export default models.Addresses || model('Addresses', addressSchema)