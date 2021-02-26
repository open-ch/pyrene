const fontTypes = [
  {
    title: 'Heading',
    examples: [
      {
        heading: 'Heading 100',
        styleText: 'Font family: Fira Sans Condensed\n'
          + 'Font size: 11px\n'
          + 'Font weight: 500\n'
          + 'Line height: 13px\n'
          + 'Letter spacing: 0.5 px\n'
          + 'color: neutral-200 #979CA8',
        style: {
          fontFamily: 'FiraSans,sans-serif',
          fontStyle: 'normal',
          fontWeight: 500,
          fontSize: '11px',
          lineHeight: '13px',
          letterSpacing: '-0.05px',
          color: '#979CA8',
        },
      },
      {
        heading: 'Heading 200',
        styleText: 'Font family: Fira Go\n'
          + 'Font size: 11px\n'
          + 'Font weight: 600\n'
          + 'Line height: 16px\n'
          + 'Letter spacing: -0.03px\n'
          + 'color: neutral-500 #1D273B',
        style: {
          fontFamily: 'FiraGO,Helvetica,sans-serif',
          fontSize: '11px',
          fontWeight: 600,
          lineHeight: '16px',
          letterSpacing: '-0.03px',
          color: '#1D273B',
        },
      },
      {
        heading: 'Heading 250',
        styleText: 'Font family: Fira Go\n'
          + 'Font size: 12px\n'
          + 'Font weight: 500\n'
          + 'Line height: 16px\n'
          + 'Letter spacing: 0px\n'
          + 'color: neutral-500 #1D273B',
        style: {
          fontFamily: 'FiraGO,Helvetica,sans-serif',
          fontSize: '12px',
          fontWeight: 500,
          lineHeight: '16px',
          letterSpacing: 0,
          color: '#1D273B',
        },
      },
      {
        heading: 'Heading 300',
        styleText: 'Font family: Fira Go\n'
          + 'Font size: 12px\n'
          + 'Font weight: 500\n'
          + 'Line height: 16px\n'
          + 'Letter spacing: 1px\n'
          + 'color: neutral-500 #1D273B',
        style: {
          fontFamily: 'FiraGO,Helvetica,sans-serif',
          fontSize: '12px',
          fontWeight: 500,
          lineHeight: '16px',
          letterSpacing: '1px',
          color: '#1D273B',
        },
      },
      {
        heading: 'Heading 300\n'
          + 'Muted',
        styleText: 'Font family: Fira Go\n'
          + 'Font size: 12px\n'
          + 'Font weight: 500\n'
          + 'Line height: 16px\n'
          + 'Letter spacing: 1px\n'
          + 'color: neutral-200 #979CA8',
        style: {
          fontFamily: 'FiraGO,Helvetica,sans-serif',
          fontSize: '12px',
          fontWeight: 500,
          lineHeight: '16px',
          letterSpacing: '1px',
          color: '#979CA8',
        },
      },
      {
        heading: 'Heading 400',
        styleText: 'Font family: Fira Go\n'
          + 'Font size: 13px\n'
          + 'Font weight: 500\n'
          + 'Line height: 16px\n'
          + 'Letter spacing: 0px\n'
          + 'color: neutral-500 #1D273B',
        style: {
          fontFamily: 'FiraGO,Helvetica,sans-serif',
          fontSize: '13px',
          fontWeight: 500,
          lineHeight: '16px',
          letterSpacing: 0,
          color: '#1D273B',
        },
      },
      {
        heading: 'Heading 500',
        styleText: 'Font family: Fira Go\n'
          + 'Font size: 14px\n'
          + 'Font weight: 500\n'
          + 'Line height: 24px\n'
          + 'Letter spacing: -0.05px\n'
          + 'color: neutral-500 #1D273B',
        style: {
          fontFamily: 'FiraGO,Helvetica,sans-serif',
          fontSize: '14px',
          fontWeight: 500,
          lineHeight: '24px',
          letterSpacing: '-0.05px',
          color: '#1D273B',
        },
      },
      {
        heading: 'Heading 600',
        styleText: 'Font family: Fira Go\n'
          + 'Font size: 16px\n'
          + 'Font weight: 500\n'
          + 'Line height: 24px\n'
          + 'Letter spacing: -0.05px\n'
          + 'color: neutral-500 #1D273B',
        style: {
          fontFamily: 'FiraGO,Helvetica,sans-serif',
          fontSize: '16px',
          fontWeight: 500,
          lineHeight: '24px',
          letterSpacing: '-0.05px',
          color: '#1D273B',
        },
      },
      {
        heading: 'Heading 800',
        styleText: 'Font family: Fira Go\n'
          + 'Font size: 20px\n'
          + 'Font weight: 500\n'
          + 'Line height: 24px\n'
          + 'Letter spacing: 0px\n'
          + 'color: neutral-500 #1D273B',
        style: {
          fontFamily: 'FiraGO,Helvetica,sans-serif',
          fontSize: '20px',
          fontWeight: 500,
          lineHeight: '24px',
          letterSpacing: 0,
          color: '#1D273B',
        },
      },
      {
        heading: 'Heading 900',
        styleText: 'Font family: Fira Go\n'
          + 'Font size: 24px\n'
          + 'Font weight: 500\n'
          + 'Line height: 32px\n'
          + 'Letter spacing: -0.2px\n'
          + 'color: neutral-500 #1D273B',
        style: {
          fontFamily: 'FiraGO,Helvetica,sans-serif',
          fontSize: '24px',
          fontWeight: 500,
          lineHeight: '32px',
          letterSpacing: '-0.2px',
          color: '#1D273B',
        },
      },
      {
        heading: 'Display',
        styleText: 'Font family: Fira Go\n'
          + 'Font size: 32px\n'
          + 'Font weight: 500\n'
          + 'Line height: 40px\n'
          + 'Letter spacing: -0.2px\n'
          + 'color: neutral-500 #1D273B',
        style: {
          fontFamily: 'FiraGO,Helvetica,sans-serif',
          fontSize: '32px',
          fontWeight: 500,
          lineHeight: '40px',
          letterSpacing: '-0.2px',
          color: '#1D273B',
        },
      },
    ],
  },
  {
    title: 'Text',
    examples: [
      {
        heading: 'Text 100',
        styleText: 'Font family: Fira Go\n'
          + 'Font size: 10px\n'
          + 'Font weight: 400\n'
          + 'Line height: 12px\n'
          + 'Letter spacing: 0.2px\n'
          + 'color: neutral-200 #979CA8',
        style: {
          fontFamily: 'FiraGO,Helvetica,sans-serif',
          fontSize: '10px',
          fontWeight: 400,
          lineHeight: '12px',
          letterSpacing: '0.2px',
          color: '#979CA8',
        },
      },
      {
        heading: 'Text 200',
        styleText: 'Font family: Fira Go\n'
          + 'Font size: 12px\n'
          + 'Font weight: 400\n'
          + 'Line height: 14px\n'
          + 'Letter spacing: 0px\n'
          + 'color: neutral-500 #1D273B',
        style: {
          fontFamily: 'FiraGO,Helvetica,sans-serif',
          fontSize: '12px',
          fontWeight: 400,
          lineHeight: '14px',
          letterSpacing: '0px',
          color: '#1D273B',
        },
      },
      {
        heading: 'Text 400',
        styleText: 'Font family: Fira Go\n'
          + 'Font size: 14px\n'
          + 'Font weight: 400\n'
          + 'Line height: 18px\n'
          + 'Letter spacing: 0px\n'
          + 'color: neutral-500 #1D273B',
        style: {
          fontFamily: 'FiraGO,Helvetica,sans-serif',
          fontSize: '14px',
          fontWeight: 400,
          lineHeight: '18px',
          letterSpacing: 0,
          color: '#1D273B',
        },
      },
      {
        heading: 'Paragraph',
        styleText: 'Font family: Fira Go\n'
          + 'Font size: 13px\n'
          + 'Font weight: 400\n'
          + 'Line height: 16px\n'
          + 'Letter spacing: 0px\n'
          + 'color: neutral-500 #1D273B',
        style: {
          fontFamily: 'FiraGO,Helvetica,sans-serif',
          fontSize: '13px',
          fontWeight: 400,
          lineHeight: '16px',
          letterSpacing: 0,
          color: '#1D273B',
        },
      },
      {
        heading: 'Pagraph Muted',
        styleText: 'Font family: Fira Go\n'
          + 'Font size: 13px\n'
          + 'Font weight: 400\n'
          + 'Line height: 16px\n'
          + 'Letter spacing: 0px\n'
          + 'color: neutral-200 #979CA8',
        style: {
          fontFamily: 'FiraGO,Helvetica,sans-serif',
          fontSize: '13px',
          fontWeight: 400,
          lineHeight: '16px',
          letterSpacing: 0,
          color: '#979CA8',
        },
      },
      {
        heading: 'Paragraph Strong',
        styleText: 'Font family: Fira Go\n'
          + 'Font size: 13px\n'
          + 'Font weight: 500\n'
          + 'Line height: 16px\n'
          + 'Letter spacing: 0px\n'
          + 'color: neutral-500 #1D273B',
        style: {
          fontFamily: 'FiraGO,Helvetica,sans-serif',
          fontSize: '13px',
          fontWeight: 500,
          lineHeight: '16px',
          letterSpacing: 0,
          color: '#1D273B',
        },
      },
    ],
  },
  {
    title: 'Chart',
    examples: [
      {
        heading: 'Value\n\n'
          + 'Timestamp',
        styleText: 'Font family: Fira Go\n'
          + 'Font size: 11px\n'
          + 'Font weight: 400\n'
          + 'Line height: 13px\n'
          + 'Letter spacing: 0px\n'
          + 'color: neutral-200 #979CA8',
        style: {
          fontFamily: 'FiraGO,Helvetica,sans-serif',
          fontSize: '11px',
          fontWeight: 400,
          lineHeight: '13px',
          letterSpacing: 0,
          color: '#979CA8',
        },
      },
      {
        heading: 'Description',
        styleText: 'Font family: Fira Go\n'
          + 'Font size: 12px\n'
          + 'Font weight: 400\n'
          + 'Line height: 16px\n'
          + 'Letter spacing: 0px\n'
          + 'color: neutral-300 #6B7282',
        style: {
          fontFamily: 'FiraGO,Helvetica,sans-serif',
          fontSize: '12px',
          fontWeight: 400,
          lineHeight: '16px',
          letterSpacing: 0,
          color: '#6B7282',
        },
      },
      {
        heading: 'Heading',
        styleText: 'Font family: Fira Go\n'
          + 'Font size: 13px\n'
          + 'Font weight: 500\n'
          + 'Line height: 18px\n'
          + 'Letter spacing: 0px\n'
          + 'color: neutral-500 #1D273B',
        style: {
          fontFamily: 'FiraGO,Helvetica,sans-serif',
          fontSize: '13px',
          fontWeight: 500,
          lineHeight: '18px',
          letterSpacing: 0,
          color: '#1D273B',
        },
      },
    ],
  },
  {
    title: 'Table',
    examples: [
      {
        heading: 'Value Left\n\n'
        + 'Value Right\n\n'
        + 'Value Centered',
        styleText: 'Font family: FiraGo\n'
          + 'Font size: 12px\n'
          + 'Font weight: 400\n'
          + 'Line height: 16px\n'
          + 'Letter spacing: 0 px\n'
          + 'color: neutral-500 #1D273B',
        style: {
          fontFamily: 'FiraGO,Helvetica,sans-serif',
          fontSize: '12px',
          fontWeight: 400,
          lineHeight: '16px',
          letterSpacing: 0,
          color: '#1D273B',
        },
      },
      {
        heading: 'Column Left\n\n'
        + 'Column Right\n\n'
        + 'Column Centered',
        styleText: 'Font family: Fira Go\n'
          + 'Font size: 12px\n'
          + 'Font weight: 500\n'
          + 'Line height: 18px\n'
          + 'Letter spacing: 0px\n'
          + 'color: neutral-500 #1D273B',
        style: {
          fontFamily: 'FiraGO,Helvetica,sans-serif',
          fontSize: '12px',
          fontWeight: 500,
          lineHeight: '18px',
          letterSpacing: 0,
          color: '#1D273B',
        },
      },
    ],
  },
];

export default fontTypes;
