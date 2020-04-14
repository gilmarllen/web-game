import KeyboardEventHandler from 'react-keyboard-event-handler';
import React, { useRef, useEffect, useState } from 'react';
import { Stage, Layer, Rect, Text } from 'react-konva';

const movimentConfig = {
  SPEED: 10,
  deltaX: {
    'up': 0,
    'down': 0,
    'left': -1,
    'right': +1
  },
  deltaY: {
    'up': -1,
    'down': +1,
    'left': 0,
    'right': 0
  }
}

function Player() {
  const [player, setPlayer] = useState({
    x: 0,
    y: 0
  })  

  return (
    <>
      <Rect
        x={player.x}
        y={player.y}
        width={20}
        height={20}
        fill={"red"}
      />
      <KeyboardEventHandler
        handleKeys={['up', 'down', 'left', 'right']}
        onKeyEvent={(key, e) => {
          console.log(key)
          setPlayer({
            x: player.x + (movimentConfig.deltaX[key] * movimentConfig.SPEED),
            y: player.y + (movimentConfig.deltaY[key] * movimentConfig.SPEED)
          })
          console.log(player)
        }}
      />
    </>
  )
}

export default Player;
