import React, { useState, useEffect, useRef } from 'react';
import { Search, ChevronDown, Stethoscope, FileText, Copy, Check, Activity, ShieldPlus, ArrowRight, User, Hash } from 'lucide-react';

// ==========================================
// DATABASE DIAGNOSIS KEDOKTERAN GIGI (FULL)
// Berdasarkan Standar ICD-10 K00, K02, K04
// ==========================================
const dentalDatabase = [
  // --- K02 - DENTAL CARIES ---
  {
    code: "K02.0",
    name: "Caries limited to enamel",
    anamnesis: "Pasien datang mengeluhkan gigi terasa ngilu saat minum dingin atau makan manis. Ngilu langsung hilang saat rangsangan dihilangkan. Tidak ada keluhan nyeri spontan atau nyeri saat malam hari.",
    ekstraOral: "Wajah simetris, tidak ada pembengkakan ekstra oral. Kelenjar Getah Bening (KGB) submandibula tidak teraba dan tidak sakit.",
    intraOral: "Terdapat kavitas dangkal berupa lesi karies pada permukaan email gigi. \n- Tes Sondase: (-) atau ngilu ringan sesaat.\n- Tes Perkusi: (-)\n- Tes Palpasi: (-)\n- Tes Vitalitas/Dingin: (+)",
    diagnosis: "K02.0 - Caries limited to enamel (Karies Email / Pulpitis Reversibel)",
    dd: "Karies Dentin",
    tatalaksana: "1. KIE (Komunikasi, Informasi, Edukasi) cara menyikat gigi yang benar (Modifikasi Bass).\n2. Pembersihan jaringan karies (Preparasi kavitas).\n3. Restorasi dengan resin komposit atau Glass Ionomer Cement (GIC)."
  },
  {
    code: "K02.1",
    name: "Caries of dentine",
    anamnesis: "Pasien datang mengeluhkan gigi ngilu tajam saat terkena makanan/minuman dingin, manis, atau asam. Ngilu mereda setelah beberapa saat stimulus dihilangkan. Pasien mengeluh makanan sering menyangkut di lubang gigi.",
    ekstraOral: "Wajah simetris, tidak ada kelainan (TAK). KGB tidak teraba.",
    intraOral: "Terdapat kavitas berukuran sedang hingga dalam mencapai lapisan dentin. \n- Tes Sondase: (+ ngilu)\n- Tes Perkusi: (-)\n- Tes Palpasi: (-)\n- Tes Vitalitas: (+)",
    diagnosis: "K02.1 - Caries of dentine (Karies Dentin / Pulpitis Reversibel)",
    dd: "Pulpitis Irreversibel Simtomatik",
    tatalaksana: "1. KIE pentingnya menjaga kebersihan mulut.\n2. Pembersihan jaringan karies (Preparasi kavitas).\n3. Pemberian base/liner (Kalsium Hidroksida / GIC tipe III) jika kavitas cukup dalam (mendekati pulpa).\n4. Tumpatan tetap (Resin Komposit / GIC)."
  },
  {
    code: "K02.2",
    name: "Caries of cementum",
    anamnesis: "Pasien (umumnya usia lanjut) mengeluhkan gigi ngilu pada area leher gigi, terutama saat menyikat gigi atau minum dingin. Terasa ada permukaan yang kasar di dekat gusi.",
    ekstraOral: "TAK. Wajah simetris.",
    intraOral: "Terdapat resesi gingiva. Tampak lesi karies pada area servikal/akar (sementum) yang terbuka. \n- Tes Sondase: (+) ngilu.\n- Tes Perkusi: (-)\n- Tes Vitalitas: (+)",
    diagnosis: "K02.2 - Caries of cementum (Karies Sementum / Karies Akar)",
    dd: "Abrasi Servikal, Abfraksi",
    tatalaksana: "1. KIE teknik menyikat gigi dengan bulu sikat halus.\n2. Pembersihan kavitas dengan bur atau ekskavator.\n3. Restorasi menggunakan Glass Ionomer Cement (GIC) karena ikatan kimiawinya dengan struktur gigi dan kemampuan pelepasan fluor."
  },
  {
    code: "K02.3",
    name: "Arrested dental caries",
    anamnesis: "Pasien tidak memiliki keluhan sakit atau ngilu. Pasien hanya menyadari adanya bercak kecoklatan atau kehitaman pada gigi yang sudah lama tidak membesar.",
    ekstraOral: "TAK.",
    intraOral: "Terdapat lesi karies berwarna coklat/hitam pekat. Saat diekskavasi atau di-sondase, dasar kavitas terasa keras dan licin. \n- Tes Sondase: (-) keras.\n- Tes Perkusi: (-)\n- Tes Vitalitas: (+)",
    diagnosis: "K02.3 - Arrested dental caries (Karies Terhenti)",
    dd: "Diskolorasi Ekstrinsik, Karies Dentin Aktif",
    tatalaksana: "1. KIE bahwa karies telah terhenti prosesnya.\n2. Observasi berkala.\n3. Jika mengganggu estetika (gigi anterior), dapat dilakukan restorasi estetik (Komposit) setelah preparasi minimal."
  },
  {
    code: "K02.4",
    name: "Odontoclasia",
    anamnesis: "Pasien seringkali asimtomatik (tanpa gejala) atau mengeluhkan gigi terasa sedikit goyang atau ada noda kemerahan/pink pada mahkota gigi (pink tooth).",
    ekstraOral: "TAK.",
    intraOral: "Tampak defek resorpsi pada area servikal atau mahkota. Jika resorpsi internal meluas, tampak bayangan kemerahan (pink spot). \n- Perkusi: (+/-)\n- Kegoyangan: bisa derajat 1-2.\n- Gambaran radiografis (Rontgen) menunjukkan resorpsi struktur gigi internal/eksternal.",
    diagnosis: "K02.4 - Odontoclasia (Resorpsi Internal / Eksternal Gigi)",
    dd: "Karies Servikal Profunda",
    tatalaksana: "1. Rujukan foto rontgen periapikal untuk observasi perluasan resorpsi.\n2. Jika resorpsi internal memengaruhi pulpa tanpa perforasi akar luar: Perawatan Saluran Akar (PSA).\n3. Jika resorpsi eksternal parah/gigi sangat goyang: Ekstraksi."
  },
  {
    code: "K02.8",
    name: "Other dental caries",
    anamnesis: "Pasien mengeluhkan adanya gigi berlubang atau ngilu pada gigi yang tidak spesifik penempatannya (misal: karies sekunder di bawah tumpatan lama).",
    ekstraOral: "TAK.",
    intraOral: "Terdapat karies di sekitar tepi restorasi lama (karies sekunder). \n- Tes Sondase: (+/-) menyangkut di tepi tumpatan.\n- Vitalitas: (+)",
    diagnosis: "K02.8 - Other dental caries (Karies Sekunder / Recurrent caries)",
    dd: "Tumpatan Overhang / Bocor",
    tatalaksana: "1. KIE.\n2. Pembongkaran tumpatan lama yang bocor.\n3. Pembersihan karies sekunder.\n4. Restorasi ulang yang adekuat."
  },
  {
    code: "K02.9",
    name: "Dental caries, unspecified",
    anamnesis: "Pasien mengeluhkan gigi berlubang. (Gunakan kode ini jika kedalaman karies belum dapat ditentukan secara spesifik pada kunjungan pertama).",
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
    anamnesis: "Pasien mengeluhkan nyeri spontan dan berdenyut pada gigi, terutama terjadi pada malam hari hingga mengganggu tidur. Nyeri tajam, bertahan lama meski stimulus dihilangkan, dan sering menjalar ke area kepala, pelipis, atau telinga.",
    ekstraOral: "Wajah simetris, tidak ada pembengkakan. KGB submandibula mungkin sedikit teraba namun umumnya tidak sakit.",
    intraOral: "Terdapat kavitas profunda mencapai kamar pulpa (karies profunda perforasi). \n- Tes Sondase: (+ nyeri tajam)\n- Tes Perkusi: (+/- biasanya ringan)\n- Tes Palpasi: (-)\n- Tes Vitalitas/Dingin: (+ over reaktif / nyeri bertahan lama).",
    diagnosis: "K04.0 - Pulpitis (Pulpitis Irreversibel Simtomatik)",
    dd: "Periodontitis Apikalis Akut, Nekrosis Pulpa (parsial)",
    tatalaksana: "1. KIE rencana perawatan saluran akar (PSA).\n2. Anastesi lokal (jika nyeri hebat).\n3. Open bur & Ekstirpasi pulpa (pembuangan jaringan pulpa vital/radang).\n4. Medikasi intrakanal (Eugenol / Formokresol pada kapas kecil) atau Ca(OH)2.\n5. Tumpatan sementara.\n6. Resep Analgesik: Asam Mefenamat 500mg 3x1 p.r.n."
  },
  {
    code: "K04.1",
    name: "Necrosis of pulp",
    anamnesis: "Pasien mengeluhkan giginya berlubang besar dan sudah berubah warna (menghitam/keabu-abuan). Dulu pernah sakit hebat berdenyut namun sekarang sudah tidak sakit sama sekali. Kadang terasa bau kurang sedap dari gigi tersebut.",
    ekstraOral: "Wajah simetris, TAK.",
    intraOral: "Kavitas profunda perforasi. Mahkota gigi tampak mengalami diskolorasi. \n- Tes Sondase: (-) tidak sakit.\n- Tes Perkusi: (-)\n- Tes Palpasi: (-)\n- Tes Vitalitas (Dingin/Termal): (-) tidak merespon sama sekali.",
    diagnosis: "K04.1 - Necrosis of pulp (Nekrosis Pulpa)",
    dd: "Pulpitis Asimtomatik",
    tatalaksana: "1. KIE rencana PSA (Perawatan Saluran Akar) atau Ekstraksi.\n2. Buka akses (Open bur) & Preparasi saluran akar.\n3. Irigasi (NaOCl 2.5% & Saline).\n4. Medikasi intrakanal (CHKM/TKF atau Kalsium Hidroksida pasta).\n5. Tumpatan sementara.\n*Jika mahkota sisa terlalu sedikit, pro ekstraksi."
  },
  {
    code: "K04.2",
    name: "Pulp degeneration",
    anamnesis: "Biasanya pasien tidak ada keluhan rasa sakit (asimtomatik). Ditemukan secara tidak sengaja saat pemeriksaan rutin atau foto rontgen.",
    ekstraOral: "TAK.",
    intraOral: "Gigi mungkin tampak utuh atau dengan tumpatan besar. \n- Tes Vitalitas: seringkali merespon lambat atau (-).\n- Rontgen: Tampak penyempitan atau obliterasi total pada kamar pulpa/saluran akar (Kalsifikasi pulpa).",
    diagnosis: "K04.2 - Pulp degeneration (Degenerasi Pulpa / Kalsifikasi)",
    dd: "Nekrosis Pulpa",
    tatalaksana: "1. Observasi jika asimtomatik.\n2. KIE kepada pasien mengenai kondisi giginya.\n3. Jika diperlukan untuk restorasi protesa, perawatan PSA mungkin sangat sulit akibat kalsifikasi."
  },
  {
    code: "K04.3",
    name: "Abnormal hard tissue formation in pulp",
    anamnesis: "Seringkali asimtomatik. Namun, kadang pasien mengeluhkan nyeri tumpul atau ngilu (neuralgia) tanpa penyebab yang jelas secara klinis.",
    ekstraOral: "TAK.",
    intraOral: "Gigi tampak normal. \n- Pemeriksaan klinis seringkali tidak konklusif.\n- Rontgen: Tampak gambaran radiopak membulat di dalam kamar pulpa (Pulp Stone / Dentikel).",
    diagnosis: "K04.3 - Abnormal hard tissue formation in pulp (Pulp Stone)",
    dd: "Pulpitis Irreversibel Asimtomatik",
    tatalaksana: "1. Observasi jika tidak ada keluhan.\n2. Jika menimbulkan gejala nyeri persisten (neuralgia pulpa), dilakukan Perawatan Saluran Akar (PSA) dengan mengangkat pulp stone tersebut."
  },
  {
    code: "K04.4",
    name: "Acute apical periodontitis of pulpal origin",
    anamnesis: "Pasien mengeluh giginya terasa sangat sakit saat digunakan mengunyah atau bersentuhan dengan gigi lawan. Terasa seperti giginya 'memanjang' atau lebih tinggi dari gigi lain. Sakit terus-menerus.",
    ekstraOral: "Wajah mungkin sedikit asimetris akibat pembengkakan ringan. KGB submandibula teraba dan sakit saat ditekan.",
    intraOral: "Gigi biasanya terdapat karies profunda mati atau tumpatan lama. \n- Tes Sondase: (-)\n- Tes Perkusi: (+ sakit sangat tajam)\n- Tes Palpasi di apikal: (+ sakit)\n- Tes Vitalitas: (-)",
    diagnosis: "K04.4 - Acute apical periodontitis of pulpal origin",
    dd: "Abses Periapikal Akut",
    tatalaksana: "1. KIE.\n2. Buka akses pulpa (Open bur) untuk drainase gas/pus dari saluran akar.\n3. Penyesuaian oklusi (Oclusal adjustment) agar tidak trauma oklusi.\n4. Jika eksudat/pus keluar deras, biarkan terbuka (open dressing) 1-2 hari. Jika kering, beri medikasi intrakanal dan tumpat sementara longgar.\n5. Resep: Amoxicillin 500mg 3x1, Asam Mefenamat 500mg 3x1."
  },
  {
    code: "K04.5",
    name: "Chronic apical periodontitis",
    anamnesis: "Pasien mengeluhkan giginya berlubang besar, dulunya pernah sakit, tapi sekarang hanya kadang-kadang terasa sedikit tidak nyaman jika diketuk keras atau ditekan.",
    ekstraOral: "TAK.",
    intraOral: "Gigi nekrosis. Tes vitalitas (-). Tes perkusi kadang (+ ringan). Tes palpasi (-).\n- Rontgen: Tampak radiolusensi (area gelap) membulat kecil hingga sedang di area periapikal akar gigi (Granuloma Periapikal).",
    diagnosis: "K04.5 - Chronic apical periodontitis (Granuloma Apikalis)",
    dd: "Kista Radikuler (K04.8), Abses Periapikal Kronis",
    tatalaksana: "1. KIE.\n2. Perawatan Saluran Akar (PSA) multipel kunjungan.\n3. Pembersihan, pembentukan saluran (Shaping & Cleaning), Irigasi.\n4. Aplikasi medikasi intrakanal (Kalsium Hidroksida) untuk merangsang penyembuhan lesi apikal."
  },
  {
    code: "K04.6",
    name: "Periapical abscess with sinus",
    anamnesis: "Pasien mengeluhkan adanya 'jerawat' atau benjolan pada gusi dekat gigi yang berlubang/mati. Benjolan sering pecah mengeluarkan cairan/nanah (pus) dan terasa asin/pahit, kemudian benjolan mengempis. Tidak ada nyeri akut.",
    ekstraOral: "TAK. Atau sedikit benjolan jika sinus tract tembus ke kulit (jarang, biasanya intraoral).",
    intraOral: "Tampak benjolan (parulis) pada mukosa gingiva di dekat apeks gigi. Saat ditekan, keluar eksudat purulen (pus). \n- Tes Perkusi: (+ ringan / -)\n- Tes Vitalitas: (-)",
    diagnosis: "K04.6 - Periapical abscess with sinus (Abses Periapikal Kronis dengan Fistula)",
    dd: "Periodontitis Apikalis Kronis",
    tatalaksana: "1. KIE.\n2. Buka akses (Open bur) dan preparasi saluran akar.\n3. Irigasi NaOCl untuk disinfeksi mendalam.\n4. Medikasi intrakanal.\n5. Saluran fistula/sinus tract akan menutup sendiri setelah sumber infeksi di saluran akar dibersihkan."
  },
  {
    code: "K04.7",
    name: "Periapical abscess without sinus",
    anamnesis: "Pasien mengeluhkan bengkak besar pada gusi/pipi, terasa sangat sakit, berdenyut, memerah, dan hangat. Demam ringan dan malaise. Nyeri hebat saat mengunyah.",
    ekstraOral: "Wajah asimetris, terdapat pembengkakan berbatas difus/jelas, hiperemis, palpasi sakit, teraba hangat. Terkadang fluktuatif. KGB membesar & sakit.",
    intraOral: "Pembengkakan pada vestibular/mukobukal fold di area periapikal gigi penyebab. Mukosa merah, palpasi (+ fluktuatif/lunak), perkusi (+ sakit hebat). Vitalitas (-).",
    diagnosis: "K04.7 - Periapical abscess without sinus (Abses Periapikal Akut)",
    dd: "Abses Periodontal, Selulitis",
    tatalaksana: "1. KIE urgensi kondisi infeksi.\n2. Open bur untuk membebaskan drainase pus dari kamar pulpa.\n3. Jika abses submukosa sudah fluktuatif (matang): Lakukan Insisi & Drainase.\n4. Resep Antibiotik (Amoxicillin 500mg + Metronidazole 500mg) & Analgesik kuat.\n5. Pasien diinstruksikan kontrol 3-5 hari kemudian."
  },
  {
    code: "K04.8",
    name: "Radicular cyst",
    anamnesis: "Umumnya asimtomatik dan lambat membesar. Pasien menyadari giginya mati atau ada perubahan warna. Bila kista sudah membesar, pasien dapat merasakan giginya goyang atau bergeser dari lengkungnya.",
    ekstraOral: "Jika kista sangat besar, dapat menyebabkan asimetri wajah atau ekspansi tulang kortikal yang teraba keras (atau seperti ping-pong ball jika tulang sudah menipis).",
    intraOral: "Gigi nekrosis (-). Mungkin ada ekspansi tulang bukal/palatal. \n- Rontgen: Tampak radiolusensi bulat dengan batas tepi sangat tegas/radiopak tipis, berdiameter > 1 cm di area apeks akar.",
    diagnosis: "K04.8 - Radicular cyst (Kista Radikuler)",
    dd: "Granuloma Apikalis (K04.5), Kista Dentigerous",
    tatalaksana: "1. KIE bahwa terdapat kista yang harus diangkat.\n2. Rujuk ke Sp.BM (Spesialis Bedah Mulut) atau lakukan Perawatan Endodontik Bedah (Apeksreseksi + Enukleasi Kista).\n3. Ekstraksi gigi penyebab + Kuretase bersih soket jika gigi tidak dapat dipertahankan."
  },

  // --- K00 - DISORDERS OF TOOTH DEVELOPMENT AND ERUPTION ---
  {
    code: "K00.0",
    name: "Anodontia",
    anamnesis: "Pasien atau orang tua pasien mengeluhkan ada beberapa gigi permanen atau sulung yang tidak tumbuh sama sekali meskipun sudah melewati usia erupsi normal.",
    ekstraOral: "Profil wajah mungkin terpengaruh (hipodivergen/cekung) jika anodontia menyeluruh/oligodontia berat, namun umumnya TAK pada hipodontia ringan (kehilangan 1-2 gigi).",
    intraOral: "Kehilangan gigi (missing teeth). Diastema multipel. Tulang alveolar ridge di area tak bergigi mungkin datar/tipis.\n- Rontgen Panoramik: Konfirmasi ketiadaan benih gigi di dalam rahang.",
    diagnosis: "K00.0 - Anodontia (Hipodontia / Oligodontia)",
    dd: "Impaksi Gigi (K00.6)",
    tatalaksana: "1. KIE kondisi genetik/tumbuh kembang.\n2. Pembuatan rontgen panoramik.\n3. Rencana pembuatan gigi tiruan (Protesa GTSL / GTSJ / Implan) untuk mengembalikan fungsi mastikasi, bicara, dan estetik."
  },
  {
    code: "K00.1",
    name: "Supernumerary teeth",
    anamnesis: "Pasien mengeluhkan ada gigi tambahan yang tumbuh tidak pada tempatnya, menyebabkan gigi lain berjejal, renggang, atau ada benjolan keras di langit-langit mulut/gusi.",
    ekstraOral: "TAK.",
    intraOral: "Tampak adanya gigi ekstra (lebih dari jumlah normal). Sering ditemukan di garis tengah rahang atas (Mesiodens) atau di area premolar (Paramolar). Bentuk kadang conus/kecil. Gigi utama bisa mengalami malposisi.",
    diagnosis: "K00.1 - Supernumerary teeth (Mesiodens / Paramolar)",
    dd: "Odontoma",
    tatalaksana: "1. KIE.\n2. Rontgen periapikal/panoramik/CBCT untuk melihat letak akar.\n3. Ekstraksi / Odontektomi gigi supernumerary tersebut, agar gigi permanen yang normal dapat tumbuh atau dirawat ortodonti dengan baik."
  },
  {
    code: "K00.2",
    name: "Abnormalities of size and form of teeth",
    anamnesis: "Pasien mengeluhkan bentuk giginya aneh, tidak sama dengan sebelahnya, atau ukurannya terlalu kecil/besar. (Misal: gigi insisif lateral atas berbentuk seperti pasak/kerucut).",
    ekstraOral: "TAK.",
    intraOral: "Ukuran gigi lebih kecil (Mikrodontia) atau lebih besar (Makrodontia). Bentuk mahkota aneh, contoh: Peg-shaped lateral incisor (berbentuk kerucut), fusi (dua gigi bergabung), geminasi.",
    diagnosis: "K00.2 - Abnormalities of size and form of teeth (Mikrodontia / Peg-shaped)",
    dd: "Gigi Susu Bertahan (Persistensi)",
    tatalaksana: "1. KIE bahwa ini adalah variasi anatomi genetik.\n2. Perawatan estetik: Restorasi direct komposit (veneer) atau pembuatan mahkota tiruan (Crown) untuk mengembalikan bentuk anatomi dan estetik senatural mungkin."
  },
  {
    code: "K00.3",
    name: "Mottled teeth",
    anamnesis: "Pasien mengeluhkan warna giginya tidak merata, terdapat bercak putih (opaque) berbintik-bintik, atau garis-garis kecoklatan di seluruh gigi sejak gigi tumbuh. Biasanya memiliki riwayat minum air sumur dengan fluor tinggi saat masa kanak-kanak.",
    ekstraOral: "TAK.",
    intraOral: "Tampak bercak putih kapur (white spot), kuning, hingga coklat gelap pada permukaan email banyak gigi (terutama anterior). Permukaan email bisa jadi pitting (berlubang kecil-kecil/kasar).",
    diagnosis: "K00.3 - Mottled teeth (Fluorosis Dental)",
    dd: "Amelogenesis Imperfekta (K00.5), Hipoplasia Email",
    tatalaksana: "1. KIE penyebab fluorosis.\n2. Ringan: Bleaching (Pemutihan gigi) atau Mikroabrasi email.\n3. Sedang-Berat: Pembuatan Direct Veneer komposit atau Indirect Porcelain Veneer / Crown untuk mengcover diskolorasi."
  },
  {
    code: "K00.4",
    name: "Disturbances in tooth formation",
    anamnesis: "Pasien mengeluhkan giginya mudah rapuh, berlubang, atau permukaannya kasar bergaris-garis kuning kecoklatan sejak gigi tersebut tumbuh. Pernah sakit parah/demam tinggi waktu bayi.",
    ekstraOral: "TAK.",
    intraOral: "Tampak defek pada kuantitas email (Hipoplasia email). Terdapat pit, groove (alur), atau hilangnya email sebagian/seluruhnya. Dentin terbuka sehingga gigi berwarna kekuningan dan sensitif.",
    diagnosis: "K00.4 - Disturbances in tooth formation (Hipoplasia Email)",
    dd: "Amelogenesis Imperfekta, Karies Rampan",
    tatalaksana: "1. KIE perlindungan struktur gigi.\n2. Aplikasi Topikal Fluor (TAF) untuk mengurangi sensitivitas.\n3. Restorasi dengan GIC atau Komposit. Jika kerusakan mahkota parah, disarankan pembuatan Crown (Mahkota Tiruan)."
  },
  {
    code: "K00.5",
    name: "Hereditary disturbances in tooth structure, not elsewhere classified",
    anamnesis: "Pasien mengeluhkan giginya mudah aus, berwarna kuning/kecoklatan transparan, dan sangat sensitif. Ayah/Ibu pasien juga memiliki keluhan serupa (Faktor genetik/keturunan).",
    ekstraOral: "TAK.",
    intraOral: "Amelogenesis Imperfekta: Email tipis, sangat rapuh, gigi tampak menguning. Dentinogenesis Imperfekta: Warna gigi translusen opalesen (kebiruan/kecoklatan), email mudah terkelupas, atrisi berat. Rontgen: pulp chamber mengecil/obliterasi.",
    diagnosis: "K00.5 - Hereditary disturbances in tooth structure (Amelogenesis/Dentinogenesis Imperfekta)",
    dd: "Fluorosis Berat",
    tatalaksana: "1. KIE tentang kondisi genetik.\n2. Manajemen preventif: kontrol karies ketat, aplikasi fluor.\n3. Manajemen kuratif: Full mouth rehabilitation (pembuatan crown pada seluruh gigi) untuk melindungi jaringan tersisa dan menaikkan dimensi vertikal oklusi."
  },
  {
    code: "K00.6",
    name: "Disturbances in tooth eruption (Impaction)",
    anamnesis: "Pasien mengeluhkan rasa sakit dan bengkak berulang di gusi paling belakang bawah (Gigi Bungsu/M3). Nyeri sering menjalar ke telinga, pelipis, leher. Disertai kesulitan membuka mulut lebar (trismus) dan bau mulut.",
    ekstraOral: "Pembengkakan pipi pada regio yang sakit, asimetri wajah ringan. KGB submandibula membesar, kenyal, dan sakit saat dipalpasi. Adanya Trismus (keterbatasan buka mulut).",
    intraOral: "Gigi Molar ke-3 tumbuh sebagian (partial eruption) atau terpendam seluruhnya. Tampak operkulum (gusi yang menutupi mahkota) kemerahan, bengkak, palpasi (+ pus/nyeri). Perkusi (+).",
    diagnosis: "K00.6 - Disturbances in tooth eruption (Impaksi M3 / Perikoronitis Akut)",
    dd: "Pulpitis Gigi Molar Kedua",
    tatalaksana: "1. KIE perlunya operasi pengangkatan gigi.\n2. Irigasi area di bawah operkulum dengan Saline dan Povidone Iodine.\n3. Resep: Amoxicillin 500mg, Metronidazole 500mg, Asam Mefenamat 500mg.\n4. Rujuk Foto Panoramik.\n5. Rencana Odontektomi (bedah minor) setelah fase infeksi/akut reda."
  },
  {
    code: "K00.7",
    name: "Teething syndrome",
    anamnesis: "Orang tua mengeluhkan bayinya (usia 6-24 bulan) rewel, sering menangis malam, terus-menerus memasukkan jari/mainan ke dalam mulut, ngeces (hipersalivasi), susah makan, dan kadang demam ringan.",
    ekstraOral: "Suhu tubuh anak mungkin sedikit meningkat (subfebris). Kemerahan di area pipi.",
    intraOral: "Gusi pada area gigi sulung yang akan erupsi (biasanya insisif) tampak membengkak membulat, kemerahan, dan kadang tampak pucat/keputihan di puncaknya. Sangat sensitif saat disentuh.",
    diagnosis: "K00.7 - Teething syndrome (Sindrom Erupsi Gigi)",
    dd: "Infeksi Herpetik Gingivostomatitis",
    tatalaksana: "1. KIE kepada orang tua bahwa ini adalah proses fisiologis normal.\n2. Berikan teether mainan yang sudah didinginkan di kulkas untuk digigit anak.\n3. Pijat gusi dengan jari bersih yang dibungkus kasa basah dingin.\n4. Jika nyeri mengganggu tidur, resepkan Paracetamol sirup (dosis sesuai berat badan anak)."
  },
  {
    code: "K00.8",
    name: "Other disorders of tooth development",
    anamnesis: "Pasien mengeluhkan adanya perubahan warna pada gigi tertentu tanpa adanya kavitas karies (misalnya diskolorasi pasca trauma masa lampau yang mengganggu perkembangan gigi).",
    ekstraOral: "TAK.",
    intraOral: "Tampak kelainan lokal pada satu gigi. (Gunakan kode ini untuk gangguan spesifik lain yang tidak masuk di kategori K00.0 - K00.7).",
    diagnosis: "K00.8 - Other disorders of tooth development",
    dd: "Diskolorasi intrinsik trauma",
    tatalaksana: "1. Evaluasi klinis dan radiografis.\n2. Tatalaksana sesuai gejala klinis spesifik (misal: restorasi estetik atau observasi)."
  },
  {
    code: "K00.9",
    name: "Disorder of tooth development, unspecified",
    anamnesis: "Terdapat keluhan terkait bentuk/tumbuhnya gigi yang belum dapat diklasifikasikan dengan jelas pada kunjungan awal.",
    ekstraOral: "Bergantung keparahan klinis.",
    intraOral: "Terdapat anomali pertumbuhan/perkembangan, evaluasi rontgenografi masih diperlukan.",
    diagnosis: "K00.9 - Disorder of tooth development, unspecified",
    dd: "Kelainan Dental YTT",
    tatalaksana: "1. KIE perlunya pemeriksaan penunjang lanjutan.\n2. Rujuk untuk pengambilan foto Rontgen Panoramik/CBCT untuk penegakan diagnosis pasti."
  }
];

