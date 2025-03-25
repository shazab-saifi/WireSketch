"use client";

import React, { ReactNode, useContext, useEffect, useRef, useState } from "react";
import rough from "roughjs";
import { RoughCanvas } from "roughjs/bin/canvas";
import { Context } from "state/context";

function Canvas({ children }: { children: ReactNode }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const offscreenCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const { tool } = useContext(Context);

  useEffect(() => {
    const resizeCanvas = () => {
      if (!canvasRef.current) return;

      const width = window.innerWidth;
      const height = window.innerHeight;

      if (!offscreenCanvasRef.current) {
        offscreenCanvasRef.current = document.createElement("canvas");
      } else {
        const offscreenCtx = offscreenCanvasRef.current.getContext("2d");
        offscreenCtx?.drawImage(canvasRef.current, 0, 0);
      }

      canvasRef.current.width = width;
      canvasRef.current.height = height;
      offscreenCanvasRef.current.width = width;
      offscreenCanvasRef.current.height = height;

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
    const endX = e.clientX;
    const endY = e.clientY;

    const offscreenCtx = offscreenCanvasRef.current.getContext("2d");
    const rc = rough.canvas(offscreenCanvasRef.current);

    if (offscreenCtx && tool === 'rectangle') {
      rc.rectangle(startX, startY, width, height, { stroke: "white" });
    } else if (tool === 'circle') {
      const centerX = (startX + e.clientX) / 2;
      const centerY = (startY + e.clientY) / 2;
      const width = Math.abs(e.clientX - startX);
      const height = Math.abs(e.clientY - startY);

      rc.ellipse(centerX, centerY, width, height, { stroke: 'white' });
    } else if (tool === 'line') {
      rc.line(startX, startY, e.clientX, e.clientY, { stroke: 'white' });
    } else if (tool === 'arrow') {
      drawArrow(rc, startX, startY, endX, endY)
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
    const endX = e.clientX;
    const endY = e.clientY;

    redrawCanvas();

    const rc = rough.canvas(canvasRef.current);
    if (tool === 'rectangle') {
      rc.rectangle(startX, startY, width, height, { stroke: "white" });
    } else if (tool === 'circle') {
      drawCircle({ rc, startX, startY, endX, endY });
    } else if (tool === 'line') {
      rc.line(startX, startY, e.clientX, e.clientY, { stroke: 'white' });
    } else if (tool === 'arrow') {
      drawArrow(rc, startX, startY, endX, endY)
    }
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

  const drawCircle = ({
    rc,
    startX,
    startY,
    endX,
    endY
  }: {
    rc: RoughCanvas,
    startX: number,
    startY: number,
    endX: number,
    endY: number
  }) => {
    const centerX = (startX + endX) / 2;
    const centerY = (startY + endY) / 2;
    const width = Math.abs(endX - startX);
    const height = Math.abs(endY - startY);

    rc.ellipse(centerX, centerY, width, height, { stroke: 'white' });
  };

  const drawArrow = (
    rc: RoughCanvas,
    startX: number,
    startY: number,
    endX: number,
    endY: number,
  ): void => {
    rc.line(startX, startY, endX, endY, { stroke: 'white' });

    const arrowheadLength = 10;
    const lineAngle = Math.atan2(endY - startY, endX - startX);

    const leftArrowX = endX - arrowheadLength * Math.cos(lineAngle - Math.PI / 6);
    const leftArrowY = endY - arrowheadLength * Math.sin(lineAngle - Math.PI / 6);

    const rightArrowX = endX - arrowheadLength * Math.cos(lineAngle + Math.PI / 6);
    const rightArrowY = endY - arrowheadLength * Math.sin(lineAngle + Math.PI / 6);

    rc.line(endX, endY, leftArrowX, leftArrowY, { stroke: 'white' });
    rc.line(endX, endY, rightArrowX, rightArrowY, { stroke: 'white' });
  };

  return (
    <div className="relative w-full h-full">
      <canvas ref={canvasRef} width={900}></canvas>
      {children}
    </div>
  )
}

export default Canvas;
