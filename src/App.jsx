import React, { useState, useEffect, useRef } from 'react';
import { Search, ChevronDown, Stethoscope, FileText, Copy, Check, Activity, ShieldPlus, ArrowRight, User, Hash, X, Syringe, Pill, Trash2, UserCheck, MapPin, Building, ShieldAlert, ShieldCheck, Loader2, Lock, Users, LogOut, Clock } from 'lucide-react';

// ==========================================
// VERCEL KV DATABASE (UPSTASH REDIS)
// ==========================================
const KV_URL = "https://merry-hedgehog-35658.upstash.io";
const KV_TOKEN = "AYtKAAIncDIzYmQyNWM4YTM2Y2E0ODZkOTJlNTYwNzBjMzMyNWQxZHAyMzU2NTg";

// ==========================================
// PENGATURAN LINK GOOGLE SPREADSHEET (MASTER)
// ==========================================
const SPREADSHEET_ID = '1ogK4p7iPRArwRxPxulxmyEumiDMocRs7'; 

const PROVINCES_DATA = [
  { name: "Provinsi Aceh", gid: "92326464" },
  { name: "Provinsi Sumatera Utara", gid: "230992032" },
  { name: "Provinsi Sumatera Barat", gid: "481915871" },
  { name: "Provinsi Riau", gid: "304449794" },
  { name: "Provinsi Jambi", gid: "336795545" },
  { name: "Provinsi Bengkulu", gid: "1834256338" },
  { name: "Provinsi Lampung", gid: "473288342" },
  { name: "Provinsi Sumatera Selatan", gid: "1110442502" },
  { name: "DKI Jakarta", gid: "415550392" },
  { name: "Provinsi Banten", gid: "854950429" },
  { name: "Provinsi Jawa Barat", gid: "1148073680" },
  { name: "Provinsi Jawa Tengah", gid: "479066117" },
  { name: "Provinsi Jawa Timur", gid: "1977809140" },
  { name: "Provinsi DI Yogyakarta", gid: "517536691" },
  { name: "Provinsi Bali", gid: "514718216" },
  { name: "Provinsi NTB", gid: "1958187969" },
  { name: "Provinsi Kalimantan Barat", gid: "624509174" },
  { name: "Provinsi Kalimantan Tengah", gid: "2069528666" },
  { name: "Provinsi Kalimantan Selatan", gid: "2097969187" },
  { name: "Provinsi Kalimantan Timur", gid: "1015639639" },
  { name: "Provinsi Kalimantan Utara", gid: "1036361814" },
  { name: "Provinsi Sulawesi Utara", gid: "1028923833" },
  { name: "Provinsi Sulawesi Barat", gid: "193918177" },
  { name: "Provinsi Sulawesi Selatan", gid: "520622974" },
  { name: "Provinsi Sulawesi Tenggara", gid: "1707076013" },
  { name: "Provinsi Maluku", gid: "141357029" }
];

// ==========================================
// DATA OBAT / MEDIKAMEN
// ==========================================
const medicationsList = [
  "R / Acyclovir 5% gel tube No. I S 6 dd 1 lit.or",
  "R / Aloclair plus gel tube No. I S 3 dd 1 lit.or",
  "R / Amoksisilin Kaps 500mg No. X S 3 dd 1 pc",
  "R / Amoksisilin syrup No. I S 3 dd 1 pc",
  "R / Amoxicillin 500mg tab No. X S 3 dd 1 pc",
  "R / Amoxicillin + Clavulanate 625mg tab No. X S 3 dd 1 pc",
  "R / Asam Askorbat (Vit C) tab 50 mg No. X S 3 dd 1 p.c",
  "R / Asam Mefenamat 500mg tab No. VI S 2 dd 1 pc",
  "R / Asam Traneksamat 500mg tab No. X S 3 dd 1 pc",
  "R / Becom C 500 mg tab No. III S 1 dd 1 pc",
  "R / Cataflam 50mg tab No. X S 2 dd 1 pc",
  "R / Cefadroxil 500mg tab No. VI S 2 dd 1 pc",
  "R / Chlorhexidine gluconate 0,12% garg fl. No. I S 2 dd 1",
  "R / Ciprofloxacin 500mg tab No. X S 2 dd 1 pc",
  "R / Clindamycin 150mg tab No. X S 3 dd 1 pc",
  "R / Daktarin 2% gel tube No. I S 4 dd 1 lit.or",
  "R / Dexamethasone 0.5mg tab No. X S 3 dd 1 pc",
  "R / Erythromycin 500mg tab No. X S 4 dd 1 pc",
  "R / Ibuprofen tab 400 mg No. V S 3 dd 1 pc",
  "R / Ketorolac 10mg tab No. X S 3 dd 1 pc",
  "R / Klindamisin 300mg tab No. VI S 2 dd 1 pc",
  "R / Methylprednisolone 4mg tab No. X S 3 dd 1 pc",
  "R / Metronidazole 500mg tab No. X S 3 dd 1 pc",
  "R / Minosep garg f.l No. I S 2 dd 1",
  "R / Natrium diklofenak 50 mg No. X S 2 dd 1 pc",
  "R / Nystatin oral susp fl. No. I S 2 dd 1",
  "R / Paracetamol 500mg tab No. VI S 2 dd 1 pc",
  "R / Paracetamol 500mg tab No. X S 3 dd 1 pc",
  "R / Paracetamol syrup No. I S 3 dd 1 pc"
];

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
  "GIC Post Eugenol TS": {
    tatalaksana: "1. Persiapan alat dan bahan\n2. Instruksikan pasien untuk berkumur dengan povidone iodine\n3. Isolasi daerah kerja\n4. Lepaskan tumpatan sementara dari area kavitas\n5. Bersihkan kavitas dan keringkan\n6. Aplikasikan pasta calplus pada kavitas sebagai base\n7. Aduk powder dan liquid GIC hingga homogen dengan rasio 1:1\n8. Aplikasikan GIC pada kavitas dan tunggu sampai setting\n9. Aplikasikan vaseline pada permukaan tumpatan GIC",
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
    const p_gender = gender === 'Laki-laki' ? 'Seorang pasien laki-laki' : (gender === 'Perempuan' ? 'Seorang pasien perempuan' : 'Seorang pasien');
    const p_loc = getToothLocation(toothNum);
    return template.replace(/{{GENDER}}/g, p_gender).replace(/{{TOOTH_LOCATION}}/g, p_loc);
}

