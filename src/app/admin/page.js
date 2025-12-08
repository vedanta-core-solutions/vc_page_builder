import CurrentRegisteredCard from "@/components/CurrentRegisteredCard"

export default async function currentCards() {
    let data = []
    try {
        const currentRagisteredCard = await fetch("http://localhost:9000/registeredUrl", {
            method: "GET",
            cache: "no-store"
        })
        if (!currentRagisteredCard) {
            throw new Error("Failed to fetch registered cards");
        }
        data = await currentRagisteredCard.json()
    } catch (error) {
        console.log("error happen on Current card user fetch", error)
    }

    return <CurrentRegisteredCard data={data} />
}