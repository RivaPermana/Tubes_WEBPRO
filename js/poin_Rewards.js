// Function untuk menampilkan selected section
function showSection(sectionId) {
    // Remove 'active' class dari semua tab dan content
    document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
    
    // Add 'active' class ke selected tab dan content
    document.querySelector(`button[onclick="showSection('${sectionId}')"]`).classList.add('active');
    document.getElementById(sectionId).classList.add('active');
}

// Function untuk memilih wallet
function selectWallet(button) {
    // Remove 'selected' class dari semua selected button
    $(".wallet-btn").removeClass("selected");

    // Add 'selected' class ke clicked button
    $(button).addClass("selected");
}

// Function untuk memilih nominal
function selectAmount(button) {
    // Remove 'selected' class dari semua nominal button
    $(".points-options button").removeClass("selected");

    // Add 'selected' class ke clicked button
    $(button).addClass("selected");
}

// Function untuk konfirmasi penukaran
function confirmExchange() {
    // Cek apakah wallet telah dipilih
    const selectedWallet = $(".wallet-btn.selected").length;
    if (!selectedWallet) {
        alert("Tolong pilih jenis e-Wallet terlebih dahulu.");
        return;
    }

    // cek apakah telah memilih nominal atau memasukkan nominal
    const selectedAmount = $(".points-options button.selected").length;
    const customAmount = $("#custom-amount").val();

    if (!selectedAmount && !customAmount) {
        alert("Tolong pilih nominal atau masukkan nominal minimal Rp 5.000 untuk penukaran.");
        return;
    }

    // menampilkan konfirmas dialog
    const userConfirmed = confirm("Apakah anda yakin ingin melakukan penukaran?");
    if (!userConfirmed) {
        return;
    }

    // menampilkan penukaran berhasil
    alert("Penukaran Berhasil!");
}
