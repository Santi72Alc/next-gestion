import { Schema, model, models } from 'mongoose'


const customerSchema = new Schema({
    name: {
        type: String,
        required: [true, 'The name is required']
    },
    identification: {
        type: String,
        unique: [true, 'This client identification is already used']
    },
    sendingAddress: {
        street: String,
        city: String,
        state: String,
        country: String
    },
    billingAddress: {
        street: String,
        city: String,
        state: String,
        country: String
    },
    webUrl: String,
    contact: {
        name: String,
        phone1: String,
        phone2: String,
        email: String
    },
}, {
    timestamps: true,
    versionKey: false
})

export default models.Customers || model('Customers', customerSchema)