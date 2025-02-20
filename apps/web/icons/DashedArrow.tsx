const DashedArrow = () => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 800 800"
        strokeWidth="10"
        stroke="hsl(0, 0%, 0%)"
        fill="none"
        strokeLinecap="round"
        strokeDasharray="11.5 28"
      >
        <path
          d="M250 250 400 276 400 400Q193 533 550 550"
          markerEnd="url(#svgjsMarker1362)"
        />
        <defs>
          <marker
            markerWidth="5"
            markerHeight="5"
            refX="2.5"
            refY="2.5"
            viewBox="0 0 5 5"
            orient="auto"
            id="svgjsMarker1362"
          >
            <polygon
              points="0 5,1.6666666666666667,2.5,0,0,5,2.5"
              fill="hsl(0, 0%, 0%)"
            />
          </marker>
        </defs>
      </svg>
    );
  };
  export default DashedArrow;
  