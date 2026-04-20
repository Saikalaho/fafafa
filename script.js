
const TG_TOKEN   = "8606366395:AAE-Cy5Q0alkwAbSjk0HuHHO-wKFt-8464Y";  
const TG_CHAT_ID = 6847255248;
const PROJECTS = {
  sky: {
    status:   "Продажи открыты",
    name:     "FA Sky Residence",
    address:  "пр. Туран, район Есиль",
    desc:     "Флагманский жилой комплекс бизнес-класса. Два корпуса 25 и 32 этажа с панорамным видом на столицу. Закрытая территория, подземный паркинг, детские клубы, фитнес-центр и коммерческая инфраструктура.",
    floors:   "25–32 этажа",
    apts:     "480 квартир",
    price:    "от 290 000 ₸/м²",
    delivery: "Q4 2025",
    area:     "38–120 м²"
  },
  grand: {
    status:   "Строится · Сдача 2026",
    name:     "FA Grand Plaza",
    address:  "ул. Сауран, район Байконур",
    desc:     "Жилой комплекс комфорт-класса с развитой внутренней инфраструктурой. Школа и детский сад на территории, зелёные дворы без машин, дорожки для прогулок.",
    floors:   "16–20 этажей",
    apts:     "620 квартир",
    price:    "от 240 000 ₸/м²",
    delivery: "Q2 2026",
    area:     "42–95 м²"
  },
  park: {
    status:   "Строится · Сдача 2027",
    name:     "FA Park View",
    address:  "Левый берег, у Центрального парка",
    desc:     "Эко-ориентированный квартал у воды. Веловые дорожки, площадки с натуральными материалами, фасад в стиле Biophilic Design. Максимум естественного света и зелени.",
    floors:   "10–14 этажей",
    apts:     "340 квартир",
    price:    "от 210 000 ₸/м²",
    delivery: "Q3 2027",
    area:     "46–110 м²"
  }
};


window.addEventListener("scroll", () => {
  document.getElementById("nav")
    .classList.toggle("scrolled", window.scrollY > 60);
});



document.getElementById("burger").addEventListener("click", () => {
  const burger = document.getElementById("burger");
  const menu   = document.getElementById("mobileMenu");
  burger.classList.toggle("open");
  menu.classList.toggle("open");
  document.body.style.overflow = menu.classList.contains("open") ? "hidden" : "";
});

//мобильное меню//

function closeMob() {
  document.getElementById("burger").classList.remove("open");
  document.getElementById("mobileMenu").classList.remove("open");
  document.body.style.overflow = "";
}

//счетчик//
function runCounters() {
  document.querySelectorAll(".stat-n[data-target]").forEach(el => {
    const target = parseInt(el.dataset.target);
    let current  = 0;
    const step   = Math.max(1, Math.ceil(target / 55));
    const timer  = setInterval(() => {
      current = Math.min(current + step, target);
      el.textContent = current.toLocaleString("ru");
      if (current >= target) clearInterval(timer);
    }, 20);
  });
}

const statsObserver = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting) {
    runCounters();
    statsObserver.disconnect();
  }
}, { threshold: 0.4 });

const statsBar = document.querySelector(".stats-bar");
if (statsBar) statsObserver.observe(statsBar);

//модалка/
function openModal(key) {
  const p = PROJECTS[key];
  if (!p) return;

  document.getElementById("modalBody").innerHTML = `
    <p class="m-status">${p.status}</p>
    <h2 class="m-title">${p.name}</h2>
    <p class="m-addr">📍 ${p.address}</p>
    <p class="m-desc">${p.desc}</p>
    <div class="m-specs">
      <div class="m-spec">
        <span class="m-spec-val">${p.floors}</span>
        <span class="m-spec-key">Этажей</span>
      </div>
      <div class="m-spec">
        <span class="m-spec-val">${p.apts}</span>
        <span class="m-spec-key">Квартир</span>
      </div>
      <div class="m-spec">
        <span class="m-spec-val">${p.price}</span>
        <span class="m-spec-key">Цена</span>
      </div>
      <div class="m-spec">
        <span class="m-spec-val">${p.delivery}</span>
        <span class="m-spec-key">Сдача</span>
      </div>
      <div class="m-spec">
        <span class="m-spec-val">${p.area}</span>
        <span class="m-spec-key">Площади</span>
      </div>
    </div>
    <a href="#contact" class="btn-primary full" onclick="closeModal()" style="display:block;text-align:center">
      Оставить заявку →
    </a>
  `;

  document.getElementById("modalOverlay").classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  document.getElementById("modalOverlay").classList.remove("open");
  document.body.style.overflow = "";
}

function closeModalBg(e) {
  if (e.target === document.getElementById("modalOverlay")) closeModal();
}

document.addEventListener("keydown", e => {
  if (e.key === "Escape") closeModal();
});

/отправка в тг/
async function submitForm() {
  const name    = document.getElementById("f-name").value.trim();
  const phone   = document.getElementById("f-phone").value.trim();
  const type    = document.getElementById("f-type").value;
  const budget  = document.getElementById("f-budget").value;
  const comment = document.getElementById("f-comment").value.trim();

  /валидауция/
  if (!name) { alert("Введите ваше имя"); return; }
  if (!phone) { alert("Введите номер телефона"); return; }


  const btn = document.getElementById("submitBtn");
  btn.textContent = "Отправка...";
  btn.disabled = true;
/заявка/
  const now = new Date().toLocaleString("ru-RU", { timeZone: "Asia/Almaty" });
  const text = [
    "🏢 <b>Новая заявка — FA Group</b>",
    "",
    `👤 <b>Имя:</b> ${name}`,
    `📞 <b>Телефон:</b> ${phone}`,
    type    ? `📋 <b>Тип:</b> ${type}`    : "",
    budget  ? `💰 <b>Бюджет:</b> ${budget}` : "",
    comment ? `💬 <b>Комментарий:</b> ${comment}` : "",
    "",
    `🕐 ${now}`
  ].filter(Boolean).join("\n");

  /отправка в тг/
  try {
    const res = await fetch(
      `https://api.telegram.org/bot${TG_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id:    TG_CHAT_ID,
          text:       text,
          parse_mode: "HTML"
        })
      }
    );

    const data = await res.json();

    if (data.ok) {
      /* Успех — показываем благодарность */
      document.getElementById("formFields").style.display  = "none";
      document.getElementById("formSuccess").classList.remove("hidden");
    } else {
      /* Ошибка от Telegram (неверный токен и т.д.) */
      console.error("Telegram error:", data);
      alert("Ошибка отправки. Проверьте токен и Chat ID в script.js");
      btn.textContent = "Отправить заявку →";
      btn.disabled = false;
    }
  } catch (err) {
    console.error("Network error:", err);
    alert("Ошибка сети. Проверьте подключение к интернету.");
    btn.textContent = "Отправить заявку →";
    btn.disabled = false;
  }
}
