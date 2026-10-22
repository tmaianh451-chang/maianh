// --- XỬ LÝ SLIDER BANNER TỰ ĐỘNG CHẠY ---

const initBannerSlider = () => {
  const banner = document.getElementById("luxuryBanner");

  if (!banner) return;

  const slides = banner.querySelectorAll(".luxury-slide");
  const thumbs = banner.querySelectorAll(".luxury-thumb");
  const progressBar = document.getElementById("luxuryProgress");

  if (!slides.length) return;

  const slideTime = 3000;

  let currentIndex = 0;
  let slideTimer;
  let startTime = 0;
  let remainingTime = slideTime;
  let isPaused = false;

  const stopAutoPlay = () => {
    clearTimeout(slideTimer);
  };

  const startProgress = (duration) => {
    if (!progressBar) return;

    const elapsed = slideTime - duration;

    progressBar.style.transition = "none";
    progressBar.style.width = `${(elapsed / slideTime) * 100}%`;

    void progressBar.offsetWidth;

    progressBar.style.transition = `width ${duration}ms linear`;
    progressBar.style.width = "100%";
  };

  const scheduleNext = (duration) => {
    stopAutoPlay();

    remainingTime = duration;
    startTime = Date.now();

    startProgress(duration);

    slideTimer = setTimeout(() => {
      showSlide((currentIndex + 1) % slides.length);
    }, duration);
  };

  const showSlide = (index) => {
    currentIndex = (index + slides.length) % slides.length;

    slides.forEach((slide, i) => {
      slide.classList.toggle("active", i === currentIndex);
    });

    thumbs.forEach((thumb, i) => {
      thumb.classList.toggle("active", i === currentIndex);
    });

    remainingTime = slideTime;

    if (!isPaused) {
      scheduleNext(slideTime);
    }
  };

  // Nhấn thumbnail để chuyển slide
  thumbs.forEach((thumb) => {
    thumb.addEventListener("click", () => {
      const index = Number(thumb.dataset.index);

      if (index >= 0 && index < slides.length) {
        showSlide(index);
      }
    });
  });

  // Tạm dừng khi rê chuột vào banner
  banner.addEventListener("mouseenter", () => {
    if (isPaused) return;

    isPaused = true;

    remainingTime = Math.max(0, remainingTime - (Date.now() - startTime));

    stopAutoPlay();

    if (progressBar) {
      progressBar.style.transition = "none";
      progressBar.style.width = `${((slideTime - remainingTime) / slideTime) * 100}%`;
    }
  });

  // Tiếp tục khi rời chuột
  banner.addEventListener("mouseleave", () => {
    if (!isPaused) return;

    isPaused = false;

    if (remainingTime <= 0) {
      showSlide((currentIndex + 1) % slides.length);
    } else {
      scheduleNext(remainingTime);
    }
  });

  showSlide(0);
};

// CHẠY KHI TRANG LOAD XONG
document.addEventListener("DOMContentLoaded", () => {
  // 1. KHỞI ĐỘNG SLIDER
  initBannerSlider();

  // 2. ĐỊNH DẠNG GIÁ TIỀN
  const formatCurrency = (amount) => {
    return Number(amount).toLocaleString("vi-VN") + "đ";
  };

  // 3. HIỂN THỊ MÀU SẢN PHẨM
  const renderColorDots = (colors) => {
    if (!colors || !Array.isArray(colors) || colors.length === 0) {
      return "";
    }

    return colors
      .map((color) => {
        const colorHex = typeof color === "object" ? color.hex : color;

        return `
          <span
            class="color-dot"
            style="background-color: ${colorHex};">
          </span>
        `;
      })
      .join("");
  };

  // 4. TẠO CARD SẢN PHẨM
  const createProductCard = (product) => {
    return `
      <div class="product-card">
        <a
          href="detail.html?id=${product.id}"
          class="product-img">

          <img
            src="${product.image}"
            alt="${product.name}">

        </a>

        <h3 class="product-title">
          <a href="detail.html?id=${product.id}">
            ${product.name}
          </a>
        </h3>

        <p class="product-price">
          ${formatCurrency(product.price)}
        </p>

        <div class="color-swatches">
          ${renderColorDots(product.colors)}
        </div>
      </div>
    `;
  };

  // 5. HIỂN THỊ 4 SẢN PHẨM MỖI DANH MỤC TRANG CHỦ
  const renderProductsByCategory = (categoryName, containerId) => {
    const container = document.getElementById(containerId);

    if (!container) {
      return;
    }

    const filteredProducts = productsData
      .filter((item) => item.category === categoryName)
      .slice(0, 4);

    container.innerHTML = filteredProducts.map((product) => createProductCard(product)).join("");
  };

  // 6. HIỂN THỊ BLOG
  const renderBlogPosts = () => {
    const container = document.getElementById("blog-container");

    if (!container) {
      return;
    }

    container.innerHTML = blogPostsData
      .map(
        (post) => `
          <a
            href="${post.link}"
            class="blog-item">
            ${post.title}
          </a>
        `,
      )
      .join("");
  };

  // 7. CẬP NHẬT SỐ LƯỢNG GIỎ HÀNG
  const updateCartBadge = () => {
    const cartBadge = document.getElementById("cart-count");

    if (!cartBadge) {
      return;
    }

    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

    cartBadge.textContent = totalItems;
  };

  // 8. HIỂN THỊ SẢN PHẨM TRANG CHỦ
  // MỖI DANH MỤC CHỈ HIỆN 4 SẢN PHẨM
  renderProductsByCategory("banchay", "banchay-container");
  renderProductsByCategory("caogot", "caogot-container");
  renderProductsByCategory("balo", "balo-container");
  renderProductsByCategory("sandal-nu", "sandal-nu-container");
  renderProductsByCategory("charm", "charm-container");
  renderProductsByCategory("sandal-nam", "sandal-nam-container");

  // 9. BLOG + GIỎ HÀNG
  renderBlogPosts();
  updateCartBadge();
});

