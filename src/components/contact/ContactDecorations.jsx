import React from "react";

const DotGrid = ({ cols, rows, startCx, spacingX = 14.667 }) => {
  const yPositions = [132, 117.333, 102.667, 88, 73.3333, 45, 16, 59, 30.6666, 1.66665];
  const cxValues = [];
  for (let i = 0; i < cols; i++) {
    cxValues.push(startCx - i * spacingX);
  }

  return (
    <>
      {cxValues.map((cx) =>
        yPositions.map((cy) => (
          <circle
            key={`${cx}-${cy}`}
            cx={cx}
            cy={cy}
            r="1.66667"
            transform={`rotate(180 ${cx} ${cy})`}
            fill="#b5246c"
          />
        ))
      )}
    </>
  );
};

export const ContactFormDecorations = () => (
  <>
    <span className="absolute -right-9 -top-10 z-[-1]">
      <svg width={100} height={100} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M0 100C0 44.7715 0 0 0 0C55.2285 0 100 44.7715 100 100C100 100 100 100 0 100Z" fill="#b5246c" />
      </svg>
    </span>
    <span className="absolute -right-10 top-[90px] z-[-1]">
      <svg width={34} height={134} viewBox="0 0 34 134" fill="none" xmlns="http://www.w3.org/2000/svg">
        <DotGrid cols={3} rows={10} startCx={31.9993} spacingX={14.6659} />
      </svg>
    </span>
    <span className="absolute -bottom-7 -left-7 z-[-1]">
      <svg width={107} height={134} viewBox="0 0 107 134" fill="none" xmlns="http://www.w3.org/2000/svg">
        <DotGrid cols={7} rows={10} startCx={104.999} spacingX={14.6667} />
      </svg>
    </span>
  </>
);

export default ContactFormDecorations;
