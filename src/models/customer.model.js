import { Schema, model, models } from 'mongoose'


const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'The name is required']
    },
    identification: {
        type: String,
        unique: [true, 'This client identification is already used']
    },
    sendingAddress: {
        type: Schema.Types.ObjectId,
        ref: 'Addresses'
    },
    billingAddress: {
        type: Schema.Types.ObjectId,
        ref: 'Addresses'
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

export default models.Users || model('Users', userSchema)