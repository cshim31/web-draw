
// keep structure of old image data and update only values
export function handleUpdateImage(oldImageData, newImageData) {
    
    let updatedImageData = oldImageData;
    
    updatedImageData.base64 = newImageData.base64;
    updatedImageData.width = newImageData.width;
    updatedImageData.height = newImageData.height;
    updatedImageData.x.set(newImageData.x);
    updatedImageData.y.set(newImageData.y);

    return updatedImageData;
}