const dentalDatabase = [
  {
    code: "K02.0",
    name: "Caries limited to enamel",
    anamnesis: "{{GENDER}} datang dengan keluhan gigi terasa ngilu saat minum dingin atau makan manis pada {{TOOTH_LOCATION}}. Ngilu langsung hilang saat rangsangan dihilangkan. Tidak ada keluhan nyeri spontan atau nyeri saat malam hari.",
    ekstraOral: "Wajah simetris, tidak ada pembengkakan ekstra oral. Kelenjar Getah Bening (KGB) submandibula tidak teraba dan tidak sakit.",
    intraOral: "Terdapat kavitas dangkal berupa lesi karies pada permukaan email gigi. \n- Tes Sondase: (-) atau ngilu ringan sesaat.\n- Tes Perkusi: (-)\n- Tes Palpasi: (-)\n- Tes Vitalitas/Dingin: (+)",
    diagnosis: "K02.0 - Caries limited to enamel (Karies Email / Pulpitis Reversibel)",
    dd: "Karies Dentin",
    tatalaksana: "1. KIE (Komunikasi, Informasi, Edukasi) cara menyikat gigi yang benar (Modifikasi Bass).\n2. Pembersihan jaringan karies (Preparasi kavitas).\n3. Restorasi dengan resin komposit atau Glass Ionomer Cement (GIC)."
  },
  {
    code: "K02.1",
    name: "Caries of dentine",
    anamnesis: "{{GENDER}} datang dengan keluhan terdapat lubang cukup dalam pada {{TOOTH_LOCATION}}. Pasien ingin dilakukan penambalan pada gigi tersebut. Ngilu tajam saat terkena makanan/minuman dingin, manis, atau asam. Ngilu mereda setelah beberapa saat stimulus dihilangkan. Makanan sering menyangkut.",
    ekstraOral: "Wajah simetris, tidak ada kelainan (TAK). KGB tidak teraba.",
    intraOral: "Terdapat kavitas berukuran sedang hingga dalam mencapai lapisan dentin. \n- Tes Sondase: (+ ngilu)\n- Tes Perkusi: (-)\n- Tes Palpasi: (-)\n- Tes Vitalitas: (+)",
    diagnosis: "K02.1 - Caries of dentine (Karies Dentin / Pulpitis Reversibel)",
    dd: "Pulpitis Irreversibel Simtomatik",
    tatalaksana: "1. KIE pentingnya menjaga kebersihan mulut.\n2. Pembersihan jaringan karies (Preparasi kavitas).\n3. Pemberian base/liner (Kalsium Hidroksida / GIC tipe III) jika kavitas cukup dalam (mendekati pulpa).\n4. Tumpatan tetap (Resin Komposit / GIC)."
  },
  {
    code: "K02.2",
    name: "Caries of cementum",
    anamnesis: "{{GENDER}} mengeluhkan gigi ngilu pada area leher gigi, terutama saat menyikat gigi atau minum dingin pada {{TOOTH_LOCATION}}. Terasa ada permukaan yang kasar di dekat gusi.",
    ekstraOral: "TAK. Wajah simetris.",
    intraOral: "Terdapat resesi gingiva. Tampak lesi karies pada area servikal/akar (sementum) yang terbuka. \n- Tes Sondase: (+) ngilu.\n- Tes Perkusi: (-)\n- Tes Vitalitas: (+)",
    diagnosis: "K02.2 - Caries of cementum (Karies Sementum / Karies Akar)",
    dd: "Abrasi Servikal, Abfraksi",
    tatalaksana: "1. KIE teknik menyikat gigi dengan bulu sikat halus.\n2. Pembersihan kavitas dengan bur atau ekskavator.\n3. Restorasi menggunakan Glass Ionomer Cement (GIC)."
  },
  {
    code: "K02.3",
    name: "Arrested dental caries",
    anamnesis: "{{GENDER}} tidak memiliki keluhan sakit atau ngilu. Pasien hanya menyadari adanya bercak kecoklatan atau kehitaman pada {{TOOTH_LOCATION}} yang sudah lama tidak membesar.",
    ekstraOral: "TAK.",
    intraOral: "Terdapat lesi karies berwarna coklat/hitam pekat. Saat diekskavasi atau di-sondase, dasar kavitas terasa keras dan licin. \n- Tes Sondase: (-) keras.\n- Tes Perkusi: (-)\n- Tes Vitalitas: (+)",
    diagnosis: "K02.3 - Arrested dental caries (Karies Terhenti)",
    dd: "Diskolorasi Ekstrinsik, Karies Dentin Aktif",
    tatalaksana: "1. KIE bahwa karies telah terhenti prosesnya.\n2. Observasi berkala.\n3. Jika mengganggu estetika, dapat dilakukan restorasi estetik (Komposit) setelah preparasi minimal."
  },
  {
    code: "K02.4",
    name: "Odontoclasia",
    anamnesis: "{{GENDER}} seringkali asimtomatik (tanpa gejala) atau mengeluhkan {{TOOTH_LOCATION}} terasa sedikit goyang atau ada noda kemerahan/pink pada mahkota gigi (pink tooth).",
    ekstraOral: "TAK.",
    intraOral: "Tampak defek resorpsi pada area servikal atau mahkota. Jika resorpsi internal meluas, tampak bayangan kemerahan (pink spot). \n- Perkusi: (+/-)\n- Kegoyangan: bisa derajat 1-2.\n- Rontgen: resorpsi struktur gigi internal/eksternal.",
    diagnosis: "K02.4 - Odontoclasia (Resorpsi Internal / Eksternal Gigi)",
    dd: "Karies Servikal Profunda",
    tatalaksana: "1. Rujukan foto rontgen periapikal untuk observasi perluasan resorpsi.\n2. Jika resorpsi internal memengaruhi pulpa tanpa perforasi akar luar: Perawatan Saluran Akar (PSA).\n3. Jika resorpsi eksternal parah/gigi sangat goyang: Ekstraksi."
  },
  {
    code: "K02.8",
    name: "Other dental caries",
    anamnesis: "{{GENDER}} mengeluhkan adanya rasa ngilu/sakit yang tidak spesifik penempatannya di {{TOOTH_LOCATION}} (misal: terdapat karies sekunder di bawah tumpatan lama).",
    ekstraOral: "TAK.",
    intraOral: "Terdapat karies di sekitar tepi restorasi lama (karies sekunder). \n- Tes Sondase: (+/-) menyangkut di tepi tumpatan.\n- Vitalitas: (+)",
    diagnosis: "K02.8 - Other dental caries (Karies Sekunder / Recurrent caries)",
    dd: "Tumpatan Overhang / Bocor",
    tatalaksana: "1. KIE.\n2. Pembongkaran tumpatan lama yang bocor.\n3. Pembersihan karies sekunder.\n4. Restorasi ulang yang adekuat."
  },
  {
    code: "K02.9",
    name: "Dental caries, unspecified",
    anamnesis: "{{GENDER}} datang mengeluhkan {{TOOTH_LOCATION}} berlubang. (Diagnosis belum spesifik pada kunjungan pertama).",
    ekstraOral: "TAK.",
    intraOral: "Tampak lesi karies pada gigi. Penilaian lebih lanjut masih diperlukan.",
    diagnosis: "K02.9 - Dental caries, unspecified",
    dd: "Karies Dentin, Pulpitis",
    tatalaksana: "1. KIE.\n2. Ekskavasi jaringan karies untuk menentukan kedalaman sebenarnya.\n3. Penegakan diagnosis definitif pada tahapan selanjutnya."
  },
  {
    code: "K04.0",
    name: "Pulpitis",
    anamnesis: "{{GENDER}} datang mengeluhkan nyeri spontan dan berdenyut pada {{TOOTH_LOCATION}}, terutama terjadi pada malam hari hingga mengganggu tidur. Nyeri tajam, bertahan lama meski stimulus dihilangkan, dan kadang menjalar ke area kepala atau telinga.",
    ekstraOral: "Wajah simetris, tidak ada pembengkakan. KGB submandibula mungkin sedikit teraba namun umumnya tidak sakit.",
    intraOral: "Terdapat kavitas profunda mencapai kamar pulpa (karies profunda perforasi). \n- Tes Sondase: (+ nyeri tajam)\n- Tes Perkusi: (+/- biasanya ringan)\n- Tes Palpasi: (-)\n- Tes Vitalitas/Dingin: (+ over reaktif / nyeri bertahan lama).",
    diagnosis: "K04.0 - Pulpitis (Pulpitis Irreversibel Simtomatik)",
    dd: "Periodontitis Apikalis Akut, Nekrosis Pulpa (parsial)",
    tatalaksana: "1. KIE rencana perawatan saluran akar (PSA).\n2. Anastesi lokal (jika nyeri hebat).\n3. Open bur & Ekstirpasi pulpa.\n4. Medikasi intrakanal (Eugenol / Formokresol pada kapas kecil) atau Ca(OH)2.\n5. Tumpatan sementara.\n6. Resep Analgesik: Asam Mefenamat 500mg 3x1 p.r.n."
  },
  {
    code: "K04.1",
    name: "Necrosis of pulp",
    anamnesis: "{{GENDER}} mengeluhkan {{TOOTH_LOCATION}} berlubang besar dan sudah berubah warna (menghitam/keabu-abuan). Dulu pernah sakit hebat berdenyut namun sekarang sudah tidak sakit sama sekali. Kadang terasa bau kurang sedap.",
    ekstraOral: "Wajah simetris, TAK.",
    intraOral: "Kavitas profunda perforasi. Mahkota gigi tampak mengalami diskolorasi. \n- Tes Sondase: (-) tidak sakit.\n- Tes Perkusi: (-)\n- Tes Palpasi: (-)\n- Tes Vitalitas (Dingin/Termal): (-) tidak merespon sama sekali.",
    diagnosis: "K04.1 - Necrosis of pulp (Nekrosis Pulpa)",
    dd: "Pulpitis Asimtomatik",
    tatalaksana: "1. KIE rencana PSA (Perawatan Saluran Akar) atau Ekstraksi.\n2. Buka akses (Open bur) & Preparasi saluran akar.\n3. Irigasi (NaOCl 2.5% & Saline).\n4. Medikasi intrakanal (CHKM/TKF atau Kalsium Hidroksida pasta).\n5. Tumpatan sementara.\n*Jika mahkota sisa terlalu sedikit, pro ekstraksi."
  },
  {
    code: "K04.2",
    name: "Pulp degeneration",
    anamnesis: "{{GENDER}} biasanya tidak ada keluhan rasa sakit (asimtomatik) pada {{TOOTH_LOCATION}}. Ditemukan secara tidak sengaja saat pemeriksaan rutin atau foto rontgen.",
    ekstraOral: "TAK.",
    intraOral: "Gigi mungkin tampak utuh atau dengan tumpatan besar. \n- Tes Vitalitas: seringkali merespon lambat atau (-).\n- Rontgen: Tampak penyempitan atau obliterasi total pada kamar pulpa/saluran akar (Kalsifikasi pulpa).",
    diagnosis: "K04.2 - Pulp degeneration (Degenerasi Pulpa / Kalsifikasi)",
    dd: "Nekrosis Pulpa",
    tatalaksana: "1. Observasi jika asimtomatik.\n2. KIE kepada pasien mengenai kondisi giginya.\n3. Jika diperlukan untuk restorasi protesa, perawatan PSA mungkin sangat sulit akibat kalsifikasi."
  },
  {
    code: "K04.3",
    name: "Abnormal hard tissue formation in pulp",
    anamnesis: "{{GENDER}} tidak ada keluhan atau kadang mengeluhkan nyeri tumpul/ngilu (neuralgia) tanpa penyebab yang jelas pada area {{TOOTH_LOCATION}}.",
    ekstraOral: "TAK.",
    intraOral: "Gigi tampak normal. \n- Pemeriksaan klinis seringkali tidak konklusif.\n- Rontgen: Tampak gambaran radiopak membulat di dalam kamar pulpa (Pulp Stone / Dentikel).",
    diagnosis: "K04.3 - Abnormal hard tissue formation in pulp (Pulp Stone)",
    dd: "Pulpitis Irreversibel Asimtomatik",
    tatalaksana: "1. Observasi jika tidak ada keluhan.\n2. Jika menimbulkan gejala nyeri persisten (neuralgia pulpa), dilakukan Perawatan Saluran Akar (PSA) dengan mengangkat pulp stone tersebut."
  },
  {
    code: "K04.4",
    name: "Acute apical periodontitis of pulpal origin",
    anamnesis: "{{GENDER}} mengeluh {{TOOTH_LOCATION}} terasa sangat sakit saat digunakan mengunyah atau bersentuhan dengan gigi lawan. Terasa seperti giginya 'memanjang' atau lebih tinggi dari gigi lain. Sakit terus-menerus.",
    ekstraOral: "Wajah mungkin sedikit asimetris akibat pembengkakan ringan. KGB submandibula teraba dan sakit saat ditekan.",
    intraOral: "Gigi biasanya terdapat karies profunda mati atau tumpatan lama. \n- Tes Sondase: (-)\n- Tes Perkusi: (+ sakit sangat tajam)\n- Tes Palpasi di apikal: (+ sakit)\n- Tes Vitalitas: (-)",
    diagnosis: "K04.4 - Acute apical periodontitis of pulpal origin",
    dd: "Abses Periapikal Akut",
    tatalaksana: "1. KIE.\n2. Buka akses pulpa (Open bur) untuk drainase gas/pus dari saluran akar.\n3. Penyesuaian oklusi (Oclusal adjustment) agar tidak trauma oklusi.\n4. Jika eksudat/pus keluar deras, biarkan terbuka (open dressing) 1-2 hari. Jika kering, beri medikasi intrakanal dan tumpat sementara longgar.\n5. Resep: Amoxicillin 500mg 3x1, Asam Mefenamat 500mg 3x1."
  },
  {
    code: "K04.5",
    name: "Chronic apical periodontitis",
    anamnesis: "{{GENDER}} mengeluhkan {{TOOTH_LOCATION}} berlubang besar, dulunya pernah sakit, tapi sekarang hanya kadang-kadang terasa sedikit tidak nyaman jika diketuk keras atau ditekan.",
    ekstraOral: "TAK.",
    intraOral: "Gigi nekrosis. Tes vitalitas (-). Tes perkusi kadang (+ ringan). Tes palpasi (-).\n- Rontgen: Tampak radiolusensi membulat kecil hingga sedang di area periapikal (Granuloma Periapikal).",
    diagnosis: "K04.5 - Chronic apical periodontitis (Granuloma Apikalis)",
    dd: "Kista Radikuler (K04.8), Abses Periapikal Kronis",
    tatalaksana: "1. KIE.\n2. Perawatan Saluran Akar (PSA) multipel kunjungan.\n3. Pembersihan, pembentukan saluran, Irigasi.\n4. Aplikasi medikasi intrakanal (Kalsium Hidroksida) untuk merangsang penyembuhan lesi apikal."
  },
  {
    code: "K04.6",
    name: "Chronic apical periodontitis (Sisa Akar Dewasa / Gigi Utuh Mati)",
    anamnesis: "{{GENDER}} datang dengan keluhan terdapat sisa akar (atau lubang besar yang mengakibatkan gigi mati) pada {{TOOTH_LOCATION}}. Gigi tersebut sudah lama berlubang/patah dan saat ini tidak ada keluhan nyeri spontan yang akut, namun dirasa mengganggu atau pasien sadar perlunya mencabut sisa akar tersebut agar tidak menjadi fokal infeksi di kemudian hari.",
    ekstraOral: "Wajah simetris, tidak ada pembengkakan difus. KGB dalam batas normal.",
    intraOral: "Tampak mahkota gigi telah hilang menyisakan sisa akar, atau gigi utuh namun telah nekrosis. \n- Tes Sondase: (-)\n- Tes Perkusi: (+ ringan / -)\n- Tes Palpasi: (-)\n- Tes Vitalitas: (-)",
    diagnosis: "K04.6 - Chronic apical periodontitis (Sisa Akar Dewasa / Periodontitis Kronis)",
    dd: "Nekrosis Pulpa, Abses Periapikal Kronis dengan fistula",
    tatalaksana: "1. KIE perlunya pencabutan sisa akar (fokal infeksi).\n2. Rencana Ekstraksi Permanen (Pencabutan sisa akar).\n3. Irigasi dan kuretase soket pasca pencabutan."
  },
  {
    code: "K04.7",
    name: "Periapical abscess without sinus",
    anamnesis: "{{GENDER}} datang mengeluhkan bengkak besar pada gusi/pipi di area {{TOOTH_LOCATION}}. Terasa sangat sakit, berdenyut, memerah, dan hangat. Pasien merasakan demam ringan dan nyeri hebat saat mengunyah.",
    ekstraOral: "Wajah asimetris, terdapat pembengkakan berbatas difus/jelas, hiperemis, palpasi sakit, teraba hangat. Terkadang fluktuatif. KGB membesar & sakit.",
    intraOral: "Pembengkakan pada vestibular/mukobukal fold di area periapikal gigi penyebab. Mukosa merah, palpasi (+ fluktuatif/lunak), perkusi (+ sakit hebat). Vitalitas (-).",
    diagnosis: "K04.7 - Periapical abscess without sinus (Abses Periapikal Akut)",
    dd: "Abses Periodontal, Selulitis",
    tatalaksana: "1. KIE urgensi kondisi infeksi.\n2. Open bur untuk membebaskan drainase pus dari kamar pulpa.\n3. Jika abses submukosa sudah fluktuatif (matang): Lakukan Insisi & Drainase.\n4. Resep Antibiotik (Amoxicillin 500mg + Metronidazole 500mg) & Analgesik kuat.\n5. Pasien diinstruksikan kontrol 3-5 hari kemudian."
  },
  {
    code: "K04.8",
    name: "Radicular cyst",
    anamnesis: "{{GENDER}} menyadari adanya pembesaran lambat tanpa rasa sakit di sekitar {{TOOTH_LOCATION}} atau perubahan warna gigi. Bila kista sudah membesar, pasien dapat merasakan giginya goyang.",
    ekstraOral: "Jika kista sangat besar, dapat menyebabkan asimetri wajah atau ekspansi tulang kortikal yang teraba keras.",
    intraOral: "Gigi nekrosis (-). Mungkin ada ekspansi tulang bukal/palatal. \n- Rontgen: Tampak radiolusensi bulat dengan batas tepi sangat tegas/radiopak tipis, berdiameter > 1 cm di area apeks akar.",
    diagnosis: "K04.8 - Radicular cyst (Kista Radikuler)",
    dd: "Granuloma Apikalis (K04.5), Kista Dentigerous",
    tatalaksana: "1. KIE bahwa terdapat kista yang harus diangkat.\n2. Rujuk ke Sp.BM (Spesialis Bedah Mulut) atau lakukan Perawatan Endodontik Bedah (Apeksreseksi + Enukleasi Kista).\n3. Ekstraksi gigi penyebab + Kuretase."
  },
  {
    code: "K00.0",
    name: "Anodontia",
    anamnesis: "{{GENDER}} atau orang tua pasien mengeluhkan ada gigi permanen atau sulung di regio {{TOOTH_LOCATION}} yang tidak tumbuh sama sekali meskipun sudah melewati usia erupsi normal.",
    ekstraOral: "Profil wajah mungkin terpengaruh jika anodontia menyeluruh, namun umumnya TAK pada hipodontia ringan.",
    intraOral: "Kehilangan gigi (missing teeth). Diastema multipel. Tulang alveolar ridge di area tak bergigi mungkin datar/tipis.\n- Rontgen Panoramik: Konfirmasi ketiadaan benih gigi.",
    diagnosis: "K00.0 - Anodontia (Hipodontia / Oligodontia)",
    dd: "Impaksi Gigi (K00.6)",
    tatalaksana: "1. KIE kondisi genetik/tumbuh kembang.\n2. Pembuatan rontgen panoramik.\n3. Rencana pembuatan gigi tiruan (Protesa GTSL / GTSJ / Implan)."
  },
  {
    code: "K00.1",
    name: "Supernumerary teeth",
    anamnesis: "{{GENDER}} mengeluhkan ada gigi tambahan yang tumbuh tidak pada tempatnya di dekat area {{TOOTH_LOCATION}}, menyebabkan gigi lain berjejal atau ada benjolan keras di langit-langit mulut/gusi.",
    ekstraOral: "TAK.",
    intraOral: "Tampak adanya gigi ekstra (lebih dari jumlah normal). Sering ditemukan di garis tengah rahang atas (Mesiodens) atau di area premolar (Paramolar).",
    diagnosis: "K00.1 - Supernumerary teeth (Mesiodens / Paramolar)",
    dd: "Odontoma",
    tatalaksana: "1. KIE.\n2. Rontgen periapikal/panoramik/CBCT untuk melihat letak akar.\n3. Ekstraksi / Odontektomi gigi supernumerary tersebut."
  },
  {
    code: "K00.2",
    name: "Abnormalities of size and form of teeth",
    anamnesis: "{{GENDER}} mengeluhkan bentuk {{TOOTH_LOCATION}} aneh, tidak sama dengan sebelahnya, atau ukurannya terlalu kecil/besar (Misal: bentuk seperti pasak/kerucut).",
    ekstraOral: "TAK.",
    intraOral: "Ukuran gigi lebih kecil (Mikrodontia) atau lebih besar (Makrodontia). Bentuk mahkota aneh, contoh: Peg-shaped lateral incisor.",
    diagnosis: "K00.2 - Abnormalities of size and form of teeth (Mikrodontia / Peg-shaped)",
    dd: "Gigi Susu Bertahan (Persistensi)",
    tatalaksana: "1. KIE variasi anatomi genetik.\n2. Perawatan estetik: Restorasi direct komposit (veneer) atau pembuatan mahkota tiruan (Crown)."
  },
  {
    code: "K00.3",
    name: "Mottled teeth",
    anamnesis: "{{GENDER}} mengeluhkan warna {{TOOTH_LOCATION}} tidak merata, terdapat bercak putih (opaque) berbintik-bintik, atau garis-garis kecoklatan sejak gigi tumbuh. Biasanya memiliki riwayat asupan air tinggi fluor saat kecil.",
    ekstraOral: "TAK.",
    intraOral: "Tampak bercak putih kapur (white spot), kuning, hingga coklat gelap pada permukaan email. Permukaan email bisa jadi pitting.",
    diagnosis: "K00.3 - Mottled teeth (Fluorosis Dental)",
    dd: "Amelogenesis Imperfekta (K00.5), Hipoplasia Email",
    tatalaksana: "1. KIE penyebab fluorosis.\n2. Ringan: Bleaching atau Mikroabrasi email.\n3. Sedang-Berat: Veneer komposit / Porcelain Veneer."
  },
  {
    code: "K00.4",
    name: "Disturbances in tooth formation",
    anamnesis: "{{GENDER}} mengeluhkan {{TOOTH_LOCATION}} mudah rapuh, berlubang, atau permukaannya kasar bergaris-garis kuning kecoklatan sejak gigi tersebut tumbuh.",
    ekstraOral: "TAK.",
    intraOral: "Tampak defek pada kuantitas email (Hipoplasia email). Terdapat pit, groove (alur), atau hilangnya email sebagian/seluruhnya.",
    diagnosis: "K00.4 - Disturbances in tooth formation (Hipoplasia Email)",
    dd: "Amelogenesis Imperfekta, Karies Rampan",
    tatalaksana: "1. KIE perlindungan struktur gigi.\n2. Aplikasi Topikal Fluor (TAF).\n3. Restorasi dengan GIC atau Komposit."
  },
  {
    code: "K00.5",
    name: "Hereditary disturbances in tooth structure",
    anamnesis: "{{GENDER}} mengeluhkan {{TOOTH_LOCATION}} (dan gigi lainnya) mudah aus, berwarna kuning/kecoklatan transparan, dan sangat sensitif. Adanya riwayat keluhan serupa di keluarga.",
    ekstraOral: "TAK.",
    intraOral: "Amelogenesis / Dentinogenesis Imperfekta: Email tipis, sangat rapuh, gigi tampak menguning transparan. Rontgen: pulp chamber mengecil.",
    diagnosis: "K00.5 - Hereditary disturbances in tooth structure",
    dd: "Fluorosis Berat",
    tatalaksana: "1. KIE tentang kondisi genetik.\n2. Manajemen preventif: kontrol karies ketat, aplikasi fluor.\n3. Full mouth rehabilitation."
  },
  {
    code: "K00.6",
    name: "Disturbances in tooth eruption (Persistensi / Gigi Goyang)",
    anamnesis: "{{GENDER}} datang dengan keluhan gigi sulung pada {{TOOTH_LOCATION}} sudah mulai goyang (mobile) dan mengganggu aktivitas mengunyah. Telah terlihat adanya gigi permanen pengganti yang mulai tumbuh/erupsi di belakangnya. Pasien/Keluarga ingin gigi sulung tersebut dicabut agar pertumbuhan susunan gigi permanen tidak terganggu.",
    ekstraOral: "TAK. Wajah simetris.",
    intraOral: "Tampak gigi desidui (sulung) mengalami kegoyangan derajat 2-3. Terlihat sebagian mahkota gigi suksedaneus (permanen) erupsi di sebelah lingual/palatal gigi desidui tersebut.",
    diagnosis: "K00.6 - Disturbances in tooth eruption (Persistensi Gigi Sulung / Prolonged Retention)",
    dd: "Impaksi M3",
    tatalaksana: "1. KIE kepada pasien dan keluarga mengenai proses pergantian gigi dan perlunya pencabutan gigi sulung.\n2. Rencana Ekstraksi Gigi Sulung (menggunakan anestesi topikal/chlorethyl atau anestesi infiltrasi lokal)."
  },
  {
    code: "K00.7",
    name: "Teething syndrome",
    anamnesis: "Keluarga {{GENDER}} (usia balita) mengeluhkan anak rewel, sering menangis malam, terus-menerus memasukkan jari ke dalam mulut, ngeces, dan kadang demam ringan karena akan tumbuh gigi di area {{TOOTH_LOCATION}}.",
    ekstraOral: "Suhu tubuh anak mungkin sedikit meningkat (subfebris).",
    intraOral: "Gusi pada area gigi sulung yang akan erupsi tampak membengkak membulat, kemerahan, dan kadang tampak pucat di puncaknya.",
    diagnosis: "K00.7 - Teething syndrome (Sindrom Erupsi Gigi)",
    dd: "Infeksi Herpetik Gingivostomatitis",
    tatalaksana: "1. KIE kepada orang tua bahwa ini proses fisiologis normal.\n2. Berikan teether mainan dingin.\n3. Jika nyeri mengganggu tidur, resepkan Paracetamol sirup."
  },
  {
    code: "K00.8",
    name: "Other disorders of tooth development",
    anamnesis: "{{GENDER}} mengeluhkan adanya perubahan warna yang aneh pada {{TOOTH_LOCATION}} tanpa adanya kavitas karies (misal diskolorasi pasca trauma masa lampau).",
    ekstraOral: "TAK.",
    intraOral: "Tampak kelainan lokal pada satu gigi. Penilaian lebih lanjut masih diperlukan.",
    diagnosis: "K00.8 - Other disorders of tooth development",
    dd: "Diskolorasi intrinsik trauma",
    tatalaksana: "1. Evaluasi klinis dan radiografis.\n2. Tatalaksana sesuai gejala klinis spesifik."
  },
  {
    code: "K00.9",
    name: "Disorder of tooth development, unspecified",
    anamnesis: "{{GENDER}} datang dengan keluhan kelainan bentuk/tumbuhnya {{TOOTH_LOCATION}} yang belum dapat diklasifikasikan dengan jelas pada kunjungan awal.",
    ekstraOral: "Bergantung keparahan klinis.",
    intraOral: "Terdapat anomali pertumbuhan/perkembangan, evaluasi rontgenografi masih diperlukan.",
    diagnosis: "K00.9 - Disorder of tooth development, unspecified",
    dd: "Kelainan Dental YTT",
    tatalaksana: "1. KIE perlunya pemeriksaan penunjang lanjutan.\n2. Rujuk untuk pengambilan foto Rontgen Panoramik/CBCT."
  }
];

