import React from 'react';
import logo from './logo.svg';
import './Canvas.less';
import { transform } from 'typescript';

function Canvas() {
  // 生成一个canvas画布，鼠标左键可以拖动画布，滑轮可以缩放画布，右键可以呼出菜单
  const canvasRef = React.useMemo(() => React.createRef<HTMLCanvasElement>(), []);
  const [isDragging, setIsDragging] = React.useState(false);
  const [position, setPosition] = React.useState({ x: 0, y: 0 });
  const [scale, setScale] = React.useState(1);
  const canvasCenter = React.useMemo(() => ({ x: window.innerWidth / 2, y: window.innerHeight / 2 }), []);
  const [canvasPosition, setCanvasPosition] = React.useState({ x: 0, y: 0 });

  const handleMouseDown = React.useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    if (e.button === 0) {
      setIsDragging(true);

      setPosition({
        x: e.clientX,
        y: e.clientY,
      });

      const newX = canvasRef.current!.getBoundingClientRect().left - canvasCenter.x;
      const newY = canvasRef.current!.getBoundingClientRect().top - canvasCenter.y;

      setCanvasPosition({ x: newX, y: newY });
    } else if (e.button === 2) {
      // Right click menu logic here
      console.log("Right-click menu should be displayed here.");
    }
  }, [canvasCenter]);

  const handleMouseMove = React.useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    if (isDragging) {
      const newX = e.clientX - position.x;
      const newY = e.clientY - position.y;

      const setX = canvasPosition.x + newX;
      const setY = canvasPosition.y + newY;

      canvasRef.current!.style.transform = `translate(${setX}px, ${setY}px) scale(${scale})`;
    }
  }, [canvasPosition, isDragging, position]);


  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // const handleWheel = (e: React.WheelEvent<HTMLCanvasElement>) => {
  //   e.preventDefault();
  //   const rect = canvasRef.current!.getBoundingClientRect();
  //   const offsetX = e.clientX - rect.left;
  //   const offsetY = e.clientY - rect.top;
  //   const scaleAdjustment = e.deltaY * -0.01;
  //   const currentScale = scale;
  //   const maxScale = 2;
  //   const minScale = 0.25;
  //   let newScale = currentScale * (1 + scaleAdjustment);

  //   if (newScale > maxScale) {
  //     newScale = maxScale;
  //   } else if (newScale < minScale) {
  //     newScale = minScale;
  //   }

  //   const originX = offsetX / currentScale - offsetX / newScale;
  //   const originY = offsetY / currentScale - offsetY / newScale;

  //   setScale(newScale);
  //   // canvasRef.current!.style.transformOrigin = `${offsetX}px ${offsetY}px`;
  //   // canvasRef.current!.style.transform = `scale(${newScale}) translate(${originX}px, ${originY}px)`;
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
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={() => setIsDragging(false)}
        onMouseOut={handleMouseUp}
        // onWheel={handleWheel}
        width={10000}
        height={10000}
      />
    </div>
  );
}

export default Canvas;
