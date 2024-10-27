let usersData = {};
let missionsData = [];

// Mengambil data dari misi.json
$.getJSON('js/misi.json', function(data) {
    missionsData = data.missions;
    // Setelah misi.json berhasil dimuat, lanjutkan untuk mengambil user.json
    $.getJSON('js/user.json', function(userData) {
        usersData = userData;
        // Menambahkan semua misi ke dalam data user john_doe
        usersData.users[0].misi = missionsData.map(mission => ({
            id: mission.id,
            status: "belum submit"
        }));
        // Render misi pada halaman
        renderMissions();
    }).fail(function() {
        console.error('Gagal memuat user.json');
    });
}).fail(function() {
    console.error('Gagal memuat misi.json');
});

// Fungsi untuk menampilkan misi di halaman
function renderMissions() {
    const missionList = document.getElementById("mission-list");
    missionList.innerHTML = ''; // Hapus konten sebelumnya
    missionsData.forEach(mission => {
        const missionCard = document.createElement("div");
        missionCard.className = "mission-card";
        missionCard.innerHTML = `
            <img src="${mission.img}" alt="${mission.nama}">
            <h3>${mission.nama}</h3>
            <p>${mission.poin} Poin</p>
            <button onclick="openModal('${mission.id}')" id="btn-${mission.id}">Submit</button>
        `;
        missionList.appendChild(missionCard);
    });
}

// Modal handling
const modal = document.getElementById("modal");
const closeModal = document.getElementsByClassName("close")[0];
closeModal.onclick = () => modal.style.display = "none";
window.onclick = event => {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};

// Open modal and set current mission ID
let currentMissionId = null;
function openModal(missionId) {
    currentMissionId = missionId;
    modal.style.display = "block";
}

// Submit proof form
document.getElementById("proof-form").onsubmit = function (event) {
    event.preventDefault();
    const fileInput = document.getElementById("proof-file");
    if (fileInput.files.length > 0) {
        // Update mission status to "selesai" for the current user
        const userMission = usersData.users[0].misi.find(m => m.id === currentMissionId);
        if (userMission) {
            userMission.status = "selesai";
            document.getElementById(`btn-${currentMissionId}`).innerText = "Selesai";
            document.getElementById(`btn-${currentMissionId}`).disabled = true;
            modal.style.display = "none";
        }
    }
};
