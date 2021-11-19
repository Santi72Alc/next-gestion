import { Schema, model, models } from 'mongoose'

export const FAMILY_TYPES = ['Hardware', 'Software', 'Services', 'Others']

const familiesSchema = new Schema({
    name: {
        type: String,
        required: [true, 'The family name is required']
    },
    type: {
        type: String,
        enum: {
            values: FAMILY_TYPES,
            message: '{VALUE} is not suppported'
        },
        default: FAMILY_TYPES[0]
    }
}, {
    timestamps: true,
    versionKey: false
})

export default models.Families || model('Families', familiesSchema)