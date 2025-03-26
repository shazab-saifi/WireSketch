"use client";

import React, { ReactNode, useContext, useEffect, useRef, useState } from "react";
import rough from "roughjs";
import { RoughCanvas } from "roughjs/bin/canvas";
import { Context } from "state/context";

function Canvas({ children }: { children: ReactNode }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const offscreenCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isClient, setIsClient] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [pencilPoints, setPencilPoints] = useState<{ x: number; y: number }[]>([]);
  const { tool } = useContext(Context);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    offscreenCanvasRef.current = document.createElement("canvas");

    const resize = () => {
      if (!canvasRef.current || !offscreenCanvasRef.current) return;

      const width = window.innerWidth;
      const height = window.innerHeight;

      canvas.width = width;
      canvas.height = height;
      offscreenCanvasRef.current.width = width;
      offscreenCanvasRef.current.height = height;
    };

    resize();
    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, [isClient]);

  useEffect(() => {
    if (!isClient || !canvasRef.current) return;

    const canvas = canvasRef.current;

    const handleMouseDown = (e: MouseEvent) => {
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      setStartX(x);
      setStartY(y);
      setIsDrawing(true);
      document.body.style.cursor = "crosshair";

      if (tool === "pencil") {
        setPencilPoints([{ x, y }]);
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDrawing || !canvas || !offscreenCanvasRef.current) return;

      const rect = canvas.getBoundingClientRect();
      const currentX = e.clientX - rect.left;
      const currentY = e.clientY - rect.top;

      const ctx = canvas.getContext("2d");
      const offscreenCtx = offscreenCanvasRef.current.getContext("2d");
      if (!ctx || !offscreenCtx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(offscreenCanvasRef.current, 0, 0);

      const rc = rough.canvas(canvas);

      switch (tool) {
        case "rectangle":
          rc.rectangle(startX, startY, currentX - startX, currentY - startY, { stroke: "white" });
          break;
        case "circle":
          const centerX = (startX + currentX) / 2;
          const centerY = (startY + currentY) / 2;
          const width = Math.abs(currentX - startX);
          const height = Math.abs(currentY - startY);
          rc.ellipse(centerX, centerY, width, height, { stroke: "white" });
          break;
        case "line":
          rc.line(startX, startY, currentX, currentY, { stroke: "white" });
          break;
        case "arrow":
          drawArrow(rc, startX, startY, currentX, currentY);
          break;
        case "pencil":
          setPencilPoints((prev) => [...prev, { x: currentX, y: currentY }]);
          for (let i = 1; i < pencilPoints.length; i++) {
            const prevPoint = pencilPoints[i - 1];
            const currentPoint = pencilPoints[i];

            if (prevPoint && currentPoint) {
              rc.line(
                prevPoint.x, prevPoint.y,
                currentPoint.x, currentPoint.y,
                { stroke: "white", roughness: 1.5 }
              );
            }
          }
          break;
      }
    };

    const handleMouseUp = (e: MouseEvent) => {
      if (!isDrawing || !canvas || !offscreenCanvasRef.current) return;

      const rect = canvas.getBoundingClientRect();
      const endX = e.clientX - rect.left;
      const endY = e.clientY - rect.top;

      const offscreenCtx = offscreenCanvasRef.current.getContext("2d");
      if (!offscreenCtx) return;

      const rc = rough.canvas(offscreenCanvasRef.current);

      switch (tool) {
        case "rectangle":
          rc.rectangle(startX, startY, endX - startX, endY - startY, { stroke: "white" });
          break;
        case "circle":
          const centerX = (startX + endX) / 2;
          const centerY = (startY + endY) / 2;
          const width = Math.abs(endX - startX);
          const height = Math.abs(endY - startY);
          rc.ellipse(centerX, centerY, width, height, { stroke: "white" });
          break;
        case "line":
          rc.line(startX, startY, endX, endY, { stroke: "white" });
          break;
        case "arrow":
          drawArrow(rc, startX, startY, endX, endY);
          break;
        case "pencil":
          for (let i = 1; i < pencilPoints.length; i++) {
            const prevPoint = pencilPoints[i - 1];
            const currentPoint = pencilPoints[i];

            if (prevPoint && currentPoint) {
              rc.line(
                prevPoint.x, prevPoint.y,
                currentPoint.x, currentPoint.y,
                { stroke: "white", roughness: 1.5 }
              );
            }
          }
          setPencilPoints([]);
          break;
      }

      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(offscreenCanvasRef.current, 0, 0);
      }

      setIsDrawing(false);
      document.body.style.cursor = "default";
    };

    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isClient, isDrawing, startX, startY, tool, pencilPoints]);

  const drawArrow = (rc: RoughCanvas, startX: number, startY: number, endX: number, endY: number) => {
    rc.line(startX, startY, endX, endY, { stroke: "white" });

    const arrowheadLength = 10;
    const lineAngle = Math.atan2(endY - startY, endX - startX);

    const leftArrowX = endX - arrowheadLength * Math.cos(lineAngle - Math.PI / 6);
    const leftArrowY = endY - arrowheadLength * Math.sin(lineAngle - Math.PI / 6);

    const rightArrowX = endX - arrowheadLength * Math.cos(lineAngle + Math.PI / 6);
    const rightArrowY = endY - arrowheadLength * Math.sin(lineAngle + Math.PI / 6);

    rc.line(endX, endY, leftArrowX, leftArrowY, { stroke: "white" });
    rc.line(endX, endY, rightArrowX, rightArrowY, { stroke: "white" });
  };

  if (!isClient) return null;

  return (
    <div className="relative w-full h-full">
      <canvas ref={canvasRef} className="w-full h-full bg-[#1A1A19]" />
      {children}
    </div>
  );
}

export default Canvas;