// ==========================================
// KOMPONEN APP ROOT (STATE MANAGER)
// ==========================================
export default function App() {
  // SessionStorage Anti-Refresh Reset
  const [currentPage, setCurrentPage] = useState(() => {
    return localStorage.getItem('appCurrentPage') || 'landing';
  });
  
  const [verifiedDoctor, setVerifiedDoctor] = useState(() => {
    const saved = localStorage.getItem('verifiedDoctor');
    return saved ? JSON.parse(saved) : { nama: '', wahana: '' };
  });

  // Sync state ke localStorage saat ada perubahan
  useEffect(() => {
    localStorage.setItem('appCurrentPage', currentPage);
  }, [currentPage]);

  useEffect(() => {
    localStorage.setItem('verifiedDoctor', JSON.stringify(verifiedDoctor));
  }, [verifiedDoctor]);

  const handleStart = (docData) => {
    setVerifiedDoctor(docData);
    setCurrentPage('generator');
  };

  const handleDoctorLogout = () => {
    localStorage.removeItem('verifiedDoctor');
    setVerifiedDoctor({ nama: '', wahana: '' });
    setCurrentPage('landing');
  };

  const handleAdminLogout = () => {
    localStorage.removeItem('isAdminLoggedIn');
    setCurrentPage('landing');
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 selection:bg-blue-100 selection:text-blue-900">
      {currentPage === 'landing' && <LandingPage onStart={handleStart} onGoAdmin={() => setCurrentPage('admin_login')} />}
      {currentPage === 'generator' && <GeneratorApp doctorData={verifiedDoctor} onBack={handleDoctorLogout} />}
      {currentPage === 'admin_login' && <AdminLogin onLoginSuccess={() => setCurrentPage('admin_dashboard')} onBack={() => setCurrentPage('landing')} />}
      {currentPage === 'admin_dashboard' && <AdminDashboard onBack={handleAdminLogout} />}
    </div>
  );
}

