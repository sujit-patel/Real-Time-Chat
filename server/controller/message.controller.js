// import Message from "../models/message.model.js"

export const sendMessage = async(req, res) => {
    console.log("message: ", req.params.id, req.body.message);
}