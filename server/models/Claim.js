const mongoose = require('mongoose');

const claimSchema = new mongoose.Schema(
  {
    item: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Item',
      required: true,
      index: true,
    },
    claimant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    claimantName: {
      type: String,
      required: [true, 'Please provide claimant name'],
      trim: true,
    },
    claimantPhone: {
      type: String,
      required: [true, 'Please provide claimant phone number'],
      trim: true,
    },
    claimantEmail: {
      type: String,
      required: [true, 'Please provide claimant email'],
      trim: true,
    },
    proofDescription: {
      type: String,
      required: [true, 'Please provide detailed proof or identifying features of the item'],
      maxlength: [1000, 'Proof description cannot exceed 1000 characters'],
    },
    proofImageUrl: {
      type: String,
      default: '',
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected', 'cancelled'],
      default: 'pending',
      index: true,
    },
    adminOrOwnerNotes: {
      type: String,
      maxlength: [500, 'Notes cannot exceed 500 characters'],
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Claim', claimSchema);
