<template>
    <div>
      <svg
        ref="svg"
        :width="width"
        :height="height"
        @click="addPoint($event)"
      >
        <!-- Render the regression line -->
        <line
          v-if="line"
          :x1="line.x1"
          :y1="line.y1"
          :x2="line.x2"
          :y2="line.y2"
          stroke="blue"
          stroke-width="2"
        />
        <!-- Render the data points -->
        <circle
          v-for="(point, index) in points"
          :key="index"
          :cx="xScale(point.x)"
          :cy="yScale(point.y)"
          r="5"
          fill="red"
          cursor="pointer"
          @mousedown="startDragging(index)"
        />
      </svg>
    </div>
  </template>
  
  <script>
  import * as d3 from "d3";
  
  export default {
    data() {
      return {
        width: 800,
        height: 400,
        margin: { top: 20, right: 20, bottom: 20, left: 20 },
        points: [], // Stores data points
        line: null, // Stores regression line coordinates
        draggingIndex: null,
      };
    },
    computed: {
      xScale() {
        return d3.scaleLinear().domain([0, 1]).range([0, this.width]);
      },
      yScale() {
        return d3.scaleLinear().domain([0, 1]).range([this.height, 0]);
      },
    },
    methods: {
      // Add a point where the user clicks
      addPoint(event) {
        const [x, y] = d3.pointer(event, event.target);
        const xValue = this.xScale.invert(x);
        const yValue = this.yScale.invert(y);
        this.points.push({ x: xValue, y: yValue });
        this.calculateRegression();
      },
      // Start dragging a point
      startDragging(index) {
        this.draggingIndex = index;
        document.addEventListener("mousemove", this.dragPoint);
        document.addEventListener("mouseup", this.stopDragging);
      },
      // Drag the point
      dragPoint(event) {
        if (this.draggingIndex === null) return;
  
        const [x, y] = d3.pointer(event, this.$refs.svg);
        const xValue = this.xScale.invert(x);
        const yValue = this.yScale.invert(y);
        this.points[this.draggingIndex] = { x: xValue, y: yValue };
        this.calculateRegression();
      },
      // Stop dragging
      stopDragging() {
        this.draggingIndex = null;
        document.removeEventListener("mousemove", this.dragPoint);
        document.removeEventListener("mouseup", this.stopDragging);
      },
      // Calculate regression line
      calculateRegression() {
        if (this.points.length < 2) {
          this.line = null;
          return;
        }
  
        const xValues = this.points.map((p) => p.x);
        const yValues = this.points.map((p) => p.y);
  
        const meanX = d3.mean(xValues);
        const meanY = d3.mean(yValues);
  
        const numerator = d3.sum(
          this.points.map((p) => (p.x - meanX) * (p.y - meanY))
        );
        const denominator = d3.sum(
          this.points.map((p) => Math.pow(p.x - meanX, 2))
        );
        const slope = numerator / denominator;
        const intercept = meanY - slope * meanX;
  
        const x1 = 0;
        const y1 = slope * x1 + intercept;
        const x2 = 1;
        const y2 = slope * x2 + intercept;
  
        this.line = {
          x1: this.xScale(x1),
          y1: this.yScale(y1),
          x2: this.xScale(x2),
          y2: this.yScale(y2),
        };
      },
    },
  };
  </script>
  
  <style>
  svg {
    border: 1px solid black;
  }
  </style>
  