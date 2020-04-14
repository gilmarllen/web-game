import React, {useRef, useEffect, useState} from 'react';

function Players(props) {
    const [players, setPlayers] = useState([
        {x: 100, y: 100},
        {x: 200, y: 200},
    ])

    useEffect(() => {
        const canvas = props.canvas.current
        const context = canvas.getContext('2d')

        context.fillStyle = '#F0DB4F'
        for(const player of players){
            context.fillRect(player.x, player.y, 50, 50)
        }
    })

    return null
}

export default Players;
