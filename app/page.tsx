"use client";

export default function HomePage() {

    const category = ["Eco", "Beauty", "Education", "Pet", "Productivity", "Healthcare"];

    return (
        <main className="flex flex-col  justify-center items-center">
            {/**광고 자리 */}
            <div className="w-[88%] h-[180px] bg-[#F8F8F8]">
            </div>

            <div className="flex flex-col w-[88%]">
                <div className="flex flex-col relative">
                    {/**회색 바 */}
                    <div className="w-full h-[2px] absolute top-13 bg-[#E8E8E8]"></div>

                    <div className="px-5 py-4 flex gap-x-5 justify-start items-center">
                        {category.map((idx, key) => (
                            <div 
                            key={key} 
                            className="w-[120px] flex flex-col gap-x-1 justify-center items-center font-semibold"
                            >
                                <div className="text-[18px] text-[#A5A5A5]">{idx}</div>

                                {/**파란색 바 */}
                                <div 
                                style={{ width: `${idx.length*10}px`}}
                                className="h-[2px] bg-[#6BB4FF] absolute top-13"
                                ></div>
                            
                            </div>
                        ))}
                    </div>
                </div>
                
            </div>

            <div>

            </div>
        </main>
    )
}