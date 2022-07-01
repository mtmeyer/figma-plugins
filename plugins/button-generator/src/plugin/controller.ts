import { PostMessageData } from '../app/ui';

figma.showUI(__html__, { themeColors: true, width: 400, height: 530 });

figma.ui.onmessage = (msg) => {
  if (msg.type === 'create-button') {
    const buttonData = msg.data as PostMessageData;
    createButton(buttonData);
  } else {
    figma.closePlugin();
  }
};

async function createButton(buttonData: PostMessageData) {
  await figma.loadFontAsync({ family: 'Inter', style: 'Regular' });

  const { width, height, radius, stroke, backgroundColor, textColor, text, type } = buttonData;

  //Set constraint variable
  const stretchConstraint: Constraints = {
    horizontal: 'STRETCH',
    vertical: 'STRETCH',
  };

  //Create button component
  const buttonComponent = figma.createComponent();
  buttonComponent.resizeWithoutConstraints(width, height);
  if (type === 'secondary') {
    buttonComponent.name = 'Secondary button';
  } else {
    buttonComponent.name = 'Primary button';
  }
  //Create button background
  const buttonBG = figma.createRectangle();
  buttonBG.cornerRadius = radius;
  buttonBG.resizeWithoutConstraints(width, height);
  buttonBG.constraints = stretchConstraint;
  let backgroundRGB = hexToRgb(backgroundColor);

  if (type === 'secondary') {
    // Add stroke
    buttonBG.strokes = [
      {
        type: 'SOLID',
        color: {
          r: backgroundRGB.r / 255,
          g: backgroundRGB.g / 255,
          b: backgroundRGB.b / 255,
        },
      },
    ];
    //Remove fill
    buttonBG.fills = [
      {
        type: 'SOLID',
        visible: false,
        color: { r: 1, g: 1, b: 1 },
      },
    ];

    //Set stroke weight
    buttonBG.strokeWeight = stroke;
  } else {
    //Set fill color
    buttonBG.fills = [
      {
        type: 'SOLID',
        color: {
          r: backgroundRGB.r / 255,
          g: backgroundRGB.g / 255,
          b: backgroundRGB.b / 255,
        },
      },
    ];
  }
  buttonComponent.appendChild(buttonBG);

  //Create button text
  let textRGB = hexToRgb(textColor);
  const textLayer = figma.createText();
  textLayer.fontName = { family: 'Inter', style: 'Regular' };
  textLayer.characters = text;
  textLayer.textAlignHorizontal = 'CENTER';
  textLayer.textAlignVertical = 'CENTER';
  textLayer.resizeWithoutConstraints(width, height);

  textLayer.constraints = stretchConstraint;

  //Set text color
  textLayer.fills = [
    {
      type: 'SOLID',
      color: {
        r: textRGB.r / 255,
        g: textRGB.g / 255,
        b: textRGB.b / 255,
      },
    },
  ];
  buttonComponent.appendChild(textLayer);

  figma.currentPage.selection = [buttonComponent];

  //Move button component to middle of viewport
  buttonComponent.x = figma.viewport.center.x - buttonComponent.width / 2;
  buttonComponent.y = figma.viewport.center.y - buttonComponent.height / 2;

  // This is how figma responds back to the ui
  figma.ui.postMessage({
    type: 'create-button',
    message: `Created a new button`,
  });

  figma.closePlugin();
}

function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}
