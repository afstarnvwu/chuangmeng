import React from 'react';
import logo from './logo.svg';
import './Canvas.less';

function Canvas() {
  // 生成一个canvas画布，鼠标左键可以拖动画布，滑轮可以缩放画布，右键可以呼出菜单
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const [isDragging, setIsDragging] = React.useState(false);
  const [position, setPosition] = React.useState({ x: 0, y: 0 });
  const [scale, setScale] = React.useState(1);

  // const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
  //   if (e.button === 0) {
  //     setIsDragging(true);
  //     setPosition({
  //       x: e.clientX - canvasRef.current!.offsetLeft,
  //       y: e.clientY - canvasRef.current!.offsetTop,
  //     });
  //   } else if (e.button === 2) {
  //     // Right click menu logic here
  //     console.log("Right-click menu should be displayed here.");
  //   }
  // };

  // const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
  //   if (isDragging) {
  //     const newX = e.clientX - canvasRef.current!.offsetLeft;
  //     const newY = e.clientY - canvasRef.current!.offsetTop;
  //     const diffX = newX - position.x;
  //     const diffY = newY - position.y;

  //     canvasRef.current!.style.transform = `translate(${diffX}px, ${diffY}px)`;
  //   }
  // };

  // const handleMouseUp = () => {
  //   setIsDragging(false);
  // };

  // const handleWheel = (e: React.WheelEvent<HTMLCanvasElement>) => {
  //   e.preventDefault();
  //   const scaleAdjustment = e.deltaY * -0.01;
  //   const newScale = scale + scaleAdjustment;
  //   setScale(newScale);
  //   canvasRef.current!.style.transform = `scale(${newScale})`;
  // };

  const handleContextMenu = (e: React.MouseEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    // Custom context menu logic here
    console.log("Custom context menu should appear at this point.");
  };

  // Update the useEffect to use a correct event listener type
  React.useEffect(() => {
    const handleContextMenuWrapper = (event: MouseEvent) => {
      handleContextMenu(event as unknown as React.MouseEvent<HTMLCanvasElement>);
    };

    const canvasEl = canvasRef.current!;
    canvasEl.addEventListener('contextmenu', handleContextMenuWrapper);

    // 绘制网格
    const ctx = canvasEl.getContext('2d');
    if (ctx) {
      const gridSize = 20; // 网格大小
      const canvasWidth = canvasEl.width;
      const canvasHeight = canvasEl.height;

      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
      ctx.strokeStyle = '#ccc';
      ctx.lineWidth = 0.5;

      for (let x = 0; x <= canvasWidth; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvasHeight);
        ctx.stroke();
      }

      for (let y = 0; y <= canvasHeight; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvasWidth, y);
        ctx.stroke();
      }
    }

    return () => {
      canvasEl.removeEventListener('contextmenu', handleContextMenuWrapper);
    };
  }, []);

  return (
    <div className="canvas-container">
      <canvas
        ref={canvasRef}
        className="canvas"
        // onMouseDown={handleMouseDown}
        // onMouseMove={handleMouseMove}
        // onMouseUp={handleMouseUp}
        // onMouseOut={handleMouseUp}
        // onWheel={handleWheel}
        width={800}
        height={800}
      />
    </div>
  );
}

export default Canvas;
