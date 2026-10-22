// =====================================================
// 1. ĐỊNH DẠNG TIỀN
// =====================================================

const formatCurrency = (amount) => {
  if (amount === undefined || amount === null) {
    return "0đ";
  }

  return Number(amount).toLocaleString("vi-VN") + "đ";
};

// =====================================================
// 2. HIỂN THỊ MÀU SẢN PHẨM
// =====================================================

const renderColorDots = (colors) => {
  if (!Array.isArray(colors) || colors.length === 0) {
    return "";
  }

  return colors
    .map((color) => {
      const colorHex = typeof color === "object" ? color.hex : color;

      if (!colorHex) return "";

      return `
        <span
          class="color-dot"
          style="background-color: ${colorHex};"
          title="${typeof color === "object" ? color.name || color.hex : color}"
        ></span>
      `;
    })
    .join("");
};

// =====================================================
// 3. TẠO CARD SẢN PHẨM
// =====================================================

const createProductCard = (product) => {
  const priceFormatted = formatCurrency(product.price);
  const colorsHTML = renderColorDots(product.colors);
  const imageSrc = product.image || "";
  const productName = product.name || "Sản phẩm";

  return `
    <div class="product-card">
      <a href="detail.html?id=${product.id}" class="product-img">
        <img src="${imageSrc}" alt="${productName}">
      </a>

      <h3 class="product-title">
        <a href="detail.html?id=${product.id}">${productName}</a>
      </h3>

      <p class="product-price">${priceFormatted}</p>

      <div class="color-swatches">
        ${colorsHTML}
      </div>
    </div>
  `;
};

// =====================================================
// 4. THÊM SẢN PHẨM VÀO GIỎ HÀNG
// =====================================================

window.addToCart = (productId) => {
  if (typeof productsData === "undefined" || !Array.isArray(productsData)) {
    return;
  }

  const product = productsData.find((item) => String(item.id) === String(productId));

  if (!product) return;

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const existingIndex = cart.findIndex((item) => String(item.id) === String(productId));

  if (existingIndex > -1) {
    cart[existingIndex].quantity += 1;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));

  const cartBadge = document.getElementById("cart-count");

  if (cartBadge) {
    cartBadge.textContent = cart.reduce((sum, item) => sum + Number(item.quantity || 0), 0);
  }

  alert(`Đã thêm "${product.name}" vào giỏ hàng!`);
};

// =====================================================
// 5. BIẾN QUẢN LÝ SẢN PHẨM
// =====================================================

let categoryProducts = [];
let baseProducts = [];
let currentPage = 1;

const itemsPerPage = 12;

// Các điều kiện ban đầu lấy từ URL
let initialCategory = "";
let initialSearchKeyword = "";

// =====================================================
// 6. TÊN DANH MỤC
// =====================================================

const categoryTitles = {
  banchay: "SẢN PHẨM BÁN CHẠY",
  caogot: "GIÀY CAO GÓT NỮ",
  balo: "BALO THỜI TRANG",
  "sandal-nu": "DÉP VÀ SANDAL NỮ",
  charm: "DÉP CHARM",
  "sandal-nam": "SANDAL VÀ DÉP NAM",
};

// =====================================================
// 7. CHUẨN HÓA CHỮ
// =====================================================

