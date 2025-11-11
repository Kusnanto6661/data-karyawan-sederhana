// Data Karyawan (Data Sumber)
let dataKaryawan = [
    { id: "ID-001", nama: "Budi Santoso", posisi: "Project Manager", usia: 35 },
    { id: "ID-002", nama: "Ani Wijaya", posisi: "Front-End Developer", usia: 28 },
    { id: "ID-003", nama: "Cahyo Utomo", posisi: "Back-End Developer", usia: 32 },
    { id: "ID-004", nama: "Dina Fitriani", posisi: "UX Designer", usia: 25 },
    { id: "ID-005", nama: "Eko Prasetyo", posisi: "Data Analyst", usia: 29 }
    // Tambahkan data karyawan Anda yang lain di sini
];

// Variabel untuk menyimpan urutan pengurutan saat ini
let sortOrder = {}; 

/**
 * Mengubah urutan pengurutan (asc/desc) untuk kolom tertentu.
 * @param {string} key - kunci kolom yang diurutkan
 * @returns {string} urutan pengurutan baru
 */
function toggleSortOrder(key) {
    if (!sortOrder[key] || sortOrder[key] === 'desc') {
        sortOrder[key] = 'asc';
    } else {
        sortOrder[key] = 'desc';
    }
    return sortOrder[key];
}

// Status pengurutan global
let currentSortKey = 'id'; // default sort key
let isAscending = true;   // default sort direction (Ascending: A-Z, 1-9)

// 1. Fungsi untuk Menggambar Ulang Tabel
function renderTable(data) {
    const tableBody = document.getElementById('tableBody'); 
    
    if (!tableBody) return;

    tableBody.innerHTML = ''; 

    if (data.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="4" style="text-align: center;">Data tidak ditemukan.</td></tr>';
        return;
    }

    data.forEach(karyawan => {
        const row = tableBody.insertRow();
        row.insertCell().textContent = karyawan.nama;
        row.insertCell().textContent = karyawan.posisi;
        row.insertCell().textContent = karyawan.usia;
        row.insertCell().textContent = '...';
    });
}

// 2. Fungsi Logika Pengurutan
function sortData(key) {
    // 1. Tentukan Arah Pengurutan
    // Tentukan arah urutan baru (asc/desc)
    const order = toggleSortOrder(key);

    // 2. Lakukan Pengurutan pada dataKaryawan
    dataKaryawan.sort((a, b) => {
        let valA = a[key];
        let valB = b[key];
        let comparison = 0;

        // Penanganan Usia (Angka) vs String (Nama/Posisi/ID)
        // Jika kuncinya 'usia', pastikan perbandingannya angka
        if (key === 'usia') {
            valA = parseInt(valA);
            valB = parseInt(valB);
            comparison = valA - valB;
        } else {
            // String comparison (case-insensitive)
            comparison = String(valA).localeCompare(String(valB));
        }

        // Terapkan arah pengurutan
        const finalComparison = order === 'asc' ? comparison : comparison * -1;
        return finalComparison;
    });

    // Setelah diurutkan, panggil renderTable untuk menampilkan hasil
    renderTable(dataKaryawan);
}


// 3. Fungsi Filter Data 
function filterData() {
    const searchInput = document.getElementById('searchInput');
    const searchTerm = searchInput.value.toLowerCase(); 

    const filteredData = dataKaryawan.filter(karyawan => {
        // Gabungkan semua data kolom untuk pencarian
        const searchString = `${karyawan.id} ${karyawan.nama} ${karyawan.posisi} ${karyawan.usia}`.toLowerCase();
        return searchString.includes(searchTerm);
    });

    renderTable(filteredData);
}

// 4. Inisialisasi Aplikasi (DOM Content Loaded)
document.addEventListener('DOMContentLoaded', () => {

    // Pasang Event Listener ke header kolom (untuk Sorting)
    const tableHeaders = document.querySelectorAll('th[data-sort-key]');
    tableHeaders.forEach(header => {
        const key = header.getAttribute('data-sort-key');
        header.addEventListener('click', () => sortData(key));
    });

    // Pasang Event Listener ke tombol 'Cari' (untuk Filtering)
    const searchButton = document.getElementById('searchButton');
    if (searchButton) {
        searchButton.addEventListener('click', filterData);
    }
    
    // Panggilan untuk menampilkan data awal
    renderTable(dataKaryawan); 
});