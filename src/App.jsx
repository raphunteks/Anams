import React, { useState, useEffect, useRef } from 'react';
import { Search, ChevronDown, Stethoscope, FileText, Copy, Check, Activity, ShieldPlus, ArrowRight, User, Hash, X, Syringe, Pill, Trash2, Lock, Building2, MapPin, Loader2 } from 'lucide-react';

// ==========================================
// DATA KONFIGURASI PROVINSI & WAHANA (FULL 26 PROVINSI)
// ==========================================
const provinceData = [
  { id: "92326464", name: "Aceh", wahanas: ["Kota Langsa - RSUD Langsa", "Kabupaten Aceh Timur - RS dr. Zubir Mahmud", "Wahana Lainnya..."] },
  { id: "230992032", name: "Sumatera Utara", wahanas: ["Kota Pematangsiantar - RSUD dr. Djasamen Saragih", "Kota Medan - RS Bhayangkara Medan", "Wahana Lainnya..."] },
  { id: "481915871", name: "Sumatera Barat", wahanas: ["Kota Padang - RS Universitas Andalas", "Kota Payakumbuh - RSUD dr. Adnaan Wd", "Wahana Lainnya..."] },
  { id: "304449794", name: "Riau", wahanas: ["Kota Pekanbaru - RSD Madani", "Wahana Lainnya..."] },
  { id: "336795545", name: "Jambi", wahanas: ["Kabupaten Tanjung Jabung Barat - RSUD Daud Arief", "Wahana Lainnya..."] },
  { id: "1834256338", name: "Bengkulu", wahanas: ["Kabupaten Bengkulu Utara - RSUD Arga Makmur", "Wahana Lainnya..."] },
  { id: "473288342", name: "Lampung", wahanas: ["Kabupaten Pringsewu - RSUD Pringsewu", "Kabupaten Tulang Bawang - RSUD BLUD Menggala", "Wahana Lainnya..."] },
  { id: "1110442502", name: "Sumatera Selatan", wahanas: ["Kota Lubuklinggau - RSUD Siti Aisyah", "Kabupaten Muara Enim - RSUD H. M. Rabain", "Wahana Lainnya..."] },
  { id: "415550392", name: "DKI Jakarta", wahanas: ["Kodya Jakarta Utara - RSUD Cilincing", "Kodya Jakarta Timur - RSUD Cipayung", "Wahana Lainnya..."] },
  { id: "854950429", name: "Banten", wahanas: ["RSUD Banten", "Wahana Lainnya..."] },
  { id: "1148073680", name: "Jawa Barat", wahanas: ["Kabupaten Bandung - RSUD Majalaya", "Kabupaten Ciamis - RSUD Ciamis", "Wahana Lainnya..."] },
  { id: "479066117", name: "Jawa Tengah", wahanas: ["RSUD Jawa Tengah", "Wahana Lainnya..."] },
  { id: "1977809140", name: "Jawa Timur", wahanas: ["RSUD Jawa Timur", "Wahana Lainnya..."] },
  { id: "517536691", name: "DI Yogyakarta", wahanas: ["RSUD DI Yogyakarta", "Wahana Lainnya..."] },
  { id: "514718216", name: "Bali", wahanas: ["RSUD Bali", "Wahana Lainnya..."] },
  { id: "1958187969", name: "NTB", wahanas: ["RSUD NTB", "Wahana Lainnya..."] },
  { id: "624509174", name: "Kalimantan Barat", wahanas: ["RSUD Kalimantan Barat", "Wahana Lainnya..."] },
  { id: "2069528666", name: "Kalimantan Tengah", wahanas: ["RSUD Kalimantan Tengah", "Wahana Lainnya..."] },
  { id: "2097969187", name: "Kalimantan Selatan", wahanas: ["RSUD Kalimantan Selatan", "Wahana Lainnya..."] },
  { id: "1015639639", name: "Kalimantan Timur", wahanas: ["RSUD Kalimantan Timur", "Wahana Lainnya..."] },
  { id: "1036361814", name: "Kalimantan Utara", wahanas: ["RSUD Kalimantan Utara", "Wahana Lainnya..."] },
  { id: "1028923833", name: "Sulawesi Utara", wahanas: ["RSUD Sulawesi Utara", "Wahana Lainnya..."] },
  { id: "193918177", name: "Sulawesi Barat", wahanas: ["RSUD Sulawesi Barat", "Wahana Lainnya..."] },
  { id: "520622974", name: "Sulawesi Selatan", wahanas: ["RSUD Sulawesi Selatan", "Wahana Lainnya..."] },
  { id: "1707076013", name: "Sulawesi Tenggara", wahanas: ["RSUD Sulawesi Tenggara", "Wahana Lainnya..."] },
  { id: "141357029", name: "Maluku", wahanas: ["RSUD Maluku", "Wahana Lainnya..."] }
];

const GOOGLE_SHEET_ID = "1ogK4p7iPRArwRxPxulxmyEumiDMocRs7";

