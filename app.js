/* ── Back to top ── */
const toTop = document.getElementById("backTop");

window.addEventListener("scroll", () => {
    if (window.scrollY > 150) {
        toTop.classList.add("active");
    } else {
        toTop.classList.remove("active");
    }
});

/* ── Mobile nav ── */
const burger = document.getElementById("burgerBtn");
const sidebar = document.getElementById("navLinks");
const navLinks = document.querySelectorAll(".nav-links li a");

burger.addEventListener("click", toggleSidebar);

navLinks.forEach(link => {
    link.addEventListener("click", closeSidebar);
});

// close on Escape key
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeSidebar();
});

function toggleSidebar() {
    const isOpen = sidebar.classList.toggle("show");
    burger.classList.toggle("active");
    if (isOpen) {
        document.body.style.overflow = "hidden";
    } else {
        document.body.style.overflow = "";
    }
}

function closeSidebar() {
    sidebar.classList.remove("show");
    burger.classList.remove("active");
    document.body.style.overflow = "";
}

/* ── Certificate modal (experience section) ── */
const certModal = document.getElementById("certModal");
const certModalImg = document.getElementById("certModalImg");
const certModalTitle = document.getElementById("certModalTitle");
const certModalIssuer = document.getElementById("certModalIssuer");
const certModalYear = document.getElementById("certModalYear");
const certModalLearnings = document.getElementById("certModalLearnings");
const certClose = document.getElementById("certClose");
const certButtons = document.querySelectorAll(".cert-btn");

function openCertModal(cert) {
    if (!cert) return;
    certModalImg.src = cert.imageUrl || "";
    certModalTitle.textContent = cert.title || "";
    certModalIssuer.textContent = cert.issuer || "";
    certModalYear.textContent = cert.date || cert.year || "";
    certModalLearnings.innerHTML = "";
    if (cert.learnings && Array.isArray(cert.learnings)) {
        cert.learnings.forEach(point => {
            const li = document.createElement("li");
            li.textContent = point;
            certModalLearnings.appendChild(li);
        });
    }
    certModal.classList.add("show");
    document.body.style.overflow = "hidden";
}

certButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        const certKey = btn.getAttribute("data-cert");
        const cert = certificates[certKey];
        if (cert) openCertModal(cert);
    });
});

certClose.addEventListener("click", closeCertModal);
certModal.addEventListener("click", (e) => {
    if (e.target === certModal) closeCertModal();
});
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeCertModal();
});

function closeCertModal() {
    certModal.classList.remove("show");
    document.body.style.overflow = "";
}

/* ── Certifications grid ── */
const certGrid = document.getElementById("certGrid");
const filterBtns = document.querySelectorAll(".filter-btn");
let activeFilter = "all";

function renderCertGrid() {
    if (!certGrid) return;
    certGrid.innerHTML = "";
    const list = certifications.filter(c => activeFilter === "all" || c.category === activeFilter);

    list.forEach(cert => {
        const card = document.createElement("div");
        card.className = "cert-card";
        card.innerHTML = `
            <div class="cert-card-top">
                <i class="fa-solid fa-shield-halved"></i>
            </div>
            <h4>${cert.title}</h4>
            <p class="cert-card-issuer">${cert.issuer}</p>
            <p class="cert-card-date"><i class="fa-regular fa-calendar"></i> ${cert.date}</p>
        `;
        card.addEventListener("click", () => openCertModal(cert));
        certGrid.appendChild(card);
    });
}

filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        filterBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        activeFilter = btn.getAttribute("data-filter") || "all";
        renderCertGrid();
    });
});

renderCertGrid();
