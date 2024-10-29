import React, { useState, useRef, useEffect } from "react";
import "./Wheel.css";

const Wheel = () => {
  const canvasRef = useRef(null);
  const [angle, setAngle] = useState(0);
  const [spinning, setSpinning] = useState(false);

  const segments = [
    { color: "#ff6347", label: "1" }, // Tomatenrot
    { color: "#ffa500", label: "2" }, // Orange
    { color: "#ffd700", label: "3" }, // Gold
    { color: "#32cd32", label: "4" }, // Limegreen
    { color: "#4682b4", label: "5" }, // Stahlblau
    { color: "#8a2be2", label: "6" }, // Blauviolett
  ];

  const spinWheel = () => {
    if (!spinning) {
      setSpinning(true);
      const spinAngle = Math.floor(2000 + Math.random() * 2000); // Zufällige Drehung zwischen 2000 und 4000 Grad
      const spinTime = 5000; // Zeit in ms, die das Rad dreht
      const startTime = Date.now();
      const endTime = startTime + spinTime;

      const rotate = () => {
        const now = Date.now();
        const remaining = endTime - now;

        if (remaining <= 0) {
          setSpinning(false);
          setAngle(prevAngle => prevAngle % 360); // Stelle sicher, dass der Winkel bei 360 Grad zurückgesetzt wird
          return;
        }

        // Easing function: Quadratic ease-out
        const easeOutQuad = t => t * (2 - t);

        const progress = 1 - remaining / spinTime;
        const easedProgress = easeOutQuad(progress);

        const currentAngle = easedProgress * spinAngle;
        setAngle(currentAngle);
        drawWheel(currentAngle);

        requestAnimationFrame(rotate);
      };

      rotate();
    }
  };

  const handleClick = (event) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const size = canvas.width;
    const halfSize = size / 2;

    // Berechne den Abstand des Klicks vom Mittelpunkt des Rads
    const distanceFromCenter = Math.sqrt(
      Math.pow(x - halfSize, 2) + Math.pow(y - halfSize, 2)
    );

    // Wenn der Klick in der Nähe des Mittelpunkts ist, das Rad drehen
    if (distanceFromCenter <= 50 && !spinning) {
      spinWheel();
    }
  };

  const drawWheel = (currentAngle) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const size = canvas.width;
    const halfSize = size / 2;
    const arc = (2 * Math.PI) / segments.length;

    ctx.clearRect(0, 0, size, size);

    segments.forEach((segment, i) => {
      ctx.beginPath();
      ctx.moveTo(halfSize, halfSize);
      ctx.arc(
        halfSize,
        halfSize,
        halfSize,
        arc * i + (currentAngle * Math.PI) / 180,
        arc * (i + 1) + (currentAngle * Math.PI) / 180
      );
      ctx.closePath();
      ctx.fillStyle = segment.color;
      ctx.fill();

      // Text auf den Segmenten, in der Mitte jedes Pizza-Slice
      ctx.save();
      ctx.translate(halfSize, halfSize);
      ctx.rotate(
        arc * i + (currentAngle * Math.PI) / 180 + arc / 2
      );
      ctx.textAlign = "center";
      ctx.fillStyle = "#fff";
      ctx.font = "bold 20px Arial";
      ctx.fillText(segment.label, halfSize * 0.5, 10); // Mittig im Slice positioniert
      ctx.restore();
    });

    // Mittelpunkt des Rads
    ctx.beginPath();
    ctx.arc(halfSize, halfSize, 50, 0, 2 * Math.PI);
    ctx.fillStyle = "#333";
    ctx.fill();
  };

  useEffect(() => {
    drawWheel(angle);
  }, [angle]);

  return (
    <div className="wheel-container">
      <canvas
        ref={canvasRef}
        width={400}
        height={400}
        className="wheel-canvas"
        onClick={handleClick}
      />
    </div>
  );
};

export default Wheel;
