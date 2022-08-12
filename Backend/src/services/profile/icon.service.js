import AWS from 'aws-sdk';
import { updateProfile } from "../../models/profileDAO.js";

const environment_variables = process.env;

const s3 = new AWS.S3({
    accessKeyId: environment_variables.S3_ACCESS_KEY_ID,
    secretAccessKey: environment_variables.S3_SECRET_ACCESS_KEY,
})

export async function GetImage(key) {
    const uploadedImage = await s3.getObject({
        Bucket: environment_variables.ICON_BUCKET_NAME,
        Key: key,
    }).promise()

    return uploadedImage;
}

export async function DeleteImage(key) {
    await s3.deleteObject({
        Bucket: environment_variables.ICON_BUCKET_NAME,
        Key: key,
    }).promise()
}

export async function UploadImage(key, blob) {
    const uploadedImage = await s3.upload({
        Bucket: environment_variables.ICON_BUCKET_NAME,
        Key: key,
        Body: blob,
    }).promise()

    return uploadedImage;
}

export async function ChangeProfilePicture(id, imagesrc) {
    await updateProfile({
        icon: imagesrc
    }, id)
}

export async function ChangeProfileDescription(id, description) {
    await updateProfile({
        description: description
    }, id)
}