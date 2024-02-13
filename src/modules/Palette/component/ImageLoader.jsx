import { BsCardImage } from "react-icons/bs";
import { useContext } from "react";
import { DrawContext } from "../../Context/DrawContext";
import { socket } from "../../../common/lib/socket";

const ImageLoader = () => {
    const { imageDatas, setImageDatas, roomID } = useContext(DrawContext);

    const handleInputImage = () => {
        const inputImage = document.getElementById("inputImage");
        inputImage.addEventListener('change', function(e) {
            if (e.target.files[0]) {

                var reader = new FileReader();
                reader.onloadend = function() {
                    var image = new Image();
                    image.src = reader.result;
                    image.onload = function() {

                        let data = {   
                            base64: image.src,
                            width: image.width,
                            height: image.height,
                            x: 0,
                            y: 0
                        };

                        setImageDatas(
                            [
                                ...imageDatas,
                                data
                            ]
                        );
                        
                        socket.emit("action", "image_add", roomID, data);
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