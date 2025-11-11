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
        row.insertCell().textContent = karyawan.id;
        row.insertCell().textContent = karyawan.nama;
        row.insertCell().textContent = karyawan.posisi;
        row.insertCell().textContent = karyawan.usia;
    });
}

// 2. Fungsi Logika Pengurutan
function sortData(key) {
    // 1. Tentukan Arah Pengurutan
    // Jika kolom yang diklik SAMA dengan kolom yang terakhir diurutkan, balik arahnya
    if (currentSortKey === key) {
        isAscending = !isAscending;
    } else {
        // Jika kolom BARU yang diklik, atur ke Ascending
        currentSortKey = key;
        isAscending = true;
    }

    // 2. Lakukan Pengurutan pada dataKaryawan
    dataKaryawan.sort((a, b) => {
        const valueA = a[key];
        const valueB = b[key];
        let comparison = 0;

        // Penanganan Angka (Usia) vs String (Nama/Posisi/ID)
        if (typeof valueA === 'number' && typeof valueB === 'number') {
             comparison = valueA - valueB;
        } else {
             // String comparison (case-insensitive)
             if (String(valueA).localeCompare(String(valueB)) > 0) {
                 comparison = 1;
             } else if (String(valueA).localeCompare(String(valueB)) < 0) {
                 comparison = -1;
             }
        }

        // Terapkan arah pengurutan
        return isAscending ? comparison : comparison * -1;
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
    const existingTable = document.getElementById('data-table');
    
    // Inisialisasi struktur <thead> dan <tbody>
    if (existingTable) {
        existingTable.innerHTML = `
            <thead>
                <tr>
                <th data-sort-key="name">Nama</th>
                <th data-sort-key="position">Posisi</th>
                <th data-sort-key="age">Usia</th>
                <th>Aksi</th>
                </tr>
            </thead>
            <tbody id="tableBody">
            </tbody>
        `;
    }
    
    // Pasang Event Listener ke header kolom (untuk Sorting)
    const tableHeaders = document.querySelectorAll('th[data-sort-key]');
    tableHeaders.forEach(header => {
        const key = header.getAttribute('data-sort-key');
        // Saat header diklik, panggil sortData dengan key yang sesuai (id, nama, posisi, usia)
        header.addEventListener('click', () => sortData(key));
    });


    // Pasang Event Listener ke tombol 'Cari' (untuk Filtering)
    const searchButton = document.getElementById('searchButton');
    if (searchButton) {
        searchButton.addEventListener('click', filterData);
    }
    
    // Tampilkan data awal (sudah diurutkan berdasarkan 'id' secara default)
    renderTable(dataKaryawan);
});
