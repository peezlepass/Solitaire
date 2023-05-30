const valueMap = {
    '1': "A",
    "11": "J",
    "12": "Q",
    "13": "K",
}

const suitEmojiMap = {
    "hearts": "♥️",
    "diamonds": "♦️",
    "spades":"♠️",
    "clubs": "♣️",
}

const suitColourMap = {
    "hearts": "text-red-500",
    "diamonds": "text-red-500",
    "spades":"text-black",
    "clubs": "text-black",
}

export default function Card ({suit, value, faceUp}) {
    const colour = suitColourMap[suit]
    return (
        <div className="border rounded-lg border-gray-300 shadow-sm w-card h-card flex items-center justify-center text-4xl">
            {faceUp ? 
            <>
                <span className={colour}>{valueMap[value] || value}</span>
                <span>{suitEmojiMap[suit]}</span>
            </>
            :
            <div className="w-full h-full bg-card-back bg-cover">Face Down</div>}
        </div>
    )
}