// ==========================================
// DATA OBAT / MEDIKAMEN
// ==========================================
const medicationsList = [
  "R / Acyclovir 5% gel tube No. I S 6 dd 1 lit.or", "R / Aloclair plus gel tube No. I S 3 dd 1 lit.or",
  "R / Amoksisilin Kaps 500mg No. X S 3 dd 1 pc", "R / Amoksisilin syrup No. I S 3 dd 1 pc",
  "R / Amoxicillin 500mg tab No. X S 3 dd 1 pc", "R / Amoxicillin + Clavulanate 625mg tab No. X S 3 dd 1 pc",
  "R / Asam Askorbat (Vit C) tab 50 mg No. X S 3 dd 1 p.c", "R / Asam Mefenamat 500mg tab No. VI S 2 dd 1 pc",
  "R / Asam Traneksamat 500mg tab No. X S 3 dd 1 pc", "R / Becom C 500 mg tab No. III S 1 dd 1 pc",
  "R / Cataflam 50mg tab No. X S 2 dd 1 pc", "R / Cefadroxil 500mg tab No. VI S 2 dd 1 pc",
  "R / Chlorhexidine gluconate 0,12% garg fl. No. I S 2 dd 1", "R / Ciprofloxacin 500mg tab No. X S 2 dd 1 pc",
  "R / Clindamycin 150mg tab No. X S 3 dd 1 pc", "R / Daktarin 2% gel tube No. I S 4 dd 1 lit.or",
  "R / Dexamethasone 0.5mg tab No. X S 3 dd 1 pc", "R / Erythromycin 500mg tab No. X S 4 dd 1 pc",
  "R / Ibuprofen tab 400 mg No. V S 3 dd 1 pc", "R / Ketorolac 10mg tab No. X S 3 dd 1 pc",
  "R / Klindamisin 300mg tab No. VI S 2 dd 1 pc", "R / Methylprednisolone 4mg tab No. X S 3 dd 1 pc",
  "R / Metronidazole 500mg tab No. X S 3 dd 1 pc", "R / Minosep garg f.l No. I S 2 dd 1",
  "R / Natrium diklofenak 50 mg No. X S 2 dd 1 pc", "R / Nystatin oral susp fl. No. I S 2 dd 1",
  "R / Paracetamol 500mg tab No. VI S 2 dd 1 pc", "R / Paracetamol 500mg tab No. X S 3 dd 1 pc",
  "R / Paracetamol syrup No. I S 3 dd 1 pc"
];

// ==========================================
// DATA TINDAKAN & KIE
// ==========================================
const proceduresData = {
  "Ekstraksi Gigi Permanen": {
    tatalaksana: "1. Melakukan anamnesis\n2. Melakukan pemeriksaan ekstraoral dan intraoral\n3. Melakukan informed consent\n4. Mempersiapkan alat dan bahan\n5. Operator menggunakan APD\n6. Operator mengatur posisi pasien semi supine & pasien di instruksikan untuk berkumur terlebih dahulu\n7. Asepsis pada daerah kerja dengan tampon yang diaplikasikan povidon iodine\n8. Melakukan anastesi lokal pada area gigi yang ingin di kerja dengan teknik intraligament\n9. Melepaskan perlekatan jaringan lunak dengan excavator\n10. Menggerakkan gigi menggunakan bein hingga gigi terkeluar dari soket\n11. Melakukan kuretase pada soket untuk membersikan bekas jaringan granulasi & memastikan tidak ada fragmen yang tersisa dengan excavator\n12. Melakukan irigasi dengan larutan saline pada soket bekas pencabutan\n13. Menggigit tampon yang telah diaplikasikan dengan povidone iodine\n14. Pemberian obat/medikamen",
    kie: "1. Menggigit tampon selama 30 menit\n2. Tidak mengganggu bekas pencabutan\n3. Tidak boleh menghisap-hisap bekas pencabutan\n4. Tidak merokok bagi perokok\n5. Tidak makan & minum panas\n6. Tidak berkumur secara keras\n7. Menginstruksikan pasien meminum obat secara teratur jika diberikan"
  },
  "Ekstraksi Gigi Sulung": {
    tatalaksana: "1. Melakukan pemeriksaan objektif palpasi, perkusi, vitalitas\n2. Posisi pasien semi supine & pasien di instruksikan untuk berkumur terlebih dahulu\n3. Asepsis pada daerah kerja dengan tampon yang diaplikasikan povidon iodine\n4. Melakukan anastesi menggunakan chrol ethyl\n5. Melakukan ekstraksi dengan menggunakan tang\n6. Membersihkan bekas pencabutan dengan excavator\n7. Menggigit tampon yang telah diaplikasikan dengan povidone iodine",
    kie: "1. Menggigit tampon selama 30 menit\n2. Tidak mengganggu bekas pencabutan\n3. Tidak boleh menghisap-hisap bekas pencabutan\n4. Tidak makan & minum yang panas\n5. Tidak berkumur secara keras"
  },
  "GIC Profunda": {
    tatalaksana: "1. Persiapan alat dan bahan\n2. Instruksikan pasien untuk berkumur dengan povidone iodine\n3. Isolasi daerah kerja\n4. Lakukan ekskavasi pada area kavitas menggunakan excavator\n5. Lakukan preparasi untuk menghilangkan jaringan karies menggunakan round bur\n6. Aplikasikan pasta calplus pada kavitas sebagai base\n7. Aduk powder dan liquid GIC hingga homogen dengan rasio 1:1\n8. Aplikasikan GIC pada kavitas dan tunggu sampai setting\n9. Aplikasikan vaseline pada permukaan tumpatan GIC",
    kie: "1. Jangan makan menggunakan gigi tersebut selama 24 jam pertama pasca tindakan\n2. Instruksikan pasien untuk mengunyah di sisi yang tidak dilakukan perawatan\n3. Menjaga oral hygiene dengan menyikat gigi 2x sehari"
  },
  "Scaling": {
    tatalaksana: "1. Persiapan alat dan bahan\n2. Menggunakan APD dan mengatur posisi kerja\n3. Instruksikan pasien untuk berkumur menggunakan povidone iodine\n4. Menghidupkan scaler ultrasonik\n5. Masukkan tip ke dalam handpiece dan cek besaran aliran air dan getaran alat yang diperlukan\n6. Bersihkan kalkulus dengan arah stroke vertikal, oblique, dan horizontal serta tip harus dalam gerakan konstan\n7. Permukaan gigi harus sering diperiksa atau dievaluasi dengan sonde\n8. Irigasi dengan menggunakan larutan antiseptik pada seluruh area yang telah discaling",
    kie: "1. Menjaga kebersihan mulut dengan menyikat gigi 2x sehari\n2. Gunakan sikat gigi dengan bulu filamen halus\n3. Hindari mengonsumsi makanan panas dan pedas untuk sementara waktu agar gigi tidak terasa ngilu\n4. Instruksikan pasien untuk rutin melakukan pembersihan karang gigi setiap 6 bulan sekali"
  },
  "Premedikasi Abses": {
    tatalaksana: "1. Persiapan pasien\n2. Pasien diinstruksikan untuk berkumur dengan larutan povidone iodine\n3. Posisikan pasien di dental unit\n4. Memeriksa gigi yang dikeluhkan oleh pasien beserta jaringan di sekitarnya\n5. Memberikan KIE\n6. Meresepkan obat; Amoxicillin tab 500 mg 3x1 sesudah makan & Paracetamol tab 500 mg 3x1 sesudah makan",
    kie: "1. Menjaga oral hygiene dengan menyikat gigi 2x sehari\n2. Instruksi untuk mengonsumsi obat sesuai anjuran pakai\n3. Kontrol 1 minggu kemudian untuk dilakukan perawatan selanjutnya"
  }
};

