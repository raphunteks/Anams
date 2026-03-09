import React, { useState, useEffect, useRef } from 'react';
import { Search, ChevronDown, Stethoscope, FileText, Copy, Check, Activity, ShieldPlus, ArrowRight, User, Hash, X, Syringe } from 'lucide-react';

// ==========================================
// DATA TINDAKAN & KIE (Dari Spreadsheet)
// ==========================================
const proceduresData = {
  "Ekstraksi Permanen": {
    tatalaksana: "1. Melakukan anamnesis\n2. Melakukan pemeriksaan ekstraoral dan intraoral\n3. Melakukan informed consent\n4. Melakukan tindakan asepsis pada area kerja\n5. Melakukan anestesi lokal pada area kerja dengan teknik intraligamen\n6. Melepaskan perlekatan jaringan lunak\n7. Menggerakkan gigi menggunakan elevator/bein\n8. Mencengkeram gigi dengan tang ekstraksi, lakukan gerakan luksasi, dan jika sudah mobile, lepaskan gigi dari soket\n9. Lakukan kuretase pada soket untuk memastikan tidak ada fragmen yang tersisa\n10. Lakukan irigasi/spooling dengan larutan saline\n11. Instruksikan kepada pasien untuk menggigit tampon pada luka bekas ekstraksi\n12. Pemberian obat; Amoxicillin tab 500 mg 3x1 & Paracetamol tab 500 mg 3x1",
    kie: "1. Instruksikan pasien untuk menggigit tampon minimal 1 jam\n2. Hindari meludah dan berkumur terlalu sering\n3. Hindari makanan atau minuman yang panas\n4. Tidak mengganggu area bekas ekstraksi dengan lidah\n5. Tetap menjaga oral hygiene dengan menyikat gigi 2x sehari\n6. Minum obat sesuai yang diresepkan"
  },
  "Ekstraksi Sulung (Topikal/Chlorethyl)": {
    tatalaksana: "1. Lakukan persiapan pasien\n2. Lakukan tell show do kepada pasien\n3. Lakukan asepsis daerah kerja\n4. Semprotkan chlorethyl ke cotton pellet, kemudian tempelkan pada area kerja hingga pasien merasa kebas\n5. Posisikan tang ekstraksi mencapai bagian servikal gigi\n6. Lakukan gerakan luksasi dan rotasi hingga gigi terlepas dari soket\n7. Instruksikan pasien untuk menggigit tampon",
    kie: "1. Instruksikan pasien untuk menggigit tampon minimal 1 jam\n2. Hindari makanan dan minuman yang panas, dianjurkan untuk mengonsumsi makanan dan minuman yang dingin\n3. Tidak mengganggu area bekas ekstraksi\n4. Tetap menjaga oral hygiene dengan menyikat gigi 2x sehari"
  },
  "Ekstraksi Sulung + Anestesi Lokal": {
    tatalaksana: "1. Lakukan persiapan pasien\n2. Lakukan tell show do kepada pasien\n3. Lakukan asepsis area kerja\n4. Aplikasikan anestesi topikal di area kerja\n5. Lakukan anestesi lokal pada area kerja dengan teknik intraligamen\n6. Posisikan tang ekstraksi hingga mencapai bagian servikal gigi\n7. Lakukan gerakan luksasi hingga gigi terlepas dari soket\n8. Instruksikan pasien untuk menggigit tampon",
    kie: "1. Instruksikan pasien untuk menggigit tampon minimal 1 jam\n2. Hindari makanan dan minuman yang panas, dianjurkan untuk mengonsumsi makanan dan minuman yang dingin\n3. Tidak mengganggu area bekas ekstraksi\n4. Tetap menjaga oral hygiene dengan menyikat gigi 2x sehari"
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

  let rahang = "";
  let regio = "";
  let posisi = "";

  if (['1', '5'].includes(quad)) { rahang = "rahang atas"; regio = "kanan"; }
  else if (['2', '6'].includes(quad)) { rahang = "rahang atas"; regio = "kiri"; }
  else if (['3', '7'].includes(quad)) { rahang = "rahang bawah"; regio = "kiri"; }
  else if (['4', '8'].includes(quad)) { rahang = "rahang bawah"; regio = "kanan"; }
  else return `gigi ${toothStr}`;

  if (pos >= 1 && pos <= 3) { posisi = "depan"; }
  else if (pos >= 4 && pos <= 8) { posisi = "belakang"; }

  return `gigi ${posisi} ${regio} ${rahang}`;
}

// Fungsi Parse Anamnesis Dinamis
function parseAnamnesis(template, gender, toothNum) {
    const p_gender = gender === 'Laki-laki' ? 'Seorang pasien laki-laki' : (gender === 'Perempuan' ? 'Seorang pasien perempuan' : 'Seorang pasien');
    const p_loc = getToothLocation(toothNum);
    return template.replace(/{{GENDER}}/g, p_gender).replace(/{{TOOTH_LOCATION}}/g, p_loc);
}


// ==========================================
// DATABASE DIAGNOSIS KEDOKTERAN GIGI (FULL SMART)
// ==========================================
const dentalDatabase = [
  // --- K02 - DENTAL CARIES ---
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

  // --- K04 - DISEASES OF PULP AND PERIAPICAL TISSUES ---
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
  // --- REVISI K04.6: UNTUK SISA AKAR / GIGI UTUH MATI ---
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

  // --- K00 - DISORDERS OF TOOTH DEVELOPMENT AND ERUPTION ---
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
  // --- REVISI K00.6: UNTUK GIGI SULUNG/GOYANG (PERSISTENSI) ---
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
// KOMPONEN UTAMA (APP)
// ==========================================
export default function App() {
  const [currentPage, setCurrentPage] = useState('landing');

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 selection:bg-blue-100 selection:text-blue-900">
      {currentPage === 'landing' && <LandingPage onStart={() => setCurrentPage('generator')} />}
      {currentPage === 'generator' && <GeneratorApp onBack={() => setCurrentPage('landing')} />}
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
             <img src="/logo-axaiship.png" alt="Axa Logo" className="object-cover h-full w-full" onError={(e) => { e.target.style.display='none'; e.target.nextSibling.style.display='flex'; }}/>
             <Activity className="hidden text-blue-600" size={24} />
          </div>
          <span className="text-xl font-extrabold tracking-tight text-slate-800">
            RSUD Kendari <span className="text-blue-600">PIDGI ISHIP</span>
          </span>
        </div>
        <button 
          onClick={onStart}
          className="px-5 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition shadow hover:shadow-md flex items-center"
        >
          Masuk Sistem <ArrowRight size={16} className="ml-2" />
        </button>
      </nav>

      <main className="flex-grow flex flex-col items-center justify-center px-6 py-16 text-center bg-gradient-to-b from-blue-50/50 to-white">
        <div className="max-w-3xl">
          <div className="inline-flex items-center space-x-2 bg-blue-100/50 text-blue-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-8 border border-blue-200">
            <Activity size={16} />
            <span>Sistem Pencatatan Klinis ICD-10 Kedokteran Gigi</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-tight mb-6">
            Generator Rekam Medis <br/>
            <span className="text-blue-600">Otomatis & Smart</span>
          </h1>
          <p className="text-lg text-slate-600 mb-10 max-w-2xl mx-auto">
            Kini dilengkapi dengan <span className="font-semibold text-slate-800">Smart Narrative</span>. Anamnesis otomatis menyesuaikan Jenis Kelamin dan Elemen Gigi. Didukung database lengkap karies, pulpa, erupsi, hingga tatalaksana ekstraksi & penambalan sesuai SOP.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={onStart}
              className="px-8 py-4 text-lg font-bold text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition shadow-lg hover:shadow-xl hover:-translate-y-0.5 w-full sm:w-auto flex items-center justify-center"
            >
              Mulai Generate <Stethoscope className="ml-2" size={22} />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}


// ==========================================
// APLIKASI UTAMA (GENERATOR)
// ==========================================
function GeneratorApp({ onBack }) {
  // States Identity
  const [patientName, setPatientName] = useState('');
  const [patientAge, setPatientAge] = useState('');
  const [gender, setGender] = useState('Laki-laki');
  const [toothNum, setToothNum] = useState('');

  // States Settings
  const [searchQuery, setSearchQuery] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedDisease, setSelectedDisease] = useState(null);
  const [selectedProcedure, setSelectedProcedure] = useState('Bawaan ICD-10 (Default)');
  const [copied, setCopied] = useState(false);

  const wrapperRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [wrapperRef]);

  // Filter ICD-10 Search
  const filteredData = dentalDatabase.filter(item => 
    item.code.toLowerCase().includes(searchQuery.toLowerCase()) || 
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelect = (disease) => {
    setSelectedDisease(disease);
    setSearchQuery(`${disease.code} - ${disease.name}`);
    setIsDropdownOpen(false);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setIsDropdownOpen(true);
    if(e.target.value === '') {
        setSelectedDisease(null);
    }
  };

  // Generate Report Smart Logic
  const generateReportText = () => {
    if (!selectedDisease) return "Silakan pilih diagnosis ICD-10 terlebih dahulu.";
    
    // Parse Smart Anamnesis
    const parsedAnamnesis = parseAnamnesis(selectedDisease.anamnesis, gender, toothNum);
    
    // Process Plan / Tatalaksana
    let tatalaksanaText = selectedDisease.tatalaksana;
    let isCustomProcedure = selectedProcedure !== 'Bawaan ICD-10 (Default)' && proceduresData[selectedProcedure];

    let planSection = "";
    if (isCustomProcedure) {
      planSection = `Tindakan: ${selectedProcedure}\n\nTatalaksana:\n${proceduresData[selectedProcedure].tatalaksana}\n\nKIE:\n${proceduresData[selectedProcedure].kie}`;
    } else {
      planSection = tatalaksanaText;
    }

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
${planSection}
`;
  };

  const copyToClipboard = () => {
    const text = generateReportText();
    if(navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    } else {
        const textArea = document.createElement("textarea");
        textArea.value = text;
        textArea.style.position = "absolute";
        textArea.style.left = "-999999px";
        document.body.prepend(textArea);
        textArea.select();
        try {
            document.execCommand('copy');
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (error) {
            console.error(error);
        } finally {
            textArea.remove();
        }
    }
  };

  return (
    <div className="flex flex-col h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200 px-6 py-3 flex items-center justify-between shrink-0 shadow-sm z-20">
        <div className="flex items-center space-x-3">
           <div className="relative h-8 w-8 overflow-hidden rounded bg-blue-50 flex items-center justify-center border border-blue-100">
             <img src="/logo-axaiship.png" alt="Axa Logo" className="object-cover h-full w-full" onError={(e) => { e.target.style.display='none'; e.target.nextSibling.style.display='flex'; }}/>
             <Activity className="hidden text-blue-600" size={18} />
          </div>
          <h1 className="text-lg font-bold text-slate-800">RSUD Kendari PIDGI ISHIP Generator</h1>
        </div>
        <button 
          onClick={onBack}
          className="text-sm font-medium text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-4 py-2 rounded-lg transition"
        >
          Tutup Aplikasi
        </button>
      </header>

      <div className="flex-grow flex flex-col md:flex-row overflow-hidden">
        
        {/* PANEL KIRI (Input) */}
        <div className="w-full md:w-[420px] bg-white border-r border-slate-200 flex flex-col overflow-y-auto shrink-0 z-10 shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
          <div className="p-6">
            <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center border-b border-slate-100 pb-4">
              <ShieldPlus className="mr-2 text-blue-600" size={24}/> 
              Input Data Klinis
            </h2>

            {/* Identitas Pasien */}
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5">Nama Pasien</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User size={16} className="text-slate-400" />
                  </div>
                  <input 
                    type="text" 
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    placeholder="Contoh: Tn. Budi" 
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition text-sm"
                  />
                </div>
              </div>
              
              <div className="flex space-x-4">
                <div className="w-1/2">
                  <label className="block text-sm font-bold text-slate-700 mb-1.5">Usia</label>
                  <input 
                    type="text" 
                    value={patientAge}
                    onChange={(e) => setPatientAge(e.target.value)}
                    placeholder="Ex: 24 Tahun" 
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition text-sm"
                  />
                </div>
                <div className="w-1/2">
                  <label className="block text-sm font-bold text-slate-700 mb-1.5">Jenis Kelamin</label>
                  <div className="relative">
                    <select 
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                      className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition text-sm appearance-none cursor-pointer"
                    >
                      <option value="Laki-laki">Laki-laki</option>
                      <option value="Perempuan">Perempuan</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 pr-2 flex items-center pointer-events-none">
                      <ChevronDown size={14} className="text-slate-400" />
                    </div>
                  </div>
                </div>
              </div>

              <div>
                 <label className="block text-sm font-bold text-slate-700 mb-1.5">Elemen / Gigi</label>
                 <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Hash size={16} className="text-slate-400" />
                    </div>
                    <input 
                      type="text" 
                      value={toothNum}
                      onChange={(e) => setToothNum(e.target.value)}
                      placeholder="Ex: 16 (Gigi Belakang Kanan Rahang Atas)" 
                      className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition text-sm font-medium text-blue-700"
                    />
                 </div>
              </div>
            </div>

            <div className="w-full h-px bg-slate-200 mb-6"></div>

            {/* Diagnosis Dropdown */}
            <div className="relative mb-6" ref={wrapperRef}>
              <label className="block text-sm font-bold text-slate-700 mb-1.5">Pencarian Kode ICD-10 <span className="text-red-500">*</span></label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search size={18} className="text-blue-500" />
                </div>
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={handleSearchChange}
                  onFocus={() => setIsDropdownOpen(true)}
                  placeholder="Ketik K02, K04, K00..." 
                  className="w-full pl-10 pr-10 py-3.5 bg-white border-2 border-slate-200 rounded-xl focus:ring-0 focus:border-blue-500 outline-none font-semibold text-slate-800 transition shadow-sm"
                />
                
                {/* Tombol X (Clear) */}
                {searchQuery && (
                  <button 
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedDisease(null);
                      setIsDropdownOpen(false);
                    }}
                    className="absolute inset-y-0 right-8 pr-1 flex items-center text-slate-400 hover:text-red-500 transition"
                  >
                    <X size={18} />
                  </button>
                )}

                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <ChevronDown size={18} className="text-slate-400" />
                </div>
              </div>

              {isDropdownOpen && (
                <div className="absolute z-20 mt-2 w-full bg-white border border-slate-200 rounded-xl shadow-2xl max-h-72 overflow-y-auto py-1">
                  {filteredData.length > 0 ? (
                    filteredData.map((item, index) => (
                      <div 
                        key={index} 
                        onClick={() => handleSelect(item)}
                        className="px-4 py-3 hover:bg-blue-50 cursor-pointer border-b border-slate-50 last:border-0 transition"
                      >
                        <div className="font-bold text-blue-700 text-sm">{item.code}</div>
                        <div className="text-xs text-slate-600 mt-0.5">{item.name}</div>
                      </div>
                    ))
                  ) : (
                    <div className="px-4 py-6 text-sm text-slate-500 text-center">
                      Data tidak ditemukan
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Pilihan Tindakan Akhir */}
            <div className="relative bg-slate-50 p-4 rounded-xl border border-slate-200">
              <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center">
                <Syringe size={16} className="mr-2 text-indigo-500"/>
                Pilih Tatalaksana / Tindakan Akhir
              </label>
              <div className="relative">
                <select 
                  value={selectedProcedure}
                  onChange={(e) => setSelectedProcedure(e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition text-sm font-medium text-slate-700 appearance-none cursor-pointer shadow-sm"
                >
                  <option value="Bawaan ICD-10 (Default)">- Bawaan ICD-10 (Default) -</option>
                  {Object.keys(proceduresData).map((procName, idx) => (
                    <option key={idx} value={procName}>{procName}</option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <ChevronDown size={16} className="text-slate-500" />
                </div>
              </div>
              <p className="text-xs text-slate-500 mt-2">
                Pilih opsi di atas untuk otomatis memuat Plan Tatalaksana & KIE khusus (sesuai SOP).
              </p>
            </div>

          </div>
        </div>

        {/* PANEL KANAN (Output & Preview) */}
        <div className="flex-grow bg-[#f3f4f6] p-4 md:p-8 flex flex-col overflow-y-auto">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <h2 className="text-xl font-bold text-slate-800">Kertas Kerja SOAP</h2>
            <button 
              onClick={copyToClipboard}
              disabled={!selectedDisease}
              className={`flex items-center justify-center px-5 py-2.5 rounded-xl font-bold text-sm transition shadow-sm ${
                !selectedDisease 
                  ? 'bg-slate-200 text-slate-400 cursor-not-allowed' 
                  : copied 
                    ? 'bg-green-500 text-white shadow-green-200 scale-95' 
                    : 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-md'
              }`}
            >
              {copied ? (
                <><Check size={18} className="mr-2" /> Teks Tersalin!</>
              ) : (
                <><Copy size={18} className="mr-2" /> Salin Format E-RM</>
              )}
            </button>
          </div>

          <div className="bg-white border border-slate-200 shadow-sm rounded-2xl flex-grow p-6 md:p-10 text-slate-800 font-serif leading-relaxed overflow-y-auto relative">
            {!selectedDisease ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400">
                <FileText size={72} className="mb-4 opacity-30 text-slate-500" />
                <p className="text-lg font-medium text-slate-500">Kertas kerja SOAP belum diisi</p>
                <p className="text-sm mt-2 text-slate-400">Pilih diagnosis ICD-10 di panel sebelah kiri terlebih dahulu.</p>
              </div>
            ) : (
              <div className="space-y-6 max-w-3xl mx-auto">
                
                {/* Header Identity */}
                <div className="border-b-2 border-slate-100 pb-4 mb-6">
                  <table className="w-full text-sm font-sans">
                    <tbody>
                      <tr>
                        <td className="w-32 font-bold py-1 text-slate-500 uppercase tracking-wider text-xs">Nama Pasien</td>
                        <td className="w-4">:</td>
                        <td className="font-semibold text-base">{patientName || '-'}</td>
                      </tr>
                      <tr>
                        <td className="font-bold py-1 text-slate-500 uppercase tracking-wider text-xs">Usia / Gender</td>
                        <td>:</td>
                        <td className="font-semibold text-base">
                          {patientAge ? `${patientAge}, ` : ''} {gender}
                        </td>
                      </tr>
                      <tr>
                        <td className="font-bold py-1 text-slate-500 uppercase tracking-wider text-xs">Elemen Gigi</td>
                        <td>:</td>
                        <td>
                           <span className="inline-flex items-center justify-center bg-blue-100 text-blue-800 px-2 py-0.5 rounded font-bold text-sm">
                             {toothNum || '-'} 
                           </span>
                           <span className="text-xs text-slate-500 ml-2 font-normal italic">
                             ({getToothLocation(toothNum)})
                           </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* S - Subjektif */}
                <div>
                  <h3 className="font-bold text-lg text-slate-900 border-l-4 border-blue-500 pl-3 mb-3 bg-slate-50 py-1 rounded-r-lg">[S] SUBJEKTIF (ANAMNESIS)</h3>
                  <p className="pl-4 whitespace-pre-line text-justify text-[15px]">{parseAnamnesis(selectedDisease.anamnesis, gender, toothNum)}</p>
                </div>

                {/* O - Objektif */}
                <div>
                  <h3 className="font-bold text-lg text-slate-900 border-l-4 border-blue-500 pl-3 mb-3 bg-slate-50 py-1 rounded-r-lg">[O] OBJEKTIF (PEMERIKSAAN FISIK)</h3>
                  <div className="pl-4 space-y-3 text-[15px]">
                    <div>
                      <strong className="text-slate-900 block mb-1">Ekstra Oral:</strong>
                      <p className="text-justify">{selectedDisease.ekstraOral}</p>
                    </div>
                    <div>
                      <strong className="text-slate-900 block mb-1">Intra Oral:</strong>
                      <p className="whitespace-pre-line text-justify">{selectedDisease.intraOral}</p>
                    </div>
                  </div>
                </div>

                {/* A - Assesment */}
                <div>
                  <h3 className="font-bold text-lg text-slate-900 border-l-4 border-blue-500 pl-3 mb-3 bg-slate-50 py-1 rounded-r-lg">[A] ASSESMENT (DIAGNOSIS)</h3>
                  <div className="pl-4 space-y-2 text-[15px]">
                    <p>
                      <strong className="text-slate-900">Diagnosis Kerja:</strong> <br/>
                      <span className="inline-block font-bold text-blue-800 bg-blue-50 border border-blue-100 px-3 py-1 rounded mt-1">
                        {selectedDisease.diagnosis}
                      </span>
                    </p>
                    <p className="mt-3">
                      <strong className="text-slate-900">Diagnosis Banding:</strong> <br/>
                      {selectedDisease.dd}
                    </p>
                  </div>
                </div>

                {/* P - Plan */}
                <div>
                  <h3 className="font-bold text-lg text-slate-900 border-l-4 border-blue-500 pl-3 mb-3 bg-slate-50 py-1 rounded-r-lg">[P] PLAN (TATALAKSANA)</h3>
                  
                  {selectedProcedure !== 'Bawaan ICD-10 (Default)' ? (
                    <div className="pl-4 space-y-4">
                      <div>
                        <strong className="text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded text-[15px]">
                          Tindakan Terpilih: {selectedProcedure}
                        </strong>
                      </div>
                      <div>
                         <strong className="text-slate-900 block mb-1">Tatalaksana:</strong>
                         <p className="whitespace-pre-line text-[15px] leading-relaxed text-justify">{proceduresData[selectedProcedure].tatalaksana}</p>
                      </div>
                      <div>
                         <strong className="text-slate-900 block mb-1">KIE (Komunikasi, Informasi, Edukasi):</strong>
                         <p className="whitespace-pre-line text-[15px] leading-relaxed text-justify">{proceduresData[selectedProcedure].kie}</p>
                      </div>
                    </div>
                  ) : (
                    <p className="pl-4 whitespace-pre-line text-[15px] leading-relaxed text-justify">{selectedDisease.tatalaksana}</p>
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
