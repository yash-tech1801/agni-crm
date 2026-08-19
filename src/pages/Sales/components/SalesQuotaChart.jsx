import React, { useRef, useState, useEffect } from "react";

export function SalesQuotaChart({ months, quotaData, acquiredData }) {
  const containerRef = useRef(null);
  const [width, setWidth] = useState(800);
  const height = 260;
  const paddingX = 24;
  const paddingTop = 28;
  const paddingBottom = 40;

  useEffect(() => {
    if (!containerRef.current) return;
    const updateWidth = () => {
      if (containerRef.current) {
        const clientWidth = containerRef.current.clientWidth;
        if (clientWidth > 0) {
          setWidth(clientWidth);
        }
      }
    };
    updateWidth();

    if (typeof ResizeObserver !== "undefined") {
      const ro = new ResizeObserver((entries) => {
        for (const entry of entries) {
          if (entry.contentRect.width > 0) {
            setWidth(entry.contentRect.width);
          }
        }
      });
      ro.observe(containerRef.current);
      return () => ro.disconnect();
    } else {
      window.addEventListener("resize", updateWidth);
      return () => window.removeEventListener("resize", updateWidth);
    }
  }, []);

  const maxValue = Math.max(...quotaData, ...acquiredData);
  const plotHeight = height - paddingTop - paddingBottom;

  const points = months.map((label, index) => {
    const x = paddingX + (index * (width - paddingX * 2)) / Math.max(months.length - 1, 1);
    const quotaY = height - paddingBottom - (quotaData[index] / maxValue) * plotHeight;
    const acquiredY = height - paddingBottom - (acquiredData[index] / maxValue) * plotHeight;
    return { label, x, quotaY, acquiredY, quota: quotaData[index], acquired: acquiredData[index] };
  });

  const quotaPath = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.quotaY}`).join(" ");
  const acquiredPath = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.acquiredY}`).join(" ");

  return (
    <div ref={containerRef} style={{ width: "100%" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 18, marginBottom: 16 }}>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 13, fontWeight: 500, color: "#4e5579" }}>
          <span style={{ width: 10, height: 10, background: "#9a74e9", borderRadius: 999 }} /> Quota
        </span>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 13, fontWeight: 500, color: "#4e5579" }}>
          <span style={{ width: 10, height: 10, background: "#44bfb0", borderRadius: 999 }} /> Acquired
        </span>
      </div>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        style={{ width: "100%", height: 260, overflow: "visible", display: "block" }}
        aria-hidden="true"
      >
        <path d={quotaPath} fill="none" stroke="#9a74e9" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
        <path d={acquiredPath} fill="none" stroke="#44bfb0" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
        {points.map((point) => (
          <g key={point.label}>
            <circle cx={point.x} cy={point.quotaY} r={5} fill="#fff" stroke="#9a74e9" strokeWidth={2.5} />
            <circle cx={point.x} cy={point.acquiredY} r={5} fill="#fff" stroke="#44bfb0" strokeWidth={2.5} />
          </g>
        ))}
        {points.map((point) => (
          <text
            key={`${point.label}-label`}
            x={point.x}
            y={height - 12}
            textAnchor="middle"
            fontSize="12"
            fontWeight="500"
            fill="#6b6b77"
          >
            {point.label}
          </text>
        ))}
      </svg>
    </div>
  );
}

export function DashboardChart() {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const quotaData = [62000, 65000, 70000, 72000, 74000, 76000, 78000, 80000, 82000, 84000, 86000, 90000];
  const acquiredData = [52000, 58000, 63000, 68000, 71000, 74000, 76000, 79000, 81000, 83000, 85000, 89000];
  return <SalesQuotaChart months={months} quotaData={quotaData} acquiredData={acquiredData} />;
}

export default DashboardChart;
