// --- KODE LAMA (dataKaryawan = [...]) DIGANTI DENGAN BLOK INI ---

// 1. Fungsi untuk memuat data dari Local Storage
function loadDataFromLocalStorage() {
    const localData = localStorage.getItem('dataKaryawan');
    if (localData) {
        return JSON.parse(localData);
    }
    // Data Default (Jika Local Storage kosong)
    return [
        { id: "ID-001", nama: "Budi Santoso", posisi: "Project Manager", usia: 35 },
        { id: "ID-002", nama: "Ani Wijaya", posisi: "Front-End Developer", usia: 28 },
        { id: "ID-003", nama: "Cahyo Utomo", posisi: "Back-End Developer", usia: 32 },
        { id: "ID-004", nama: "Dina Fitriani", posisi: "UX Designer", usia: 25 },
        { id: "ID-005", nama: "Eko Prasetyo", posisi: "Data Analyst", usia: 29 }
        // PASTIKAN SEMUA DATA AWAL LAMA ANDA ADA DI SINI (dengan ID)
    ];
}

// 2. Fungsi untuk menyimpan data ke Local Storage
function saveDataToLocalStorage(data) {
    localStorage.setItem('dataKaryawan', JSON.stringify(data));
}

// 3. Deklarasikan dataKaryawan dengan memanggil fungsi load
let dataKaryawan = loadDataFromLocalStorage();

// --- LANJUT KE KODE LAMA ANDA: let sortOrder = {}; function toggleSortOrder(key) { ... } ---

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

// --- GANTI SELURUH FUNGSI RENDER TABLE DENGAN KODE INI ---

function renderTable(data) {
    const tableBody = document.getElementById('tableBody');
    // Jika tabel body tidak ditemukan, hentikan fungsi
    if (!tableBody) return; 

    tableBody.innerHTML = ''; // Kosongkan tabel sebelum merender

    // Jika data kosong, tampilkan pesan
    if (data.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="5" style="text-align: center;">Data tidak ditemukan.</td></tr>';
        return;
    }

    data.forEach(karyawan => {
        const row = tableBody.insertRow();
        
        // Sel 1: ID
        row.insertCell().textContent = karyawan.id; 
        
        // Sel 2: Nama
        row.insertCell().textContent = karyawan.nama;
        
        // Sel 3: Posisi
        row.insertCell().textContent = karyawan.posisi;
        
        // Sel 4: Usia
        row.insertCell().textContent = karyawan.usia; 

        // Sel 5: Aksi (Tombol Hapus)
        const actionCell = row.insertCell();
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Hapus';
        deleteButton.className = 'delete-btn';

        deleteButton.onclick = function() {
            if (confirm(`Yakin ingin menghapus ${karyawan.nama}?`)) {
                 deleteData(karyawan.id);
            }
        };
        actionCell.appendChild(deleteButton);
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

// --- FUNGSI BARU: DELETE DATA (DITEMPEL DI TEMPAT KOSONG) ---

/**
 * Menghapus karyawan dari array, Local Storage, dan merender ulang tabel.
 * @param {string} id - ID karyawan yang akan dihapus
 */
function deleteData(id) {
    // 1. Filter array: Buat array baru tanpa karyawan yang memiliki ID ini
    // dataKaryawan akan diganti dengan array hasil filtering
    dataKaryawan = dataKaryawan.filter(karyawan => karyawan.id !== id);

    // 2. Simpan array yang sudah diperbarui ke Local Storage
    saveDataToLocalStorage(dataKaryawan);

    // 3. Render ulang tabel
    // Kita panggil sortData agar data yang tersisa tetap terurut rapi
    sortData('nama'); 
}

// --- KODE INI DITEMPEL LENGKAP DI BAWAH filterData() ---

const formTambahKaryawan = document.getElementById('formTambahKaryawan'); 

if (formTambahKaryawan) {
    formTambahKaryawan.addEventListener('submit', function(event) {
        event.preventDefault(); 

        const namaInput = document.getElementById('inputNama').value;
        const posisiInput = document.getElementById('inputPosisi').value;
        const usiaInput = document.getElementById('inputUsia').value;
        
        const newId = 'ID-' + String(dataKaryawan.length + 1).padStart(3, '0');

        const karyawanBaru = { 
            id: newId, 
            nama: namaInput, 
            posisi: posisiInput, 
            usia: parseInt(usiaInput) 
        };
        
        dataKaryawan.push(karyawanBaru);

        // GARIS KRUSIAL: Menyimpan data yang sudah diperbarui
        saveDataToLocalStorage(dataKaryawan); 
        
        sortData('nama');
        formTambahKaryawan.reset();
        
        // Optional: Sembunyikan modal di sini jika Anda menggunakannya
        const modal = document.getElementById('modalTambah'); 
        if (modal) {
            modal.style.display = 'none';
        }
    });
}

// --- LANJUT KE KODE LAMA ANDA: document.addEventListener('DOMContentLoaded', ... ) ---

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
    
    sortData('nama');
});