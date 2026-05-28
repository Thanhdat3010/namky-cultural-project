/**
 * build-data.js
 * Pre-processes tu_dien_nam_bo.jsonl → public/data/dictionary.json + stats.json
 * 
 * Enhanced Keyword Classifier: primarily analyzes the 'nghia' (meaning) field,
 * supplemented by 'tu' and 'vi_du' fields.
 */

const fs = require('fs');
const path = require('path');

// ──────────────────────────────────────────────
// CATEGORY DEFINITIONS with weighted keywords
// Each keyword has a weight (higher = more confident match)
// ──────────────────────────────────────────────
const CATEGORIES = {
  'Ẩm thực': {
    keywords: [
      // Foods
      'cơm', 'cháo', 'bún', 'phở', 'mì', 'hủ tiếu', 'bánh', 'xôi', 'chè',
      'canh', 'kho', 'chiên', 'xào', 'nướng', 'luộc', 'hấp', 'nấu', 'rim',
      'mắm', 'nước mắm', 'muối', 'tiêu', 'ớt', 'hành', 'tỏi', 'đường', 'bột',
      'gạo', 'nếp', 'tấm',
      // Proteins
      'thịt', 'cá', 'tôm', 'cua', 'mực', 'ốc', 'hến', 'nghêu', 'sò', 'ghẹ',
      'gà', 'vịt', 'heo', 'bò', 'trứng', 'lươn', 'ếch', 'rắn',
      // Vegetables & fruits
      'rau', 'dưa', 'bầu', 'bí', 'mướp', 'khổ qua', 'đậu', 'khoai',
      'trái cây', 'xoài', 'mít', 'dừa', 'chuối', 'ổi', 'cam', 'bưởi', 'chôm chôm',
      'sầu riêng', 'măng cụt', 'nhãn', 'vú sữa', 'sapô', 'mãng cầu',
      // Drinks
      'rượu', 'bia', 'nước', 'trà', 'cà phê', 'nhậu', 'uống', 'xị',
      // Eating actions
      'ăn', 'nuốt', 'nhai', 'húp', 'chan', 'chấm', 'gắp',
      // Cooking utensils
      'nồi', 'chảo', 'soong', 'ơ', 'chén', 'dĩa', 'đũa', 'muỗng',
      'bếp', 'lò', 'cối xay',
    ],
    weight: 1,
  },
  'Giao thông & Phương tiện': {
    keywords: [
      'ghe', 'xuồng', 'tàu', 'đò', 'phà', 'tam bản', 'tam bản',
      'xe', 'honda', 'mô tô', 'xích lô', 'ba gác', 'xe đạp', 'xe hơi', 'xe lửa',
      'xe lam', 'xe ôm', 'xe buýt', 'xe đò',
      'cầu', 'đường', 'bến', 'bến xe', 'bến phà', 'bến đò',
      'chèo', 'lái', 'bơi', 'chạy', 'đi',
      'bánh lái', 'mái chèo', 'sào', 'tay lái',
      'sông', 'rạch', 'kinh', 'kênh', 'vàm',
    ],
    weight: 1,
  },
  'Gia đình & Xã hội': {
    keywords: [
      // Family
      'cha', 'mẹ', 'ba', 'má', 'tía', 'bầm', 'vợ', 'chồng', 'con', 'cháu',
      'ông', 'bà', 'cô', 'cậu', 'dì', 'chú', 'bác', 'dượng', 'mợ', 'thím',
      'anh', 'chị', 'em', 'rể', 'dâu', 'sui gia', 'cột chèo',
      // Social
      'cưới', 'hỏi', 'giỗ', 'đám', 'ma', 'tang', 'tiệc', 'lễ',
      'hàng xóm', 'láng giềng', 'bạn bè', 'bạn hữu',
      'họ hàng', 'bà con', 'thân quyến', 'ruột thịt',
      // Social roles
      'ông trưởng', 'thầy', 'cô giáo', 'linh mục', 'sư', 'hòa thượng',
      'xã trưởng', 'hương chức', 'hội đồng',
    ],
    weight: 1,
  },
  'Thiên nhiên & Động vật': {
    keywords: [
      // Nature
      'đồng', 'ruộng', 'vườn', 'rẫy', 'rừng', 'biển', 'núi',
      'đất', 'phù sa', 'bùn', 'sình', 'lầy',
      'mưa', 'gió', 'nắng', 'trời', 'sấm', 'sét', 'bão', 'lụt', 'nước lớn', 'nước ròng',
      'con nước', 'thủy triều',
      'hoa', 'lá', 'cây', 'cỏ', 'trái', 'quả', 'gốc', 'rễ', 'cành', 'nhánh',
      'tràm', 'đước', 'dừa nước', 'bần', 'mắm', 'sen',
      // Animals
      'con cá', 'con chim', 'con gà', 'con vịt', 'con heo', 'con trâu', 'con bò',
      'con rắn', 'con chuột', 'con kiến', 'con muỗi', 'con ong',
      'chim', 'cò', 'vạc', 'sáo', 'cu', 'quạ',
      'cá lóc', 'cá trê', 'cá rô', 'cá sặc', 'cá bống',
      'rùa', 'cua', 'ếch', 'nhái',
    ],
    weight: 1,
  },
  'Trang phục & Dáng vẻ': {
    keywords: [
      'áo', 'quần', 'nón', 'khăn', 'vải', 'lụa', 'gấm',
      'áo bà ba', 'áo dài', 'áo gió', 'áo khỉ', 'áo lá', 'áo túi',
      'giày', 'dép', 'guốc',
      'may', 'thêu', 'vá', 'mặc', 'cởi', 'mang', 'đội',
      'đẹp', 'xấu', 'xinh', 'duyên dáng', 'bảnh', 'chải chuốt',
      'tóc', 'mắt', 'mũi', 'miệng', 'mặt', 'da', 'ốm', 'mập', 'gầy',
      'cao', 'thấp', 'lùn', 'dong dỏng',
    ],
    weight: 1,
  },
  'Nghề nghiệp & Lao động': {
    keywords: [
      'nghề', 'thợ', 'thầy', 'buôn', 'bán', 'mua',
      'ruộng', 'vườn', 'rẫy', 'gặt', 'cấy', 'trồng', 'nuôi', 'chăn',
      'đáy', 'chài', 'lưới', 'câu', 'đánh cá', 'giăng lưới',
      'rèn', 'đúc', 'mộc', 'hồ', 'nề',
      'làm mướn', 'làm thuê', 'ở đợ', 'cày', 'bừa', 'cuốc',
      'tiền', 'bạc', 'lương', 'công', 'vốn', 'lời', 'lỗ',
      'chợ', 'hàng', 'sạp', 'quầy',
      'làm ăn', 'kiếm sống', 'mưu sinh',
    ],
    weight: 1,
  },
  'Ngôn ngữ & Biểu cảm': {
    keywords: [
      'nói', 'kêu', 'la', 'hét', 'rủa', 'mắng', 'chửi', 'than',
      'hỏi', 'trả lời', 'đáp', 'bàn', 'tán',
      'cười', 'khóc', 'mếu', 'rên', 'rỉ',
      'hát', 'ca', 'hò', 'vọng cổ', 'đờn', 'đàn',
      'vui', 'buồn', 'giận', 'sợ', 'lo', 'mừng', 'tức', 'bực',
      'ngạc nhiên', 'kinh ngạc', 'hoảng',
      'biểu thị', 'biểu cảm', 'cảm thán', 'thán từ',
      'thương', 'ghét', 'yêu', 'nhớ', 'thèm',
      'sắc thái', 'phát ngôn', 'lời nói',
    ],
    weight: 1,
  },
};