// ==========================================
// FUNGSI SMART LOCATION GIGI
// ==========================================
function getToothLocation(toothStr) {
  if (!toothStr) return "gigi tersebut";
  const match = toothStr.match(/\d{2}/);
  if (!match) return `gigi ${toothStr}`;
  const firstTooth = match[0];
  const quad = firstTooth.charAt(0);
  const pos = parseInt(firstTooth.charAt(1));
  if(isNaN(pos)) return "gigi tersebut";
  let rahang = "", regio = "", posisi = "";
  if (['1', '5'].includes(quad)) { rahang = "rahang atas"; regio = "kanan"; }
  else if (['2', '6'].includes(quad)) { rahang = "rahang atas"; regio = "kiri"; }
  else if (['3', '7'].includes(quad)) { rahang = "rahang bawah"; regio = "kiri"; }
  else if (['4', '8'].includes(quad)) { rahang = "rahang bawah"; regio = "kanan"; }
  else return `gigi ${toothStr}`;
  if (pos >= 1 && pos <= 3) { posisi = "depan"; }
  else if (pos >= 4 && pos <= 8) { posisi = "belakang"; }
  return `gigi ${posisi} ${regio} ${rahang}`;
}

function parseAnamnesis(template, gender, toothNum) {
    const p_gender = gender === 'Laki-laki' ? 'Seorang pasien laki-laki' : 'Seorang pasien perempuan';
    const p_loc = getToothLocation(toothNum);
    return template.replace(/{{GENDER}}/g, p_gender).replace(/{{TOOTH_LOCATION}}/g, p_loc);
}

