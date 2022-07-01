import { defaultTags } from '../app/assets/defaultTags';
import { RGBType } from '../app/assets/SharedTypes';
import { textColours } from '../app/assets/colours';

type TagType = {
  label: string;
  colour: string;
  size: 'small' | 'medium' | 'large';
};

const TAG_SIZE = {
  small: 40,
  medium: 50,
  large: 70,
};

const FONT_SIZE = {
  small: 16,
  medium: 20,
  large: 24,
};

triggerCreationFromCommand();

function triggerCreationFromCommand() {
  if (figma.command == 'frame') {
    checkIfAnyFramesSelected();
    launchFigmaUI();

    //Handle UI response
    figma.ui.onmessage = async (tagData) => {
      createTags(tagData);
    };
  } else {
    checkIfAnyFramesSelected();
    for (const command of defaultTags) {
      if (figma.command == command.value) {
        const tmpTag: TagType = {
          label: command.tag,
          colour: command.colour,
          size: 'small',
        };
        createTags(tmpTag);
      }
    }
  }
}

async function launchFigmaUI() {
  figma.clientStorage.getAsync('lastUsedTag').then((value) => {
    figma.showUI(__html__, { width: 400, height: 520, themeColors: true });
    figma.ui.postMessage(value);
  });
}

async function createTags(tagData: TagType) {
  await figma.loadFontAsync({ family: 'Roboto', style: 'Bold' });

  let nodes = figma.currentPage.selection;
  let frameCount = 0;
  for (const node of nodes) {
    if (node.type === 'FRAME' || node.type === 'COMPONENT') {
      frameCount++;

      const frameX = node.x;
      const frameY = node.y;

      const tagHeight = TAG_SIZE[tagData.size];
      const tagWidth = tagData.label.length * 10 + 1.5 * TAG_SIZE[tagData.size];
      const tagRadius = 4;

      let tagGroup = [];

      //Set constraint variable
      const stretchConstraint: Constraints = {
        horizontal: 'STRETCH',
        vertical: 'STRETCH',
      };

      //Create button background
      const tagBG = figma.createRectangle();
      tagBG.cornerRadius = tagRadius;
      tagBG.resizeWithoutConstraints(tagWidth, tagHeight);
      tagBG.constraints = stretchConstraint;

      const rgbValue = hexToRgb(tagData.colour);

      //Set fill color
      tagBG.fills = [
        {
          type: 'SOLID',
          color: {
            r: rgbValue.r,
            g: rgbValue.g,
            b: rgbValue.b,
          },
        },
      ];

      tagGroup.push(tagBG);

      //Create button text
      const textLayer = figma.createText();
      textLayer.fontName = { family: 'Roboto', style: 'Bold' };
      textLayer.characters = tagData.label;
      textLayer.textAlignHorizontal = 'CENTER';
      textLayer.textAlignVertical = 'CENTER';
      textLayer.fontSize = FONT_SIZE[tagData.size];
      textLayer.resizeWithoutConstraints(tagWidth, tagHeight);

      textLayer.constraints = stretchConstraint;

      const textRgb: RGBType = getTextColor(tagData.colour);

      //Set text color
      textLayer.fills = [
        {
          type: 'SOLID',
          color: {
            r: textRgb.r,
            g: textRgb.g,
            b: textRgb.b,
          },
        },
      ];
      tagGroup.push(textLayer);

      for (let n of tagGroup) {
        n.x = frameX;
        n.y = frameY - 1.7 * TAG_SIZE[tagData.size];
      }

      figma.group(tagGroup, figma.currentPage);
      const lastTag = { tag: tagData.label, colour: tagData.colour, size: tagData.size };

      figma.clientStorage.setAsync('lastUsedTag', lastTag);
    }
  }

  const closeStatement = 'Tags added to ' + frameCount + (frameCount > 1 ? ' frames' : ' frame');
  figma.closePlugin(closeStatement);
}

function hexToRgb(hex: string): RGBType {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16) / 255,
        g: parseInt(result[2], 16) / 255,
        b: parseInt(result[3], 16) / 255,
      }
    : null;
}

function hexToHSL(hex: string) {
  // Convert hex to RGB first
  let { r, g, b } = hexToRgb(hex);
  let cmin = Math.min(r, g, b),
    cmax = Math.max(r, g, b),
    delta = cmax - cmin,
    h = 0,
    s = 0,
    l = 0;

  if (delta == 0) h = 0;
  else if (cmax == r) h = ((g - b) / delta) % 6;
  else if (cmax == g) h = (b - r) / delta + 2;
  else h = (r - g) / delta + 4;

  h = Math.round(h * 60);

  if (h < 0) h += 360;

  l = (cmax + cmin) / 2;
  s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
  s = +(s * 100).toFixed(1);
  l = +(l * 100).toFixed(1);

  return { h, s, l };
}

function getTextColor(hex: string) {
  const { l: lightness } = hexToHSL(hex);
  const lightnessThreshhold = 60;
  if (lightness > lightnessThreshhold) {
    return hexToRgb(textColours.light);
  } else {
    return hexToRgb(textColours.dark);
  }
}

function checkIfAnyFramesSelected() {
  let nodeCount = 0;
  let nodes = figma.currentPage.selection;
  let numNodes = nodes.length;
  if (numNodes == 0) {
    figma.closePlugin('Please select a frame to add a tag to');
  }
  for (const node of nodes) {
    if (node.type !== 'FRAME' && node.type !== 'COMPONENT') {
      nodeCount++;
      if (nodeCount === numNodes) {
        figma.closePlugin('Please select a frame to add a tag to');
      }
    }
  }
}
