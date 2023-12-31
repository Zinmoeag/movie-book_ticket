import { reject } from "lodash";

const getCropImage = (image, crop) => {

    console.log(crop)

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    const devicePixelRatio  = window.devicePixelRatio;

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    canvas.width = Math.floor(crop.width * scaleX * window.devicePixelRatio);
    canvas.height  = Math.floor(crop.height * scaleY * window.devicePixelRatio);


    // console.log(canvas.width, canvas.height)
    ctx.scale(devicePixelRatio, devicePixelRatio)


    const x = crop.x * scaleX;
    const y = crop.y * scaleY;
    ctx.translate(-x, -y)
    ctx.imageSmootingQuality ='high'

    ctx.save()
    ctx.drawImage(
        image,
        0,0,
        image.naturalWidth,
        image.naturalHeight,
        0,0,
        image.naturalWidth,
        image.naturalHeight,
    )

    ctx.restore()

    return canvas;

}

const genRandonString = (length) => {
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYdfsdgsdgsdefsdgvewexfedZ156541592';
    var charLength = chars.length;
    var result = '';
    for ( var i = 0; i < length; i++ ) {
       result += chars.charAt(Math.floor(Math.random() * charLength));
    }
    return result;
 }


export const canvasToFile = (canvas) => {
    return new Promise((resolve, reject) => {
        canvas.toBlob(blob => {
            if(blob){
            let randStr = genRandonString(15);
            let file = new File([blob], `${randStr}.jpg`, { type: 'image/jpeg' });

            resolve(file)
            }else{
                reject(new Error('Failed to create blob'))
            }
        }, 'image/jpeg')
    })
}

const blobToFile = (blob) => {
   return  new File([blob], 'test.jpg', { type: 'image/jpeg' });
}

export default getCropImage;