// ──────────────────────────────────────────────
// FRENCH LOANWORD PATTERNS (for era detection)
// ──────────────────────────────────────────────
const FRENCH_INDICATORS = [
  // Known French-origin etymological markers in vi_du or nghia
  'adjudant', 'allez', 'amoxycillin', 'ampicillin', 'savon',
  'blouson', 'cravate', 'pardessus', 'gilet',
  'pháp', 'quân đội pháp', 'thời pháp', 'thực dân',
  'snack', 'bar', 'café', 'beurre', 'fromage',
  'xà bông', 'xì gà', 'ga ra', 'ô tô', 'taxi',
  'a lê', 'bù loong', 'xi măng', 'bê tông',
];

// ──────────────────────────────────────────────
// CLASSIFIER FUNCTION
// Analyzes primarily 'nghia', supplemented by 'tu' and 'vi_du'
// ──────────────────────────────────────────────
function classifyEntry(entry) {
  const nghia = (entry.nghia || '').toLowerCase();
  const tu = (entry.tu || '').toLowerCase();
  const viDu = (entry.vi_du || []).join(' ').toLowerCase();

  // Combined text with weights: nghia is 3x, tu is 2x, vi_du is 1x
  const scores = {};

  for (const [category, config] of Object.entries(CATEGORIES)) {
    let score = 0;

    for (const keyword of config.keywords) {
      const kw = keyword.toLowerCase();

      // Check nghia (highest priority — weight 3)
      if (nghia.includes(kw)) {
        score += 3;
      }
      // Check tu (weight 2)
      if (tu.includes(kw)) {
        score += 2;
      }
      // Check vi_du (weight 1)
      if (viDu.includes(kw)) {
        score += 1;
      }
    }

    if (score > 0) {
      scores[category] = score;
    }
  }

  // Pick the category with highest score
  let bestCategory = 'Tổng hợp';
  let bestScore = 0;

  for (const [cat, sc] of Object.entries(scores)) {
    if (sc > bestScore) {
      bestScore = sc;
      bestCategory = cat;
    }
  }

  // Require minimum score threshold to avoid weak matches
  if (bestScore < 2) {
    bestCategory = 'Tổng hợp';
  }

  return bestCategory;
}

