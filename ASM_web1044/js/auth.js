"use strict";
// 1. CẬP NHẬT SỐ LƯỢNG GIỎ HÀNG TRÊN HEADER

function updateHeaderCartCount() {
  const cartBadge = document.querySelector("#cart-count");

  if (!cartBadge) return;

  try {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const totalQuantity = cart.reduce(function (sum, item) {
      return sum + Number(item.quantity || 0);
    }, 0);

    cartBadge.textContent = totalQuantity;
  } catch (error) {
    cartBadge.textContent = "0";
  }
}
// 2. CÁC HÀM HỖ TRỢ

// Hiển thị thông báo
function showMessage(element, message, type) {
  if (!element) return;

  element.textContent = message;
  element.className = "auth-message " + type;
}

// Lấy danh sách tài khoản đã đăng ký
function getUsers() {
  try {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    return Array.isArray(users) ? users : [];
  } catch (error) {
    return [];
  }
}

// Lưu danh sách tài khoản
function saveUsers(users) {
  localStorage.setItem("users", JSON.stringify(users));
}

// Lấy thông tin người dùng đang đăng nhập
function getCurrentUser() {
  try {
    return JSON.parse(localStorage.getItem("currentUser")) || null;
  } catch (error) {
    return null;
  }
}

// Kiểm tra email hợp lệ
function isValidEmail(email) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return emailPattern.test(email);
}

// ==========================================
// 3. CẬP NHẬT GIAO DIỆN TÀI KHOẢN
// ==========================================
function updateAuthUI() {
  const currentUser = getCurrentUser();

  const loginLink = document.querySelector("#login-link");
  const userInfo = document.querySelector("#auth-user");
  const logoutButton = document.querySelector("#logout-btn");

  if (currentUser) {
    // Trạng thái đã đăng nhập
    if (loginLink) {
      loginLink.style.display = "none";
    }

    if (userInfo) {
      userInfo.textContent = "Xin chào, " + currentUser.fullname;
      userInfo.style.display = "inline";
    }

    if (logoutButton) {
      logoutButton.style.display = "inline-block";
    }
  } else {
    // Trạng thái chưa đăng nhập
    if (loginLink) {
      loginLink.style.display = "inline-flex";
    }

    if (userInfo) {
      userInfo.textContent = "";
      userInfo.style.display = "none";
    }

    if (logoutButton) {
      logoutButton.style.display = "none";
    }
  }
}

// 4. XỬ LÝ ĐĂNG KÝ
const registerForm = document.querySelector("#register-form");
const regMessage = document.querySelector("#reg-message");

if (registerForm) {
  registerForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const fullnameInput = document.querySelector("#reg-fullname");
    const emailInput = document.querySelector("#reg-email");
    const passwordInput = document.querySelector("#reg-password");
    const repasswordInput = document.querySelector("#reg-repassword");

    const fullname = fullnameInput.value.trim();
    const email = emailInput.value.trim().toLowerCase();
    const password = passwordInput.value;
    const repassword = repasswordInput.value;

    // Kiểm tra trường bắt buộc
    if (!fullname || !email || !password || !repassword) {
      showMessage(regMessage, "Vui lòng điền đầy đủ tất cả các trường.", "error");
      return;
    }

    // Kiểm tra định dạng email
    if (!isValidEmail(email)) {
      showMessage(regMessage, "Email không hợp lệ. Vui lòng nhập đúng định dạng email.", "error");
      return;
    }

    // Kiểm tra độ dài mật khẩu
    if (password.length < 6) {
      showMessage(regMessage, "Mật khẩu phải có ít nhất 6 ký tự.", "error");
      return;
    }

    // Kiểm tra mật khẩu xác nhận
    if (password !== repassword) {
      showMessage(regMessage, "Mật khẩu xác nhận không trùng khớp.", "error");
      return;
    }

    // Kiểm tra email đã tồn tại
    const users = getUsers();

    const emailExists = users.some(function (user) {
      return typeof user.email === "string" && user.email.toLowerCase() === email;
    });

    if (emailExists) {
      showMessage(regMessage, "Email này đã được đăng ký. Vui lòng sử dụng email khác.", "error");
      return;
    }

    // Tạo tài khoản mới
    const newUser = {
      id: Date.now(),
      fullname: fullname,
      email: email,
      password: password,
    };

    users.push(newUser);

    try {
      saveUsers(users);

      showMessage(regMessage, "Đăng ký thành công! Bạn có thể đăng nhập ngay.", "success");

      registerForm.reset();
    } catch (error) {
      showMessage(
        regMessage,
        "Không thể lưu tài khoản trên trình duyệt. Vui lòng thử lại.",
        "error",
      );
    }
  });
}

// 5. XỬ LÝ ĐĂNG NHẬP
const loginForm = document.querySelector("#login-form");
const loginMessage = document.querySelector("#login-message");

if (loginForm) {
  loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const email = document.querySelector("#login-email").value.trim().toLowerCase();

    const password = document.querySelector("#login-password").value;

    // Kiểm tra trường bắt buộc
    if (!email || !password) {
      showMessage(loginMessage, "Vui lòng nhập email và mật khẩu.", "error");
      return;
    }

    // Kiểm tra email hợp lệ
    if (!isValidEmail(email)) {
      showMessage(loginMessage, "Email không đúng định dạng.", "error");
      return;
    }

    // Tìm tài khoản phù hợp
    const users = getUsers();

    const user = users.find(function (item) {
      return (
        typeof item.email === "string" &&
        item.email.toLowerCase() === email &&
        item.password === password
      );
    });

    // Đăng nhập thất bại
    if (!user) {
      showMessage(loginMessage, "Email hoặc mật khẩu không chính xác.", "error");
      return;
    }

    // Chỉ lưu thông tin cần thiết của người dùng đang đăng nhập
    const currentUser = {
      id: user.id,
      fullname: user.fullname,
      email: user.email,
    };

    try {
      localStorage.setItem("currentUser", JSON.stringify(currentUser));

      showMessage(loginMessage, "Đăng nhập thành công!", "success");

      // Cập nhật header
      updateAuthUI();

      // Chuyển về trang chủ sau 1 giây
      setTimeout(function () {
        window.location.href = "index.html";
      }, 1000);
    } catch (error) {
      showMessage(loginMessage, "Không thể lưu trạng thái đăng nhập. Vui lòng thử lại.", "error");
    }
  });
}

// ==========================================
// 6. XỬ LÝ ĐĂNG XUẤT
// ==========================================
const logoutButton = document.querySelector("#logout-btn");

if (logoutButton) {
  logoutButton.addEventListener("click", function () {
    localStorage.removeItem("currentUser");

    // Cập nhật giao diện ngay lập tức
    updateAuthUI();

    // Chuyển về trang chủ
    window.location.href = "index.html";
  });
}

// ==========================================
// 7. KHỞI TẠO KHI TẢI TRANG
// ==========================================
updateHeaderCartCount();
updateAuthUI();
