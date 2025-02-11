import mongoose from "mongoose";

const couponSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,
  },
  discountedPercentage: {
    type: Number,
    min: 0,
    max: 100,
    required: true,
  },
  expirationDate: {
    type: Date,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true,
    unique: true,
  },
},{timestamps:true});


const Coupon = mongoose.model("Coupons",couponSchema);

export default Coupon;