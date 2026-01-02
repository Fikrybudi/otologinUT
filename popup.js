// Fungsi untuk menyimpan pengaturan
function saveSettings() {
  const nim = document.getElementById('nimInput').value;
  const autoClick = document.getElementById('autoClickCheck').checked;

  // Simpan data ke chrome.storage.local
  chrome.storage.local.set(
    { 
      userNIM: nim,
      autoClick: autoClick 
    }, 
    () => {
      // Tampilkan pesan sukses setelah disimpan
      const status = document.getElementById('status');
      status.textContent = 'Pengaturan disimpan!';
      
      // Hilangkan pesan setelah 2 detik
      setTimeout(() => {
        status.textContent = '';
      }, 2000);
    }
  );
}

// Fungsi untuk memuat pengaturan saat popup dibuka
function loadSettings() {
  // Ambil data dari chrome.storage.local
  // Kita berikan nilai default jika data belum ada
  chrome.storage.local.get({ userNIM: '', autoClick: true }, (items) => {
    document.getElementById('nimInput').value = items.userNIM;
    document.getElementById('autoClickCheck').checked = items.autoClick;
  });
}

// Tambahkan 'event listener'
// 1. Jalankan loadSettings saat popup selesai dimuat
document.addEventListener('DOMContentLoaded', loadSettings);
// 2. Jalankan saveSettings saat tombol 'Simpan' diklik
document.getElementById('saveButton').addEventListener('click', saveSettings);