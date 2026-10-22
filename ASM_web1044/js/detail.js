document.addEventListener("DOMContentLoaded", () => {
  // 1. Lấy sản phẩm từ URL
  const urlParams = new URLSearchParams(window.location.search);

  const productKey = urlParams.get("key");
  const productId = urlParams.get("id");

  let currentProduct = null;

  // Ưu tiên tìm theo productKey để xác định đúng sản phẩm
  if (productKey) {
    currentProduct = productsData.find((product) => product.productKey === productKey);
  }

  // Nếu URL dùng id thì tìm theo id
  if (!currentProduct && productId) {
    currentProduct = productsData.find((product) => product.id === Number(productId));
  }

  // Không tìm thấy sản phẩm thì dừng lại
  if (!currentProduct) {
    console.error("Không tìm thấy sản phẩm:", productKey || productId);

    const detailTitle = document.getElementById("detail-title");

    if (detailTitle) {
      detailTitle.textContent = "Không tìm thấy sản phẩm";
    }

    return;
  }

  // 2. Trạng thái sản phẩm
  const colors = currentProduct.colors || [];

  let selectedColor = typeof colors[0] === "object" ? colors[0]?.name : colors[0] || "Kem";

  let selectedSize = currentProduct.sizes?.[0] || "39";
  let currentImageIndex = 0;

  // 3. Thông tin cơ bản
  const detailTitle = document.getElementById("detail-title");
  const detailPrice = document.getElementById("detail-price");

  if (detailTitle) {
    detailTitle.textContent = currentProduct.name;
  }

  if (detailPrice) {
    detailPrice.textContent = currentProduct.price.toLocaleString("vi-VN") + "đ";
  }

  // 4. Đánh giá
  const ratingBox = document.getElementById("detail-rating");

  if (ratingBox) {
    const rating = currentProduct.rating || 5;
    let starsHTML = "";

    for (let i = 1; i <= 5; i++) {
      if (i <= Math.floor(rating)) {
        starsHTML += `<i class="fa-solid fa-star"></i>`;
      } else if (i === Math.ceil(rating) && rating % 1 !== 0) {
        starsHTML += `<i class="fa-solid fa-star-half-stroke"></i>`;
      } else {
        starsHTML += `<i class="fa-regular fa-star"></i>`;
      }
    }

    ratingBox.innerHTML = `
      <div class="stars">
        ${starsHTML}
      </div>

      <span>${currentProduct.reviewsCount || 1} Đánh giá</span>
      <span>|</span>
      <span>${currentProduct.likesCount || 1} Số lượng thích</span>
    `;
  }

  // 5. Chọn màu
  const colorContainer = document.getElementById("color-selector");

  if (colorContainer && colors.length > 0) {
    colorContainer.innerHTML = colors
      .map((color, index) => {
        const colorName = typeof color === "object" ? color.name : color;

        const colorHex = typeof color === "object" ? color.hex : color;

        return `
          <button
            class="color-btn ${index === 0 ? "active" : ""}"
            data-color="${colorName}"
            style="background-color: ${colorHex};"
            title="${colorName}"
          ></button>
        `;
      })
      .join("");
  }

  // 6. Chọn size
  const sizeContainer = document.getElementById("size-selector");

  if (sizeContainer && currentProduct.sizes) {
    sizeContainer.innerHTML = currentProduct.sizes
      .map(
        (size, index) => `
          <button
            class="size-btn ${index === 0 ? "active" : ""}"
            data-size="${size}"
          >
            ${size}
          </button>
        `,
      )
      .join("");
  }

  // 7. Gallery sản phẩm
  const mainImg = document.getElementById("main-product-img");
  const thumbContainer = document.getElementById("thumbnail-container");

  let galleryList = currentProduct.gallery || [currentProduct.image];

  const updateGallery = () => {
    currentImageIndex = 0;

    if (mainImg && galleryList.length > 0) {
      mainImg.src = galleryList[0];
      mainImg.alt = currentProduct.name;
    }

    if (thumbContainer) {
      thumbContainer.innerHTML = galleryList
        .map(
          (imgUrl, index) => `
            <div
              class="thumb-item ${index === 0 ? "active" : ""}"
              data-index="${index}"
            >
              <img
                src="${imgUrl}"
                alt="Thumbnail ${index + 1}"
              >
            </div>
          `,
        )
        .join("");
    }
  };

  updateGallery();

  // 8. Đổi ảnh chính
  const updateMainImage = (index) => {
    if (!galleryList.length) return;

    currentImageIndex = index;

    if (mainImg) {
      mainImg.src = galleryList[currentImageIndex];
      mainImg.alt = currentProduct.name;
    }

    document.querySelectorAll(".thumb-item").forEach((thumb, i) => {
      thumb.classList.toggle("active", i === currentImageIndex);
    });
  };

  // 9. Click thumbnail
  thumbContainer?.addEventListener("click", (event) => {
    const thumb = event.target.closest(".thumb-item");

    if (!thumb) return;

    const index = Number.parseInt(thumb.dataset.index, 10);

    updateMainImage(index);
  });

  // 10. Nút ảnh trước
  document.getElementById("prev-img-btn")?.addEventListener("click", () => {
    if (!galleryList.length) return;

    const newIndex = (currentImageIndex - 1 + galleryList.length) % galleryList.length;

    updateMainImage(newIndex);
  });

  // 11. Nút ảnh sau
  document.getElementById("next-img-btn")?.addEventListener("click", () => {
    if (!galleryList.length) return;

    const newIndex = (currentImageIndex + 1) % galleryList.length;

    updateMainImage(newIndex);
  });

  // 12. Click chọn màu
  document.querySelectorAll(".color-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".color-btn").forEach((button) => {
        button.classList.remove("active");
      });

      btn.classList.add("active");

      selectedColor = btn.dataset.color;

      const selectedColorData = colors.find((color) => {
        const colorName = typeof color === "object" ? color.name : color;

        return colorName === selectedColor;
      });

      if (!selectedColorData) return;

      if (typeof selectedColorData === "object" && selectedColorData.gallery?.length > 0) {
        galleryList = selectedColorData.gallery;
      } else if (typeof selectedColorData === "object" && selectedColorData.image) {
        galleryList = [selectedColorData.image];
      } else {
        galleryList = currentProduct.gallery || [currentProduct.image];
      }

      updateGallery();
    });
  });

  // 13. Click chọn size
  document.querySelectorAll(".size-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".size-btn").forEach((button) => {
        button.classList.remove("active");
      });

      btn.classList.add("active");

      selectedSize = btn.dataset.size;
    });
  });

  // 14. Mô tả sản phẩm
  const renderDescriptionTab = () => {
    const tabDetail = document.getElementById("tab-detail");

    if (!tabDetail) return;

    const descListHtml = (currentProduct.description || [])
      .map((item) => `<li>${item}</li>`)
      .join("");

    const specsHtml = Object.entries(currentProduct.specs || {})
      .map(
        ([key, val]) => `
          <li>
            <strong>${key}:</strong>
            ${val}
          </li>
        `,
      )
      .join("");

    tabDetail.innerHTML = `
      <h3 class="desc-heading">
        MÔ TẢ SẢN PHẨM: ${currentProduct.name}
      </h3>

      <ul class="desc-list">
        ${descListHtml}
      </ul>

      <h3 class="desc-heading margin-top-20">
        CHI TIẾT SẢN PHẨM
      </h3>

      <ul class="spec-list">
        ${specsHtml}

        <li>
          <strong>Chú ý:</strong>
          Kích thước so sánh một cách cẩn thận,
          vui lòng cho phép sai số 1-3 cm
          do đo lường thủ công.
        </li>

        <li>
          Do màn hình hiển thị khác nhau
          và ánh sáng khác nhau,
          hình ảnh có thể chênh lệch
          5-10% màu sắc thật của sản phẩm.
        </li>

        <li>
          Cảm ơn bạn đã thông cảm.
        </li>
      </ul>
    `;
  };

  renderDescriptionTab();

  // 15. Chuyển tab
  document.querySelectorAll(".tab-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".tab-btn").forEach((button) => {
        button.classList.remove("active");
      });

      document.querySelectorAll(".tab-pane").forEach((pane) => {
        pane.classList.remove("active");
      });

      btn.classList.add("active");

      document.getElementById(btn.dataset.tab)?.classList.add("active");
    });
  });

  // 16. Thêm vào giỏ hàng
  const addToCart = () => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existingIndex = cart.findIndex(
      (item) =>
        item.id === currentProduct.id && item.color === selectedColor && item.size === selectedSize,
    );

    if (existingIndex > -1) {
      cart[existingIndex].quantity += 1;
    } else {
      cart.push({
        id: currentProduct.id,
        productKey: currentProduct.productKey,
        name: currentProduct.name,
        price: currentProduct.price,
        image: currentProduct.image,
        color: selectedColor,
        size: selectedSize,
        quantity: 1,
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    const cartBadge = document.getElementById("cart-count");

    if (cartBadge) {
      cartBadge.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
    }
  };

  // 17. Nút thêm vào giỏ hàng
  document.getElementById("btn-add-cart-detail")?.addEventListener("click", () => {
    addToCart();

    alert(
      `Đã thêm "${currentProduct.name}" ` +
        `(Màu: ${selectedColor}, Size: ${selectedSize}) ` +
        `vào giỏ hàng!`,
    );
  });

  // 18. Nút mua ngay
  document.getElementById("btn-buy-now")?.addEventListener("click", () => {
    addToCart();

    window.location.href = "cart.html";
  });

  // 19. Sản phẩm có thể bạn cũng thích
  const relatedContainer = document.getElementById("related-container");

  if (relatedContainer) {
    const relatedList = productsData
      .filter((product) => product.productKey !== currentProduct.productKey)
      .slice(0, 4);

    relatedContainer.innerHTML = relatedList
      .map((product) => {
        const key = product.productKey || product.id;

        return `
          <div class="product-card">
            <a
              href="detail.html?key=${encodeURIComponent(key)}"
              class="product-img"
            >
              <img
                src="${product.image}"
                alt="${product.name}"
              >
            </a>

            <h3 class="product-title">
              <a href="detail.html?key=${encodeURIComponent(key)}">
                ${product.name}
              </a>
            </h3>

            <p class="product-price">
              ${product.price.toLocaleString("vi-VN")}đ
            </p>
          </div>
        `;
      })
      .join("");
  }
});
