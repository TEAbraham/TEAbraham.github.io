// random_variable.js
window.onload = function () {
  const getDataA = initRandomVariableA();
  const getDataB = initRandomVariableB();
  initRandomVariableC(getDataA, getDataB);
}

function initRandomVariableA() {
  const width = 600;
  const height = 300;

  const svg = d3.select("#rvDistA")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .style("background", "#ffffff")
    .style("border", "1px solid #ccc");

  const xScale = d3.scaleLinear().domain([0, 10]).range([50, width - 50]);
  const yScale = d3.scaleLinear().domain([0, 1]).range([height - 50, 50]);

  const xAxis = d3.axisBottom(xScale);
  const yAxis = d3.axisLeft(yScale);

  svg.append("g")
    .attr("transform", `translate(0, ${height - 50})`)
    .call(xAxis);

  svg.append("g")
    .attr("transform", `translate(50, 0)`)
    .call(yAxis);

  const barGroup = svg.append("g").attr("id", "bars");

  const meanLine = svg.append("line")
    .attr("stroke", "black")
    .attr("stroke-width", 2)
    .style("display", "none");

  const stdLineLeft = svg.append("line")
    .attr("stroke", "black")
    .attr("stroke-dasharray", "5,5")
    .style("display", "none");

  const stdLineRight = svg.append("line")
    .attr("stroke", "black")
    .attr("stroke-dasharray", "5,5")
    .style("display", "none");

  const statsDiv = d3.select("#rvDistA")
    .append("div")
    .attr("class", "rv-stats")
    .style("margin-top", "10px");

  function drawBars(data) {
    const bars = barGroup.selectAll("rect").data(data);

    bars.enter()
      .append("rect")
      .merge(bars)
      .attr("x", (d, i) => xScale(i))
      .attr("y", d => yScale(d))
      .attr("width", 30)
      .attr("height", d => height - 50 - yScale(d))
      .attr("fill", "steelblue");

    bars.exit().remove();

    const mean = d3.mean(data);
    const std = d3.deviation(data);

    meanLine
      .attr("x1", xScale(mean * 10))
      .attr("x2", xScale(mean * 10))
      .attr("y1", 50)
      .attr("y2", height - 50)
      .style("display", "inline");

    stdLineLeft
      .attr("x1", xScale((mean - std) * 10))
      .attr("x2", xScale((mean - std) * 10))
      .attr("y1", 50)
      .attr("y2", height - 50)
      .style("display", "inline");

    stdLineRight
      .attr("x1", xScale((mean + std) * 10))
      .attr("x2", xScale((mean + std) * 10))
      .attr("y1", 50)
      .attr("y2", height - 50)
      .style("display", "inline");

    statsDiv.html(`Mean: ${(mean*10).toFixed(3)} &nbsp;&nbsp; SD: ${(std*10).toFixed(3)}`);

    return { mean, std };
  }

  const randomData = () => Array.from({ length: 10 }, () => Math.random());
  let dataA = randomData();
  drawBars(dataA);

  document.getElementById("startRVA").onclick = () => {
    dataA = randomData();
    drawBars(dataA);
  };
  document.getElementById("resetRVA").onclick = () => {
    dataA = Array(10).fill(0);
    drawBars(dataA);
  };

  return () => dataA;
}

