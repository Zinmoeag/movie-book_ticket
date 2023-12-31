import ReactCrop, {makeAspectCrop, centerCrop, convertToPercentCrop, convertToPixelCrop} from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import { useRef, useState } from 'react'
import getCropImage, {canvasToFile} from './getCropImage'


export default function Cropper({ onGetCropImg, name }) {
  const [crop, setCrop] = useState()

  const imageRef  = useRef(null);
  const canvasRef = useRef(null) 


  const [displayImage, setDisplayImage] = useState('')

  const handleFile = (e) => {
    e.preventDefault()
    
    const file = e.target.files[0];
    if(!file) return ;

    const reader = new FileReader;
    reader.onload = () => {
        const imageUrl = reader.result?.toString() || '';

        setDisplayImage(imageUrl)
    }
    reader.readAsDataURL(file);
  }


  const imageOnLoad = (e) => {

    const {  width, height } = e.currentTarget

    const initialCrop  =  centerCrop(makeAspectCrop(
        {
          unit: 'px',
          width: 200,
        },
        19/30,
        width,
        height
    ),
        width,
        height
    )
    setCrop(initialCrop)
  }


  const setImage = () => {

        let croppedImg = getCropImage(
            imageRef.current,
            convertToPixelCrop(crop),
        )

        canvasToFile(croppedImg)
        .then(file => {
            onGetCropImg({
                file : file,
                dataUrl : croppedImg.toDataURL(),
            })
        })
  }


  return (
    <div>
        <div className="flex flex-col gap-2 mb-4">
            <label htmlFor="movie-image">Movie's Image</label>
            <input
            accept='image/*'
            id={name}
            type="file"
            name={name}
            onChange={handleFile}
            />
        </div>

        {displayImage && (

            <div>

                <div className='h-[400px] overflow-hidden flex items-center justify-center'>

                    <div className='w-fit mx-auto'>
                        <ReactCrop
                        crop={crop} 
                        onChange={(pixelCrop, percentCrop) => setCrop(pixelCrop)}
                        aspect={19/30}
                        >
                            <div className=''>

                                <img
                                className='h-[300px] w-auto mx-auto'
                                ref={imageRef}
                                src={displayImage} 
                                onLoad={imageOnLoad} 
                                />
                            </div>
                        </ReactCrop>
                    </div>

                </div>
                <button 
                type='button'
                onClick={setImage}
                >
                    Contirm
                </button>
            </div>

            
        )}


    </div>
    
  )
}