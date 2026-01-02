/**
 * Fungsi untuk mengisi elemen input yang ditemukan.
 * @param {HTMLInputElement} inputElement - Elemen input <input> yang akan diisi.
 * @param {string} nim - NIM yang didapat dari storage.
 */
function fillLoginInput(inputElement, nim) {
  if (inputElement.value === "") {
    inputElement.value = nim;
    
    const event = new Event('input', { bubbles: true });
    inputElement.dispatchEvent(event);
    
    console.log("MyUT NIM Autofill: NIM telah diisi otomatis dari storage.");
    return true;
  }
  return false;
}

/**
 * Fungsi untuk mencari dan mengklik tombol "Masuk".
 */
function clickLoginButton() {
  const allButtons = document.querySelectorAll('button');
  for (const button of allButtons) {
    if (button.innerText.trim() === "Masuk") {
      console.log("MyUT NIM Autofill: Tombol 'Masuk' ditemukan, mengklik...");
      button.click();
      return;
    }
  }
  console.log("MyUT NIM Autofill: Tombol 'Masuk' tidak ditemukan.");
}

// --- LOGIKA UTAMA ---

// 1. Ambil pengaturan (NIM dan autoClick) dari storage
chrome.storage.local.get({ userNIM: '', autoClick: true }, (items) => {
  
  const MY_NIM = items.userNIM;
  const AUTO_CLICK_MASUK = items.autoClick;

  // 2. Jika NIM tidak kosong (sudah di-set oleh pengguna)...
  if (MY_NIM) {
    const inputSelector = 'input[placeholder="Masukkan NIM"]';

    // 3. Mulai cari form input di halaman
    const intervalId = setInterval(() => {
      const inputField = document.querySelector(inputSelector);
      
      if (inputField) {
        // 4. Isi NIM
        const filled = fillLoginInput(inputField, MY_NIM);

        // 5. Jika berhasil diisi DAN auto-klik aktif, klik tombol
        if (filled && AUTO_CLICK_MASUK) {
          setTimeout(() => {
            clickLoginButton();
          }, 100);
        }
        
        // 6. Hentikan pencarian
        clearInterval(intervalId);
      }
    }, 200);
  } else {
    // Jika NIM belum di-set, beri tahu di console
    console.log("MyUT NIM Autofill: NIM belum diatur. Klik ikon ekstensi untuk menyimpannya.");
  }
});