// 10. THÊM SẢN PHẨM VÀO GIỎ HÀNG
window.addToCart = (productId) => {
  const product = productsData.find((item) => item.id === productId);

  if (!product) {
    return;
  }

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const existingIndex = cart.findIndex((item) => item.id === productId);

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

  // Lưu giỏ hàng
  localStorage.setItem("cart", JSON.stringify(cart));

  // Cập nhật số lượng trên Header
  const cartBadge = document.getElementById("cart-count");

  if (cartBadge) {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

    cartBadge.textContent = totalItems;
  }

  // Thông báo
  alert(`Đã thêm "${product.name}" vào giỏ hàng!`);
};

// TÍNH NĂNG TÌM KIẾM THEO productsData
function setupSearch() {
  const searchInput = document.querySelector("#search-input");
  const searchBtn = document.querySelector("#btn-search");
  const searchDropdown = document.querySelector("#search-dropdown");

  if (!searchInput || !searchBtn || !searchDropdown) return;

  // Lấy dữ liệu sản phẩm từ data.js
  const sourceProducts = typeof productsData !== "undefined" ? productsData : [];

  // Chuyển đến trang danh sách sản phẩm
  function submitSearch() {
    const keyword = searchInput.value.trim();

    if (!keyword) return;

    window.location.href = `products.html?search=${encodeURIComponent(keyword)}`;
  }

  // Tìm kiếm trực tiếp khi người dùng nhập từ khóa
  searchInput.addEventListener("input", function () {
    const keyword = this.value.trim().toLowerCase();

    if (!keyword) {
      searchDropdown.innerHTML = "";
      searchDropdown.hidden = true;
      return;
    }

    const matched = sourceProducts.filter(function (product) {
      return product.name && product.name.toLowerCase().includes(keyword);
    });

    renderDropdownResults(matched, keyword);
  });

  // Hiển thị danh sách gợi ý
  function renderDropdownResults(results, keyword) {
    if (results.length === 0) {
      searchDropdown.innerHTML = `
        <div class="search-empty">
          Không tìm thấy sản phẩm nào khớp với:
          <strong>${keyword}</strong>
        </div>
      `;

      searchDropdown.hidden = false;
      return;
    }

    // Hiển thị tối đa 5 sản phẩm
    const previewList = results.slice(0, 5);

    const itemsHtml = previewList
      .map(function (product) {
        const key = product.productKey || product.id;

        const formattedPrice =
          product.price != null
            ? Number(product.price).toLocaleString("vi-VN") + " VNĐ"
            : "Liên hệ";

        const thumbImg = product.image || (product.gallery && product.gallery[0]) || "";

        return `
          <a
            href="detail.html?key=${encodeURIComponent(key)}"
            class="search-item"
          >
            <img src="${thumbImg}" alt="${product.name}">

            <div class="search-item-info">
              <span
                class="search-item-name"
                title="${product.name}"
              >
                ${product.name}
              </span>

              <span class="search-item-price">
                ${formattedPrice}
              </span>
            </div>
          </a>
        `;
      })
      .join("");

    const footerHtml = `
      <div class="search-view-all">
        <a href="products.html?search=${encodeURIComponent(keyword)}">
          Xem tất cả ${results.length} kết quả &rarr;
        </a>
      </div>
    `;

    searchDropdown.innerHTML = itemsHtml + footerHtml;
    searchDropdown.hidden = false;
  }

  // Bấm nút kính lúp
  searchBtn.addEventListener("click", submitSearch);

  // Nhấn Enter để tìm kiếm
  searchInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      e.preventDefault();
      submitSearch();
    }
  });

  // Bấm bên ngoài thì đóng danh sách gợi ý
  document.addEventListener("click", function (e) {
    const isInside =
      searchInput.contains(e.target) ||
      searchBtn.contains(e.target) ||
      searchDropdown.contains(e.target);

    if (!isInside) {
      searchDropdown.hidden = true;
    }
  });

  // Focus vào ô tìm kiếm thì hiển thị lại gợi ý
  searchInput.addEventListener("focus", function () {
    if (this.value.trim() !== "" && searchDropdown.innerHTML !== "") {
      searchDropdown.hidden = false;
    }
  });
}

// Khởi chạy khi tài liệu tải xong
document.addEventListener("DOMContentLoaded", setupSearch);
