import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

const MdmMakerDraft = () => {
    const navigate = useNavigate();
    const [players, setPlayers] = useState([])

    useEffect(() => {
        const url = "/api/v1/players/index"
        fetch(url)
        .then((res) => {
            if (res.ok) {
                return res.json()
            }
            throw new Error("Network response was not ok.")
            })
        .then((res) => setPlayers(res))
        .catch(() => navigate("/"))
    }, []);

    console.log(players)

    return (
        <>
            
        </>
    )
}

export default MdmMakerDraft