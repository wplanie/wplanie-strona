document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (toggle && navLinks) {
    toggle.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("open");
      toggle.setAttribute("aria-expanded", isOpen);
    });
  }

  document.querySelectorAll(".contact-form").forEach((form) => {
    const note = form.querySelector(".form-note");
    const submitBtn = form.querySelector("button[type=submit]");
    const submitLabel = submitBtn ? submitBtn.textContent : "";

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = "Wysyłanie...";
      }
      if (note) {
        note.textContent = "";
        note.classList.remove("form-note-success", "form-note-error");
      }

      fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" }
      })
        .then((response) => {
          if (!response.ok) throw new Error("Formspree error");
          form.reset();
          if (note) {
            note.textContent = "Dziękujemy! Wiadomość została wysłana — odezwiemy się wkrótce.";
            note.classList.add("form-note-success");
          }
        })
        .catch(() => {
          if (note) {
            note.textContent = "Coś poszło nie tak. Spróbuj ponownie albo napisz na agencjawplanie@gmail.com.";
            note.classList.add("form-note-error");
          }
        })
        .finally(() => {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = submitLabel;
          }
        });
    });
  });
});
