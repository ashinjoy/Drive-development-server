import sendMail from "../../utils/nodemailer.js"
import generateOTP from "../../utils/generateOtp.js"

export class ResendOtpUseCase{
    constructor(dependencies){
        this.userRepository = new dependencies.repository.MongoUserRepository()
    }
    async execute(email){
        try {
      
       const otp = generateOTP()
       console.log('User Resend OTP',otp);
       await sendMail(otp,email)
       const getUserByEmail = await this.userRepository.findUserByEmail(email)
       const userId = getUserByEmail._id
       return {
        userId,
        otp
       }
        } catch (error) {
            throw error
        } 
    }
}