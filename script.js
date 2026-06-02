// Галерея: счётчик, лайки, фильтры, переключение вида

function countPhotos() {
  const visible = document.querySelectorAll(
    ".image-card:not(.hidden)"
  );
  const counter = document.getElementById("image-counter");
  if (counter) {
    counter.textContent = String(visible.length);
  }
}

function setupLikes() {
  const likeButtons = document.querySelectorAll(".like-btn");
  const totalLikesElement = document.getElementById("total-likes");

  let totalLikes = Array.from(
    document.querySelectorAll(".like-btn .like-count")
  ).reduce((sum, el) => sum + (parseInt(el.textContent, 10) || 0), 0);

  if (totalLikesElement) {
    totalLikesElement.textContent = String(totalLikes);
  }

  likeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const likesSpan = button.querySelector(".like-count");
      const icon = button.querySelector("i");
      let currentLikes = parseInt(likesSpan?.textContent, 10) || 0;

      if (button.classList.contains("liked")) {
        currentLikes -= 1;
        totalLikes -= 1;
        button.classList.remove("liked");
        if (icon) {
          icon.classList.remove("fas");
          icon.classList.add("far");
        }
      } else {
        currentLikes += 1;
        totalLikes += 1;
        button.classList.add("liked");
        if (icon) {
          icon.classList.remove("far");
          icon.classList.add("fas");
        }
      }

      if (likesSpan) likesSpan.textContent = String(currentLikes);
      if (totalLikesElement) {
        totalLikesElement.textContent = String(totalLikes);
      }

      button.style.transform = "scale(1.2)";
      setTimeout(() => {
        button.style.transform = "scale(1)";
      }, 300);
    });
  });
}

function setupFilters() {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const cards = document.querySelectorAll(".image-card");

  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const filter = btn.getAttribute("data-filter");

      filterButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      cards.forEach((card) => {
        const category = card.getAttribute("data-category");
        const show = filter === "all" || category === filter;
        card.classList.toggle("hidden", !show);
      });

      countPhotos();
    });
  });
}

function setupViewToggle() {
  const gallery = document.getElementById("image-gallery");
  const gridBtn = document.getElementById("grid-view");
  const listBtn = document.getElementById("list-view");

  if (!gallery || !gridBtn || !listBtn) return;

  gridBtn.addEventListener("click", () => {
    gallery.classList.remove("list-view");
    gridBtn.classList.add("active");
    listBtn.classList.remove("active");
  });

  listBtn.addEventListener("click", () => {
    gallery.classList.add("list-view");
    listBtn.classList.add("active");
    gridBtn.classList.remove("active");
  });
}

function updateYear() {
  const yearEl = document.getElementById("current-year");
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }
}

document.addEventListener("DOMContentLoaded", () => {
  countPhotos();
  setupLikes();
  setupFilters();
  setupViewToggle();
  updateYear();
});
