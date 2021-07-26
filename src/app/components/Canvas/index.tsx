import * as React from "react";
import { Context } from "svgcanvas";
import styles from "./styles.module.scss";

interface Props {
  className?: any;
  params?: {
    amount: number;
  };
}

const Canvas: React.FunctionComponent<Props> = props => {
  const canvasRef = React.useRef(null);
  const canvasSize = {
    width: 360 * window.devicePixelRatio,
    height: 360 * window.devicePixelRatio
  };

  //////////////////////////////////////////////
  ////////////////// HANDLERS //////////////////
  //////////////////////////////////////////////

  const drawCircle = (ctx, props: { x: number; y: number; size: number }) => {
    ctx.fillStyle = "#000000";
    ctx.beginPath();
    ctx.arc(props.x, props.y, props.size, 0, 2 * Math.PI);
    ctx.fill();
  };

  const render = ctx => {
    new Array(props.params.amount).fill(0).forEach((_, i) => {
      new Array(props.params.amount).fill(0).forEach((_, j) => {
        drawCircle(ctx, {
          x: 10 + 20 * i,
          y: 10 + 20 * j,
          size: 8
        });
      });
    });
  };

  //////////////////////////////////////////////
  ///////////////// USE EFFECT /////////////////
  //////////////////////////////////////////////
  React.useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = canvasSize.width;
    canvas.height = canvasSize.height;

    const context = canvas.getContext("2d");
    const c2s = Context(canvasSize.width, canvasSize.height);

    // render(c2s);
    render(context);
  }, [props.params.amount]);

  //////////////////////////////////////////////
  /////////////////// RENDER ///////////////////
  //////////////////////////////////////////////

  return (
    <canvas
      className={`${styles.canvas} ${props.className}`}
      ref={canvasRef}
    ></canvas>
  );
};

Canvas.defaultProps = {
  className: "",
  params: {
    amount: 50
  }
} as Partial<Props>;

export default Canvas;
