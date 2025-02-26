import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { formatDuration, formatBytes } from '../../utils/dataFetching';

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
  proving_duration: {
    label: 'Proving Duration',
    getValue: (run) => {
      const coreProve = run.timing.core_prove_duration.secs + run.timing.core_prove_duration.nanos / 1e9;
      const compressProve = run.timing.compress_prove_duration.secs + run.timing.compress_prove_duration.nanos / 1e9;
      return coreProve + compressProve;
    },
    format: (value) => formatDuration({ secs: Math.floor(value), nanos: (value % 1) * 1e9 })
  },
  max_memory: {
    label: 'Max Memory',
    getValue: (run) => run.resources.max_memory_kb * 1024,
    format: (value) => formatBytes(value)
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

const TelemetryChart = ({ data, selectedMetrics, groupBy, getLabel }) => {
  const svgRef = useRef();

  useEffect(() => {
    if (!data || !selectedMetrics || selectedMetrics.length === 0) return;

    // Clear previous chart
    d3.select(svgRef.current).selectAll('*').remove();

    // Set up dimensions
    const margin = { top: 20, right: 120, bottom: 70, left: 80 };
    const width = 1000 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    // Create SVG
    const svg = d3.select(svgRef.current)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Get the metric
    const metric = selectedMetrics[0];
    const metricInfo = METRICS[metric];
    
    if (!metricInfo) return;

    // Group data by the specified grouping
    const groupedData = d3.group(data, d => getLabel(d));
    
    // Calculate average values for each group
    const aggregatedData = Array.from(groupedData, ([key, values]) => {
      const avg = d3.mean(values, d => metricInfo.getValue(d));
      return {
        group: key,
        value: avg,
        count: values.length
      };
    });
    
    // Sort by value
    aggregatedData.sort((a, b) => a.value - b.value);

    // Create scales
    const xScale = d3.scaleBand()
      .domain(aggregatedData.map(d => d.group))
      .range([0, width])
      .padding(0.2);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(aggregatedData, d => d.value) * 1.1]) // Add 10% padding
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
      .text(groupBy === 'system' ? 'System Type' : 
            groupBy === 'instance' ? 'Hardware Type' : 
            groupBy === 'version' ? 'SDK Version' : 'Date');

    // Add Y axis
    svg.append('g')
      .call(d3.axisLeft(yScale)
        .ticks(5)
        .tickFormat(metricInfo.format))
      .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', -60)
      .attr('x', -height / 2)
      .attr('text-anchor', 'middle')
      .style('fill', 'currentColor')
      .text(metricInfo.label);

    // Create color scale based on the group name
    const colorScale = d3.scaleOrdinal()
      .domain(aggregatedData.map(d => d.group))
      .range(['#4f46e5', '#7e22ce', '#0e7490', '#6b7280', '#334155', '#9333ea', '#0891b2', '#0d9488', '#4338ca']);

    // Add bars
    svg.selectAll('rect')
      .data(aggregatedData)
      .enter()
      .append('rect')
      .attr('x', d => xScale(d.group))
      .attr('y', d => yScale(d.value))
      .attr('width', xScale.bandwidth())
      .attr('height', d => height - yScale(d.value))
      .attr('fill', d => colorScale(d.group))
      .on('mouseover', (event, d) => {
        // Add hover state
        d3.select(event.currentTarget)
          .transition()
          .duration(100)
          .attr('opacity', 0.8);
        
        // Show tooltip
        const tooltip = d3.select('#tooltip');
        tooltip.style('display', 'block')
          .style('left', (event.pageX + 10) + 'px')
          .style('top', (event.pageY - 10) + 'px')
          .html(`
            <div class="bg-white p-2 shadow rounded">
              <div class="font-bold">${d.group}</div>
              <div>${metricInfo.label}: ${metricInfo.format(d.value)}</div>
              <div>Sample size: ${d.count} runs</div>
            </div>
          `);
      })
      .on('mouseout', (event) => {
        // Remove hover state
        d3.select(event.currentTarget)
          .transition()
          .duration(100)
          .attr('opacity', 1);
        
        // Hide tooltip
        d3.select('#tooltip').style('display', 'none');
      });

    // Add value labels on top of bars
    svg.selectAll('text.bar-label')
      .data(aggregatedData)
      .enter()
      .append('text')
      .attr('class', 'bar-label')
      .attr('x', d => xScale(d.group) + xScale.bandwidth() / 2)
      .attr('y', d => yScale(d.value) - 5)
      .attr('text-anchor', 'middle')
      .style('font-size', '10px')
      .style('fill', '#6b7280')
      .text(d => metricInfo.format(d.value));

    // Add count labels at the bottom of bars
    svg.selectAll('text.count-label')
      .data(aggregatedData)
      .enter()
      .append('text')
      .attr('class', 'count-label')
      .attr('x', d => xScale(d.group) + xScale.bandwidth() / 2)
      .attr('y', height + 5)
      .attr('text-anchor', 'middle')
      .style('font-size', '9px')
      .style('fill', '#6b7280')
      .text(d => `n=${d.count}`);
    
  }, [data, selectedMetrics, groupBy, getLabel]);

  return (
    <div className="relative">
      <svg ref={svgRef}></svg>
      <div
        id="tooltip"
        className="absolute hidden z-10"
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