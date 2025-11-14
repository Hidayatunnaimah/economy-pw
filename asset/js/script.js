function calcBudget() {
    const gaji = parseFloat(document.getElementById('gaji').value) || 0;
    const pengeluaranTetap = parseFloat(document.getElementById('pengeluaran-tetap').value) || 0;
    const pengeluaranVariabel = parseFloat(document.getElementById('pengeluaran-variabel').value) || 0;
    const cicilan = parseFloat(document.getElementById('cicilan').value) || 0;

    if (gaji <= 0) {
        alert('Mohon masukkan gaji bulanan yang valid!');
        return;
    }

    const totalPengeluaran = pengeluaranTetap + pengeluaranVariabel + cicilan;
    const sisaInvestasi = gaji - totalPengeluaran;

    const needsIdeal = gaji * 0.5;  
    const wantsIdeal = gaji * 0.3;   
    const savingsIdeal = gaji * 0.2; 

    const needsActual = pengeluaranTetap + cicilan;
    const wantsActual = pengeluaranVariabel;
    const savingsActual = sisaInvestasi;

    const needsPercent = (needsActual / gaji) * 100;
    const wantsPercent = (wantsActual / gaji) * 100;
    const savingsPercent = (savingsActual / gaji) * 100;

    const formatCurrency = (num) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(num);
    };

    document.getElementById('total-pengeluaran').textContent = formatCurrency(totalPengeluaran);
    document.getElementById('sisa-investasi').textContent = formatCurrency(sisaInvestasi);

    document.getElementById('needs-amount').textContent = formatCurrency(needsIdeal);
    document.getElementById('wants-amount').textContent = formatCurrency(wantsIdeal);
    document.getElementById('savings-amount').textContent = formatCurrency(savingsIdeal);

    document.getElementById('needs-bar').style.width = Math.min(needsPercent, 100) + '%';
    document.getElementById('wants-bar').style.width = Math.min(wantsPercent, 100) + '%';
    document.getElementById('savings-bar').style.width = Math.min(savingsPercent, 100) + '%';

    const needsStatus = needsActual <= needsIdeal ? 
        `✓ Sesuai (${needsPercent.toFixed(1)}%)` : 
        `⚠ Melebihi (${needsPercent.toFixed(1)}%)`;
    const wantsStatus = wantsActual <= wantsIdeal ? 
        `✓ Sesuai (${wantsPercent.toFixed(1)}%)` : 
        `⚠ Melebihi (${wantsPercent.toFixed(1)}%)`;
    const savingsStatus = savingsActual >= savingsIdeal ? 
        `✓ Ideal (${savingsPercent.toFixed(1)}%)` : 
        `⚠ Kurang (${savingsPercent.toFixed(1)}%)`;

    document.getElementById('needs-status').textContent = needsStatus;
    document.getElementById('wants-status').textContent = wantsStatus;
    document.getElementById('savings-status').textContent = savingsStatus;

    let recommendation = '';
    if (sisaInvestasi < 0) {
        recommendation = '<div class="recommendation-warning"> Pengeluaran Anda melebihi gaji! Perlu evaluasi pengeluaran.</div>';
    } else if (savingsPercent < 20) {
        recommendation = '<div class="recommendation-info"> Tips: Coba alokasikan minimal 20% dari gaji untuk investasi. Kurangi pengeluaran variabel jika memungkinkan.</div>';
    } else if (savingsPercent >= 20) {
        recommendation = '<div class="recommendation-success"> Bagus! Alokasi investasi Anda sudah sesuai dengan rekomendasi 50-30-20 rule.</div>';
    }

    document.getElementById('recommendation').innerHTML = recommendation;

    document.getElementById('result-container').style.display = 'block';
    document.getElementById('result-container').scrollIntoView({ behavior: 'smooth', block: 'start' });
}


function calcInvest() {
    const modal = parseFloat(document.getElementById('invest-modal').value) || 0;
    const returnRate = parseFloat(document.getElementById('invest-return').value) || 0;
    const duration = parseInt(document.getElementById('invest-duration').value) || 0;

    if (modal <= 0 || returnRate < 0 || duration <= 0) {
        alert('Mohon isi modal, return, dan durasi investasi dengan benar.');
        return;
    }

    const rateDecimal = returnRate / 100;
    const total = modal * Math.pow(1 + rateDecimal, duration);
    const profit = total - modal;

    const formatCurrency = (num) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(num);
    };

    document.getElementById('invest-total').textContent = formatCurrency(total);
    document.getElementById('invest-profit').textContent = formatCurrency(profit);

    const resultCard = document.getElementById('invest-result-card');
    resultCard.style.display = 'block';
    resultCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
}