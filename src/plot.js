import { line, curveStep, area } from "d3-shape";
import { scaleLinear } from "d3-scale";

import { jStat } from 'jstat';
import {range} from "d3-array";

export function drawAndShadeGC(meanScore, std, confidence, svg) {
    // Define the range for x values as 3 standard deviations from the mean
    const xValuesN = range(meanScore - 3 * std, meanScore + 3 * std, 0.1);

    // Create scales
    const xScaleN = scaleLinear()
        .domain([meanScore - 3 * std, meanScore + 3 * std])
        .range([50, 450]);
    const yScaleN = scaleLinear()
        .domain([0, 1 / (std * Math.sqrt(2 * Math.PI))])
        .range([250, 50]);

    // Compute y values for the Gaussian curve
    const yValuesN = xValuesN.map(x => {
        const exponent = -Math.pow(x - meanScore, 2) / (2 * Math.pow(std, 2));
        return 1 / (std * Math.sqrt(2 * Math.PI)) * Math.exp(exponent);
    });

    // Create line generator
    const lineGenerator = line()
        .x((d, i) => xScaleN(xValuesN[i]))
        .y(d => yScaleN(d));

    // Draw Gaussian curve
    let path = svg.select('path.gaussian-curve');

    if (path.empty()) {
        // Append a new path if it doesn't exist
        path = svg.append('path')
            .attr('class', 'gaussian-curve')
            .attr('fill', 'none')
            .attr('stroke', 'red');
    }

    path.datum(yValuesN)
        .attr('d', lineGenerator);

    // Calculate critical values for shading based on the confidence level
    const alpha = 1 - confidence;
    const zCritical = jStat.normal.inv(1 - alpha / 2, 0, 1); // Using jStat for normal distribution
    const criticalValueLeft = meanScore - zCritical * std;
    const criticalValueRight = meanScore + zCritical * std;

    // Generate shaded area paths for the critical regions
    const shadedDataLeft = xValuesN.filter(x => x <= criticalValueLeft).map(x => ({
        x,
        y: 1 / (std * Math.sqrt(2 * Math.PI)) * Math.exp(-Math.pow(x - meanScore, 2) / (2 * Math.pow(std, 2)))
    }));

    const shadedDataRight = xValuesN.filter(x => x >= criticalValueRight).map(x => ({
        x,
        y: 1 / (std * Math.sqrt(2 * Math.PI)) * Math.exp(-Math.pow(x - meanScore, 2) / (2 * Math.pow(std, 2)))
    }));

    // Create area generator
    const areaGenerator = area()
        .x(d => xScaleN(d.x))
        .y0(yScaleN(0))
        .y1(d => yScaleN(d.y));

    // Select the shaded areas if they exist, otherwise append new ones
    let shadedAreaLeft = svg.select('path.shaded-area-left');
    let shadedAreaRight = svg.select('path.shaded-area-right');

    if (shadedAreaLeft.empty()) {
        shadedAreaLeft = svg.append('path')
            .attr('class', 'shaded-area-left')
            .attr('fill', 'rgba(255, 0, 0, 0.5)');
    }

    if (shadedAreaRight.empty()) {
        shadedAreaRight = svg.append('path')
            .attr('class', 'shaded-area-right')
            .attr('fill', 'rgba(255, 0, 0, 0.5)');
    }

    // Update the shaded areas with new data
    shadedAreaLeft.datum(shadedDataLeft)
        .attr('d', areaGenerator);

    shadedAreaRight.datum(shadedDataRight)
        .attr('d', areaGenerator);

    // Remove existing annotations
    svg.selectAll('.annotation').remove();

    // Append marker definitions for arrows
    const defs = svg.append('defs');

    defs.append('marker')
        .attr('id', 'arrow')
        .attr('viewBox', '0 -5 10 10')
        .attr('refX', 5)
        .attr('refY', 0)
        .attr('markerWidth', 6)
        .attr('markerHeight', 6)
        .attr('orient', 'auto')
        .append('path')
        .attr('d', 'M0,-5L10,0L0,5')
        .attr('class', 'arrowHead');

    // Axis annotation for mean
    svg.append('text')
        .attr('class', 'annotation')
        .attr('x', xScaleN(meanScore))
        .attr('y', yScaleN(0) + 20)
        .attr('text-anchor', 'middle')
        .attr('font-size', '12px')
        .text('\u03BC_0 = 69');

    // Lines for critical values
    svg.append('line')
        .attr('class', 'annotation')
        .attr('x1', xScaleN(criticalValueLeft))
        .attr('y1', yScaleN(0))
        .attr('x2', xScaleN(criticalValueLeft))
        .attr('y2', yScaleN(1 / (std * Math.sqrt(2 * Math.PI))))
        .attr('stroke', 'black')
        .attr('stroke-dasharray', '5,5');

    svg.append('line')
        .attr('class', 'annotation')
        .attr('x1', xScaleN(criticalValueRight))
        .attr('y1', yScaleN(0))
        .attr('x2', xScaleN(criticalValueRight))
        .attr('y2', yScaleN(1 / (std * Math.sqrt(2 * Math.PI))))
        .attr('stroke', 'black')
        .attr('stroke-dasharray', '5,5');
}
