// Data Karyawan (Pastikan ini adalah data yang benar)
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
    const tableBody = document.getElementById('tableBody');
    // Bersihkan isi tabel yang lama
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

// 2. Fungsi yang Dipanggil Tombol "Cari" di HTML
function filterData() {
    document.addEventListener('DOMContentLoaded', () => {
        // ... kode inisialisasi tabel yang sudah ada ...
    
        // 🟢 TAMBAHKAN KODE INI DI BAWAHNYA
        const existingTable = document.getElementById('data-table');
        if (searchButton) {
            // Tambahkan event listener ke tombol 'Cari'
            searchButton.addEventListener('click', filterData);
        }
        
        // Tampilkan semua data saat halaman pertama kali dibuka
        renderTable(dataKaryawan);
    });

    // Filter dataKaryawan
    const filteredData = dataKaryawan.filter(karyawan => {
        // Gabungkan Nama dan Posisi menjadi satu string pencarian
        const searchString = `${karyawan.nama} ${karyawan.posisi}`.toLowerCase();
        
        // Cek apakah string pencarian mengandung kata kunci
        return searchString.includes(searchTerm);
    });

    // Panggil fungsi renderTable untuk menampilkan data yang sudah difilter
    renderTable(filteredData);
}

// 3. Panggil fungsi renderTable saat halaman dimuat pertama kali
document.addEventListener('DOMContentLoaded', () => {
    // Pastikan ID tabel di HTML Anda adalah 'tabelkaryawan'
    const existingTable = document.getElementById('tabelkaryawan');
    
    // Ganti <tbody> yang lama dengan <tbody> baru yang memiliki ID untuk diakses
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

    // Tampilkan semua data saat halaman pertama kali dibuka
    renderTable(dataKaryawan);
});