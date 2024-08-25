const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  sender: {
    type: Number, 
    required: true,
  },
  body: {
    type: String, 
    required: true,
  },
  conversation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Conversation', 
    required: true,
  },
}, {
  timestamps: true,  
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;