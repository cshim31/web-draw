import { BsCardImage } from "react-icons/bs";
import { useContext } from "react";
import { DrawContext } from "../../Context/DrawContext";

const ImageLoader = () => {

    const { imageDatas, setImageDatas } = useContext(DrawContext);

    const handleInputImage = () => {
        const inputImage = document.getElementById("inputImage");
        inputImage.addEventListener('change', function(e) {
            if (e.target.files[0]) {

                var reader = new FileReader();
                reader.onloadend = function() {
                    var image = new Image();
                    image.src = reader.result;
                    image.onload = function() {
                        setImageDatas(
                            [
                                ...imageDatas,
                                {   
                                    base64: image.src,
                                    width: image.width,
                                    height: image.height
                                }
                            ]
                        );  
                    }
                }

                reader.readAsDataURL(e.target.files[0]);
            }
        });
        inputImage.click();
        return;
    } 

    return (
        <button
        onClick={handleInputImage}>
            <BsCardImage/>
            <input 
            type="file"
            id="inputImage"
            accept = 'image/*'
            className="hidden"
            />
        </button>
    );
};

export default ImageLoader;