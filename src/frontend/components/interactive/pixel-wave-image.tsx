"use client";

import {
  useEffect,
  useRef,
} from "react";

export function PixelWaveImage() {
  const hostRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);



  /*
   * ------------------------------------------------------
   * 1. SCROLL REVEAL
   * ------------------------------------------------------
   */


  /*
   * ------------------------------------------------------
   * 2. PIXEL WAVE EFFECT
   * ------------------------------------------------------
   */
  useEffect(() => {
    const hostNode = hostRef.current;
    const canvasNode = canvasRef.current;

    if (!hostNode || !canvasNode) {
      return;
    }

    /*
     * Explicit non-null aliases.
     * This prevents the TypeScript errors you were getting
     * inside nested functions.
     */
    const host: HTMLDivElement = hostNode;
    const canvas: HTMLCanvasElement = canvasNode;

    const contextValue = canvas.getContext("2d");

    if (!contextValue) {
      return;
    }

    const context: CanvasRenderingContext2D =
      contextValue;

    const bufferCanvas =
      document.createElement("canvas");

    const bufferContextValue =
      bufferCanvas.getContext("2d");

    if (!bufferContextValue) {
      return;
    }

    const bufferContext: CanvasRenderingContext2D =
      bufferContextValue;

    const image = new window.Image();

    let animationFrame = 0;
    let imageReady = false;

    let width = 1;
    let height = 1;
    let dpr = 1;

    let intensity = 0;

    const pointer = {
      x: 0,
      y: 0,
      inside: false,
    };

    const reducedMotion =
      window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

    const finePointer =
      window.matchMedia(
        "(pointer: fine)"
      ).matches;

    const enableInteraction =
      !reducedMotion && finePointer;

    /*
     * Draw image into hidden buffer canvas.
     * Behaves similarly to object-fit: cover.
     */
    function drawImageCover() {
      if (!imageReady) {
        return;
      }

      const imageWidth = image.naturalWidth;
      const imageHeight = image.naturalHeight;

      if (
        imageWidth === 0 ||
        imageHeight === 0
      ) {
        return;
      }

      const imageRatio =
        imageWidth / imageHeight;

      const canvasRatio =
        width / height;

      let sourceX = 0;
      let sourceY = 0;

      let sourceWidth = imageWidth;
      let sourceHeight = imageHeight;

      if (imageRatio > canvasRatio) {
        sourceWidth =
          imageHeight * canvasRatio;

        sourceX =
          (imageWidth - sourceWidth) / 2;
      } else {
        sourceHeight =
          imageWidth / canvasRatio;

        sourceY =
          (imageHeight - sourceHeight) / 2;
      }

      bufferContext.clearRect(
        0,
        0,
        width,
        height
      );

      bufferContext.drawImage(
        image,

        sourceX,
        sourceY,
        sourceWidth,
        sourceHeight,

        0,
        0,
        width,
        height
      );
    }

    /*
     * Resize canvas correctly on desktop/mobile.
     */
    function resize() {
      const rect =
        host.getBoundingClientRect();

      dpr = Math.min(
        window.devicePixelRatio || 1,
        2
      );

      width = Math.max(
        1,
        Math.floor(rect.width * dpr)
      );

      height = Math.max(
        1,
        Math.floor(rect.height * dpr)
      );

      canvas.width = width;
      canvas.height = height;

      bufferCanvas.width = width;
      bufferCanvas.height = height;

      drawImageCover();
    }

    /*
     * Main animation loop.
     */
    function render(time: number) {
      if (!imageReady) {
        animationFrame =
          requestAnimationFrame(render);

        return;
      }

      const targetIntensity =
        pointer.inside &&
        enableInteraction
          ? 1
          : 0;

      /*
       * Smoothly enter / leave distortion.
       */
      intensity +=
        (targetIntensity - intensity) *
        0.11;

      context.clearRect(
        0,
        0,
        width,
        height
      );

      /*
       * No cursor interaction:
       * just draw normal image.
       */
      if (intensity < 0.005) {
        context.drawImage(
          bufferCanvas,
          0,
          0
        );

        animationFrame =
          requestAnimationFrame(render);

        return;
      }

      /*
       * Pixel-wave controls.
       *
       * tileSize:
       *   Larger = larger visible pixels
       *
       * radius:
       *   Size of affected area around mouse
       *
       * amplitude:
       *   Strength of wave movement
       */
      const tileSize = 24 * dpr;
      const radius = 155 * dpr;

      const amplitude =
        19 * dpr * intensity;

      for (
        let y = 0;
        y < height;
        y += tileSize
      ) {
        for (
          let x = 0;
          x < width;
          x += tileSize
        ) {
          const tileWidth =
            Math.min(
              tileSize,
              width - x
            );

          const tileHeight =
            Math.min(
              tileSize,
              height - y
            );

          const centerX =
            x + tileWidth / 2;

          const centerY =
            y + tileHeight / 2;

          const deltaX =
            centerX - pointer.x;

          const deltaY =
            centerY - pointer.y;

          const distance =
            Math.sqrt(
              deltaX * deltaX +
              deltaY * deltaY
            );

          let moveX = 0;
          let moveY = 0;

          if (distance < radius) {
            const safeDistance =
              Math.max(
                distance,
                1
              );

            const falloff =
              Math.pow(
                1 -
                  distance /
                    radius,
                1.6
              );

            const wave =
              Math.sin(
                distance /
                  (13 * dpr) -
                  time * 0.012
              ) *
              amplitude *
              falloff;

            moveX =
              (deltaX /
                safeDistance) *
              wave;

            moveY =
              (deltaY /
                safeDistance) *
              wave;
          }

          context.drawImage(
            bufferCanvas,

            x,
            y,
            tileWidth,
            tileHeight,

            x + moveX,
            y + moveY,

            /*
             * Small overlap removes
             * visible gaps between pixels.
             */
            tileWidth + dpr,
            tileHeight + dpr
          );
        }
      }

      animationFrame =
        requestAnimationFrame(render);
    }

    /*
     * Mouse tracking.
     */
    function handlePointerMove(
      event: PointerEvent
    ) {
      const rect =
        host.getBoundingClientRect();

      pointer.x =
        (event.clientX -
          rect.left) *
        dpr;

      pointer.y =
        (event.clientY -
          rect.top) *
        dpr;

      pointer.inside = true;
    }

    function handlePointerLeave() {
      pointer.inside = false;
    }

    /*
     * Load homepage image.
     */
    image.onload = () => {
      imageReady = true;

      resize();
    };

    image.src = "/growth-path.png";

    /*
     * Watch responsive layout changes.
     */
    const resizeObserver =
      new ResizeObserver(() => {
        resize();
      });

    resizeObserver.observe(host);

    /*
     * Mouse listeners.
     */
    host.addEventListener(
      "pointermove",
      handlePointerMove
    );

    host.addEventListener(
      "pointerleave",
      handlePointerLeave
    );

    resize();

    animationFrame =
      requestAnimationFrame(render);

    /*
     * Cleanup.
     */
    return () => {
      cancelAnimationFrame(
        animationFrame
      );

      resizeObserver.disconnect();

      host.removeEventListener(
        "pointermove",
        handlePointerMove
      );

      host.removeEventListener(
        "pointerleave",
        handlePointerLeave
      );
    };
  }, []);

  return (
 <div
  ref={hostRef}
  className="pixel-wave-frame"
>
      <canvas
        ref={canvasRef}
        className="pixel-wave-canvas"
        role="img"
        aria-label="Abstract architectural Growth Foundry visual"
      />

      <span className="image-caption">
        Clarity → capability → momentum
      </span>
    </div>
  );
}