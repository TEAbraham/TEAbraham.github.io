// script.js

document.getElementById('notebookUpload').addEventListener('change', handleFileUpload);

function handleFileUpload(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const notebookData = JSON.parse(e.target.result);
            displayNotebookOutline(notebookData);
        };
        reader.readAsText(file);
    }
}

function displayNotebookOutline(notebookData) {
    const outlineContainer = d3.select('#notebookOutline');
    outlineContainer.html('');  // Clear previous content

    notebookData.cells.forEach((cell, index) => {
        const cellType = cell.cell_type;
        const cellContent = cell.source.join('');
        const heading = extractHeading(cellContent, cellType);
        
        // Create collapsible section for each cell
        const collapsible = outlineContainer.append('button')
            .attr('class', 'collapsible')
            .text(`${heading || `Cell ${index + 1}`} (${cellType})`);

        const content = outlineContainer.append('div')
            .attr('class', 'content')
            .append('div')
            .attr('class', 'cell')
            .text(cellContent);

        collapsible.on('click', function() {
            const content = this.nextElementSibling;
            this.classList.toggle('active');
            content.style.display = content.style.display === 'block' ? 'none' : 'block';
        });
    });
}

function extractHeading(content, cellType) {
    if (cellType === 'markdown') {
        const match = content.match(/^#+\s*(.*)/);
        return match ? match[1] : null;
    } else if (cellType === 'code') {
        return 'Code Cell';
    }
    return null;
}
