import mongoose from "mongoose";

const tripSchema = new mongoose.Schema({
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      // required: true,
    },
    driverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'driver',
      // required: true,
    },
    tripStatus: {
      type: String,
      enum: ['requested', 'accepted',  'completed', 'cancelled','rejected','started'],
      default: 'requested',
    },
    requestStatus:{
      type:String,
      enum:['pending', 'accepted','rejected'],
      default:'pending'
    },
    rejectedDrivers:{
    type:[mongoose.Schema.Types.ObjectId],
    ref:'driver'
    },
    fare: {
      type: Number,
     
    },
    startLocation: {
      type: {
        type: String,
        enum: ['Point'],
        required: true,
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },
    endLocation: {
      type: {
        type: String,
        enum: ['Point'],
        required: true,
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },
    startTime: {
      type: Date,
    },
    endTime: {
      type: Date,
    },
    distance: {
      type: Number,
    },
    duration: {
      type: Number,
    },
    pickUpLocation:{
      type:String,
    },
    dropOffLocation:{
      type:String
    },

    // paymentId: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: 'Payment',
    // },
    createdAt: {
      type: Date,
      default: Date.now,
    },

  });
  
  tripSchema.index({ startLocation: '2dsphere' });
  tripSchema.index({ endLocation: '2dsphere' });
  
export const tripModel = mongoose.model('Trip', tripSchema);
  