// ==========================================
// 1. HALAMAN LANDING (VERIFIKASI SPREADSHEET)
// ==========================================
function LandingPage({ onStart, onGoAdmin }) {
  const [sheetData, setSheetData] = useState([]);
  const [availableWahanas, setAvailableWahanas] = useState([]);
  
  const [isLoadingDB, setIsLoadingDB] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  
  const [selectedProvGid, setSelectedProvGid] = useState('');
  const [selectedWahana, setSelectedWahana] = useState('');
  const [inputDokter, setInputDokter] = useState('');
  
  const [isValidated, setIsValidated] = useState(false);
  const [matchedDoc, setMatchedDoc] = useState(null);

  const fetchGoogleSheetsData = async (gid) => {
    setIsLoadingDB(true);
    setErrorMsg('');
    try {
      const url = `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/gviz/tq?tqx=out:json&gid=${gid}`;
      const response = await fetch(url);
      const text = await response.text();
      
      const jsonString = text.substring(text.indexOf('{'), text.lastIndexOf('}') + 1);
      const data = JSON.parse(jsonString);
      const rows = data.table.rows;

      let parsedDocs = [];
      let currentWah = "";

      rows.forEach(row => {
        if (!row || !row.c) return;
        const cells = row.c.map(cell => cell && cell.v !== null && cell.v !== undefined ? String(cell.v).trim() : '');

        const wahanaIndex = cells.findIndex(c => c.toUpperCase() === "WAHANA");
        if (wahanaIndex !== -1) {
            for (let i = wahanaIndex + 1; i < cells.length; i++) {
                if (cells[i] && cells[i] !== ":" && cells[i] !== "") {
                    currentWah = cells[i];
                    break;
                }
            }
        }

        const univIndex = cells.findIndex(c => c.toLowerCase().includes("universitas"));
        if (univIndex > 0) {
            let docName = "";
            for (let i = univIndex - 1; i >= 0; i--) {
                if (cells[i] && isNaN(cells[i]) && !["ANGGOTA", "CHIEF"].includes(cells[i].toUpperCase())) {
                    docName = cells[i];
                    break;
                }
            }
            
            if (docName && docName.toLowerCase() !== "nama" && currentWah) {
               let finalName = docName;
               if (!/^drg\.?/i.test(finalName) && !/^dr\.?/i.test(finalName)) {
                   finalName = "drg. " + finalName;
               }
               parsedDocs.push({ nama: finalName, wahana: currentWah });
            }
        }
      });

      setSheetData(parsedDocs);
      const wahanas = [...new Set(parsedDocs.map(d => d.wahana))].sort();
      setAvailableWahanas(wahanas);
    } catch (error) {
      console.error(error);
      setErrorMsg("Gagal mengambil data Provinsi. Pastikan Link G-Sheets publik & GID benar.");
    } finally {
      setIsLoadingDB(false);
    }
  };

  const handleProvinsiChange = (e) => {
    const gid = e.target.value;
    setSelectedProvGid(gid);
    setSelectedWahana('');
    setInputDokter('');
    setIsValidated(false);
    setSheetData([]);
    if (gid) fetchGoogleSheetsData(gid);
  };

  const handleWahanaChange = (e) => {
    const wah = e.target.value;
    setSelectedWahana(wah);
    setInputDokter('');
    setIsValidated(false);
  };

  const verifyName = () => {
    if (!selectedWahana) return setErrorMsg("Pilih Wahana terlebih dahulu.");
    if (!inputDokter.trim()) return setErrorMsg("Ketik nama Anda terlebih dahulu.");

    const inputNameClean = inputDokter.trim().toLowerCase();
    
    const found = sheetData.find(d => 
      d.wahana === selectedWahana && 
      (d.nama.toLowerCase() === inputNameClean || 
       d.nama.toLowerCase() === `drg. ${inputNameClean}` ||
       d.nama.toLowerCase().replace("drg. ", "") === inputNameClean)
    );

    if (found) {
      setIsValidated(true);
      setErrorMsg('');
      setMatchedDoc(found);
    } else {
      setIsValidated(false);
      setErrorMsg("Nama tidak ditemukan di Wahana tersebut. Pastikan ejaan sesuai.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <nav className="flex items-center justify-between px-6 py-4 bg-white shadow-sm border-b border-slate-100">
        <div className="flex items-center space-x-3">
          <div className="relative h-10 w-10 overflow-hidden rounded-lg bg-blue-50 flex items-center justify-center border border-blue-100">
             <img src="/logo-axaiship.png" alt="Axa Logo" className="object-cover h-full w-full" onError={(e) => { e.target.style.display='none'; e.target.nextSibling.style.display='flex'; }}/>
             <Activity className="hidden text-blue-600" size={24} />
          </div>
          <span className="text-xl font-extrabold tracking-tight text-slate-800">
            PIDGI ISHIP <span className="text-blue-600">2026</span>
          </span>
        </div>
        <button onClick={onGoAdmin} className="text-slate-400 hover:text-slate-700 transition" title="Admin Dashboard">
          <Lock size={18} />
        </button>
      </nav>

      <main className="flex-grow flex flex-col items-center justify-center px-6 py-10 text-center bg-gradient-to-b from-blue-50/50 to-white">
        <div className="max-w-2xl w-full">
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight mb-4">
            Portal Rekam Medis <br/>
            <span className="text-blue-600">Terintegrasi Database</span>
          </h1>
          <p className="text-slate-600 mb-8 max-w-lg mx-auto">
            Lakukan verifikasi identitas (Provinsi, Wahana, & Nama) sesuai data Spreadsheet pusat untuk mengakses Generator SOAP.
          </p>
          
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-xl border border-slate-100 text-left max-w-lg mx-auto relative overflow-hidden">
            <h2 className="text-xl font-bold text-slate-800 flex items-center mb-6 border-b border-slate-100 pb-4">
               <UserCheck className="mr-2 text-blue-600" size={24} /> Identifikasi Dokter
            </h2>

            {errorMsg && (
              <div className="mb-5 p-3 bg-red-50 text-red-700 rounded-lg text-sm font-medium flex items-start border border-red-100">
                <ShieldAlert size={18} className="mr-2 mt-0.5 shrink-0" />
                <p>{errorMsg}</p>
              </div>
            )}

            <div className="space-y-5">
              
              {/* 1. Pilih Provinsi */}
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center">
                  <MapPin size={16} className="mr-1.5 text-slate-500" /> 1. Pilih Provinsi
                </label>
                <div className="relative">
                  <select value={selectedProvGid} onChange={handleProvinsiChange} disabled={isValidated} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition text-sm appearance-none cursor-pointer text-slate-800 font-medium">
                    <option value="">- Silakan Pilih Provinsi -</option>
                    {PROVINCES_DATA.map((prov, idx) => (
                      <option key={idx} value={prov.gid}>{prov.name}</option>
                    ))}
                  </select>
                  <ChevronDown size={18} className="absolute inset-y-0 right-3 my-auto text-slate-400 pointer-events-none" />
                </div>
              </div>

              {isLoadingDB && (
                <div className="flex flex-col items-center justify-center py-4 opacity-70">
                   <Loader2 className="animate-spin text-blue-500 mb-2" size={24} />
                   <p className="text-xs font-medium text-slate-500">Membaca Spreadsheet...</p>
                </div>
              )}

              {/* 2. Pilih Wahana */}
              {!isLoadingDB && sheetData.length > 0 && (
                <div className="animate-in fade-in duration-300">
                  <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center">
                    <Building size={16} className="mr-1.5 text-slate-500" /> 2. Pilih Wahana Penempatan
                  </label>
                  <div className="relative">
                    <select value={selectedWahana} onChange={handleWahanaChange} disabled={isValidated} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition text-sm appearance-none cursor-pointer text-slate-800 font-medium">
                      <option value="">- Silakan Pilih Wahana RS -</option>
                      {availableWahanas.map((whn, idx) => (
                        <option key={idx} value={whn}>{whn}</option>
                      ))}
                    </select>
                    <ChevronDown size={18} className="absolute inset-y-0 right-3 my-auto text-slate-400 pointer-events-none" />
                  </div>
                </div>
              )}

              {/* 3. Input Nama Manual (No Datalist) */}
              {!isLoadingDB && selectedWahana && !isValidated && (
                <div className="animate-in fade-in duration-300">
                  <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center">
                    <User size={16} className="mr-1.5 text-slate-500" /> 3. Input Nama Dokter
                  </label>
                  <div className="flex space-x-2">
                    <input 
                      type="text"
                      value={inputDokter}
                      onChange={(e) => setInputDokter(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && verifyName()}
                      placeholder="Ketik nama Anda (cth: drg. Alva)" 
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition text-sm font-medium text-slate-800"
                    />
                    <button onClick={verifyName} disabled={!inputDokter.trim()} className="px-4 py-3 bg-slate-800 text-white font-bold rounded-lg hover:bg-slate-900 disabled:opacity-50 transition shadow-sm">
                      Cek
                    </button>
                  </div>
                </div>
              )}

              {/* Akses Disetujui */}
              {isValidated && matchedDoc && (
                <div className="animate-in fade-in zoom-in-95 duration-500 pt-2">
                  <div className="p-4 bg-green-50 text-green-800 rounded-xl border border-green-200 text-center mb-6 flex flex-col items-center">
                    <div className="h-12 w-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-2"><Check size={24} strokeWidth={3} /></div>
                    <h3 className="font-bold text-lg">Akses Disetujui!</h3>
                    <p className="text-sm mt-1 opacity-90">Kredensial valid untuk <strong>{matchedDoc.nama}</strong> di {matchedDoc.wahana}.</p>
                  </div>

                  <button onClick={() => onStart(matchedDoc)} className="w-full py-4 text-lg font-bold text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex items-center justify-center">
                    Mulai Generate SOAP <Stethoscope className="ml-2" size={22} />
                  </button>
                  <button onClick={() => { setIsValidated(false); setInputDokter(''); setMatchedDoc(null); }} className="w-full mt-3 py-2 text-sm font-medium text-slate-500 hover:text-slate-800 transition">
                    Ganti Akun Dokter
                  </button>
                </div>
              )}

            </div>
          </div>
        </div>
      </main>
    </div>
  );
}


// ==========================================
// 2. APLIKASI GENERATOR (TRACKING VERCEL KV)
// ==========================================
function GeneratorApp({ doctorData, onBack }) {
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

  // LOGIC TRACKING ONLINE DOCTORS KE UPSTASH/VERCEL KV (Heartbeat & Self-Destruct EX 60)
  useEffect(() => {
    if (!doctorData || !doctorData.nama) return;
    
    // Ganti karakter spasi dll menjadi aman untuk Key Redis
    const safeId = `online:${doctorData.nama}_${doctorData.wahana}`.replace(/[^a-zA-Z0-9:_]/g, '_');
    const loginTime = Date.now();
    
    const payload = JSON.stringify({
        nama: doctorData.nama,
        wahana: doctorData.wahana,
        loginTime: loginTime
    });

    const pingKV = async () => {
        try {
            await fetch(`${KV_URL}/`, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${KV_TOKEN}`, 'Content-Type': 'application/json' },
                body: JSON.stringify(["SET", safeId, payload, "EX", 60]) // Kedaluwarsa dalam 60 detik jika tidak di ping
            });
        } catch (err) {
            console.error("KV Ping Error", err);
        }
    };

    pingKV(); // Ping pertama
    const interval = setInterval(pingKV, 30000); // Ping setiap 30 detik untuk memperpanjang nyawa data

    const handleUnload = () => {
        // Hapus Instan saat browser ditutup
        fetch(`${KV_URL}/`, {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${KV_TOKEN}`, 'Content-Type': 'application/json' },
            body: JSON.stringify(["DEL", safeId]),
            keepalive: true
        }).catch(() => {});
    };
    window.addEventListener('beforeunload', handleUnload);

    return () => {
        clearInterval(interval);
        window.removeEventListener('beforeunload', handleUnload);
        handleUnload();
    };
  }, [doctorData]);

  // Handle cliks outside of dropdowns
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
  const filteredMeds = medicationsList.filter(med => med.toLowerCase().includes(medSearchTerm.toLowerCase()));

  const handleSelectICD = (disease) => { setSelectedDisease(disease); setSearchQuery(`${disease.code} - ${disease.name}`); setIsDropdownOpen(false); };
  const toggleMedication = (med) => { selectedMeds.includes(med) ? setSelectedMeds(selectedMeds.filter(m => m !== med)) : setSelectedMeds([...selectedMeds, med]); };
  const removeMedication = (med) => setSelectedMeds(selectedMeds.filter(m => m !== med));

  const generateReportText = () => {
    if (!selectedDisease) return "Silakan pilih diagnosis ICD-10 terlebih dahulu.";
    const parsedAnamnesis = parseAnamnesis(selectedDisease.anamnesis, gender, toothNum);
    let isCustomProcedure = selectedProcedure !== 'Bawaan ICD-10 (Default)' && proceduresData[selectedProcedure];
    let planSection = isCustomProcedure ? `Tindakan Terpilih: ${selectedProcedure}\n\nTatalaksana:\n${proceduresData[selectedProcedure].tatalaksana}\n\nKIE:\n${proceduresData[selectedProcedure].kie}` : selectedDisease.tatalaksana;
    let obatSection = selectedMeds.length > 0 ? "\n\nResep Obat / Medikamen:\n" + selectedMeds.map(m => `- ${m}`).join("\n") : "";

    return `IDENTITAS PASIEN
Nama: ${patientName || '-'}
Usia: ${patientAge || '-'}
Jenis Kelamin: ${gender || '-'}
Elemen Gigi: ${toothNum || '-'}

[S] SUBJEKTIF (ANAMNESIS)
${parsedAnamnesis}

[O] OBJEKTIF (PEMERIKSAAN FISIK)
- Ekstra Oral: ${selectedDisease.ekstraOral}
- Intra Oral: ${selectedDisease.intraOral}

[A] ASSESMENT (DIAGNOSIS)
- Diagnosis Kerja: ${selectedDisease.diagnosis}
- Diagnosis Banding: ${selectedDisease.dd}

[P] PLAN (TATALAKSANA)
${planSection}${obatSection}

-----
Dicatat oleh: ${doctorData.nama}
Fasilitas: ${doctorData.wahana}
`;
  };

  const copyToClipboard = () => {
    const text = generateReportText();
    if(navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000); });
    } else {
        const textArea = document.createElement("textarea");
        textArea.value = text; textArea.style.position = "absolute"; textArea.style.left = "-999999px";
        document.body.prepend(textArea); textArea.select();
        try { document.execCommand('copy'); setCopied(true); setTimeout(() => setCopied(false), 2000); } catch (error) {} 
        finally { textArea.remove(); }
    }
  };

  return (
    <div className="flex flex-col h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200 px-6 py-3 flex flex-col sm:flex-row sm:items-center justify-between shrink-0 shadow-sm z-30 gap-3 sm:gap-0">
        <div className="flex items-center space-x-3">
           <div className="relative h-8 w-8 overflow-hidden rounded bg-blue-50 flex items-center justify-center border border-blue-100">
             <img src="/logo-axaiship.png" alt="Axa Logo" className="object-cover h-full w-full" onError={(e) => { e.target.style.display='none'; e.target.nextSibling.style.display='flex'; }}/>
             <Activity className="hidden text-blue-600" size={18} />
          </div>
          <div>
            <h1 className="text-base font-bold text-slate-800 leading-tight">PIDGI ISHIP</h1>
            <p className="text-xs font-medium text-slate-500 flex items-center"><User size={10} className="mr-1"/> {doctorData.nama} — {doctorData.wahana}</p>
          </div>
        </div>
        <button onClick={onBack} className="text-xs font-medium text-slate-600 hover:text-red-600 bg-slate-100 hover:bg-red-50 px-4 py-2 rounded-lg transition self-start sm:self-auto flex items-center">
          <LogOut size={14} className="mr-1"/> Keluar (Logout)
        </button>
      </header>

      <div className="flex-grow flex flex-col md:flex-row overflow-hidden">
        {/* PANEL KIRI */}
        <div className="w-full md:w-[450px] bg-white border-r border-slate-200 flex flex-col overflow-y-auto shrink-0 z-10 shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
          <div className="p-6">
            <h2 className="text-xl font-bold text-slate-800 mb-5 flex items-center border-b border-slate-100 pb-3">
              <ShieldPlus className="mr-2 text-blue-600" size={24}/> Input Data Klinis
            </h2>
            {/* Identitas */}
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5">Nama Pasien</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><User size={16} className="text-slate-400" /></div>
                  <input type="text" value={patientName} onChange={(e) => setPatientName(e.target.value)} placeholder="Contoh: Tn. Budi" className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition text-sm"/>
                </div>
              </div>
              <div className="flex space-x-4">
                <div className="w-1/2">
                  <label className="block text-sm font-bold text-slate-700 mb-1.5">Usia</label>
                  <input type="text" value={patientAge} onChange={(e) => setPatientAge(e.target.value)} placeholder="Ex: 24 Tahun" className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition text-sm"/>
                </div>
                <div className="w-1/2">
                  <label className="block text-sm font-bold text-slate-700 mb-1.5">Jenis Kelamin</label>
                  <div className="relative">
                    <select value={gender} onChange={(e) => setGender(e.target.value)} className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition text-sm appearance-none cursor-pointer">
                      <option value="Laki-laki">Laki-laki</option><option value="Perempuan">Perempuan</option>
                    </select>
                    <ChevronDown size={14} className="absolute inset-y-0 right-3 my-auto text-slate-400 pointer-events-none" />
                  </div>
                </div>
              </div>
              <div>
                 <label className="block text-sm font-bold text-slate-700 mb-1.5">Elemen / Gigi</label>
                 <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><Hash size={16} className="text-slate-400" /></div>
                    <input type="text" value={toothNum} onChange={(e) => setToothNum(e.target.value)} placeholder="Ex: 16" className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition text-sm font-medium text-blue-700"/>
                 </div>
              </div>
            </div>
            <div className="w-full h-px bg-slate-200 mb-5"></div>
            {/* ICD Dropdown */}
            <div className="relative mb-5" ref={wrapperRef}>
              <label className="block text-sm font-bold text-slate-700 mb-1.5">Kode ICD-10 <span className="text-red-500">*</span></label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><Search size={18} className="text-blue-500" /></div>
                <input type="text" value={searchQuery} onChange={(e) => { setSearchQuery(e.target.value); setIsDropdownOpen(true); if(e.target.value === '') setSelectedDisease(null); }} onFocus={() => setIsDropdownOpen(true)} placeholder="Ketik K02, K04, K00..." className="w-full pl-10 pr-10 py-3 bg-white border-2 border-slate-200 rounded-xl focus:ring-0 focus:border-blue-500 outline-none font-semibold text-slate-800 transition shadow-sm"/>
                {searchQuery && (<button onClick={() => { setSearchQuery(''); setSelectedDisease(null); setIsDropdownOpen(false); }} className="absolute inset-y-0 right-8 pr-1 flex items-center text-slate-400 hover:text-red-500 transition"><X size={18} /></button>)}
                <ChevronDown size={18} className="absolute inset-y-0 right-3 my-auto text-slate-400 pointer-events-none" />
              </div>
              {isDropdownOpen && (
                <div className="absolute z-20 mt-1 w-full bg-white border border-slate-200 rounded-xl shadow-xl max-h-64 overflow-y-auto py-1">
                  {filteredData.length > 0 ? filteredData.map((item, index) => (
                      <div key={index} onClick={() => handleSelectICD(item)} className="px-4 py-3 hover:bg-blue-50 cursor-pointer border-b border-slate-50 last:border-0 transition">
                        <div className="font-bold text-blue-700 text-sm">{item.code}</div><div className="text-xs text-slate-600 mt-0.5 leading-snug">{item.name}</div>
                      </div>
                    )) : (<div className="px-4 py-6 text-sm text-slate-500 text-center">Data tidak ditemukan</div>)}
                </div>
              )}
            </div>
            {/* Tatalaksana */}
            <div className="mb-5 bg-slate-50/80 p-4 rounded-xl border border-slate-200">
              <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center"><Syringe size={16} className="mr-2 text-indigo-500"/>Tatalaksana Akhir</label>
              <div className="relative">
                <select value={selectedProcedure} onChange={(e) => setSelectedProcedure(e.target.value)} className="w-full px-3 py-2.5 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition text-sm font-medium text-slate-700 appearance-none cursor-pointer shadow-sm">
                  <option value="Bawaan ICD-10 (Default)">- Sesuai Bawaan ICD-10 (Default) -</option>
                  {Object.keys(proceduresData).map((procName, idx) => (<option key={idx} value={procName}>{procName}</option>))}
                </select>
                <ChevronDown size={16} className="absolute inset-y-0 right-3 my-auto text-slate-500 pointer-events-none" />
              </div>
            </div>
            {/* Resep Obat Multi-select */}
            <div className="relative mb-6" ref={medWrapperRef}>
              <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center"><Pill size={16} className="mr-2 text-emerald-500"/>Resep Obat</label>
              <div onClick={() => setIsMedDropdownOpen(!isMedDropdownOpen)} className="w-full px-3 py-2.5 bg-white border border-slate-300 rounded-lg outline-none transition text-sm cursor-pointer shadow-sm flex items-center justify-between hover:border-emerald-400">
                <span className={selectedMeds.length > 0 ? "text-slate-800 font-medium" : "text-slate-400"}>{selectedMeds.length > 0 ? `${selectedMeds.length} obat dipilih...` : 'Pilih Obat (Bisa lebih dari 1)'}</span>
                <ChevronDown size={16} className="text-slate-500" />
              </div>
              {isMedDropdownOpen && (
                <div className="absolute z-30 mt-1 w-full bg-white border border-slate-200 rounded-xl shadow-2xl">
                  <div className="p-2 border-b border-slate-100"><input type="text" placeholder="Cari obat..." value={medSearchTerm} onChange={(e) => setMedSearchTerm(e.target.value)} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded text-sm focus:outline-none focus:border-emerald-500"/></div>
                  <div className="max-h-56 overflow-y-auto py-1">
                    {filteredMeds.length > 0 ? filteredMeds.map((med, idx) => (
                        <label key={idx} className="flex items-start px-3 py-2 hover:bg-emerald-50 cursor-pointer">
                          <input type="checkbox" className="mt-1 rounded text-emerald-500" checked={selectedMeds.includes(med)} onChange={() => toggleMedication(med)}/>
                          <span className="ml-2 text-xs text-slate-700 leading-snug">{med}</span>
                        </label>
                      )) : (<div className="px-4 py-4 text-xs text-slate-500 text-center">Obat tidak ditemukan</div>)}
                  </div>
                </div>
              )}
              {selectedMeds.length > 0 && (
                <div className="mt-3 flex flex-col gap-2">
                  {selectedMeds.map((med, idx) => (
                    <div key={idx} className="inline-flex items-start justify-between bg-emerald-50 text-emerald-800 border border-emerald-200 px-3 py-1.5 rounded-lg text-xs font-medium">
                      <span className="break-words pr-2 leading-relaxed">{med}</span>
                      <button onClick={() => removeMedication(med)} className="text-emerald-500 hover:text-red-500 shrink-0 mt-0.5"><Trash2 size={14} /></button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* PANEL KANAN */}
        <div className="flex-grow bg-[#f3f4f6] p-4 md:p-8 flex flex-col overflow-y-auto">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <h2 className="text-xl font-bold text-slate-800">Kertas Kerja SOAP</h2>
            <button onClick={copyToClipboard} disabled={!selectedDisease} className={`flex items-center justify-center px-5 py-2.5 rounded-xl font-bold text-sm transition shadow-sm ${!selectedDisease ? 'bg-slate-200 text-slate-400 cursor-not-allowed' : copied ? 'bg-green-500 text-white shadow-green-200 scale-95' : 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-md'}`}>
              {copied ? (<><Check size={18} className="mr-2" /> Teks Tersalin!</>) : (<><Copy size={18} className="mr-2" /> Salin Format E-RM</>)}
            </button>
          </div>

          <div className="bg-white border border-slate-200 shadow-sm rounded-2xl flex-grow p-6 md:p-10 text-slate-800 font-serif leading-relaxed overflow-y-auto relative">
            {!selectedDisease ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400">
                <FileText size={72} className="mb-4 opacity-30 text-slate-500" />
                <p className="text-lg font-medium text-slate-500">Kertas kerja SOAP belum diisi</p>
              </div>
            ) : (
              <div className="space-y-6 max-w-3xl mx-auto">
                <div className="border-b-2 border-slate-100 pb-4 mb-6">
                  <table className="w-full text-sm font-sans">
                    <tbody>
                      <tr><td className="w-32 font-bold py-1 text-slate-500 uppercase tracking-wider text-xs">Nama Pasien</td><td className="w-4">:</td><td className="font-semibold text-base">{patientName || '-'}</td></tr>
                      <tr><td className="font-bold py-1 text-slate-500 uppercase tracking-wider text-xs">Usia / Gender</td><td>:</td><td className="font-semibold text-base">{patientAge ? `${patientAge}, ` : ''} {gender}</td></tr>
                      <tr>
                        <td className="font-bold py-1 text-slate-500 uppercase tracking-wider text-xs">Elemen Gigi</td><td>:</td>
                        <td><span className="inline-flex items-center justify-center bg-blue-100 text-blue-800 px-2 py-0.5 rounded font-bold text-sm">{toothNum || '-'}</span><span className="text-xs text-slate-500 ml-2 font-normal italic">({getToothLocation(toothNum)})</span></td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div>
                  <h3 className="font-bold text-lg text-slate-900 border-l-4 border-blue-500 pl-3 mb-3 bg-slate-50 py-1 rounded-r-lg">[S] SUBJEKTIF (ANAMNESIS)</h3>
                  <p className="pl-4 whitespace-pre-line text-justify text-[15px]">{parseAnamnesis(selectedDisease.anamnesis, gender, toothNum)}</p>
                </div>

                <div>
                  <h3 className="font-bold text-lg text-slate-900 border-l-4 border-blue-500 pl-3 mb-3 bg-slate-50 py-1 rounded-r-lg">[O] OBJEKTIF (PEMERIKSAAN FISIK)</h3>
                  <div className="pl-4 space-y-3 text-[15px]">
                    <div><strong className="text-slate-900 block mb-1">Ekstra Oral:</strong><p className="text-justify">{selectedDisease.ekstraOral}</p></div>
                    <div><strong className="text-slate-900 block mb-1">Intra Oral:</strong><p className="whitespace-pre-line text-justify">{selectedDisease.intraOral}</p></div>
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-lg text-slate-900 border-l-4 border-blue-500 pl-3 mb-3 bg-slate-50 py-1 rounded-r-lg">[A] ASSESMENT (DIAGNOSIS)</h3>
                  <div className="pl-4 space-y-2 text-[15px]">
                    <p><strong className="text-slate-900">Diagnosis Kerja:</strong> <br/><span className="inline-block font-bold text-blue-800 bg-blue-50 border border-blue-100 px-3 py-1 rounded mt-1">{selectedDisease.diagnosis}</span></p>
                    <p className="mt-3"><strong className="text-slate-900">Diagnosis Banding:</strong> <br/>{selectedDisease.dd}</p>
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-lg text-slate-900 border-l-4 border-blue-500 pl-3 mb-3 bg-slate-50 py-1 rounded-r-lg">[P] PLAN (TATALAKSANA)</h3>
                  {selectedProcedure !== 'Bawaan ICD-10 (Default)' ? (
                    <div className="pl-4 space-y-4">
                      <div><strong className="text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded text-[15px]">Tindakan Terpilih: {selectedProcedure}</strong></div>
                      <div><strong className="text-slate-900 block mb-1">Tatalaksana:</strong><p className="whitespace-pre-line text-[15px] leading-relaxed text-justify">{proceduresData[selectedProcedure].tatalaksana}</p></div>
                      <div><strong className="text-slate-900 block mb-1">KIE (Komunikasi, Informasi, Edukasi):</strong><p className="whitespace-pre-line text-[15px] leading-relaxed text-justify">{proceduresData[selectedProcedure].kie}</p></div>
                    </div>
                  ) : (<p className="pl-4 whitespace-pre-line text-[15px] leading-relaxed text-justify">{selectedDisease.tatalaksana}</p>)}
                  
                  {selectedMeds.length > 0 && (
                    <div className="pl-4 mt-6">
                      <strong className="text-emerald-700 block mb-2 border-b border-emerald-100 pb-1">Resep Obat / Medikamen:</strong>
                      <div className="space-y-1 mt-3">
                        {selectedMeds.map((med, idx) => (<p key={idx} className="text-[15px] leading-relaxed italic text-slate-800">- {med}</p>))}
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Tanda Tangan Digital Nama Dokter */}
                <div className="mt-8 pt-6 border-t-2 border-slate-100 flex justify-end">
                   <div className="text-center font-sans">
                      <p className="text-sm text-slate-500 mb-6">Penanggung Jawab,</p>
                      <p className="font-bold text-slate-800 border-b border-slate-300 pb-1">{doctorData.nama}</p>
                      <p className="text-xs text-slate-500 mt-1">{doctorData.wahana}</p>
                   </div>
                </div>

              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 3. APLIKASI ADMIN LOGIN
// ==========================================
function AdminLogin({ onLoginSuccess, onBack }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('isAdminLoggedIn') === 'true') {
      onLoginSuccess();
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === 'adminexow' && password === 'verystrongpassword321') {
      localStorage.setItem('isAdminLoggedIn', 'true');
      onLoginSuccess();
    } else {
      setError(true);
      setTimeout(() => setError(false), 3000);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-900 justify-center items-center px-4">
       <button onClick={onBack} className="absolute top-6 left-6 text-slate-400 hover:text-white transition flex items-center">
          <ArrowRight className="mr-2 rotate-180" size={16} /> Kembali ke Publik
       </button>
       <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-sm w-full">
         <div className="flex justify-center mb-6">
            <div className="h-16 w-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center">
              <Lock size={32} />
            </div>
         </div>
         <h2 className="text-2xl font-extrabold text-center text-slate-800 mb-2">Admin Area</h2>
         <p className="text-center text-slate-500 text-sm mb-8">Login untuk memantau aktivitas dokter gigi di Wahana ISHIP.</p>

         <form onSubmit={handleLogin} className="space-y-5">
           <div>
             <label className="block text-sm font-bold text-slate-700 mb-1.5">Username</label>
             <input type="text" value={username} onChange={(e)=>setUsername(e.target.value)} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-500 outline-none transition"/>
           </div>
           <div>
             <label className="block text-sm font-bold text-slate-700 mb-1.5">Password</label>
             <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-500 outline-none transition"/>
           </div>
           
           {error && <p className="text-sm text-red-500 text-center font-medium">Username atau Password salah!</p>}

           <button type="submit" className="w-full py-4 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 transition shadow-lg mt-4">
             Login ke Dashboard
           </button>
         </form>
       </div>
    </div>
  );
}

// ==========================================
// 4. APLIKASI ADMIN DASHBOARD (MONITORING)
// ==========================================
function AdminDashboard({ onBack }) {
  const [onlineDoctors, setOnlineDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  // Vercel KV Fetching (No Firebase)
  useEffect(() => {
    const fetchOnlineDocs = async () => {
        try {
            // Langkah 1: Pindai (SCAN) Semua Kunci yang di awali dengan 'online:'
            const scanRes = await fetch(`${KV_URL}/`, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${KV_TOKEN}`, 'Content-Type': 'application/json' },
                body: JSON.stringify(["SCAN", "0", "MATCH", "online:*", "COUNT", "1000"])
            });
            const scanData = await scanRes.json();
            const keys = scanData.result[1];

            if (!keys || keys.length === 0) {
                setOnlineDoctors([]);
                setLoading(false);
                return;
            }

            // Langkah 2: Ambil (MGET) semua Data Dokter dari kunci-kunci tersebut
            const mgetRes = await fetch(`${KV_URL}/`, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${KV_TOKEN}`, 'Content-Type': 'application/json' },
                body: JSON.stringify(["MGET", ...keys])
            });
            const mgetData = await mgetRes.json();
            
            // Konversi JSON String ke Object
            const docs = mgetData.result.filter(Boolean).map(d => JSON.parse(d));
            docs.sort((a, b) => b.loginTime - a.loginTime);
            
            setOnlineDoctors(docs);
        } catch (err) {
            console.error("Gagal memuat dari KV:", err);
        } finally {
            setLoading(false);
        }
    };

    fetchOnlineDocs();
    const interval = setInterval(fetchOnlineDocs, 10000); // Polling otomatis tiap 10 detik

    return () => clearInterval(interval);
  }, []);

  const formatTime = (timestamp) => {
    if(!timestamp) return "-";
    return new Date(timestamp).toLocaleTimeString('id-ID', { hour: '2-digit', minute:'2-digit', second:'2-digit' });
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <nav className="bg-slate-900 px-6 py-4 flex items-center justify-between shadow-md">
        <div className="flex items-center text-white space-x-3">
          <Activity size={24} className="text-red-400"/>
          <span className="text-xl font-bold">PIDGI Admin Monitor</span>
        </div>
        <button onClick={onBack} className="px-4 py-2 bg-slate-800 text-slate-300 rounded-lg hover:bg-slate-700 hover:text-white transition text-sm font-medium flex items-center">
          <LogOut size={14} className="mr-1.5"/> Tutup & Logout Admin
        </button>
      </nav>

      <main className="flex-grow p-6 md:p-10 max-w-6xl mx-auto w-full">
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center">
             <div className="h-14 w-14 bg-green-100 text-green-600 rounded-full flex items-center justify-center mr-4"><Users size={28}/></div>
             <div>
               <p className="text-sm text-slate-500 font-medium">Dokter Sedang Online</p>
               <h3 className="text-3xl font-black text-slate-800">{onlineDoctors.length}</h3>
             </div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center">
             <div className="h-14 w-14 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mr-4"><Building size={28}/></div>
             <div>
               <p className="text-sm text-slate-500 font-medium">Fasilitas Aktif (Wahana)</p>
               <h3 className="text-3xl font-black text-slate-800">
                  {new Set(onlineDoctors.map(d => d.wahana)).size}
               </h3>
             </div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col justify-center relative overflow-hidden">
             <p className="text-xs text-slate-400 font-medium mb-1">Status Sinkronisasi Sistem</p>
             <div className="flex items-center z-10">
               <div className="h-2.5 w-2.5 bg-green-500 rounded-full animate-pulse mr-2"></div>
               <span className="text-sm font-bold text-green-600">Database Real-time Terhubung</span>
             </div>
             <p className="text-xs text-slate-500 mt-2 italic z-10">Akurasi Live: 10 Detik. Ghost Session terhapus dalam 60 Detik.</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
           <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
             <h3 className="text-lg font-bold text-slate-800 flex items-center"><Activity size={18} className="mr-2 text-red-500"/> Log Aktivitas Dokter ISHIP</h3>
           </div>
           
           <div className="overflow-x-auto">
             <table className="w-full text-left text-sm">
               <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-200">
                 <tr>
                   <th className="px-6 py-4">Nama Dokter</th>
                   <th className="px-6 py-4">Penempatan Wahana (RS)</th>
                   <th className="px-6 py-4">Masuk Sejak</th>
                   <th className="px-6 py-4 text-center">Status</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-slate-100">
                 {loading ? (
                   <tr><td colSpan="4" className="px-6 py-10 text-center text-slate-400"><Loader2 className="animate-spin mx-auto mb-2" size={24}/> Memuat data...</td></tr>
                 ) : onlineDoctors.length === 0 ? (
                   <tr><td colSpan="4" className="px-6 py-10 text-center text-slate-500 font-medium">Tidak ada dokter yang sedang menggunakan generator saat ini.</td></tr>
                 ) : (
                   onlineDoctors.map((doc, i) => (
                     <tr key={i} className="hover:bg-slate-50 transition">
                       <td className="px-6 py-4 font-bold text-slate-800 flex items-center">
                          <User size={16} className="mr-2 text-slate-400"/> {doc.nama}
                       </td>
                       <td className="px-6 py-4 text-slate-600">{doc.wahana}</td>
                       <td className="px-6 py-4 text-slate-500 flex items-center">
                          <Clock size={14} className="mr-1.5"/> {formatTime(doc.loginTime)}
                       </td>
                       <td className="px-6 py-4 text-center">
                         <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700">
                           <span className="h-1.5 w-1.5 bg-green-500 rounded-full mr-1.5 animate-pulse"></span> Aktif
                         </span>
                       </td>
                     </tr>
                   ))
                 )}
               </tbody>
             </table>
           </div>
        </div>

      </main>
    </div>
  );
}
