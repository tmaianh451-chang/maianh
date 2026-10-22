// FORMAT TIỀN TỆ (VND)
const formatMoney = (amount) => {
  return Number(amount || 0).toLocaleString("vi-VN") + " đ";
};

// LẤY DỮ LIỆU GIỎ HÀNG TỪ LOCALSTORAGE
const getCart = () => {
  // return JSON.parse(localStorage.getItem("cart")) || [];
  return JSON.parse(localStorage.getItem("cart")) || [];
};

// LƯU GIỎ HÀNG VÀO LOCALSTORAGE
const saveCart = (cart) => {
  localStorage.setItem("cart", JSON.stringify(cart));
  updateHeaderCartCount();
};

// CẬP NHẬT SỐ LƯỢNG GIỎ HÀNG TRÊN HEADER
const updateHeaderCartCount = () => {
  const cart = getCart();
  const totalCount = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
  const badge = document.getElementById("cart-count");
  if (badge) badge.textContent = totalCount;
};

// RENDER DANH SÁCH SẢN PHẨM TRONG GIỎ
const renderCart = () => {
  const cart = getCart();
  const tableBody = document.getElementById("cart-table-body");
  if (!tableBody) return;

  if (cart.length === 0) {
    tableBody.innerHTML = `
      <tr>
        <td colspan="5">
          <div class="empty-cart-msg">
            <p>Giỏ hàng của bạn đang trống.</p>
            <a href="../index.html" class="btn-shopping">MUA SẮM NGAY</a>
          </div>
        </td>
      </tr>
    `;
    updateSummary(0);
    return;
  }

  let html = "";
  let subtotal = 0;

  cart.forEach((item, index) => {
    const itemTotal = (item.price || 0) * (item.quantity || 1);
    subtotal += itemTotal;

    const sizeText = item.size ? `Kích thước: ${item.size}` : "";
    const colorText = item.color ? `Màu: ${item.color}` : "";
    const metaInfo = [colorText, sizeText].filter(Boolean).join(", ");

    html += `
      <tr>
        <td class="col-product">
          <div class="cart-item-info">
            <img src="${item.image || ""}" alt="${item.name}" class="cart-item-img">
            <div class="cart-item-detail">
              <div class="product-title">${item.name}</div>
              ${metaInfo ? `<div class="product-meta">${metaInfo}</div>` : ""}
            </div>
          </div>
        </td>
        <td class="col-price">${formatMoney(item.price)}</td>
        <td class="col-qty">
          <div class="quantity-control">
            <button type="button" class="quantity-btn" onclick="changeQuantity(${index}, -1)">-</button>
            <input type="text" class="quantity-input" value="${item.quantity}" readonly>
            <button type="button" class="quantity-btn" onclick="changeQuantity(${index}, 1)">+</button>
          </div>
        </td>
        <td class="col-total">${formatMoney(itemTotal)}</td>
        <td class="col-action">
          <button type="button" class="btn-delete" onclick="removeItem(${index})">Xóa</button>
        </td>
      </tr>
    `;
  });

  tableBody.innerHTML = html;
  updateSummary(subtotal);
};

// THAY ĐỔI SỐ LƯỢNG (- / +)
window.changeQuantity = (index, delta) => {
  let cart = getCart();
  if (!cart[index]) return;

  cart[index].quantity += delta;

  if (cart[index].quantity <= 0) {
    if (confirm("Bạn có chắc chắn muốn xóa sản phẩm này khỏi giỏ hàng?")) {
      cart.splice(index, 1);
    } else {
      cart[index].quantity = 1;
    }
  }

  saveCart(cart);
  renderCart();
};

// XÓA SẢN PHẨM KHỎI GIỎ
window.removeItem = (index) => {
  let cart = getCart();
  if (confirm("Xác nhận xóa sản phẩm này?")) {
    cart.splice(index, 1);
    saveCart(cart);
    renderCart();
  }
};

// CẬP NHẬT TỔNG TIỀN
const updateSummary = (subtotal) => {
  const subtotalEl = document.getElementById("summary-subtotal");
  const grandtotalEl = document.getElementById("summary-grandtotal");

  if (subtotalEl) subtotalEl.textContent = formatMoney(subtotal);
  if (grandtotalEl) grandtotalEl.textContent = formatMoney(subtotal);
};

// XỬ LÝ NÚT ĐẶT HÀNG (MUA HÀNG)
window.handleCheckout = (e) => {
  e.preventDefault();

  const cart = getCart();
  if (cart.length === 0) {
    alert("Giỏ hàng của bạn đang trống! Vui lòng chọn sản phẩm trước khi đặt hàng.");
    return;
  }

  const name = document.getElementById("fullname").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const address = document.getElementById("address").value.trim();

  if (!name || !phone || !address) {
    alert("Vui lòng nhập đầy đủ thông tin giao hàng!");
    return;
  }

  // Thông báo thành công và xóa giỏ hàng
  alert(`Cảm ơn bạn ${name}! Đơn hàng của bạn đã được đặt thành công.`);

  localStorage.removeItem("cart");
  saveCart([]);
  renderCart();
  document.getElementById("checkout-form").reset();
};

// KHỞI TẠO TRANG
document.addEventListener("DOMContentLoaded", () => {
  updateHeaderCartCount();
  renderCart();
});
