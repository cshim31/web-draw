import ImageLoader from "./component/ImageLoader";
import ImagePicker from "./component/ImagePicker";
import Draw from "./component/Draw";
import Eraser from "./component/Eraser";

const Palette = () => {

    const tools = [
        <ImageLoader/>,
        <Draw/>,
        <Eraser/>,
        <ImagePicker/>
    ];
     

    return (
        <div className="absolute left-0 z-50 flex-col my-8 ml-2">
            {/* TODO: Let each button trigger click event to specific layer */}
            {
                tools.map((element) => 
                        /* create object? or render it on data?*/
                        element
                )
            }
        </div>
    );
};

export default Palette;