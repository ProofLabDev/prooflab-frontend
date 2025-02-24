import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { formatDuration, formatDate } from '../../utils/dataFetching';

const METRICS = {
  total_duration: {
    label: 'Total Duration',
    getValue: (run) => run.timing.total_duration.secs + run.timing.total_duration.nanos / 1e9,
    format: (value) => formatDuration({ secs: Math.floor(value), nanos: (value % 1) * 1e9 })
  },
  compilation_duration: {
    label: 'Compilation Duration',
    getValue: (run) => run.timing.compilation_duration.secs + run.timing.compilation_duration.nanos / 1e9,
    format: (value) => formatDuration({ secs: Math.floor(value), nanos: (value % 1) * 1e9 })
  },
  proof_generation_duration: {
    label: 'Proof Generation Duration',
    getValue: (run) => run.timing.proof_generation_duration.secs + run.timing.proof_generation_duration.nanos / 1e9,
    format: (value) => formatDuration({ secs: Math.floor(value), nanos: (value % 1) * 1e9 })
  },
  max_memory: {
    label: 'Max Memory (KB)',
    getValue: (run) => run.resources.max_memory_kb,
    format: (value) => value.toLocaleString()
  },
  avg_cpu: {
    label: 'Avg CPU (%)',
    getValue: (run) => run.resources.avg_cpu_percent,
    format: (value) => value.toFixed(2) + '%'
  },
  cycles: {
    label: 'Cycles',
    getValue: (run) => run.zk_metrics.cycles,
    format: (value) => value.toLocaleString()
  }
};

const TelemetryChart = ({ data, selectedMetrics, comparisonType }) => {
  const svgRef = useRef();

  useEffect(() => {
    if (!data || !selectedMetrics || selectedMetrics.length === 0) return;

    // Clear previous chart
    d3.select(svgRef.current).selectAll('*').remove();

    // Set up dimensions
    const margin = { top: 20, right: 60, bottom: 50, left: 80 };
    const width = 1000 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    // Create SVG
    const svg = d3.select(svgRef.current)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Sort data by date and get x-axis labels based on comparison type
    const sortedData = [...data].sort((a, b) => a.date.localeCompare(b.date));
    const getLabel = (d) => {
      if (comparisonType === 'version') {
        return `v${d.sdkVersion}`;
      } else {
        return d.instance;
      }
    };

    // Get unique labels
    const uniqueLabels = Array.from(new Set(sortedData.map(getLabel)));

    // Create scales
    const xScale = d3.scaleBand()
      .domain(uniqueLabels)
      .range([0, width])
      .padding(0.2);

    const metric = selectedMetrics[0];
    const values = data.map(d => METRICS[metric].getValue(d));
    const yScale = d3.scaleLinear()
      .domain([0, d3.max(values) * 1.1]) // Add 10% padding
      .range([height, 0]);

    // Add X axis
    svg.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(xScale))
      .selectAll('text')
      .style('text-anchor', 'end')
      .attr('dx', '-.8em')
      .attr('dy', '.15em')
      .attr('transform', 'rotate(-45)');

    // Add X axis label
    svg.append('text')
      .attr('x', width / 2)
      .attr('y', height + margin.bottom - 5)
      .attr('text-anchor', 'middle')
      .style('font-size', '12px')
      .text(comparisonType === 'version' ? 'SDK Version' : 'Instance Type');

    // Add Y axis
    svg.append('g')
      .call(d3.axisLeft(yScale)
        .ticks(5)
        .tickFormat(METRICS[metric].format))
      .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', -60)
      .attr('x', -height / 2)
      .attr('text-anchor', 'middle')
      .style('fill', 'currentColor')
      .text(METRICS[metric].label);

    // Add bars
    svg.selectAll('rect')
      .data(sortedData)
      .enter()
      .append('rect')
      .attr('x', d => xScale(getLabel(d)))
      .attr('y', d => yScale(METRICS[metric].getValue(d)))
      .attr('width', xScale.bandwidth())
      .attr('height', d => height - yScale(METRICS[metric].getValue(d)))
      .attr('fill', '#60a5fa')
      .on('mouseover', (event, d) => {
        const tooltip = d3.select('#tooltip');
        tooltip.style('display', 'block')
          .style('left', (event.pageX + 10) + 'px')
          .style('top', (event.pageY - 10) + 'px')
          .html(`
            <div class="bg-white p-2 shadow rounded">
              <div class="font-bold">${formatDate(d.date)}</div>
              <div>${METRICS[metric].label}: ${METRICS[metric].format(METRICS[metric].getValue(d))}</div>
              <div>Instance: ${d.instance}</div>
              <div>SDK Version: ${d.sdkVersion ? `v${d.sdkVersion}` : 'N/A'}</div>
            </div>
          `);
      })
      .on('mouseout', () => {
        d3.select('#tooltip').style('display', 'none');
      });

  }, [data, selectedMetrics, comparisonType]);

  return (
    <div className="relative">
      <svg ref={svgRef}></svg>
      <div
        id="tooltip"
        className="absolute hidden"
        style={{
          pointerEvents: 'none',
          backgroundColor: 'white',
          border: '1px solid #ddd',
          borderRadius: '4px',
          padding: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}
      />
    </div>
  );
};

export default TelemetryChart; 