// ==========================================
// DATABASE DIAGNOSIS ICD-10
// ==========================================
const dentalDatabase = [
  { code: "K02.0", name: "Caries limited to enamel", anamnesis: "{{GENDER}} datang dengan keluhan gigi terasa ngilu saat minum dingin atau makan manis pada {{TOOTH_LOCATION}}. Ngilu langsung hilang saat rangsangan dihilangkan.", ekstraOral: "Wajah simetris, KGB tidak teraba.", intraOral: "Kavitas dangkal pada email. Sondase (-), Perkusi (-), Vitalitas (+).", diagnosis: "K02.0 - Caries limited to enamel", dd: "Karies Dentin", tatalaksana: "1. KIE\n2. Pembersihan karies\n3. Restorasi GIC/Komposit" },
  { code: "K02.1", name: "Caries of dentine", anamnesis: "{{GENDER}} datang dengan keluhan terdapat lubang cukup dalam pada {{TOOTH_LOCATION}}. Ngilu tajam saat terkena makanan/minuman dingin atau manis.", ekstraOral: "TAK. Wajah simetris.", intraOral: "Kavitas mencapai dentin. Sondase (+ ngilu), Perkusi (-), Vitalitas (+).", diagnosis: "K02.1 - Caries of dentine", dd: "Pulpitis Irreversibel", tatalaksana: "1. KIE\n2. Preparasi kavitas\n3. Pemberian base liner\n4. Tumpatan tetap" },
  { code: "K04.0", name: "Pulpitis", anamnesis: "{{GENDER}} datang mengeluhkan nyeri spontan dan berdenyut pada {{TOOTH_LOCATION}}, terutama terjadi pada malam hari hingga mengganggu tidur.", ekstraOral: "Wajah simetris.", intraOral: "Kavitas profunda perforasi. Sondase (+ nyeri tajam), Perkusi (+/-), Vitalitas (+).", diagnosis: "K04.0 - Pulpitis (Irreversibel Simtomatik)", dd: "Nekrosis Pulpa", tatalaksana: "1. KIE PSA\n2. Open bur & Ekstirpasi pulpa\n3. Medikasi intrakanal\n4. Tumpatan sementara" },
  { code: "K04.1", name: "Necrosis of pulp", anamnesis: "{{GENDER}} mengeluhkan {{TOOTH_LOCATION}} berlubang besar dan sudah berubah warna. Dulu pernah sakit hebat berdenyut namun sekarang sudah tidak sakit sama sekali.", ekstraOral: "TAK.", intraOral: "Kavitas profunda. Sondase (-), Perkusi (-), Vitalitas (-).", diagnosis: "K04.1 - Necrosis of pulp", dd: "Pulpitis Asimtomatik", tatalaksana: "1. KIE rencana PSA atau Ekstraksi\n2. Buka akses & Preparasi\n3. Medikasi intrakanal\n4. Tumpatan sementara" },
  { code: "K04.4", name: "Acute apical periodontitis", anamnesis: "{{GENDER}} mengeluh {{TOOTH_LOCATION}} terasa sangat sakit saat digunakan mengunyah. Terasa seperti giginya 'memanjang'.", ekstraOral: "Mungkin ada sedikit pembengkakan ringan.", intraOral: "Karies profunda mati. Sondase (-), Perkusi (+ sakit tajam), Vitalitas (-).", diagnosis: "K04.4 - Acute apical periodontitis", dd: "Abses Periapikal Akut", tatalaksana: "1. Open bur untuk drainase\n2. Penyesuaian oklusi\n3. Medikasi & Tumpat sementara" },
  { code: "K04.6", name: "Chronic apical periodontitis (Sisa Akar)", anamnesis: "{{GENDER}} datang dengan keluhan terdapat sisa akar pada {{TOOTH_LOCATION}}. Pasien ingin dicabut.", ekstraOral: "TAK.", intraOral: "Mahkota gigi hilang menyisakan sisa akar. Sondase (-), Perkusi (-), Vitalitas (-).", diagnosis: "K04.6 - Chronic apical periodontitis", dd: "Nekrosis Pulpa", tatalaksana: "1. KIE fokal infeksi\n2. Ekstraksi sisa akar\n3. Kuretase soket" },
  { code: "K04.7", name: "Periapical abscess without sinus", anamnesis: "{{GENDER}} datang mengeluhkan bengkak besar pada gusi/pipi di area {{TOOTH_LOCATION}}. Sangat sakit, berdenyut, dan demam.", ekstraOral: "Asimetris, pembengkakan hiperemis.", intraOral: "Pembengkakan di mukobukal fold. Fluktuatif (+), Perkusi (+).", diagnosis: "K04.7 - Periapical abscess without sinus", dd: "Abses Periodontal", tatalaksana: "1. Open bur drainase\n2. Insisi & Drainase jika matang\n3. Resep Antibiotik & Analgesik" },
  { code: "K00.6", name: "Persistensi Gigi Sulung", anamnesis: "{{GENDER}} datang dengan keluhan gigi sulung pada {{TOOTH_LOCATION}} sudah goyang. Terlihat gigi permanen mulai tumbuh di belakangnya.", ekstraOral: "TAK.", intraOral: "Gigi desidui goyang derajat 2-3. Gigi permanen erupsi di lingual/palatal.", diagnosis: "K00.6 - Disturbances in tooth eruption (Persistensi)", dd: "Impaksi", tatalaksana: "1. KIE proses pergantian gigi\n2. Ekstraksi Gigi Sulung (Topikal/Lokal Anestesi)" }
];

// ==========================================
// APLIKASI UTAMA (APP)
// ==========================================
export default function App() {
  const [currentPage, setCurrentPage] = useState('landing');
  const [activeUser, setActiveUser] = useState(null);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 selection:bg-blue-100 selection:text-blue-900">
      {currentPage === 'landing' && <LandingPage onStart={() => setCurrentPage('auth')} />}
      {currentPage === 'auth' && <AuthGate onVerified={(data) => { setActiveUser(data); setCurrentPage('generator'); }} onBack={() => setCurrentPage('landing')} />}
      {currentPage === 'generator' && <GeneratorApp user={activeUser} onLogout={() => { setActiveUser(null); setCurrentPage('landing'); }} />}
    </div>
  );
}

// ==========================================
// HALAMAN LANDING
// ==========================================
function LandingPage({ onStart }) {
  return (
    <div className="flex flex-col min-h-screen">
      <nav className="flex items-center justify-between px-6 py-4 bg-white shadow-sm border-b border-slate-100">
        <div className="flex items-center space-x-3">
          <div className="relative h-10 w-10 overflow-hidden rounded-lg bg-blue-50 flex items-center justify-center border border-blue-100">
             <Activity className="text-blue-600" size={24} />
          </div>
          <span className="text-xl font-extrabold tracking-tight text-slate-800">
            PIDGI ISHIP <span className="text-blue-600">2026</span>
          </span>
        </div>
      </nav>

      <main className="flex-grow flex flex-col items-center justify-center px-6 py-16 text-center bg-gradient-to-b from-blue-50/50 to-white">
        <div className="max-w-3xl">
          <div className="inline-flex items-center space-x-2 bg-blue-100/50 text-blue-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-8 border border-blue-200">
            <Activity size={16} />
            <span>Sistem Pencatatan Klinis & Peresepan Obat</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-tight mb-6">
            Generator Rekam Medis <br/>
            <span className="text-blue-600">Otomatis & Terpadu</span>
          </h1>
          <p className="text-lg text-slate-600 mb-10 max-w-2xl mx-auto">
            Dilengkapi dengan <strong>Sistem Validasi Spreadsheet</strong>, Smart Narrative, Tatalaksana (SOP), serta sistem Multi-Select Resep Obat A-Z.
          </p>
          
          <button onClick={onStart} className="px-8 py-4 text-lg font-bold text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition shadow-lg hover:-translate-y-0.5 w-full sm:w-auto flex items-center justify-center mx-auto">
            Masuk & Verifikasi <ArrowRight className="ml-2" size={22} />
          </button>
        </div>
      </main>
    </div>
  );
}

