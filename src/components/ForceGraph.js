import React from 'react';
import * as d3 from 'd3';
import './flags.css';
// pack the image in the bundle
// eslint-disable-next-line
import flag_sprite from './flags.png';

export default class ForceGraph extends React.Component {
  componentDidMount = () => {
    const {width, height, nodes, links} = this.props;

    const ticked = () => {
      link
        .attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });

      node
        .style( 'left', d => `${d.x}px`)
        .style( 'top', d=> `${d.y}px`);
    };

    function dragstarted(d) {
      if (!d3.event.active) force.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }
    function dragged(d) {
      d.fx = d3.event.x;
      d.fy = d3.event.y;
    }
    function dragended(d) {
      if (!d3.event.active) force.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }

    const force = d3.forceSimulation();
    force.force("charge", d3.forceManyBody());
    force.force("link", d3.forceLink().id(function(d) { return d.index }));
    force.force("center", d3.forceCenter(width / 2, height / 2));
    // force.force("collide",d3.forceCollide( function(d){return d.r + 8 }).iterations(16) );
    force.force("y", d3.forceY(0))
      .force("x", d3.forceX(0));
    force.nodes( nodes).on("tick", ticked);
    force.force("link").links(links);

    const svg = d3.select( this.refs.graph_links);

    const node = d3.select( this.refs.flags_div).selectAll( '.node')
      .data( nodes)
      .enter( )
      .append( 'img')
      .attr( 'class', d => "flag flag-"+d.code)
      .call( d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended));

    const link = svg.selectAll( 'line')
      .data( links)
      .enter()
      .append( 'line')
      .attr( 'stroke', 'black')
      .attr( 'stroke-width', 1)
      .attr( 'stroke-opacity', 0.6);
  };
  render = () => {
    const {width,height} = this.props;
    const style = {
      width, height,
      border: "1px solid #333"
    };
    return (
      <div style={style} >
        <div ref="flags_div" />
        <svg ref="graph_links" style={style} />
      </div>
    );
  };
};