const normalizeText = (text) => {
  return String(text ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toLowerCase()
    .trim();
};

// =====================================================
// 8. CHUẨN HÓA MÃ MÀU
// =====================================================

const normalizeColor = (color) => {
  let hex = typeof color === "object" ? color?.hex : color;

  if (!hex) return "";

  hex = String(hex).trim().toLowerCase();

  // Chuẩn hóa mã màu dạng #rrggbbaa về #rrggbb
  if (/^#[0-9a-f]{8}$/i.test(hex)) {
    hex = hex.substring(0, 7);
  }

  return hex;
};

// =====================================================
// 9. TÊN MÀU HIỂN THỊ TRÊN BỘ LỌC
// =====================================================

const getColorName = (color) => {
  const hex = normalizeColor(color);

  const colorNames = {
    "#000000": "Đen",
    "#060606": "Đen",
    "#f5f2e9": "Kem",
    "#ffc0cb": "Hồng",
    "#87ceeb": "Xanh da trời",
    "#8b4513": "Nâu",
    "#808080": "Xám",
    "#1a2530": "Xanh đen",
    "#0e99ea": "Xanh dương",
    "#aa704a": "Nâu bò",
    "#9e5d32": "Nâu",
    "#ead7a1": "Vàng kem",
    "#dbcea6": "Be",
    "#c4c1b8": "Xám nhạt",
  };

  if (color && typeof color === "object" && color.name) {
    return color.name;
  }

  return colorNames[hex] || hex;
};

// =====================================================
// 10. KHỞI TẠO TRANG
// =====================================================

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("products-list-container");

  if (typeof productsData === "undefined" || !Array.isArray(productsData)) {
    console.error("Không tìm thấy productsData trong data.js!");

    if (container) {
      container.innerHTML = `
        <p style="grid-column:1/-1;text-align:center;color:red;padding:40px">
          Không thể tải dữ liệu sản phẩm. Vui lòng kiểm tra lại file data.js!
        </p>
      `;
    }

    return;
  }

  const urlParams = new URLSearchParams(window.location.search);

  initialCategory = urlParams.get("category") || "";
  initialSearchKeyword = normalizeText(urlParams.get("search") || "");

  // -----------------------------------------------------
  // Tiêu đề trang
  // -----------------------------------------------------

  const titleEl = document.getElementById("page-title");

  if (titleEl) {
    if (initialSearchKeyword) {
      titleEl.textContent = `KẾT QUẢ TÌM KIẾM: ${(urlParams.get("search") || "").trim().toUpperCase()}`;
    } else {
      titleEl.textContent = categoryTitles[initialCategory] || "TẤT CẢ SẢN PHẨM";
    }
  }

  // -----------------------------------------------------
  // Lấy danh sách sản phẩm ban đầu
  // -----------------------------------------------------

  if (initialSearchKeyword) {
    baseProducts = productsData.filter((product) => {
      const productName = normalizeText(product.name);
      const productCategory = normalizeText(product.category);

      return (
        productName.includes(initialSearchKeyword) || productCategory.includes(initialSearchKeyword)
      );
    });

    // Giữ hành vi tìm kiếm hiện tại: tối đa 4 sản phẩm
    baseProducts = baseProducts.slice(0, 4);
  } else {
    // Để bộ lọc danh mục có thể chuyển giữa các danh mục
    baseProducts = [...productsData];
  }

  // -----------------------------------------------------
  // Khởi tạo các bộ lọc
  // -----------------------------------------------------

  const categorySelect = document.getElementById("filter-category");
  const priceSelect = document.getElementById("filter-price");
  const colorSelect = document.getElementById("filter-color");
  const sortSelect = document.getElementById("sort-select");
  const resetButton = document.getElementById("btn-reset-filter");

  // Danh mục mặc định theo URL
  if (categorySelect) {
    categorySelect.value = initialCategory;
  }

  // Tự động tạo danh sách màu từ data.js
  if (colorSelect) {
    const existingAllOption = Array.from(colorSelect.options).find((option) => option.value === "");

    colorSelect.innerHTML = "";

    const allOption = document.createElement("option");
    allOption.value = "";
    allOption.textContent = existingAllOption?.textContent || "Tất cả màu sắc";
    colorSelect.appendChild(allOption);

    const uniqueColors = new Map();

    productsData.forEach((product) => {
      (product.colors || []).forEach((color) => {
        const hex = normalizeColor(color);

        if (hex && !uniqueColors.has(hex)) {
          uniqueColors.set(hex, getColorName(color));
        }
      });
    });

    uniqueColors.forEach((name, hex) => {
      const option = document.createElement("option");
      option.value = hex;
      option.textContent = name;
      colorSelect.appendChild(option);
    });
  }

  // -----------------------------------------------------
  // Sự kiện lọc
  // -----------------------------------------------------

  [categorySelect, priceSelect, colorSelect].forEach((select) => {
    if (select) {
      select.addEventListener("change", () => {
        applyFilters();
      });
    }
  });

  // -----------------------------------------------------
  // Sự kiện sắp xếp
  // -----------------------------------------------------

  if (sortSelect) {
    sortSelect.addEventListener("change", () => {
      applyFilters();
    });
  }

  // -----------------------------------------------------
  // Sự kiện đặt lại bộ lọc
  // -----------------------------------------------------

  if (resetButton) {
    resetButton.addEventListener("click", () => {
      if (categorySelect) {
        categorySelect.value = initialCategory;
      }

      if (priceSelect) {
        priceSelect.value = "";
      }

      if (colorSelect) {
        colorSelect.value = "";
      }

      if (sortSelect) {
        sortSelect.value = "";
      }

      applyFilters();
    });
  }

  // -----------------------------------------------------
  // Cập nhật số lượng giỏ hàng
  // -----------------------------------------------------

  updateCartBadge();

  // Hiển thị sản phẩm ban đầu
  applyFilters();
});

// =====================================================
// 11. CẬP NHẬT SỐ LƯỢNG GIỎ HÀNG
// =====================================================

