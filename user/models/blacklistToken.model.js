const mongoose = require('mongoose')

const blacklistToken = new mongoose.Schema(
    {
      token: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
        expires: 3600,
      },
    },
    {
      timestamps: { updatedAt: true },
    }
  );

module.exports = mongoose.model('blacklistToken',blacklistToken)