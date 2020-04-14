import Player from './Player.js'

import React, { useRef, useEffect } from 'react';
import { Stage, Layer, Rect, Text } from 'react-konva';

function Arena() {

  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        <Player></Player>
      </Layer>
    </Stage>
  );
}

export default Arena;
