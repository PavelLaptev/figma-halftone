////////////////////////////////////////////////////////////////
///////////////////////// UI CONFIG ////////////////////////////
////////////////////////////////////////////////////////////////

// Show UI
figma.showUI(__html__, { width: 260, height: 556 });

////////////////////////////////////////////////////////////////
///////////////////////// ON MESSAGE ///////////////////////////
////////////////////////////////////////////////////////////////

let s4 = () => {
  return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
};

figma.ui.onmessage = async msg => {
  if (msg.type === "SVG-data") {
    const SVGNode = figma.createNodeFromSvg(msg.data as string) as FrameNode;

    if (msg.name === "Radial") {
      SVGNode.children[0].rotation = 45;
      SVGNode.children[0].x = -28;
      SVGNode.children[0].y = 110;
    }
    if (msg.name === "Linear") {
      SVGNode.children[0].rotation = -90;
      SVGNode.children[0].x = 208;
      SVGNode.children[0].y = 13;
    }

    if (msg.flatten) {
      const flattenSVG = figma.flatten([SVGNode]);
      flattenSVG.name = `${msg.name} ${s4()}`;
      flattenSVG.x = Math.round(
        figma.viewport.bounds.width / 2 +
          figma.viewport.bounds.x -
          flattenSVG.width / 2
      );
      flattenSVG.y = Math.round(
        figma.viewport.bounds.height / 2 +
          figma.viewport.bounds.y -
          flattenSVG.height / 2
      );

      flattenSVG.fills = [
        {
          blendMode: "NORMAL",
          color: {
            r: 0,
            g: 0,
            b: 0
          },
          opacity: 1,
          type: "SOLID",
          visible: true
        }
      ];

      figma.currentPage.appendChild(flattenSVG);

      figma.currentPage.selection = [flattenSVG];
      figma.viewport.scrollAndZoomIntoView([flattenSVG]);
    } else {
      SVGNode.name = `${msg.name} ${s4()}`;
      SVGNode.x = Math.round(
        figma.viewport.bounds.width / 2 +
          figma.viewport.bounds.x -
          SVGNode.width / 2
      );
      SVGNode.y = Math.round(
        figma.viewport.bounds.height / 2 +
          figma.viewport.bounds.y -
          SVGNode.height / 2
      );

      figma.currentPage.selection = [SVGNode];
      figma.viewport.scrollAndZoomIntoView([SVGNode]);
    }
  }
};
