// 1. Definisikan Data Karyawan
const dataKaryawan = [
    { id: "E001", nama: "Aku Yo Rapopo", jabatan: "Manager", gaji: 15000000 },
    { id: "E002", nama: "Kowe Gelem Ra", jabatan: "Staff IT", gaji: 8500000 },
    { id: "E003", nama: "Ra Madang Luwe", jabatan: "Sales", gaji: 7000000 },
    { id: "E004", nama: "Jane Kaeki Sopo", jabatan: "HRD", gaji: 9000000 }
];

// 2. Fungsi untuk menampilkan data ke tabel
function tampilkanDataKaryawan() {
    // Ambil elemen <tbody> dari HTML
    const tabelBody = document.querySelector("#tabelKaryawan tbody");
    
    // Pastikan <tbody> kosong sebelum mengisi
    tabelBody.innerHTML = ''; 

    // Loop (ulang) melalui setiap objek di array dataKaryawan
    dataKaryawan.forEach(karyawan => {
        // Buat baris (<tr>) baru
        const baris = document.createElement('tr'); 

        // Format gaji ke format mata uang Indonesia (opsional, tapi disarankan)
        const gajiFormat = new Intl.NumberFormat('id-ID').format(karyawan.gaji);

        // Isi baris dengan data sel (<td>)
        baris.innerHTML = `
            <td>${karyawan.id}</td>
            <td>${karyawan.nama}</td>
            <td>${karyawan.jabatan}</td>
            <td>Rp ${gajiFormat}</td>
        `;
        
        // Tambahkan baris ke dalam <tbody>
        tabelBody.appendChild(baris);
    });
}

// 3. Panggil fungsi setelah halaman dimuat
// Ini memastikan elemen tabel sudah ada sebelum script mencoba memanipulasinya
document.addEventListener('DOMContentLoaded', tampilkanDataKaryawan);