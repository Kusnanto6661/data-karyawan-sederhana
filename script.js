// Data Karyawan (Data Sumber)
const dataKaryawan = [
    { id: "ID-001", nama: "Budi Santoso", posisi: "Project Manager", usia: 35 },
    { id: "ID-002", nama: "Ani Wijaya", posisi: "Front-End Developer", usia: 28 },
    { id: "ID-003", nama: "Cahyo Utomo", posisi: "Back-End Developer", usia: 32 },
    { id: "ID-004", nama: "Dina Fitriani", posisi: "UX Designer", usia: 25 },
    { id: "ID-005", nama: "Eko Prasetyo", posisi: "Data Analyst", usia: 29 }
    // Tambahkan data karyawan Anda yang lain di sini
];

// 1. Fungsi untuk Menggambar Ulang Tabel
function renderTable(data) {
    // ID tableBody harus ada di HTML Anda (atau dibuat oleh DOMContentLoaded)
    const tableBody = document.getElementById('tableBody'); 
    
    // Safety check: jika tableBody tidak ditemukan, hentikan fungsi
    if (!tableBody) return;

    tableBody.innerHTML = ''; 

    if (data.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="4" style="text-align: center;">Data tidak ditemukan.</td></tr>';
        return;
    }

    data.forEach(karyawan => {
        const row = tableBody.insertRow();
        row.insertCell().textContent = karyawan.id;
        row.insertCell().textContent = karyawan.nama;
        row.insertCell().textContent = karyawan.posisi;
        row.insertCell().textContent = karyawan.usia;
    });
}

// 2. Fungsi yang Dipanggil Tombol "Cari" (HANYA BERISI LOGIKA FILTER)
function filterData() {
    // Ambil nilai dari input pencarian
    const searchInput = document.getElementById('searchInput');
    const searchTerm = searchInput.value.toLowerCase(); // Ambil kata kunci

    // Filter dataKaryawan (menggunakan data sumber yang didefinisikan di luar fungsi)
    const filteredData = dataKaryawan.filter(karyawan => {
        const searchString = `${karyawan.nama} ${karyawan.posisi}`.toLowerCase();
        
        // Cek apakah string pencarian mengandung kata kunci
        return searchString.includes(searchTerm);
    });

    // Panggil fungsi renderTable untuk menampilkan data yang sudah difilter
    renderTable(filteredData);
}

// 3. Panggil fungsi inisialisasi saat halaman dimuat (DOM sudah siap)
document.addEventListener('DOMContentLoaded', () => {
    // Gunakan ID yang benar: 'data-table'
    const existingTable = document.getElementById('data-table');
    
    // Inisialisasi struktur <thead> dan <tbody>
    if (existingTable) {
        existingTable.innerHTML = `
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nama</th>
                    <th>Posisi</th>
                    <th>Usia</th>
                </tr>
            </thead>
            <tbody id="tableBody">
            </tbody>
        `;
    }

    // Pasang Event Listener ke tombol 'Cari'
    const searchButton = document.getElementById('searchButton');
    if (searchButton) {
        searchButton.addEventListener('click', filterData);
    }
    
    // Tampilkan semua data saat halaman pertama kali dibuka
    renderTable(dataKaryawan);
});