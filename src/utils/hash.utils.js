import bcrypt from 'bcryptjs';


export const hashData = async (dataToHash) => {
    const salt = await bcrypt.genSalt(11);
    const hashedData = await bcrypt.hash(dataToHash,salt);
    return hashedData;
}

export const compareData = async(inputData,hashedDataToCompareWith)=>{
    const authenticated = await bcrypt.compare(inputData,hashedDataToCompareWith);
    return authenticated;
}