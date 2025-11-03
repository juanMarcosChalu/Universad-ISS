import React from "react";

const Seal = ({
  outerText = "DIRECCIÓN DE EDUCACIÓN SUPERIOR - INSTITUTO SUD",
  centerTextTop = "DIEGEP",
  centerTextBottom = "6.400",
  subText = "BENITO JUÁREZ",
  size = 140,
  stroke = "#222",
  fill = "transparent",
  fontFamily = "Times New Roman, serif",
}) => {
  const radius = size / 2;
  const innerRadius = radius - 10;
  const idPath = `seal-path-${Math.random().toString(36).slice(2, 9)}`;
  const outerFontSize = Math.max(9, Math.floor(size * 0.08));
  const centerTopFont = Math.max(18, Math.floor(size * 0.185));
  const centerBottomFont = Math.max(14, Math.floor(size * 0.12));
  const subFont = Math.max(10, Math.floor(size * 0.08));

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      style={{ display: "block" }}
      aria-label="Sello oficial"
      role="img"
    >
      {/* Outer circle */}
      <circle
        cx={radius}
        cy={radius}
        r={radius - 2}
        fill={fill}
        stroke={stroke}
        strokeWidth="3"
      />

      {/* Inner decorative ring */}
      <circle
        cx={radius}
        cy={radius}
        r={radius - 12}
        fill="none"
        stroke={stroke}
        strokeWidth="1"
        opacity="0.9"
      />

      {/* Path for outer text */}
      <defs>
        <path
          id={idPath}
          d={`
            M ${radius - innerRadius} ${radius}
            a ${innerRadius} ${innerRadius} 0 1 0 ${innerRadius * 2} 0
            a ${innerRadius} ${innerRadius} 0 1 0 -${innerRadius * 2} 0
          `}
        />
      </defs>

      {/* Outer text along the path */}
      <text
        fontFamily={fontFamily}
        fontSize={outerFontSize}
        fill={stroke}
        textAnchor="middle"
      >
        <textPath startOffset="50%" href={`#${idPath}`}>
          {outerText.toUpperCase()}
        </textPath>
      </text>

      {/* Center text (top) */}
      <text
        x={radius}
        y={radius - size * 0.05}
        fontFamily={fontFamily}
        fontSize={centerTopFont}
        fontWeight="700"
        fill={stroke}
        textAnchor="middle"
        dominantBaseline="middle"
      >
        {centerTextTop}
      </text>

      {/* Center text (bottom) */}
      {centerTextBottom && (
        <text
          x={radius}
          y={radius + size * 0.12}
          fontFamily={fontFamily}
          fontSize={centerBottomFont}
          fontWeight="700"
          fill={stroke}
          textAnchor="middle"
          dominantBaseline="middle"
        >
          {centerTextBottom}
        </text>
      )}

      {/* Small subtext under the circle */}
      {subText && (
        <text
          x={radius}
          y={size - 8}
          fontFamily={fontFamily}
          fontSize={subFont}
          fill={stroke}
          textAnchor="middle"
          dominantBaseline="baseline"
        >
          {subText.toUpperCase()}
        </text>
      )}
    </svg>
  );
};

export default Seal;
