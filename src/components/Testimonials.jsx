'use client';
import { useConfig } from "../context/ConfigProviderClient";

export default function Testimonials(){
    const config=useConfig();
    console.log(config);
    if(!config){
        return null;
    }
    const {content, themeForBiz}=config;
    return(
        <>
        <div style={{fontFamily:themeForBiz.font, background:themeForBiz.colors.background}} className={`flex flex-col justify-center items-center py-6`}>
            {content?.testimonials?.card_1.map((item,i)=>(
                <div key={i} className="flex flex-col justify-center items-center my-7 space-y-2">
                <h1 className="text-2xl capitalize">{item.h_1}</h1>
                <p className="text-sm">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dignissimos optio atque sequi expedita quam libero corrupti excepturi debitis quia nam.</p>
            </div>
            ))}
            
            <div className="flex space-x-4">
                {/* Card 1 */}
                <div className="bg-amber-100 size-75 rounded-3xl shadow-xl shadow-gray-100">card 1</div>
                {/* Card 1 */}
                <div className="bg-amber-100 size-75 rounded-3xl shadow-xl shadow-gray-100">card 2</div>
                {/* Card 1 */}
                <div className="bg-amber-100 size-75 rounded-3xl shadow-xl shadow-gray-100">card 3</div>
            </div>
        </div>
        </>
    )
}