// ──────────────────────────────────────────────
// ERA DETECTION (only for entries with clear evidence)
// ──────────────────────────────────────────────
function detectEra(entry) {
  const nghia = (entry.nghia || '').toLowerCase();
  const viDu = (entry.vi_du || []).join(' ').toLowerCase();
  const combined = nghia + ' ' + viDu;

  // Check for French loanword indicators
  for (const indicator of FRENCH_INDICATORS) {
    if (combined.includes(indicator.toLowerCase())) {
      return 'Pháp thuộc (1858–1945)';
    }
  }

  return null; // No era assigned
}

// ──────────────────────────────────────────────
// POS (Part of Speech) normalizer
// ──────────────────────────────────────────────
const POS_MAP = {
  'danh tu': 'Danh từ',
  'vi tu': 'Vị từ',
  'quan ngu': 'Quán ngữ',
  'dai tu': 'Đại từ',
  'cam tu': 'Cảm từ',
  'phu tu': 'Phụ từ',
  'vi ngu': 'Vị ngữ',
  'danh ngu': 'Danh ngữ',
  'lien tu': 'Liên từ',
  'tro tu': 'Trợ từ',
  'gioi tu': 'Giới từ',
};

function normalizePos(posArray) {
  if (!posArray || posArray.length === 0) return ['Khác'];
  return posArray.map(p => POS_MAP[p] || p);
}

