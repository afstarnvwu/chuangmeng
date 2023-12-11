import React from 'react';
import logo from './logo.svg';
import './Canvas.less';

function Canvas() {
  // 生成一个canvas画布，鼠标左键可以拖动画布，滑轮可以缩放画布，右键可以呼出菜单
  // const canvasRef = React.useRef<HTMLCanvasElement>(null);

  // // Initialize the canvas state with the center position
  // const [isDragging, setIsDragging] = React.useState(false);
  // const [position, setPosition] = React.useState({ x: 0, y: 0 });
  // const [scale, setScale] = React.useState(1);

  const canvasCenter = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  const [canvasPosition, setCanvasPosition] = React.useState({ x: canvasCenter.x, y: canvasCenter.y });

  // // Update canvas position state when mouse is moved while dragging
  // const handleMouseMove = (e: MouseEvent) => {
  //   if (isDragging) {
  //     setCanvasPosition(prevPosition => ({
  //       x: prevPosition.x + (e.clientX - position.x),
  //       y: prevPosition.y + (e.clientY - position.y)
  //     }));
  //     setPosition({ x: e.clientX, y: e.clientY });
  //   }
  // };

  // // Add event listener for mouse move on mount and clean up on unmount
  // React.useEffect(() => {
  //   const handleMouseUp = () => setIsDragging(false);

  //   window.addEventListener('mousemove', handleMouseMove);
  //   window.addEventListener('mouseup', handleMouseUp);

  //   return () => {
  //     window.removeEventListener('mousemove', handleMouseMove);
  //     window.removeEventListener('mouseup', handleMouseUp);
  //   };
  // }, [isDragging, position]);

  // // Apply the canvas position and scale when rendering the canvas
  // return (
  //   <canvas
  //     ref={canvasRef}
  //     className="canvas"
  //     style={{
  //       transform: `translate(${canvasPosition.x}px, ${canvasPosition.y}px) scale(${scale})`
  //     }}
  //     // onMouseDown={handleMouseDown}
  //   />
  // );
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const [isDragging, setIsDragging] = React.useState(false);
  const [position, setPosition] = React.useState({ x: 0, y: 0 });
  const [scale, setScale] = React.useState(1);

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (e.button === 0) {
      setIsDragging(true);
      setPosition({
        x: e.clientX - canvasRef.current!.offsetLeft,
        y: e.clientY - canvasRef.current!.offsetTop,
      });
    } else if (e.button === 2) {
      // Right click menu logic here
      console.log("Right-click menu should be displayed here.");
    }
  };
  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      setCanvasPosition(prevPosition => ({
        x: prevPosition.x + (e.clientX - position.x),
        y: prevPosition.y + (e.clientY - position.y)
      }));
      setPosition({ x: e.clientX, y: e.clientY });
    }
  };

  // Add event listener for mouse move on mount and clean up on unmount
  React.useEffect(() => {
    const handleMouseUp = () => setIsDragging(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, position]);
  // const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
  //   if (isDragging) {
  //     const newX = e.clientX - canvasRef.current!.offsetLeft;
  //     const newY = e.clientY - canvasRef.current!.offsetTop;
  //     const diffX = newX - position.x;
  //     const diffY = newY - position.y;
  //     console.log(`X: ${diffX}, Y: ${diffY}`);
  //     // position.x = diffX;
  //     // position.y = diffY;


  //     canvasRef.current!.style.transform = `translate(${diffX}px, ${diffY}px)`;
  //   }
  // };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleWheel = (e: React.WheelEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const rect = canvasRef.current!.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;
    const scaleAdjustment = e.deltaY * -0.01;
    const newScale = Math.max(0.5, Math.min(3, scale * (1 - scaleAdjustment))); // Assuming a max scale of 3 for example
    const originX = offsetX / scale - offsetX / newScale;
    const originY = offsetY / scale - offsetY / newScale;
    setScale(newScale);
    canvasRef.current!.style.transformOrigin = `${offsetX}px ${offsetY}px`;
    canvasRef.current!.style.transform = `scale(${newScale}) translate(${originX}px, ${originY}px)`;
  };

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
        // onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseOut={handleMouseUp}
        onWheel={handleWheel}
        width={800}
        height={800}
        style={{
          transform: `translate(${canvasPosition.x}px, ${canvasPosition.y}px))`
        }}
      />
    </div>
  );
}

export default Canvas;
