import { createRoom } from "../actions";
import { Form,
         useActionData } from "react-router-dom";

export async function action({ request }) {
    const formData = await request.formData();
    const userName = formData.get("userName");
    
    const resopnse = await createRoom(userName);
    
    return resopnse;
}


export default function Root() {

    const error = useActionData();

    return (
        <>
            <div className="max-w-2xl mx-auto">
                <div className="h-52">

                </div>
                <div className="my-2.5">
                    <svg width="680" height="319" viewBox="0 0 680 319" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="680" height="319" fill="white"/>
                        <g clip-path="url(#clip0_1_6)">
                            <path d="M100.011 275.786C98.1353 279.117 94.6503 281 91.0423 281C89.3613 281 87.6495 280.595 86.071 279.724C38.3572 253.541 11 209.72 11 159.5C11 92.5029 66.1758 38 134 38C141.493 38 149.016 38.6683 156.355 40.0048C161.921 41.0173 165.611 46.2924 164.586 51.7902C163.561 57.2983 158.21 60.9534 152.655 59.9206C146.536 58.817 140.273 58.25 134.01 58.25C77.4815 58.25 31.5 103.671 31.5 159.5C31.5 202.157 55.0135 239.518 96.0238 262.026C100.964 264.749 102.758 270.905 100.001 275.786H100.011ZM254.981 137.417C253.966 131.92 248.646 128.234 243.05 129.287C237.484 130.299 233.794 135.575 234.819 141.073C235.936 147.097 236.51 153.293 236.51 159.49C236.51 192.993 208.927 220.24 175.01 220.24C141.093 220.24 113.51 192.993 113.51 159.49C113.51 153.891 108.918 149.365 103.26 149.365C97.6023 149.365 93.0103 153.891 93.0103 159.49C93.0103 204.151 129.797 240.49 175.01 240.49C220.223 240.49 257.01 204.151 257.01 159.49C257.01 152.068 256.334 144.636 254.981 137.407V137.417ZM146.023 104.683L204.51 46.8999C216.123 35.4282 236.377 35.4282 248.001 46.8999C259.983 58.7461 259.983 78.0039 248.001 89.8501L189.504 147.633C181.765 155.288 171.464 159.5 160.517 159.5H144.26C138.602 159.5 134.01 154.974 134.01 149.375V133.317C134.01 122.503 138.285 112.328 146.023 104.683ZM154.51 139.25H160.517C165.908 139.25 171.197 137.083 175.01 133.317L233.507 75.5334C237.505 71.5846 237.505 65.1654 233.507 61.2166C229.633 57.3792 222.878 57.3792 219.014 61.2166L160.507 119C156.632 122.827 154.5 127.91 154.5 133.317V139.25H154.51Z" fill="black"/>
                        </g>
                            <path d="M299.848 192.768C297.416 192.768 294.856 192.576 292.168 192.192C289.48 191.808 287.304 191.296 285.64 190.656C282.952 189.568 281.608 187.744 281.608 185.184C281.608 183.328 282.152 181.856 283.24 180.768C284.392 179.616 286.184 179.04 288.616 179.04C290.28 179.04 292.296 179.264 294.664 179.712C297.032 180.16 299.112 180.384 300.904 180.384C304.872 180.384 307.72 179.872 309.448 178.848C311.176 177.824 312.04 175.744 312.04 172.608C312.04 170.752 311.368 169.184 310.024 167.904C308.744 166.624 306.152 165.408 302.248 164.256C295.144 162.144 289.992 159.52 286.792 156.384C283.656 153.248 282.088 149.184 282.088 144.192C282.088 139.84 283.048 136.16 284.968 133.152C286.952 130.08 289.672 127.744 293.128 126.144C296.584 124.544 300.52 123.744 304.936 123.744C310.12 123.744 314.408 124.448 317.8 125.856C320.488 126.88 321.832 128.704 321.832 131.328C321.832 133.184 321.256 134.688 320.104 135.84C319.016 136.928 317.256 137.472 314.824 137.472C313.224 137.472 311.496 137.312 309.64 136.992C307.784 136.608 305.96 136.416 304.168 136.416C301.416 136.416 299.336 136.896 297.928 137.856C296.52 138.816 295.816 140.416 295.816 142.656C295.816 144.704 296.808 146.56 298.792 148.224C300.776 149.888 304.424 151.52 309.736 153.12C315.816 154.912 320.008 157.344 322.312 160.416C324.616 163.424 325.768 167.264 325.768 171.936C325.768 178.72 323.496 183.904 318.952 187.488C314.472 191.008 308.104 192.768 299.848 192.768ZM341.422 192.768C338.926 192.768 337.134 192.096 336.046 190.752C335.022 189.408 334.51 187.584 334.51 185.28V126.336C334.51 124.032 335.022 122.208 336.046 120.864C337.134 119.52 338.926 118.848 341.422 118.848C343.918 118.848 345.678 119.52 346.702 120.864C347.79 122.208 348.334 124.032 348.334 126.336V162.048C351.726 160 354.734 157.696 357.358 155.136C359.982 152.512 361.774 150.016 362.734 147.648C363.63 145.472 364.91 144 366.574 143.232C368.238 142.464 370.062 142.56 372.046 143.52C374.798 144.864 376.078 146.912 375.886 149.664C375.822 151.968 374.766 154.56 372.718 157.44C370.734 160.256 368.27 162.688 365.326 164.736C369.038 166.016 372.014 168.352 374.254 171.744C376.558 175.072 377.71 179.904 377.71 186.24C377.71 190.592 375.438 192.768 370.894 192.768C366.222 192.768 363.886 190.592 363.886 186.24C363.886 181.568 363.15 178.144 361.678 175.968C360.206 173.792 358.254 172.704 355.822 172.704C353.582 172.704 351.758 173.536 350.35 175.2C349.006 176.864 348.334 179.744 348.334 183.84C348.334 187.552 347.79 189.984 346.702 191.136C345.614 192.224 343.854 192.768 341.422 192.768ZM409.383 192.768C402.983 192.768 397.959 191.712 394.311 189.6C390.727 187.488 388.167 184.576 386.631 180.864C385.159 177.152 384.423 172.896 384.423 168.096C384.423 159.264 386.375 152.928 390.279 149.088C394.183 145.184 399.431 143.232 406.023 143.232C409.991 143.232 413.511 143.904 416.583 145.248C419.655 146.592 422.055 148.512 423.783 151.008C425.511 153.44 426.375 156.416 426.375 159.936C426.375 170.176 419.079 175.296 404.487 175.296H398.919C399.431 177.28 400.263 178.848 401.415 180C402.631 181.088 404.743 181.632 407.751 181.632C409.415 181.632 410.759 181.536 411.783 181.344C412.807 181.152 413.767 180.96 414.663 180.768C415.623 180.576 416.711 180.48 417.927 180.48C419.655 180.48 421.031 180.8 422.055 181.44C423.079 182.016 423.591 183.232 423.591 185.088C423.591 187.712 422.439 189.664 420.135 190.944C417.895 192.16 414.311 192.768 409.383 192.768ZM398.247 168.192C398.759 167.488 399.335 167.04 399.975 166.848C400.615 166.592 401.607 166.464 402.951 166.464C406.727 166.464 409.319 166.112 410.727 165.408C412.199 164.64 412.935 163.296 412.935 161.376C412.935 158.944 412.263 157.088 410.919 155.808C409.575 154.464 407.879 153.792 405.831 153.792C403.463 153.792 401.607 154.784 400.263 156.768C398.919 158.752 398.247 162.56 398.247 168.192ZM455.398 192.768C449.446 192.768 445.03 191.36 442.15 188.544C439.334 185.728 437.926 181.408 437.926 175.584V155.616H435.43C431.078 155.616 428.902 153.664 428.902 149.76C428.902 145.92 431.078 144 435.43 144H437.926V133.632C437.926 131.52 438.566 129.792 439.846 128.448C441.19 127.104 442.918 126.432 445.03 126.432C447.078 126.432 448.71 127.072 449.926 128.352C451.142 129.568 451.75 131.264 451.75 133.44V138.144C451.75 140.512 451.366 142.464 450.598 144H459.718C464.07 144 466.246 145.92 466.246 149.76C466.246 153.664 464.07 155.616 459.718 155.616H451.75V175.872C451.75 177.792 451.974 179.168 452.422 180C452.87 180.768 453.606 181.152 454.63 181.152C455.974 181.152 456.966 181.056 457.606 180.864C458.31 180.608 459.174 180.48 460.198 180.48C461.926 180.48 463.302 180.8 464.326 181.44C465.35 182.016 465.862 183.232 465.862 185.088C465.862 187.712 465.03 189.664 463.366 190.944C461.702 192.16 459.046 192.768 455.398 192.768ZM489.256 186.336C489.256 190.624 487.016 192.768 482.536 192.768C480.36 192.768 478.632 192.224 477.352 191.136C476.072 190.048 475.432 188.448 475.432 186.336V148.608C475.432 142.592 476.232 137.792 477.832 134.208C479.432 130.56 482.056 127.904 485.704 126.24C489.352 124.576 494.216 123.744 500.296 123.744C508.36 123.744 514.44 125.632 518.536 129.408C522.696 133.12 524.776 139.52 524.776 148.608V186.336C524.776 190.624 522.536 192.768 518.056 192.768C515.88 192.768 514.152 192.224 512.872 191.136C511.592 190.048 510.952 188.448 510.952 186.336V148.608C510.952 143.872 510.12 140.512 508.456 138.528C506.856 136.48 504.136 135.456 500.296 135.456C497.288 135.456 494.984 135.904 493.384 136.8C491.784 137.696 490.696 139.104 490.12 141.024C489.544 142.944 489.256 145.472 489.256 148.608V186.336ZM556.411 192.768C549.563 192.768 544.155 190.816 540.187 186.912C536.219 183.008 534.235 176.704 534.235 168C534.235 159.232 536.219 152.928 540.187 149.088C544.155 145.184 549.563 143.232 556.411 143.232C563.259 143.232 568.667 145.184 572.635 149.088C576.603 152.928 578.587 159.232 578.587 168C578.587 176.704 576.603 183.008 572.635 186.912C568.667 190.816 563.259 192.768 556.411 192.768ZM556.411 181.248C558.203 181.248 559.707 180.896 560.923 180.192C562.139 179.424 563.067 178.08 563.707 176.16C564.411 174.24 564.763 171.52 564.763 168C564.763 164.48 564.411 161.76 563.707 159.84C563.067 157.92 562.139 156.608 560.923 155.904C559.707 155.136 558.203 154.752 556.411 154.752C554.683 154.752 553.179 155.136 551.899 155.904C550.683 156.608 549.723 157.92 549.019 159.84C548.379 161.76 548.059 164.48 548.059 168C548.059 171.52 548.379 174.24 549.019 176.16C549.723 178.08 550.683 179.424 551.899 180.192C553.179 180.896 554.683 181.248 556.411 181.248ZM608.117 192.768C602.165 192.768 597.749 191.36 594.869 188.544C592.053 185.728 590.645 181.408 590.645 175.584V155.616H588.149C583.797 155.616 581.621 153.664 581.621 149.76C581.621 145.92 583.797 144 588.149 144H590.645V133.632C590.645 131.52 591.285 129.792 592.565 128.448C593.909 127.104 595.637 126.432 597.749 126.432C599.797 126.432 601.429 127.072 602.645 128.352C603.861 129.568 604.469 131.264 604.469 133.44V138.144C604.469 140.512 604.085 142.464 603.317 144H612.437C616.789 144 618.965 145.92 618.965 149.76C618.965 153.664 616.789 155.616 612.437 155.616H604.469V175.872C604.469 177.792 604.693 179.168 605.141 180C605.589 180.768 606.325 181.152 607.349 181.152C608.693 181.152 609.685 181.056 610.325 180.864C611.029 180.608 611.893 180.48 612.917 180.48C614.645 180.48 616.021 180.8 617.045 181.44C618.069 182.016 618.581 183.232 618.581 185.088C618.581 187.712 617.749 189.664 616.085 190.944C614.421 192.16 611.765 192.768 608.117 192.768ZM650.226 192.768C643.826 192.768 638.802 191.712 635.154 189.6C631.57 187.488 629.01 184.576 627.474 180.864C626.002 177.152 625.266 172.896 625.266 168.096C625.266 159.264 627.218 152.928 631.122 149.088C635.026 145.184 640.274 143.232 646.866 143.232C650.834 143.232 654.354 143.904 657.426 145.248C660.498 146.592 662.898 148.512 664.626 151.008C666.354 153.44 667.218 156.416 667.218 159.936C667.218 170.176 659.922 175.296 645.33 175.296H639.762C640.274 177.28 641.106 178.848 642.258 180C643.474 181.088 645.586 181.632 648.594 181.632C650.258 181.632 651.602 181.536 652.626 181.344C653.65 181.152 654.61 180.96 655.506 180.768C656.466 180.576 657.554 180.48 658.77 180.48C660.498 180.48 661.874 180.8 662.898 181.44C663.922 182.016 664.434 183.232 664.434 185.088C664.434 187.712 663.282 189.664 660.978 190.944C658.738 192.16 655.154 192.768 650.226 192.768ZM639.09 168.192C639.602 167.488 640.178 167.04 640.818 166.848C641.458 166.592 642.45 166.464 643.794 166.464C647.57 166.464 650.162 166.112 651.57 165.408C653.042 164.64 653.778 163.296 653.778 161.376C653.778 158.944 653.106 157.088 651.762 155.808C650.418 154.464 648.722 153.792 646.674 153.792C644.306 153.792 642.45 154.784 641.106 156.768C639.762 158.752 639.09 162.56 639.09 168.192Z" fill="black"/>
                        <defs>
                            <clipPath id="clip0_1_6">
                                <rect width="246" height="243" fill="white" transform="translate(11 38)"/>
                            </clipPath>
                        </defs>
                    </svg>

                </div>
                <div className="my-2.5">
                    <Form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" method="post">
                        <div className="mb-4">
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="userName" id="userName" type="text" placeholder="Enter your name"/>
                        </div>
                        <div className="">
                        <button className="bg-neutral-700 hover:bg-neutral-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full" type="submit">
                            Make Room
                        </button>
                        </div>
                    
                    </Form>
                </div>
            </div>
        </>
    )
}