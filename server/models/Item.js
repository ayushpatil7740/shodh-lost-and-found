const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide an item title'],
      trim: true,
      maxlength: [100, 'Title cannot exceed 100 characters'],
    },
    description: {
      type: String,
      required: [true, 'Please provide a detailed description'],
      maxlength: [2000, 'Description cannot exceed 2000 characters'],
    },
    category: {
      type: String,
      required: [true, 'Please select an item category'],
      enum: [
        'Electronics',
        'Documents & IDs',
        'Wallets & Bags',
        'Keys',
        'Clothing & Accessories',
        'Books & Stationery',
        'Jewelry & Watches',
        'Other',
      ],
      default: 'Other',
    },
    type: {
      type: String,
      required: [true, 'Item type must be specified (lost or found)'],
      enum: ['lost', 'found'],
      index: true,
    },
    location: {
      placeName: {
        type: String,
        required: [true, 'Please specify the location or landmark'],
        trim: true,
      },
      city: {
        type: String,
        trim: true,
        default: '',
      },
      landmark: {
        type: String,
        trim: true,
        default: '',
      },
    },
    dateLostOrFound: {
      type: Date,
      required: [true, 'Please specify when the item was lost or found'],
      default: Date.now,
    },
    imageUrl: {
      type: String,
      default: '',
    },
    additionalImages: {
      type: [String],
      default: [],
    },
    status: {
      type: String,
      enum: ['active', 'claimed', 'resolved', 'handed_over'],
      default: 'active',
      index: true,
    },
    reward: {
      type: String,
      trim: true,
      default: '',
    },
    contactName: {
      type: String,
      trim: true,
    },
    contactPhone: {
      type: String,
      trim: true,
    },
    contactEmail: {
      type: String,
      trim: true,
    },
    secretQuestion: {
      type: String,
      trim: true,
      default: '',
    },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    claimedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    tags: {
      type: [String],
      default: [],
    },
    viewsCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Text index for search
itemSchema.index({
  title: 'text',
  description: 'text',
  'location.placeName': 'text',
  'location.city': 'text',
  category: 'text',
});

module.exports = mongoose.model('Item', itemSchema);