// ==========================================
// KOMPONEN UTAMA (APP)
// ==========================================
export default function App() {
  const [currentPage, setCurrentPage] = useState('landing');

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      {currentPage === 'landing' && <LandingPage onStart={() => setCurrentPage('generator')} />}
      {currentPage === 'generator' && <GeneratorApp onBack={() => setCurrentPage('landing')} />}
    </div>
  );
}

// ==========================================
// HALAMAN LANDING (LANDING PAGE)
// ==========================================
function LandingPage({ onStart }) {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 py-4 bg-white shadow-sm border-b border-slate-100">
        <div className="flex items-center space-x-3">
          {/* Logo Handle */}
          <div className="relative h-10 w-10 overflow-hidden rounded-lg bg-blue-50 flex items-center justify-center border border-blue-100">
             <img src="/logo-axaiship.png" alt="Axa Logo" className="object-cover h-full w-full" onError={(e) => { e.target.style.display='none'; e.target.nextSibling.style.display='flex'; }}/>
             <Activity className="hidden text-blue-600" size={24} />
          </div>
          <span className="text-xl font-extrabold tracking-tight text-slate-800">
            Kendari <span className="text-blue-600">ISHIP</span>
          </span>
        </div>
        <button 
          onClick={onStart}
          className="px-5 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition shadow hover:shadow-md flex items-center"
        >
          Masuk Sistem <ArrowRight size={16} className="ml-2" />
        </button>
      </nav>

      {/* Hero Section */}
      <main className="flex-grow flex flex-col items-center justify-center px-6 py-16 text-center bg-gradient-to-b from-blue-50/50 to-white">
        <div className="max-w-3xl">
          <div className="inline-flex items-center space-x-2 bg-blue-100/50 text-blue-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-8 border border-blue-200">
            <Activity size={16} />
            <span>Sistem Pencatatan Klinis ICD-10 Kedokteran Gigi</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-tight mb-6">
            Generator Rekam Medis <br/>
            <span className="text-blue-600">Otomatis & Terstandar</span>
          </h1>
          <p className="text-lg text-slate-600 mb-10 max-w-2xl mx-auto">
            Mempermudah dokter gigi Internship (ISHIP) dalam menyusun format SOAP lengkap secara kilat. Didukung database lengkap karies (K02), pulpa (K04), hingga erupsi (K00).
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

        {/* Features Preview */}
        <div className="grid md:grid-cols-3 gap-6 mt-20 max-w-5xl w-full">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col items-start text-left">
            <div className="h-12 w-12 bg-cyan-100 text-cyan-600 rounded-xl flex items-center justify-center mb-4">
              <Search size={24} />
            </div>
            <h3 className="font-bold text-lg mb-2 text-slate-800">Autocomplete ICD-10</h3>
            <p className="text-slate-500 text-sm leading-relaxed">Pencarian instan diagnosis dari daftar BPJS/ICD-10 (K00-K04). Cukup ketik kode atau nama penyakit.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col items-start text-left">
            <div className="h-12 w-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-4">
              <FileText size={24} />
            </div>
            <h3 className="font-bold text-lg mb-2 text-slate-800">SOAP Generator</h3>
            <p className="text-slate-500 text-sm leading-relaxed">Anamnesis, Ekstra/Intra Oral, Diagnosis Banding, dan Tatalaksana medis standar terisi otomatis.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col items-start text-left">
            <div className="h-12 w-12 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center mb-4">
              <Copy size={24} />
            </div>
            <h3 className="font-bold text-lg mb-2 text-slate-800">Salin & Tempel 1-Klik</h3>
            <p className="text-slate-500 text-sm leading-relaxed">Ekspor hasil rekam medis dengan satu kali klik. Format rapi dan siap di-paste ke dalam SIMRS E-RM.</p>
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
  // States
  const [patientName, setPatientName] = useState('');
  const [patientAge, setPatientAge] = useState('');
  const [toothNum, setToothNum] = useState('');

  const [searchQuery, setSearchQuery] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedDisease, setSelectedDisease] = useState(null);
  const [copied, setCopied] = useState(false);

  const wrapperRef = useRef(null);

  // Close dropdown logic
  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [wrapperRef]);

  // Filter 26 Data
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

  // String Generator for Copying
  const generateReportText = () => {
    if (!selectedDisease) return "Silakan pilih diagnosis terlebih dahulu.";
    
    return `IDENTITAS PASIEN
Nama: ${patientName || '-'}
Usia: ${patientAge || '-'}
Elemen Gigi: ${toothNum || '-'}

[S] SUBJEKTIF (ANAMNESIS)
${selectedDisease.anamnesis}

[O] OBJEKTIF (PEMERIKSAAN FISIK)
- Ekstra Oral: ${selectedDisease.ekstraOral}
- Intra Oral: ${selectedDisease.intraOral}

[A] ASSESMENT (DIAGNOSIS)
- Diagnosis Kerja: ${selectedDisease.diagnosis}
- Diagnosis Banding: ${selectedDisease.dd}

[P] PLAN (TATALAKSANA)
${selectedDisease.tatalaksana}
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
      {/* Top Navigation */}
      <header className="bg-white border-b border-slate-200 px-6 py-3 flex items-center justify-between shrink-0 shadow-sm z-20">
        <div className="flex items-center space-x-3">
           <div className="relative h-8 w-8 overflow-hidden rounded bg-blue-50 flex items-center justify-center border border-blue-100">
             <img src="/logo-axaiship.png" alt="Axa Logo" className="object-cover h-full w-full" onError={(e) => { e.target.style.display='none'; e.target.nextSibling.style.display='flex'; }}/>
             <Activity className="hidden text-blue-600" size={18} />
          </div>
          <h1 className="text-lg font-bold text-slate-800">Kendari ISHIP</h1>
        </div>
        <button 
          onClick={onBack}
          className="text-sm font-medium text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-4 py-2 rounded-lg transition"
        >
          Tutup Aplikasi
        </button>
      </header>

      {/* Main Layout */}
      <div className="flex-grow flex flex-col md:flex-row overflow-hidden">
        
        {/* PANEL KIRI (Input) */}
        <div className="w-full md:w-[400px] bg-white border-r border-slate-200 flex flex-col overflow-y-auto shrink-0 z-10 shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
          <div className="p-6">
            <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center border-b border-slate-100 pb-4">
              <ShieldPlus className="mr-2 text-blue-600" size={24}/> 
              Input Data Klinis
            </h2>

            {/* Identitas Pasien */}
            <div className="space-y-4 mb-8">
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
                  <label className="block text-sm font-bold text-slate-700 mb-1.5">Gigi</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Hash size={16} className="text-slate-400" />
                    </div>
                    <input 
                      type="text" 
                      value={toothNum}
                      onChange={(e) => setToothNum(e.target.value)}
                      placeholder="Ex: 46" 
                      className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Diagnosis Dropdown */}
            <div className="relative" ref={wrapperRef}>
              <label className="block text-sm font-bold text-slate-700 mb-1.5">Pencarian Kode ICD-10</label>
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
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <ChevronDown size={18} className="text-slate-400" />
                </div>
              </div>

              {/* Autocomplete List */}
              {isDropdownOpen && (
                <div className="absolute z-20 mt-2 w-full bg-white border border-slate-200 rounded-xl shadow-2xl max-h-80 overflow-y-auto py-1">
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

          </div>
        </div>

        {/* PANEL KANAN (Output & Preview) */}
        <div className="flex-grow bg-[#f3f4f6] p-4 md:p-8 flex flex-col overflow-y-auto">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <h2 className="text-xl font-bold text-slate-800">Hasil Rekam Medis (SOAP)</h2>
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
                <><Copy size={18} className="mr-2" /> Salin Teks E-RM</>
              )}
            </button>
          </div>

          <div className="bg-white border border-slate-200 shadow-sm rounded-2xl flex-grow p-6 md:p-10 text-slate-800 font-serif leading-relaxed overflow-y-auto relative">
            {!selectedDisease ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400">
                <FileText size={72} className="mb-4 opacity-30 text-slate-500" />
                <p className="text-lg font-medium text-slate-500">Kertas kerja SOAP masih kosong</p>
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
                        <td className="font-bold py-1 text-slate-500 uppercase tracking-wider text-xs">Usia</td>
                        <td>:</td>
                        <td className="font-semibold text-base">{patientAge || '-'}</td>
                      </tr>
                      <tr>
                        <td className="font-bold py-1 text-slate-500 uppercase tracking-wider text-xs">Elemen Gigi</td>
                        <td>:</td>
                        <td>
                           <span className="inline-flex items-center justify-center bg-blue-100 text-blue-800 px-2 py-0.5 rounded font-bold text-sm">
                             {toothNum || '-'}
                           </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* S - Subjektif */}
                <div>
                  <h3 className="font-bold text-lg text-slate-900 border-l-4 border-blue-500 pl-3 mb-3 bg-slate-50 py-1 rounded-r-lg">[S] SUBJEKTIF (ANAMNESIS)</h3>
                  <p className="pl-4 whitespace-pre-line text-justify text-[15px]">{selectedDisease.anamnesis}</p>
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
                  <p className="pl-4 whitespace-pre-line text-[15px] leading-relaxed">{selectedDisease.tatalaksana}</p>
                </div>

              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
