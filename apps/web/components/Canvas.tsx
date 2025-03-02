"use client";

import React, { useEffect, useRef, useState } from 'react'
import rough from "roughjs"

function Canvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);

  useEffect(() => {
    const resizeCanvas = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
      }
    }

    resizeCanvas();

    window.addEventListener('resize', resizeCanvas);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    }
  }, []);

  const getCanvasCoords = (e: MouseEvent) => {
    if(!canvasRef.current) return {x: 0, y: 0};
    const rect = canvasRef.current.getBoundingClientRect();
    return {
      x: e.clientX - rect.top,
      y: e.clientY - rect.left
    }
  }

  const handleMouseDown = (e: MouseEvent) => {
    const {x, y} = getCanvasCoords(e);
    setStartX(x);
    setStartY(y);
    setIsDrawing(true);
  }

  const handleMouseUp = (e: MouseEvent) => {
    if (!isDrawing || !canvasRef.current) return;
    const {x: endX, y: endY} = getCanvasCoords(e);
    const rc = rough.canvas(canvasRef.current);
    rc.rectangle(e.clientX, e.clientY,startX - endX, startY - endY, {stroke: 'white'});
    setIsDrawing(false);
  }

  useEffect(() => {
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    }
  }, [isDrawing, startX, startY]);

  return <canvas ref={canvasRef} />
}

export default Canvas