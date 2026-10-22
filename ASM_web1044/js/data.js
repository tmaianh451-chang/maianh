// Danh sách sản phẩm mẫu theo đúng giao diện MWC
const productsData = [
  // --- SẢN PHẨM BÁN CHẠY ---

  {
    id: 1,
    name: "Giày Sandal Nữ MWC E235 - Sandal Nữ Quai Ngang Chấm Bi Đính Nơ Nhỏ Xinh, Đi Học, Đi Chơi Siêu Dễ Thương.",
    price: 180000,
    category: "banchay",
    image: "../IMG/product/1.jpg",
    rating: 5,
    reviewsCount: 1,
    likesCount: 1,
    colors: [
      {
        name: "Kem",
        hex: "#f5f2e9",
        gallery: ["../IMG/product/1.1.jpg"],
      },
      {
        name: "Đen",
        hex: "#000000",
        gallery: ["../IMG/product/1.2.jpg"],
      },
    ],
    sizes: ["35", "36", "37", "38", "39"],
    gallery: ["../IMG/product/1.1.jpg", "../IMG/product/1.2.jpg", "../IMG/product/1.3.jpg"],
    description: [
      "Sandal dáng quai ngang đính nơ tiểu thư, sandal được làm bằng chất liệu vải canvas tổng hợp xinh xắn, êm nhẹ và có độ bền cao.",
      "Sandal đế bệt hiện đại, thông thoáng, tiện lợi, dễ đi, dễ phối hợp với các trang phục khác nhau từ chân váy, quần tây tới jeans hay short,.. đều rất thời trang. Sandal mang phong cách năng động, trẻ trung giúp các bạn nữ trở nên xinh đẹp và tự tin, tỏa sáng hơn mỗi lần mang đi ra ngoài.",
      "Sandal đơn giản nhưng không kém phần thanh lịch nên rất phù hợp mang đi học, đi làm, dạo phố hay buổi dã ngoại cùng bạn bè,..",
    ],
    specs: {
      "Chiều cao": "Khoảng 1cm",
      "Kiểu dáng": "Sandal đế bệt, sandal thời trang nữ.",
      "Chất liệu": "Vải Canvas tổng hợp",
      Đế: "Êm mềm, xẻ rãnh chống trơn trượt",
      "Màu sắc": "Đen - Kem",
      Size: "35 - 36 - 37 - 38 - 39",
      "Xuất xứ": "Việt Nam",
    },
  },
  {
    id: 2,
    name: "Dép Nữ MWC S156 - Dép Đế Đúc Eva, Charm Hoạt Hình",
    price: 195000,
    image: "../IMG/product/2.jpg",
    category: "banchay",
    colors: ["#f5f2e9", "#ffc0cb", "#87ceeb"],
  },

  {
    id: 23,
    name: "Dép Nữ MWC S156 - Dép Đế Đúc Eva, Charm Hoạt Hình",
    price: 195000,
    image: "../IMG/product/23.jpg",
    category: "banchay",
    colors: ["#f5f2e9", "#000000"],
  },
  {
    id: 24,
    name: "Dép Nữ MWC S156 - Dép Đế Đúc Eva, Charm Hoạt Hình",
    price: 195000,
    image: "../IMG/product/24.jpg",
    category: "banchay",
    colors: ["#f5f2e9", "#000000"],
  },
  {
    id: 25,
    name: "Dép Nữ MWC 2358 - Búp Bê Mary Jane Quai Ngang Đính Nơ Chấm Bi",
    price: 195000,
    image: "../IMG/product/25.jpg",
    category: "banchay",
    colors: ["#f5f2e9", "#ffc0cb", "#87ceeb"],
  },
  {
    id: 26,
    name: "Giày Sandal Nữ MWC E234 - Sandal Nữ Quai Kẹp",
    price: 150000,
    image: "../IMG/product/26.jpg",
    category: "banchay",
    colors: ["#f5f2e9", "#000000"],
  },

  {
    id: 27,
    name: "Giày Sandal Nữ MWC E230 - Sandal Xỏ Ngón",
    price: 250000,
    image: "../IMG/product/27.jpg",
    category: "banchay",
    colors: ["#f5f2e9", "#000000", "#8b4513"],
  },
  {
    id: 28,
    name: "Balô Túi Đeo Chéo MWC 0870 - Túi Đeo Chéo Nam Nữ Da PU",
    price: 195000,
    image: "../IMG/product/28.jpg",
    category: "banchay",
    colors: ["#060606ff"],
  },

  // --- GIÀY CAO GÓT NỮ ---
  {
    id: 3,
    name: "Giày Cao Gót MWC G279 - Giày Búp Bê 4cm, Mũi Vuông",
    price: 345000,
    image: "../IMG/product/3.jpg",
    category: "caogot",
    colors: ["#f5f2e9", "#000000", "#8b4513"],
  },
  {
    id: 4,
    name: "Giày Cao Gót MWC G405 - Quốc Đế Xuồng Hiện Đại 6cm",
    price: 235000,
    image: "../IMG/product/4.jpg",
    category: "caogot",
    colors: ["#f5f2e9", "#000000", "#8b4513"],
  },
  {
    id: 5,
    name: "Giày Cao Gót MWC G414 - Giày Sục Cao Gót 7cm",
    price: 315000,
    image: "../IMG/product/5.jpg",
    category: "caogot",
    colors: ["#000000", "#f5f2e9"],
  },
  {
    id: 6,
    name: "Giày Cao Gót MWC G415 - Sandal Mũi Vuông Thanh Lịch",
    price: 235000,
    image: "../IMG/product/6.jpg",
    category: "caogot",
    colors: ["#000000", "#8b4513"],
  },
  {
    id: 29,
    name: "Giày Cao Gót MWC G169 - Sandal Gót Vuông",
    price: 180000,
    image: "../IMG/product/29.jpg",
    category: "caogot",
    colors: ["#f5f2e9", "#000000", "#8b4513"],
  },
  {
    id: 30,
    name: "Giày Cao Gót MWC G289 - Giày Gót Vuông 9P",
    price: 335000,
    image: "../IMG/product/30.jpg",
    category: "caogot",
    colors: ["#f5f2e9", "#000000", "#8b4513"],
  },
  {
    id: 31,
    name: "Giày Cao Gót MWC G021 - Sandal Gót Vuông 7cm",
    price: 235000,
    image: "../IMG/product/31.jpg",
    category: "caogot",
    colors: ["#f5f2e9", "#000000", "#8b4513"],
  },
  {
    id: 32,
    name: "Giày Cao Gót MWC G331 - Giày Gót Trụ 10cm, Mũi Vuông",
    price: 295000,
    image: "../IMG/product/32.jpg",
    category: "caogot",
    colors: ["#f5f2e9", "#000000", "#8b4513"],
  },

  // --- BALO THỜI TRANG ---
  {
    id: 7,
    name: "BALO MWC 1282 - Balo Vintage Cho Học Sinh, Sinh Viên",
    price: 195000,
    image: "../IMG/product/7.jpg",
    category: "balo",
    colors: ["#f5f2e9", "#808080", "#000000"],
  },
  {
    id: 8,
    name: "BALO MWC 1294 - Balo Da Mini Girl Phố Đi Học, Đi Làm",
    price: 180000,
    image: "../IMG/product/8.jpg",
    category: "balo",
    colors: ["#000000", "#8b4513"],
  },
  {
    id: 9,
    name: "Balo Túi Đeo Chéo MWC 0853 - Túi Xách Du Lịch, Đeo Chéo",
    price: 235000,
    image: "../IMG/product/9.jpg",
    category: "balo",
    colors: ["#1a2530", "#000000"],
  },
  {
    id: 10,
    name: "BALO MWC 1316 - Balo Da PU Caro Mềm Mịn, Phong Cách",
    price: 250000,
    image: "../IMG/product/10.jpg",
    category: "balo",
    colors: ["#000000", "#ffc0cb", "#f5f2e9"],
  },
  {
    id: 33,
    name: "BALO MWC 1332 - Balo Xanh Wash Thời Trang",
    price: 295000,
    image: "../IMG/product/33.jpg",
    category: "balo",
    colors: ["#f5f2e9", "#808080", "#0e99eaff"],
  },
  {
    id: 34,
    name: "BALO MWC 1334 - Balo Da Caro",
    price: 295000,
    image: "../IMG/product/34.jpg",
    category: "balo",
    colors: ["#f5f2e9", "#000000"],
  },
  {
    id: 35,
    name: "BALO MWC 1292 - Balo Da Mini",
    price: 180000,
    image: "../IMG/product/35.jpg",
    category: "balo",
    colors: ["#aa704aff", "#000000"],
  },
  {
    id: 36,
    name: "BALO MWC 1283 - Balo Unisex",
    price: 180000,
    image: "../IMG/product/36.jpg",
    category: "balo",
    colors: ["#f5f2e9", "#808080", "#000000"],
  },
  // --- DÉP CHARM ---
  {
    id: 11,
    name: "Dép Nữ MWC S158 - Dép Eva Nguyên Khối, Charm Hoạt Hình",
    price: 215000,
    image: "../IMG/product/11.jpg",
    category: "charm",
    colors: ["#f5f2e9", "#000000"],
  },
  {
    id: 12,
    name: "Dép Nữ MWC S155 - Dép Đế Đúc Eva, Charm Hoạt Hình",
    price: 235000,
    image: "../IMG/product/12.jpg",
    category: "charm",
    colors: ["#8b4513", "#000000", "#f5f2e9"],
  },
  {
    id: 13,
    name: "Dép Nữ MWC S159 - Dép Đế Đúc Eva Nữ Charm Hoạt Hình",
    price: 150000,
    image: "../IMG/product/13.jpg",
    category: "charm",
    colors: ["#f5f2e9", "#000000"],
  },
  {
    id: 14,
    name: "Dép Nữ MWC S160 - Dép Eva Quai Hậu Kem Sữa Chạy Bộ",
    price: 99000,
    image: "../IMG/product/14.jpg",
    category: "charm",
    colors: ["#f5f2e9", "#000000"],
  },
  {
    id: 37,
    name: "Giày Sandal Nữ MWC E211 - Sandal Nữ Hai Quai Ngang",
    price: 215000,
    image: "../IMG/product/37.jpg",
    category: "charm",
    colors: ["#9e5d32ff"],
  },
  {
    id: 38,
    name: "Dép Nữ MWC 8922 - Dép Eva Đúc Nguyên Khối",
    price: 195000,
    image: "../IMG/product/38.jpg",
    category: "charm",
    colors: ["#ead7a1ff"],
  },
  {
    id: 39,
    name: "Dép Nữ MWC 8688 - Dép Sandal Nữ Đế Eva Đúc Nguyên Khối Gắn Charm Mèo Nơ",
    price: 195000,
    image: "../IMG/product/39.jpg",
    category: "charm",
    colors: ["#dbcea6ff"],
  },
  {
    id: 40,
    name: "Dép Nữ MWC 8830 - Dép Eva Charm Nơ Phối Ánh Bạc Lấp Lánh",
    price: 180000,
    image: "../IMG/product/40.jpg",
    category: "charm",
    colors: ["#dbcea6ff"],
  },

  // --- DÉP VAF SANDAL NUWX  ---
  {
    id: 15,
    name: "Giày Sandal Nữ MWC E211 - Sandal Nữ Hai Quai Ngang",
    price: 195000,
    image: "../IMG/product/15.jpg",
    category: "sandal-nu",
    colors: ["#f5f2e9", "#ffc0cb", "#87ceeb"],
  },
  {
    id: 16,
    name: "Dép Nữ MWC 8753 - Dép Nữ Quai Ngang Bản To Hoạ Tiết",
    price: 195000,
    image: "../IMG/product/16.jpg",
    category: "sandal-nu",
    colors: ["#f5f2e9", "#ffc0cb", "#87ceeb"],
  },
  {
    id: 17,
    name: "Giày Sandal Nữ MWC E237 - Sandal Quai Mảnh Xỏ Ngón",
    price: 195000,
    image: "../IMG/product/17.jpg",
    category: "sandal-nu",
    colors: ["#f5f2e9"],
  },
  {
    id: 18,
    name: "Dép Nữ MWC 8929 - Dép Quai Bị Kẹp Thanh Lịch Hè",
    price: 195000,
    image: "../IMG/product/18.jpg",
    category: "sandal-nu",
    colors: ["#f5f2e9"],
  },
  {
    id: 41,
    name: "Dép Nữ MWC 8868 - Dép Nữ Quai Đôi Bản Lớn ",
    price: 180000,
    image: "../IMG/product/41.jpg",
    category: "sandal-nu",
    colors: ["#f5f2e9"],
  },
  {
    id: 42,
    name: "Dép Nữ MWC 8926 - Dép Quai Nơ Mềm Mại",
    price: 125000,
    image: "../IMG/product/42.jpg",
    category: "sandal-nu",
    colors: ["#8b4513", "#000000", "#f5f2e9"],
  },
  {
    id: 43,
    name: "Dép Nữ MWC 8333 - Dép Nữ Quai Ngang Nhún ",
    price: 235000,
    image: "../IMG/product/43.jpg",
    category: "sandal-nu",
    colors: ["#f5f2e9", "#000000"],
  },
  {
    id: 44,
    name: "Dép Nữ MWC 8488 - Dép Nữ Đế Bệt Mũi Vuông Quai Đính Đá",
    price: 150000,
    image: "../IMG/product/44.jpg",
    category: "sandal-nu",
    colors: ["#8b4513", "#000000", "#c4c1b8ff"],
  },
  // --- SANDAL VÀ DÉP NAM ---
  {
    id: 19,
    name: "Giày Sandal Nam MWC 7081 - Sandal Nam Quai Ngang",
    price: 295000,
    image: "../IMG/product/19.jpg",
    category: "sandal-nam",
    colors: ["#000000", "#808080"],
  },
  {
    id: 20,
    name: "Giày Sandal Nam MWC 7082 - Sandal Nam Quai Ngang Thể Thao",
    price: 295000,
    image: "../IMG/product/20.jpg",
    category: "sandal-nam",
    colors: ["#000000", "#808080"],
  },
  {
    id: 21,
    name: "Dép Nam MWC 7998 - Dép Nam Da PU Hai Quai Chéo",
    price: 295000,
    image: "../IMG/product/21.jpg",
    category: "sandal-nam",
    colors: ["#000000", "#f5f2e9"],
  },
  {
    id: 22,
    name: "Dép Nam MWC 9254 - Dép Nam Quai Da Ngang Bản To",
    price: 235000,
    image: "../IMG/product/22.jpg",
    category: "sandal-nam",
    colors: ["#000000", "#8b4513"],
  },
  {
    id: 45,
    name: "Dép Nam MWC 9279 - Dép Nam Quai Ngang Bản To",
    price: 275000,
    image: "../IMG/product/45.jpg",
    category: "sandal-nam",
    colors: ["#000000", "#808080"],
  },
  {
    id: 46,
    name: "Dép Nam MWC 9275 - Dép Nam Quai Ngang Bản To",
    price: 275000,
    image: "../IMG/product/46.jpg",
    category: "sandal-nam",
    colors: ["#000000", "#f5f2e9"],
  },
  {
    id: 47,
    name: "Dép Nam MWC 9210 - Dép Sục Nam Quai Liền Khối Bản Rộng",
    price: 345000,
    image: "../IMG/product/47.jpg",
    category: "sandal-nam",
    colors: ["#8b4513"],
  },
  {
    id: 48,
    name: "Dép Nam MWC 9260 - Dép Nam Quai Da Ngang Bản To",
    price: 235000,
    image: "../IMG/product/48.jpg",
    category: "sandal-nam",
    colors: ["#000000", "#8b4513"],
  },
];