const updateCartBadge = () => {
  const cartBadge = document.getElementById("cart-count");

  if (!cartBadge) return;

  let cart = [];

  try {
    cart = JSON.parse(localStorage.getItem("cart")) || [];
  } catch (error) {
    cart = [];
  }

  const totalItems = cart.reduce((sum, item) => sum + Number(item.quantity || 0), 0);

  cartBadge.textContent = totalItems;
};

// =====================================================
// 12. ÁP DỤNG BỘ LỌC
// =====================================================

const applyFilters = () => {
  const categorySelect = document.getElementById("filter-category");
  const priceSelect = document.getElementById("filter-price");
  const colorSelect = document.getElementById("filter-color");
  const sortSelect = document.getElementById("sort-select");

  const selectedCategory = categorySelect?.value || "";
  const selectedPrice = priceSelect?.value || "";
  const selectedColor = normalizeColor(colorSelect?.value || "");

  // Bắt đầu từ danh sách gốc để tránh lọc chồng lên kết quả cũ
  categoryProducts = baseProducts.filter((product) => {
    // Lọc danh mục
    if (selectedCategory && product.category !== selectedCategory) {
      return false;
    }

    // Lọc khoảng giá
    if (selectedPrice) {
      const [minPrice, maxPrice] = selectedPrice.split("-").map(Number);

      const price = Number(product.price) || 0;

      if (price < minPrice || price > maxPrice) {
        return false;
      }
    }

    // Lọc màu sắc
    if (selectedColor) {
      const productColors = (product.colors || []).map(normalizeColor);

      if (!productColors.includes(selectedColor)) {
        return false;
      }
    }

    return true;
  });

  // Sắp xếp sau khi lọc
  sortProducts(sortSelect?.value || "");

  // Luôn trở về trang đầu khi thay đổi bộ lọc
  renderProductsPage(1);
};

// =====================================================
// 13. SẮP XẾP SẢN PHẨM
// =====================================================

const sortProducts = (option) => {
  if (option === "price-asc") {
    categoryProducts.sort((a, b) => Number(a.price) - Number(b.price));
  } else if (option === "price-desc") {
    categoryProducts.sort((a, b) => Number(b.price) - Number(a.price));
  } else if (option === "name-asc") {
    categoryProducts.sort((a, b) => (a.name || "").localeCompare(b.name || "", "vi"));
  } else if (option === "name-desc") {
    categoryProducts.sort((a, b) => (b.name || "").localeCompare(a.name || "", "vi"));
  }
};

// Giữ tên hàm cũ để tránh ảnh hưởng code đang gọi
const handleSort = (option) => {
  sortProducts(option);
};

// =====================================================
// 14. HIỂN THỊ SẢN PHẨM THEO TRANG
// =====================================================

const renderProductsPage = (page) => {
  const container = document.getElementById("products-list-container");

  if (!container) return;

  const totalPages = Math.ceil(categoryProducts.length / itemsPerPage);

  currentPage = Math.max(1, Math.min(page, Math.max(totalPages, 1)));

  if (categoryProducts.length === 0) {
    container.innerHTML = `
      <p style="grid-column:1/-1;text-align:center;padding:50px 0;font-size:16px">
        Không tìm thấy sản phẩm nào phù hợp.
      </p>
    `;

    const pagination = document.getElementById("pagination-container");

    if (pagination) {
      pagination.innerHTML = "";
    }

    return;
  }

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const pageItems = categoryProducts.slice(startIndex, endIndex);

  container.innerHTML = pageItems.map((product) => createProductCard(product)).join("");

  renderPagination();
};

// =====================================================
// 15. PHÂN TRANG
// =====================================================

const renderPagination = () => {
  const container = document.getElementById("pagination-container");

  if (!container) return;

  const totalPages = Math.ceil(categoryProducts.length / itemsPerPage);

  if (totalPages <= 1) {
    container.innerHTML = "";
    return;
  }

  let html = `
    <button
      class="page-btn"
      ${currentPage === 1 ? "disabled" : ""}
      onclick="renderProductsPage(${currentPage - 1})"
      aria-label="Trang trước"
    >
      <i class="fa-solid fa-chevron-left"></i>
    </button>
  `;

  for (let i = 1; i <= totalPages; i++) {
    html += `
      <button
        class="page-btn ${i === currentPage ? "active" : ""}"
        onclick="renderProductsPage(${i})"
      >
        ${i}
      </button>
    `;
  }

  html += `
    <button
      class="page-btn"
      ${currentPage === totalPages ? "disabled" : ""}
      onclick="renderProductsPage(${currentPage + 1})"
      aria-label="Trang tiếp theo"
    >
      <i class="fa-solid fa-chevron-right"></i>
    </button>
  `;

  container.innerHTML = html;
};

// Cho phép HTML gọi hàm phân trang
window.renderProductsPage = renderProductsPage;
