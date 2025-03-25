"use client";

import React, { ReactNode, useEffect, useRef, useState } from "react";
import rough from "roughjs";

function Canvas({children}: {children: ReactNode}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const offscreenCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  
  useEffect(() => {
    const resizeCanvas = () => {
      if (!canvasRef.current) return;
  
      const width = window.innerWidth;
      const height = window.innerHeight;
  
      // Save current drawings to the offscreen canvas
      if (!offscreenCanvasRef.current) {
        offscreenCanvasRef.current = document.createElement("canvas");
      } else {
        const offscreenCtx = offscreenCanvasRef.current.getContext("2d");
        offscreenCtx?.drawImage(canvasRef.current, 0, 0);
      }
  
      // Resize both canvases
      canvasRef.current.width = width;
      canvasRef.current.height = height;
      offscreenCanvasRef.current.width = width;
      offscreenCanvasRef.current.height = height;
  
      // Restore drawings from offscreen canvas to main canvas
      const ctx = canvasRef.current.getContext("2d");
      ctx?.drawImage(offscreenCanvasRef.current, 0, 0);
    };
  
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
  
    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  const handleMouseDown = (e: MouseEvent) => {
    if (!canvasRef.current) return;
    document.body.style.cursor = "crosshair"
    const rect = canvasRef.current.getBoundingClientRect();
    setStartX(e.clientX - rect.left);
    setStartY(e.clientY - rect.top);
    setIsDrawing(true);
  };

  const handleMouseUp = (e: MouseEvent) => {
    if (!isDrawing || !canvasRef.current || !offscreenCanvasRef.current) return;
    
    const rect = canvasRef.current.getBoundingClientRect();
    const width = e.clientX - rect.left - startX;
    const height = e.clientY - rect.top - startY;
    
    const offscreenCtx = offscreenCanvasRef.current.getContext("2d");
    const rc = rough.canvas(offscreenCanvasRef.current);
    
    if (offscreenCtx) {
      rc.rectangle(startX, startY, width, height, { stroke: "white" });
    }

    redrawCanvas();
    document.body.style.cursor = "default";
    setIsDrawing(false);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDrawing || !canvasRef.current || !offscreenCanvasRef.current) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const width = e.clientX - rect.left - startX;
    const height = e.clientY - rect.top - startY;

    redrawCanvas();

    const rc = rough.canvas(canvasRef.current);
    rc.rectangle(startX, startY, width, height, { stroke: "white" });
  };

  const redrawCanvas = () => {
    if (!canvasRef.current || !offscreenCanvasRef.current) return;

    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

    ctx.drawImage(offscreenCanvasRef.current, 0, 0);
  };

  useEffect(() => {
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isDrawing, startX, startY]);

  return (
    <div className="relative w-full h-full">
      <canvas ref={canvasRef} width={900}></canvas>
      {children}
    </div>
  )
}

export default Canvas;