// Danh sách các bài viết Blog
const blogPostsData = [
  { title: "Giày Búp Bê MWC – Thanh Lịch, Dễ Thương Và Dễ Phối Đồ", link: "#" },
  { title: "Sandal nữ MWC – Lựa chọn hoàn hảo cho mọi chuyến đi", link: "#" },
  { title: "Giày cao gót MWC – Tôn dáng, thanh lịch và dễ mang mỗi ngày", link: "#" },
  {
    title: "Top mẫu giày thể thao MWC cho mùa tựu trường 2026 – Êm chân, thời trang và dễ phối đồ",
    link: "#",
  },
];
// ================================
// CHUẨN HÓA DỮ LIỆU SẢN PHẨM
// ================================

// Tạo mã riêng cho từng sản phẩm.
// Không dùng trực tiếp id cũ vì data.js đang có id bị trùng.
productsData.forEach((product, index) => {
  product.productKey = `product-${index + 1}`;

  // Chuẩn hóa màu sắc
  if (!product.colors) {
    product.colors = [];
  }

  product.colors = product.colors.map((color) => {
    // Nếu màu đã là object:
    // { name: "Kem", hex: "#f5f2e9" }
    if (typeof color === "object") {
      return color;
    }

    // Nếu màu chỉ là mã hex:
    // "#f5f2e9"
    return {
      name: color,
      hex: color,
    };
  });

  // Nếu sản phẩm chưa có size
  if (!product.sizes || product.sizes.length === 0) {
    product.sizes = ["35", "36", "37", "38", "39"];
  }

  // Nếu chưa có gallery thì dùng ảnh chính
  if (!product.gallery || product.gallery.length === 0) {
    product.gallery = [product.image];
  }

  // Nếu chưa có đánh giá
  if (product.rating === undefined) {
    product.rating = 5;
  }

  if (product.reviewsCount === undefined) {
    product.reviewsCount = 1;
  }

  if (product.likesCount === undefined) {
    product.likesCount = 1;
  }

  // Nếu chưa có mô tả
  if (!product.description) {
    product.description = [
      `Sản phẩm ${product.name}.`,
      "Sản phẩm được thiết kế với kiểu dáng thời trang, phù hợp sử dụng hằng ngày.",
    ];
  }

  // Nếu chưa có thông số
  if (!product.specs) {
    product.specs = {
      "Màu sắc": product.colors.map((color) => color.name).join(" - "),
      Size: product.sizes.join(" - "),
      "Xuất xứ": "Việt Nam",
    };
  }
});
