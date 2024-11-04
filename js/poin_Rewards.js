// Menampilkan section yang dipilih
function showSection(sectionId) {
    // Menghapus kelas 'active' dari semua tab dan konten
    $('.tab, .tab-content').removeClass('active');

    // Menambahkan kelas 'active' ke tab dan konten yang dipilih
    $(`button[onclick="showSection('${sectionId}')"]`).addClass('active');
    $(`#${sectionId}`).addClass('active');
}

// Memilih atau membatalkan pilihan wallet
function selectWallet(button) {
    if (button.classList.contains("selected")) {
        button.classList.remove("selected");
    } else {
        document.querySelectorAll(".wallet-btn").forEach(btn => btn.classList.remove("selected"));
        button.classList.add("selected");
    }
}

// Memilih atau membatalkan pilihan nominal poin
function selectAmount(button) {
    const customAmountInput = document.getElementById("custom-amount");

    if (button.classList.contains("selected")) {
        button.classList.remove("selected");
        customAmountInput.value = "";
    } else {
        document.querySelectorAll(".points-options button").forEach(btn => btn.classList.remove("selected"));
        button.classList.add("selected");

        const amount = button.getAttribute("data-amount");
        customAmountInput.value = amount;
    }
}

// Menetapkan poin awal
let currentPoints = 10000; // Poin awal yang ditampilkan

// Menampilkan poin saat ini di bagian atas
function updatePointsDisplay() {
    const pointsElement = document.querySelector('.points-banner .points');
    if (pointsElement) {
        pointsElement.textContent = `${currentPoints.toLocaleString()} Poin ⭐`;
    }
}
updatePointsDisplay();

// Mengonfirmasi penukaran poin
function confirmExchange() {
    // Memeriksa apakah wallet telah dipilih
    const selectedWallet = document.querySelector(".wallet-btn.selected");
    if (!selectedWallet) {
        alert("Tolong pilih jenis e-Wallet terlebih dahulu.");
        return;
    }

    // Memeriksa apakah nominal telah dipilih atau jumlah kustom dimasukkan
    const selectedAmountButton = document.querySelector(".points-options button.selected");
    let selectedAmount = 0;

    if (selectedAmountButton) {
        selectedAmount = parseInt(selectedAmountButton.getAttribute("data-amount"), 10);
    } else {
        const customAmount = document.getElementById("custom-amount").value.replace(/[^\d]/g, "");
        selectedAmount = parseInt(customAmount, 10) || 0;
    }

    // Memvalidasi jumlah minimal
    if (selectedAmount < 5000) {
        alert("Nominal penukaran harus minimal Rp 5.000.");
        return;
    }

    // Memeriksa apakah poin mencukupi
    const requiredPoints = selectedAmount / 10; // Asumsi 1 poin = Rp 10
    if (currentPoints < requiredPoints) {
        alert("Poin tidak mencukupi untuk penukaran.");
        return;
    }

    // Menampilkan dialog konfirmasi
    const userConfirmed = confirm(`Anda yakin ingin menukar ${requiredPoints} poin?`);
    if (!userConfirmed) return;

    // Mengurangi poin dan memperbarui tampilan
    currentPoints -= requiredPoints;
    updatePointsDisplay();
    alert("Penukaran Berhasil!");

    // Membatalkan pilihan wallet dan nominal
    document.querySelectorAll(".wallet-btn").forEach(btn => btn.classList.remove("selected"));
    document.querySelectorAll(".points-options button").forEach(btn => btn.classList.remove("selected"));

    // Mengosongkan field jumlah kustom
    document.getElementById("custom-amount").value = "";
}
