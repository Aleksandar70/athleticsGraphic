import * as Mongoose from "mongoose";

const SignatureSchema = new Mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
});

// const model = mongoose.model("Signature", SignatureSchema);

// async function createANewSignature (theName, theTitle) {
//     const newSignature = new model({
//         name: theName,
//         title: theTitle,
//     });

//     return await newSignature.save(); 
// }

// async function getSignatures () {
//     const signatures = await model.find({}).exec();

//     if (signatures.length !== 0) {
//         return signatures;
//     } else {
//         return null;
//     }
// }

// module.exports = {
//     createANewSignature,
//     getSignatures,
// }
export default SignatureSchema;