// ──────────────────────────────────────────────
// MAIN PROCESSING
// ──────────────────────────────────────────────
function main() {
  const inputPath = path.join(__dirname, '..', 'tu_dien_nam_bo.jsonl');
  const outputDir = path.join(__dirname, '..', 'public', 'data');
  const outputPath = path.join(outputDir, 'dictionary.json');
  const statsPath = path.join(outputDir, 'stats.json');

  // Ensure output directory exists
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  console.log('📖 Reading JSONL file...');
  const raw = fs.readFileSync(inputPath, 'utf-8');
  const lines = raw.split('\n').filter(line => line.trim());

  console.log(`📊 Processing ${lines.length} entries...`);

  const entries = [];
  const categoryCount = {};
  const eraCount = {};
  const posCount = {};
  let withModernEquivalent = 0;
  let withExamples = 0;
  let errCount = 0;

  for (let i = 0; i < lines.length; i++) {
    try {
      const entry = JSON.parse(lines[i]);

      // Classify
      const danh_muc = classifyEntry(entry);
      const giai_doan = detectEra(entry);
      const pos_normalized = normalizePos(entry.pos);
      const has_modern = !!(entry.tu_hien_nay && entry.tu_hien_nay.trim());
      const has_examples = !!(entry.vi_du && entry.vi_du.length > 0);

      if (has_modern) withModernEquivalent++;
      if (has_examples) withExamples++;

      // Build enriched entry
      const enriched = {
        id: i,
        tu: entry.tu || '',
        tu_hien_nay: entry.tu_hien_nay || '',
        nghia: entry.nghia || '',
        pos: pos_normalized,
        vi_du: entry.vi_du || [],
        danh_muc,
        giai_doan,
        has_modern,
        // First letter for alphabetical index
        chu_cai: (entry.tu || '').charAt(0).toUpperCase(),
      };

      entries.push(enriched);

      // Stats
      categoryCount[danh_muc] = (categoryCount[danh_muc] || 0) + 1;
      if (giai_doan) {
        eraCount[giai_doan] = (eraCount[giai_doan] || 0) + 1;
      }
      for (const p of pos_normalized) {
        posCount[p] = (posCount[p] || 0) + 1;
      }
    } catch (e) {
      errCount++;
    }
  }

  // Sort entries alphabetically by 'tu'
  entries.sort((a, b) => a.tu.localeCompare(b.tu, 'vi'));

  // Re-assign IDs after sorting
  entries.forEach((e, idx) => { e.id = idx; });

  // Build letter index
  const letterIndex = {};
  entries.forEach((e, idx) => {
    const letter = e.chu_cai;
    if (!letterIndex[letter]) {
      letterIndex[letter] = idx;
    }
  });

  // Write dictionary.json
  console.log('💾 Writing dictionary.json...');
  fs.writeFileSync(outputPath, JSON.stringify(entries, null, 0), 'utf-8');

  // Write stats.json
  const stats = {
    total_entries: entries.length,
    with_modern_equivalent: withModernEquivalent,
    with_examples: withExamples,
    parse_errors: errCount,
    categories: categoryCount,
    eras: eraCount,
    parts_of_speech: posCount,
    letter_index: letterIndex,
  };

  console.log('📈 Writing stats.json...');
  fs.writeFileSync(statsPath, JSON.stringify(stats, null, 2), 'utf-8');

  // Report
  console.log('\n✅ Done!');
  console.log(`   Total entries: ${entries.length}`);
  console.log(`   With modern equivalent: ${withModernEquivalent}`);
  console.log(`   With examples: ${withExamples}`);
  console.log(`   Parse errors: ${errCount}`);
  console.log('\n📂 Categories:');
  for (const [cat, count] of Object.entries(categoryCount).sort((a, b) => b[1] - a[1])) {
    console.log(`   ${cat}: ${count}`);
  }
  console.log('\n🕐 Eras (verified only):');
  for (const [era, count] of Object.entries(eraCount).sort((a, b) => b[1] - a[1])) {
    console.log(`   ${era}: ${count}`);
  }
  console.log(`\n📁 Output: ${outputPath}`);
  console.log(`📁 Output: ${statsPath}`);
}

main();
