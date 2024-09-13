import mongoose from "mongoose";
import { tripModel } from "../../database/schema/tripSchema/tripSchema.js";
import { reservationsUrl } from "twilio/lib/jwt/taskrouter/util.js";
export class TripRepository {
  constructor() {}
  async createTrip(data) {
    return await tripModel.create(data);
  }
  async findTrip(id) {
    return await tripModel.findById({ _id: id }).populate("userId");
  }
  async findTripByIdAndUpdate(id, data) {
    console.log("inside repo", id, data);

    const upadateddata = await tripModel
      .findByIdAndUpdate({ _id: id }, { $set: data }, { new: true })
      .populate("driverId");
    console.log("dataaaaaaaaaaaaaa", upadateddata);

    return upadateddata;
  }
  async findTripByIdAndReject(tripId, status, driverId) {
    return await tripModel.findByIdAndUpdate(
      { _id: tripId },
      { $set: { requestStatus: status }, $push: { rejectedDrivers: driverId } }
    );
  }

  async findTripAndUpdate(id, data) {
    console.log("id and data", id, typeof data, data);
    return await tripModel.findByIdAndUpdate(
      { _id: id },
      { $set: data },
      { new: true }
    );
  }

  async findTripByUserId(userId) {
    return await tripModel.findOne({ userId }, { requestStatus: "pending" });
  }

  async getDriverTripCompletedStat(driverId, dateRanges) {
    console.log("in");
    console.log(driverId);

    try {
      let facetObj = {};
      dateRanges.forEach((element) => {
        const key = element.label;

        facetObj[key] = [
          {
            $match: {
              driverId: new mongoose.Types.ObjectId(driverId),
              tripStatus: "completed",
              createdAt: {
                $gte: element.startTime,
                $lte: element.endTime,
              },
            },
          },
          {
            $count: "totalRidesCompleted",
          },
        ];
      });
      console.log(facetObj);
      console.log("entry");

      return await tripModel.aggregate([
        {
          $facet: facetObj,
        },
      ]);
    } catch (error) {
      console.error(error);
    }
  }

  async findTripCountPerUser(userId){
    try {
     return await tripModel.countDocuments({userId:userId})
    } catch (error) {
      console.error(error);
      
    }
  }

  async findAllTrips(userId,page,limit=6){
try {
  return await tripModel.find({userId:userId}).skip(page).limit(limit)
} catch (error) {
  console.error(error);
}
  }
}
