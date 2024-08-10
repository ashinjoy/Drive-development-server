import mongoose from "mongoose";
const vehicleSchema = new mongoose.Schema({
  vehicle_type: {
    type: String,
    required: true,
  },
  rc_Number: {
    type: String,
    required: true,
  },
  permit: {
    type: String,
  }
});
const driverSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  license_Number: {
    type: String,
    required: true,
  },
  license_Img: {
    type: String,
  },
  profileImg: {
    type: String,
  },
  vehicleDetails: vehicleSchema,
  wallet: {
    type: Number,
  },
  isBlocked: {
    type: Boolean,
    default: false,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isProfileComplete: {
    type: Boolean,
    default: false,
  },
  isAccepted: {
    type: Boolean,
    default: false,
  },
  editRequest:{
    type:Boolean,
    default:false
  }
});

export const driverModel = mongoose.model("driver", driverSchema);