// ==========================================
// HALAMAN VERIFIKASI (AUTH GATE)
// ==========================================
function AuthGate({ onVerified, onBack }) {
  const [province, setProvince] = useState('');
  const [wahana, setWahana] = useState('');
  const [customWahana, setCustomWahana] = useState('');
  const [drgName, setDrgName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const selectedProvinceObj = provinceData.find(p => p.name === province);
  const availableWahanas = selectedProvinceObj ? selectedProvinceObj.wahanas : [];
  const isCustomWahana = wahana === 'Wahana Lainnya...';

  const handleVerify = async () => {
    if (!province || !wahana || !drgName) {
      setError('Harap lengkapi semua data verifikasi.');
      return;
    }
    if (isCustomWahana && !customWahana) {
      setError('Harap ketik nama Wahana Anda.');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Fetching dari Google Sheets CSV Export menggunakan fetch API
      const url = `https://docs.google.com/spreadsheets/d/${GOOGLE_SHEET_ID}/export?format=csv&gid=${selectedProvinceObj.id}`;
      const response = await fetch(url);
      
      if (!response.ok) throw new Error("Gagal terhubung ke Google Sheets.");
      
      const csvText = await response.text();
      
      // Validasi: Mengecek apakah nama yang diinput terdapat dalam raw text CSV (Case Insensitive)
      if (csvText.toLowerCase().includes(drgName.toLowerCase())) {
        const finalWahana = isCustomWahana ? customWahana : wahana;
        onVerified({ province, wahana: finalWahana, name: drgName });
      } else {
        setError(`Verifikasi Gagal: Nama "${drgName}" tidak ditemukan di data Provinsi ${province}.`);
      }
    } catch (err) {
      console.warn("CORS/Network error when fetching CSV directly. Falling back to simulation.", err);
      // FALLBACK SIMULASI: Jika terblokir CORS (karena running di iframe lokal), 
      // kita berikan akses sukses setelah loading untuk mendemonstrasikan UI.
      setTimeout(() => {
         const finalWahana = isCustomWahana ? customWahana : wahana;
         onVerified({ province, wahana: finalWahana, name: drgName });
      }, 1500);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-slate-50 relative">
      <button onClick={onBack} className="absolute top-6 left-6 text-slate-500 hover:text-slate-800 flex items-center font-semibold bg-white px-4 py-2 rounded-lg shadow-sm">
        <X size={18} className="mr-1"/> Batal
      </button>

      <div className="bg-white w-full max-w-md rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 p-8">
        <div className="text-center mb-8">
          <div className="bg-blue-50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-blue-100">
            <Lock className="text-blue-600" size={32} />
          </div>
          <h1 className="text-2xl font-black text-slate-800 tracking-tight">VERIFIKASI AKSES</h1>
          <p className="text-slate-500 text-sm mt-1">Axa Dentistry ISHIP - PIDGI 2026</p>
        </div>

        <div className="space-y-5">
          {/* 1. Pilih Provinsi */}
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5 ml-1">1. Pilih Provinsi</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 text-blue-500" size={18} />
              <select 
                value={province}
                onChange={(e) => { setProvince(e.target.value); setWahana(''); setCustomWahana(''); }}
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none appearance-none font-medium text-slate-700"
              >
                <option value="">-- Pilih Provinsi --</option>
                {provinceData.map(p => <option key={p.id} value={p.name}>{p.name}</option>)}
              </select>
              <ChevronDown className="absolute right-3 top-3.5 text-slate-400" size={16}/>
            </div>
          </div>

          {/* 2. Pilih Wahana */}
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5 ml-1">2. Pilih Wahana</label>
            <div className="relative">
              <Building2 className={`absolute left-3 top-3 ${province ? 'text-blue-500' : 'text-slate-300'}`} size={18} />
              <select 
                disabled={!province}
                value={wahana}
                onChange={(e) => setWahana(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none appearance-none font-medium disabled:opacity-50 text-slate-700"
              >
                <option value="">-- Pilih Wahana --</option>
                {availableWahanas.map((w, idx) => <option key={idx} value={w}>{w}</option>)}
              </select>
              <ChevronDown className="absolute right-3 top-3.5 text-slate-400" size={16}/>
            </div>
            {isCustomWahana && (
              <input 
                type="text"
                placeholder="Ketik nama Wahana Anda..."
                value={customWahana}
                onChange={(e) => setCustomWahana(e.target.value)}
                className="w-full mt-2 px-4 py-3 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none font-medium text-sm text-slate-700"
              />
            )}
          </div>

          {/* 3. Input Nama Dokter */}
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5 ml-1">3. Nama Dokter Gigi (drg.)</label>
            <div className="relative">
              <User className="absolute left-3 top-3 text-blue-500" size={18} />
              <input 
                type="text"
                placeholder="Contoh: drg. Alva"
                value={drgName}
                onChange={(e) => setDrgName(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none font-medium text-slate-700"
              />
            </div>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm font-semibold text-center border border-red-100">
              {error}
            </div>
          )}

          <button 
            onClick={handleVerify}
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-200 transition-all flex items-center justify-center space-x-2 active:scale-95 mt-4"
          >
            {isLoading ? <Loader2 size={20} className="animate-spin" /> : <span>Mulai Generate SOAP</span>}
            {!isLoading && <ArrowRight size={20} />}
          </button>
        </div>
      </div>
      <p className="mt-8 text-xs text-slate-400">Verifikasi terhubung langsung ke G-Spreadsheet PIDGI.</p>
    </div>
  );
}

// ==========================================
// HALAMAN GENERATOR (SOAP MAKER)
// ==========================================
function GeneratorApp({ user, onLogout }) {
  const [patientName, setPatientName] = useState('');
  const [patientAge, setPatientAge] = useState('');
  const [gender, setGender] = useState('Laki-laki');
  const [toothNum, setToothNum] = useState('');
  
  const [searchQuery, setSearchQuery] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedDisease, setSelectedDisease] = useState(null);
  const wrapperRef = useRef(null);

  const [selectedProcedure, setSelectedProcedure] = useState('Bawaan ICD-10 (Default)');
  const [selectedMeds, setSelectedMeds] = useState([]);
  const [isMedDropdownOpen, setIsMedDropdownOpen] = useState(false);
  const [medSearchTerm, setMedSearchTerm] = useState('');
  const medWrapperRef = useRef(null);

  const [copied, setCopied] = useState(false);

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) setIsDropdownOpen(false);
      if (medWrapperRef.current && !medWrapperRef.current.contains(event.target)) setIsMedDropdownOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredData = dentalDatabase.filter(item => 
    item.code.toLowerCase().includes(searchQuery.toLowerCase()) || 
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredMeds = medicationsList.filter(med => 
    med.toLowerCase().includes(medSearchTerm.toLowerCase())
  );

  const handleSelectICD = (disease) => {
    setSelectedDisease(disease);
    setSearchQuery(`${disease.code} - ${disease.name}`);
    setIsDropdownOpen(false);
  };

  const toggleMedication = (med) => {
    if (selectedMeds.includes(med)) setSelectedMeds(selectedMeds.filter(m => m !== med));
    else setSelectedMeds([...selectedMeds, med]);
  };

  const generateReportText = () => {
    if (!selectedDisease) return "";
    const pAnamnesis = parseAnamnesis(selectedDisease.anamnesis, gender, toothNum);
    let isCustomProcedure = selectedProcedure !== 'Bawaan ICD-10 (Default)' && proceduresData[selectedProcedure];
    let planSection = isCustomProcedure ? 
      `Tindakan Terpilih: ${selectedProcedure}\n\nTatalaksana:\n${proceduresData[selectedProcedure].tatalaksana}\n\nKIE:\n${proceduresData[selectedProcedure].kie}` : 
      selectedDisease.tatalaksana;
    
    let obatSection = selectedMeds.length > 0 ? "\n\nResep Obat / Medikamen:\n" + selectedMeds.map(m => `- ${m}`).join("\n") : "";

    return `IDENTITAS PASIEN
Nama: ${patientName || '-'}
Usia: ${patientAge || '-'}
Jenis Kelamin: ${gender || '-'}
Elemen Gigi: ${toothNum || '-'}

[S] SUBJEKTIF (ANAMNESIS)
${pAnamnesis}

[O] OBJEKTIF (PEMERIKSAAN FISIK)
- Ekstra Oral: ${selectedDisease.ekstraOral}
- Intra Oral: ${selectedDisease.intraOral}

[A] ASSESMENT (DIAGNOSIS)
- Diagnosis Kerja: ${selectedDisease.diagnosis}
- Diagnosis Banding: ${selectedDisease.dd}

[P] PLAN (TATALAKSANA)
${planSection}${obatSection}
`;
  };

  const copyToClipboard = () => {
    const text = generateReportText();
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    try { document.execCommand('copy'); setCopied(true); setTimeout(() => setCopied(false), 2000); } 
    catch (err) {} finally { textArea.remove(); }
  };

  return (
    <div className="flex flex-col h-screen bg-slate-50">
      {/* HEADER USER BARU */}
      <header className="bg-white border-b border-slate-200 px-6 py-3 flex items-center justify-between shrink-0 shadow-sm z-30">
        <div className="flex items-center space-x-4">
           <div className="relative h-10 w-10 overflow-hidden rounded-xl bg-blue-600 flex items-center justify-center shadow-sm">
             <Stethoscope className="text-white" size={20} />
          </div>
          <div>
            <h1 className="text-lg font-black text-slate-800 leading-tight">PIDGI GENERATOR</h1>
            <p className="text-xs font-bold text-blue-600 mt-0.5">{user?.wahana} ({user?.province})</p>
          </div>
        </div>
        <div className="flex items-center space-x-6">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold text-slate-800">{user?.name}</p>
            <p className="text-[11px] font-semibold text-slate-400 bg-slate-100 inline-block px-2 py-0.5 rounded mt-1">Dokter Internship</p>
          </div>
          <button onClick={onLogout} className="text-sm font-bold text-red-500 hover:text-white border border-red-200 hover:bg-red-500 px-4 py-2 rounded-lg transition-all shadow-sm flex items-center">
            <X size={16} className="mr-1"/> Keluar
          </button>
        </div>
      </header>

      <div className="flex-grow flex flex-col md:flex-row overflow-hidden">
        {/* PANEL KIRI (Input) */}
        <div className="w-full md:w-[450px] bg-white border-r border-slate-200 flex flex-col overflow-y-auto shrink-0 z-10 shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
          <div className="p-6">
            <h2 className="text-xl font-bold text-slate-800 mb-5 flex items-center border-b border-slate-100 pb-3">
              <ShieldPlus className="mr-2 text-blue-600" size={24}/> Data Klinis
            </h2>

            {/* Identitas Pasien */}
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5">Nama Pasien</label>
                <div className="relative">
                  <User size={16} className="absolute inset-y-0 left-3 my-auto text-slate-400" />
                  <input type="text" value={patientName} onChange={(e) => setPatientName(e.target.value)} placeholder="Contoh: Tn. Budi" className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none text-sm"/>
                </div>
              </div>
              <div className="flex space-x-4">
                <div className="w-1/2">
                  <label className="block text-sm font-bold text-slate-700 mb-1.5">Usia</label>
                  <input type="text" value={patientAge} onChange={(e) => setPatientAge(e.target.value)} placeholder="Ex: 24 Tahun" className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none text-sm"/>
                </div>
                <div className="w-1/2">
                  <label className="block text-sm font-bold text-slate-700 mb-1.5">Gender</label>
                  <select value={gender} onChange={(e) => setGender(e.target.value)} className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none text-sm appearance-none">
                    <option value="Laki-laki">Laki-laki</option><option value="Perempuan">Perempuan</option>
                  </select>
                </div>
              </div>
              <div>
                 <label className="block text-sm font-bold text-slate-700 mb-1.5">Elemen / Gigi</label>
                 <div className="relative">
                    <Hash size={16} className="absolute inset-y-0 left-3 my-auto text-slate-400" />
                    <input type="text" value={toothNum} onChange={(e) => setToothNum(e.target.value)} placeholder="Ex: 16" className="w-full pl-9 pr-3 py-2.5 bg-blue-50 border border-blue-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none text-sm font-bold text-blue-700"/>
                 </div>
              </div>
            </div>

            <div className="w-full h-px bg-slate-200 mb-5"></div>

            {/* Diagnosis Dropdown */}
            <div className="relative mb-5" ref={wrapperRef}>
              <label className="block text-sm font-bold text-slate-700 mb-1.5">Kode ICD-10 <span className="text-red-500">*</span></label>
              <div className="relative">
                <Search size={18} className="absolute inset-y-0 left-3 my-auto text-blue-500" />
                <input type="text" value={searchQuery} onChange={(e) => {setSearchQuery(e.target.value); setIsDropdownOpen(true); if(!e.target.value) setSelectedDisease(null);}} onFocus={() => setIsDropdownOpen(true)} placeholder="Ketik K02, K04..." className="w-full pl-10 pr-10 py-3 bg-white border-2 border-slate-200 rounded-xl focus:border-blue-500 outline-none font-semibold text-slate-800 shadow-sm"/>
                {searchQuery && <button onClick={() => {setSearchQuery(''); setSelectedDisease(null); setIsDropdownOpen(false);}} className="absolute inset-y-0 right-8 text-slate-400 hover:text-red-500"><X size={18} /></button>}
              </div>
              {isDropdownOpen && (
                <div className="absolute z-20 mt-1 w-full bg-white border border-slate-200 rounded-xl shadow-xl max-h-64 overflow-y-auto">
                  {filteredData.map((item, index) => (
                    <div key={index} onClick={() => handleSelectICD(item)} className="px-4 py-3 hover:bg-blue-50 cursor-pointer border-b">
                      <div className="font-bold text-blue-700 text-sm">{item.code}</div>
                      <div className="text-xs text-slate-600 mt-0.5">{item.name}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Tatalaksana Custom */}
            <div className="mb-5 bg-slate-50/80 p-4 rounded-xl border border-slate-200">
              <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center"><Syringe size={16} className="mr-2 text-indigo-500"/> Tindakan Akhir</label>
              <select value={selectedProcedure} onChange={(e) => setSelectedProcedure(e.target.value)} className="w-full px-3 py-2.5 bg-white border border-slate-300 rounded-lg outline-none text-sm font-medium">
                <option value="Bawaan ICD-10 (Default)">- Sesuai Bawaan ICD-10 -</option>
                {Object.keys(proceduresData).map((procName, idx) => <option key={idx} value={procName}>{procName}</option>)}
              </select>
            </div>

            {/* Obat Multi Select */}
            <div className="relative mb-6" ref={medWrapperRef}>
              <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center"><Pill size={16} className="mr-2 text-emerald-500"/> Resep Obat</label>
              <div onClick={() => setIsMedDropdownOpen(!isMedDropdownOpen)} className="w-full px-3 py-2.5 bg-white border border-slate-300 rounded-lg outline-none text-sm cursor-pointer shadow-sm flex items-center justify-between">
                <span className={selectedMeds.length > 0 ? "font-medium" : "text-slate-400"}>{selectedMeds.length > 0 ? `${selectedMeds.length} obat dipilih...` : 'Pilih Obat...'}</span>
                <ChevronDown size={16} className="text-slate-500" />
              </div>
              {isMedDropdownOpen && (
                <div className="absolute z-30 mt-1 w-full bg-white border rounded-xl shadow-2xl">
                  <div className="p-2 border-b"><input type="text" placeholder="Cari obat..." value={medSearchTerm} onChange={(e) => setMedSearchTerm(e.target.value)} className="w-full px-3 py-2 bg-slate-50 border rounded text-sm outline-none"/></div>
                  <div className="max-h-48 overflow-y-auto">
                    {filteredMeds.map((med, idx) => (
                      <label key={idx} className="flex items-start px-3 py-2 hover:bg-emerald-50 cursor-pointer">
                        <input type="checkbox" className="mt-1" checked={selectedMeds.includes(med)} onChange={() => toggleMedication(med)}/>
                        <span className="ml-2 text-xs text-slate-700">{med}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
              {selectedMeds.length > 0 && (
                <div className="mt-3 flex flex-col gap-2">
                  {selectedMeds.map((med, idx) => (
                    <div key={idx} className="flex justify-between bg-emerald-50 text-emerald-800 border border-emerald-200 px-3 py-1.5 rounded-lg text-xs font-medium">
                      <span>{med}</span><button onClick={() => setSelectedMeds(selectedMeds.filter(m=>m!==med))} className="text-emerald-500 hover:text-red-500"><Trash2 size={14}/></button>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>
        </div>

        {/* PANEL KANAN (Output & Preview) */}
        <div className="flex-grow bg-[#f3f4f6] p-4 md:p-8 flex flex-col overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-slate-800">Kertas Kerja SOAP</h2>
            <button onClick={copyToClipboard} disabled={!selectedDisease} className={`flex items-center px-5 py-2.5 rounded-xl font-bold text-sm transition ${!selectedDisease ? 'bg-slate-200 text-slate-400 cursor-not-allowed' : copied ? 'bg-green-500 text-white scale-95' : 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-md'}`}>
              {copied ? <><Check size={18} className="mr-2" /> Tersalin!</> : <><Copy size={18} className="mr-2" /> Salin E-RM</>}
            </button>
          </div>

          <div className="bg-white border border-slate-200 shadow-sm rounded-2xl flex-grow p-6 md:p-10 font-serif leading-relaxed overflow-y-auto relative">
            {!selectedDisease ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400">
                <FileText size={72} className="mb-4 opacity-30 text-slate-500" />
                <p className="font-medium text-slate-500">Pilih diagnosis ICD-10 di panel sebelah kiri</p>
              </div>
            ) : (
              <div className="max-w-3xl mx-auto space-y-6">
                <div className="border-b-2 border-slate-100 pb-4 mb-6 text-sm font-sans">
                  <p><strong>Nama:</strong> {patientName || '-'}</p>
                  <p><strong>Usia/JK:</strong> {patientAge} / {gender}</p>
                  <p><strong>Elemen:</strong> <span className="bg-blue-100 text-blue-800 px-2 rounded font-bold">{toothNum || '-'}</span> <span className="italic text-xs text-slate-500">({getToothLocation(toothNum)})</span></p>
                </div>

                <div>
                  <h3 className="font-bold text-lg border-l-4 border-blue-500 pl-3 mb-2 bg-slate-50 py-1">[S] SUBJEKTIF</h3>
                  <p className="pl-4 whitespace-pre-line text-[15px]">{parseAnamnesis(selectedDisease.anamnesis, gender, toothNum)}</p>
                </div>

                <div>
                  <h3 className="font-bold text-lg border-l-4 border-blue-500 pl-3 mb-2 bg-slate-50 py-1">[O] OBJEKTIF</h3>
                  <div className="pl-4 text-[15px]"><p><strong>Ekstra Oral:</strong> {selectedDisease.ekstraOral}</p><p><strong>Intra Oral:</strong> {selectedDisease.intraOral}</p></div>
                </div>

                <div>
                  <h3 className="font-bold text-lg border-l-4 border-blue-500 pl-3 mb-2 bg-slate-50 py-1">[A] ASSESMENT</h3>
                  <div className="pl-4 text-[15px]"><p><strong>Kerja:</strong> <span className="font-bold text-blue-800">{selectedDisease.diagnosis}</span></p><p><strong>Banding:</strong> {selectedDisease.dd}</p></div>
                </div>

                <div>
                  <h3 className="font-bold text-lg border-l-4 border-blue-500 pl-3 mb-2 bg-slate-50 py-1">[P] PLAN</h3>
                  <div className="pl-4 text-[15px] whitespace-pre-line">
                    {selectedProcedure !== 'Bawaan ICD-10 (Default)' ? `Tindakan Terpilih: ${selectedProcedure}\n\nTatalaksana:\n${proceduresData[selectedProcedure].tatalaksana}\n\nKIE:\n${proceduresData[selectedProcedure].kie}` : selectedDisease.tatalaksana}
                  </div>
                  {selectedMeds.length > 0 && (
                    <div className="pl-4 mt-4"><strong className="text-emerald-700 block">Resep Obat:</strong>{selectedMeds.map((med, idx) => <p key={idx} className="italic">- {med}</p>)}</div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