function initRandomVariableB() {
  const width = 600;
  const height = 300;

  const svg = d3.select("#rvDistB")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .style("background", "#ffffff")
    .style("border", "1px solid #ccc");

  const xScale = d3.scaleLinear().domain([0, 10]).range([50, width - 50]);
  const yScale = d3.scaleLinear().domain([0, 1]).range([height - 50, 50]);

  const xAxis = d3.axisBottom(xScale);
  const yAxis = d3.axisLeft(yScale);

  svg.append("g")
    .attr("transform", `translate(0, ${height - 50})`)
    .call(xAxis);

  svg.append("g")
    .attr("transform", `translate(50, 0)`)
    .call(yAxis);

  const barGroup = svg.append("g").attr("id", "bars");

  const meanLine = svg.append("line")
    .attr("stroke", "black")
    .attr("stroke-width", 2)
    .style("display", "none");

  const stdLineLeft = svg.append("line")
    .attr("stroke", "black")
    .attr("stroke-dasharray", "5,5")
    .style("display", "none");

  const stdLineRight = svg.append("line")
    .attr("stroke", "black")
    .attr("stroke-dasharray", "5,5")
    .style("display", "none");

  const statsDiv = d3.select("#rvDistB")
    .append("div")
    .attr("class", "rv-stats")
    .style("margin-top", "10px");

  function drawBars(data) {
    const bars = barGroup.selectAll("rect").data(data);

    bars.enter()
      .append("rect")
      .merge(bars)
      .attr("x", (d, i) => xScale(i))
      .attr("y", d => yScale(d))
      .attr("width", 30)
      .attr("height", d => height - 50 - yScale(d))
      .attr("fill", "steelblue");

    bars.exit().remove();

    const mean = d3.mean(data);
    const std = d3.deviation(data);

    meanLine
      .attr("x1", xScale(mean * 10))
      .attr("x2", xScale(mean * 10))
      .attr("y1", 50)
      .attr("y2", height - 50)
      .style("display", "inline");

    stdLineLeft
      .attr("x1", xScale((mean - std) * 10))
      .attr("x2", xScale((mean - std) * 10))
      .attr("y1", 50)
      .attr("y2", height - 50)
      .style("display", "inline");

    stdLineRight
      .attr("x1", xScale((mean + std) * 10))
      .attr("x2", xScale((mean + std) * 10))
      .attr("y1", 50)
      .attr("y2", height - 50)
      .style("display", "inline");

    statsDiv.html(`Mean: ${(mean*10).toFixed(3)} &nbsp;&nbsp; SD: ${(std*10).toFixed(3)}`);

    return { mean, std };
  }

  const randomData = () => Array.from({ length: 10 }, () => Math.random());
  let dataB = randomData();
  drawBars(dataB);

  document.getElementById("startRVB").onclick = () => {
    dataB = randomData();
    drawBars(dataB);
  };
  document.getElementById("resetRVB").onclick = () => {
    dataB = Array(10).fill(0);
    drawBars(dataB);
  };

  return () => dataB;
}

function initRandomVariableC(getDataA, getDataB) {
  const width = 1200;
  const height = 300;

  const svg = d3.select("#rvDistC")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .style("background", "#ffffff")
    .style("border", "1px solid #ccc");

    const xScale = d3.scaleLinear().domain([-10, 20]).range([50, width - 50]);
    const yScale = d3.scaleLinear().domain([0, 1]).range([height - 50, 50]);

    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);

    svg.append("g")
      .attr("transform", `translate(0, ${height - 50})`)
      .call(xAxis);

    svg.append("g")
      .attr("transform", `translate(50, 0)`)
      .call(yAxis);

  const line = (x, color, dash = false) => {
    svg.append("line")
      .attr("x1", xScale(x*10))
      .attr("x2", xScale(x*10))
      .attr("y1", 50)
      .attr("y2", height - 50)
      .attr("stroke", color)
      .attr("stroke-width", 2)
      .style("stroke-dasharray", dash ? "5,5" : "none");
  };

  const statsDiv = d3.select("#rvDistC")
    .append("div")
    .attr("class", "rv-stats")
    .style("margin-top", "10px");

  const update = () => {
    svg.selectAll("line").remove();
    const dataA = getDataA();
    const dataB = getDataB();
    const meanA = d3.mean(dataA);
    const stdA = d3.deviation(dataA);
    const meanB = d3.mean(dataB);
    const stdB = d3.deviation(dataB);
    const meanMinus = meanA - meanB;
    const meanPlus = meanA + meanB;
    const stdC = Math.sqrt(stdA**2 + stdB**2);

    line(meanMinus, "red");
    line(meanPlus, "green");
    line(meanMinus - stdC, "red", true);
    line(meanMinus + stdC, "red", true);
    line(meanPlus - stdC, "green", true);
    line(meanPlus + stdC, "green", true);

    statsDiv.html(
      `A−B Mean: ${(meanMinus*10).toFixed(3)} &nbsp; SD: ${(stdC*10).toFixed(3)}<br>A+B Mean: ${(meanPlus*10).toFixed(3)} &nbsp; SD: ${(stdC*10).toFixed(3)}`
    )
  }

  document.getElementById("startRVA").addEventListener("click", update);
  document.getElementById("startRVB").addEventListener("click", update);
  document.getElementById("resetRVA").addEventListener("click", update);
  document.getElementById("resetRVB").addEventListener("click", update);

  update();
}
