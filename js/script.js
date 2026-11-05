// Menu button for smaller screens
const menuButton = document.querySelector(".menu-button");
const mainNavigation = document.querySelector(".main-navigation");

if (menuButton && mainNavigation) {
  menuButton.addEventListener("click", function () {
    const menuIsOpen = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!menuIsOpen));
    menuButton.setAttribute(
      "aria-label",
      menuIsOpen ? "Open menu" : "Close menu",
    );
    mainNavigation.classList.toggle("is-open");
  });

  mainNavigation.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Open menu");
      mainNavigation.classList.remove("is-open");
    });
  });
}

// Keep the footer year up to date
const yearLabel = document.querySelector("[data-year]");
if (yearLabel) {
  yearLabel.textContent = new Date().getFullYear();
}

// Filter the collection cards
const filterButtons = document.querySelectorAll("[data-filter]");
const productCards = document.querySelectorAll("[data-category]");
const emptyMessage = document.querySelector(".filter-empty");

if (filterButtons.length && productCards.length) {
  filterButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      const selectedStyle = button.dataset.filter;
      let visibleCount = 0;

      filterButtons.forEach(function (filter) {
        filter.classList.toggle("active", filter === button);
      });

      productCards.forEach(function (card) {
        const showCard =
          selectedStyle === "all" || card.dataset.category === selectedStyle;
        card.classList.toggle("is-hidden", !showCard);
        if (showCard) visibleCount += 1;
      });

      if (emptyMessage) emptyMessage.hidden = visibleCount > 0;
    });
  });
}

// A small reveal effect as sections enter the screen
const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window && revealItems.length) {
  document.body.classList.add("has-motion");
  const revealObserver = new IntersectionObserver(
    function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 },
  );

  revealItems.forEach(function (item) {
    revealObserver.observe(item);
  });
}

// The form shows a simple thank-you state; it does not send data to a server.
const contactForm = document.querySelector("#contact-form");
const formSuccess = document.querySelector("#form-success");

if (contactForm && formSuccess) {
  contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    if (!contactForm.checkValidity()) {
      contactForm.reportValidity();
      return;
    }

    contactForm.hidden = true;
    formSuccess.hidden = false;
  });
}
