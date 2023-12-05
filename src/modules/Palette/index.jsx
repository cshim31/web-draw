import ImageLoader from "./component/ImageLoader";
import ImagePicker from "./component/ImagePicker";

const Palette = () => {

    const tools = [
        <ImageLoader/>,
        <ImagePicker/>
    ];
     

    return (
        <div className="absolute left-0 z-50 flex-col w-40 py-8 pl-2">
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