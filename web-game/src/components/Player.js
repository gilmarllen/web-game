import React, { useRef, useEffect, useState } from 'react'
import { Stage, Layer, Rect, Text, Circle, Wedge } from 'react-konva'

const moviment = {
  SPEED: 5,
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
  },
  inputs: [
    'up',
    'down',
    'left',
    'right',
  ]
}

// TODO move to util
const getAngle = (p1, p2) => Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180 / Math.PI

const useAnimationFrame = callback => {
  // Use useRef for mutable variables that we want to persist
  // without triggering a re-render on their change
  const requestRef = React.useRef();
  const previousTimeRef = React.useRef();
  
  const animate = time => {
    if (previousTimeRef.current != undefined) {
      const deltaTime = time - previousTimeRef.current;
      callback(deltaTime)
    }
    previousTimeRef.current = time;
    requestRef.current = requestAnimationFrame(animate);
  }
  
  React.useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, []); // Make sure the effect runs only once
}

// TODO move to constraints or state
const FPS = 60
const PLAYER_SIZE = 15
const PLAYER_LABEL_FONT_SIZE = 15
const WEAPON_SIZE = 25
const WEAPON_ANGLE = 30
const MAP_KEY = {
  'ArrowUp': 'up',
  'ArrowDown': 'down',
  'ArrowRight': 'right',
  'ArrowLeft': 'left'
}

function Player({mouse}) {
  const [player, setPlayer] = useState({
    x: 50,
    y: 50,
    radius: PLAYER_SIZE,
    moviment: {
      'up': 0,
      'down': 0,
      'right': 0,
      'left': 0
    }
  })

  const [weapon, setWeapon] = useState({
    radius: WEAPON_SIZE,
    angle: WEAPON_ANGLE,
    rotation: 0
  })

  useEffect(() => {
  const movePlayerByKey = value => 
    e => {
      const dir = MAP_KEY[e.code]
      if(dir && player.moviment[dir] !== value){
        setPlayer(prevPlayer => {
          prevPlayer.moviment[dir] = value
          return prevPlayer
        })
      }
    }

  document.addEventListener('keydown', movePlayerByKey(1))
  document.addEventListener('keyup', movePlayerByKey(0))
  return () => {
    document.removeEventListener("keydown", movePlayerByKey);
    document.removeEventListener("keyup", movePlayerByKey);
  };
}, []);

  useAnimationFrame(() => {
    setPlayer(prevPlayer => ({
      ...prevPlayer,
      x: prevPlayer.x + (prevPlayer.moviment['right'] * moviment.SPEED) - (prevPlayer.moviment['left'] * moviment.SPEED),
      y: prevPlayer.y + (prevPlayer.moviment['down'] * moviment.SPEED) - (prevPlayer.moviment['up'] * moviment.SPEED),
    }))
  })

  return (
    <>
      <Text text="#PLAYER" fontSize={PLAYER_LABEL_FONT_SIZE} x={player.x - (2 * player.radius)} y={player.y - (2 * player.radius)}/>
      <Circle
        x={player.x}
        y={player.y}
        radius={player.radius}
        fill={"red"}
      />
      <Wedge
        x={player.x}
        y={player.y}
        radius={weapon.radius}
        angle={weapon.angle}
        rotation={getAngle(player, mouse) - (weapon.angle / 2)}
        fill={"black"}
      />
    </>
  )
}

export default Player;
