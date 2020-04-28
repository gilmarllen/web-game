import Player from './Player.js'

import React, { useRef, useEffect } from 'react';
import { Stage, Layer, Rect, Text } from 'react-konva';
import useMousePosition from '@react-hook/mouse-position'


function Arena() {

  const [mousePosition, refMouse] = useMousePosition(
    0, // enterDelay
    0, // leaveDelay
    60 // fps
  )

  return (
    <div ref={refMouse}>
      <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer>
          <Player mouse={mousePosition}></Player>
        </Layer>
      </Stage>
    </div>
  )
}

export default Arena;
