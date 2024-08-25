export class RideRequestController {
  constructor(dependencies) {
    this.requestRideUseCase = new dependencies.useCase.RideRequestUseCase(
      dependencies
    );
  }
  async requestRide(req, res, next) {
    try {
   
      const {userId,vehicleType,pickUpCoords,dropCoords,pickupLocation,dropLocation,distance,duration} = req.body

      if(!userId||!vehicleType||!pickUpCoords||!dropCoords||!pickupLocation||!dropLocation||!distance||!duration){
        const error = new Error('Incomplete Request')
        error.status = 400
        throw error
      }
      

      await this.requestRideUseCase.execute(req.body)

    } catch (error) {
      console.error(error);
      next(error)
    }
  }
}