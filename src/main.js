import '@picocss/pico'

document.querySelectorAll('input[type="range"]').forEach((input) => {
    input.addEventListener('input', () => {
        const output = input.previousElementSibling;
        output.value = input.value;
    })
})

document.getElementById('generate').addEventListener('click', () => {
    const rowCount = document.getElementById('rowCount').value;
    const cellCount = document.getElementById('cellCount').value;

    const digitMatrix = [];

    for (let i = 0; i < rowCount; i++) {
        const rnd = Array.from(Math.random().toString().slice(2).padEnd(18, '0'));
        digitMatrix.push(rnd.slice(0, cellCount));
    }

    const wrapTag = (tag, content) => {
        return `<${tag}>${content}</${tag}>`;
    }

    const wrapTr = (content) => {
        return wrapTag('tr', content);
    }

    const wrapTable = (content) => {
        return wrapTag('table', content);
    }

    const tableRow = (digitArray) => {
        return wrapTr(digitArray.map((digit) => `<td>${digit}</td>`).join(''));
    }

    const table = (digitMatrix) => {
        return digitMatrix.map(tableRow).join('');
    }

    const output = document.getElementById('output');
    output.innerHTML = wrapTable(table(digitMatrix));

    const rows = output.querySelectorAll('tr');

    rows.forEach((row, rowIndex) => {
        const cells = row.querySelectorAll('td');
        cells.forEach((cell, cellIndex) => {
            const compareRow = rowIndex === 0 ? rowIndex + 1 : rowIndex - 1;
            if (digitMatrix[rowIndex][cellIndex] === digitMatrix[compareRow][cellIndex]) {
                cell.classList.add('same');
                if(rowIndex > 0) {
                    const previousRow = rows[rowIndex - 1];
                    const previousCell = previousRow.querySelectorAll('td')[cellIndex];
                    previousCell.classList.add('same');
                }
            }
        })
    })
});
