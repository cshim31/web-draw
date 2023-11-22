const Palette = () => {

    const tools = [];
     

    return (
        <div>
            <div className="flex">
                {/* set items as props? refer to functional programming and react state management and determine*/}
                {
                    tools.map((element) => 
                            /* create object? or render it on data?*/
                            <div>
                                {element}
                            </div>
                    )
                }
            </div>
        </div>
    );
};

export default Palette;