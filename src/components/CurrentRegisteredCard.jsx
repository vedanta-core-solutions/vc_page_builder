export default function CurrentRegisteredCard({ data }) {
    return (
        <div className="h-screen w-full overflow-y-scroll flex justify-center">
            <ul className="p-3 w-4/5 space-y-3">
                {data.map(card => (
                    <li 
                        key={card.id} 
                        className="flex justify-between items-center border w-full border-white rounded-md p-3 bg-black text-white"
                    >
                        <div className="text-lg font-semibold">
                            {card.chipId}
                        </div>

                        {/* Vertical Divider */}
                        <div className="h-6 w-px bg-white mx-3"></div>

                        <div className="text-md opacity-80">
                            {card.website}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
