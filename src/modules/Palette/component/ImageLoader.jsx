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
                    setImageDatas(
                        [
                            ...imageDatas,
                            {   
                                base64: reader.result
                            }
                        ]
                        );
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