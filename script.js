
function calcBudget() {
    const income = parseFloat(document.getElementById('income').value) || 0;
    const expense = parseFloat(document.getElementById('expense').value) || 0;
    const result = income - expense;
    document.getElementById('budgetResult').innerText = 'Sisa uang: ' + result;
}


function calcInvest() {
    const modal = parseFloat(document.getElementById('awal').value) || 0;
    const bunga = parseFloat(document.getElementById('bunga').value) / 100 || 0;
    const tahun = parseInt(document.getElementById('tahun').value) || 0;


    const hasil = modal * Math.pow(1 + bunga, tahun);


    document.getElementById('investResult').innerText = 'Hasil investasi: ' + hasil.toFixed(2);
}