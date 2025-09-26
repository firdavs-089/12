/* ===================== UTIL ===================== */
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
const formatSom = n => `${n.toLocaleString('uz-UZ')} so'm`;
const uid = () => Math.random().toString(36).slice(2, 8).toUpperCase();
const save = (k, v) => localStorage.setItem(k, JSON.stringify(v));
const load = (k, def = null) => JSON.parse(localStorage.getItem(k) || JSON.stringify(def));

const TOAST = (msg) => {
    const t = document.createElement('div'); t.className = 't'; t.innerHTML = msg; $('#toast').appendChild(t);
    setTimeout(() => { t.style.opacity = '.0'; t.style.transform = 'translateY(-6px)'; }, 2600);
    setTimeout(() => t.remove(), 3200);
}

/* ===================== STATE ===================== */
const state = load('aetherx_state', {
    userId: Math.floor(400000 + Math.random() * 700000),
    balance: 0,
    activeSub: null, // {title, months, until, amount}
    history: []
});

const PLANS = [
    { id: 'p1', title: 'Geek TV', price: 19990, months: 1 },
    { id: 'p3', title: 'Geek TV', price: 19990, months: 1 },
    { id: 'p6', title: 'Geek TV', price: 19990, months: 1 },
    { id: 'geek', title: 'Geek TV', price: 19990, months: 1 }
];

function persist() { save('aetherx_state', state); renderAll(); }

/* ===================== NAV ===================== */
const pages = $$('main [data-route]');
$('#nav').addEventListener('click', e => {
    const btn = e.target.closest('button[data-page]'); if (!btn) return;
    $$('#nav button').forEach(b => b.classList.remove('active')); btn.classList.add('active');
    const route = btn.dataset.page; pages.forEach(s => s.style.display = (s.dataset.route === route) ? 'block' : 'none');
});

/* ===================== RENDER ===================== */
function renderMy() {
    $('#userId').textContent = state.userId;
    $('#balance').textContent = formatSom(state.balance);
    if (state.activeSub) {
        const until = new Date(state.activeSub.until).toLocaleDateString('uz-UZ');
        $('#myStatus').innerHTML = `<div class="pill"><i class='fa-solid fa-crown'></i> Faol obuna: <strong>${state.activeSub.title}</strong> (gacha: ${until})</div>`;
    } else {
        $('#myStatus').textContent = "Hozircha obuna yo'q. Tarif tanlang va aktivlashtiring.";
    }
}

function renderPlans() {
    const wrap = $('#plansGrid'); wrap.innerHTML = '';
    PLANS.forEach(p => {
        const el = document.createElement('div'); el.className = 'plan';
        el.innerHTML = `
          <div class='plan-header'>
            <h3>${p.title} <i class="fa-solid fa-star" style="margin-left:6px"></i></h3>
            <div class='price'>${p.price.toLocaleString('uz-UZ')}<span class='so'>so'm</span></div>
          </div>
          <div class='plan-body'>
            <div style='color:#b7c4dc; text-align:center; margin-bottom:12px'>AetherX va Geek tv studiyasining maxsus professional dublyajidagi kino va seriallardan oy davomida bahramand bo'ling!</div>
            <div class='hr'></div>
            ${[
                'GeekTv studiyasida tarjima qilingan filmlarni tomosha qilish',
                'Reklamalarsiz tomosha qilish',
                'Eksklyuziv bo\'lmagan filmlarni tomosha qilish',
                'Telegram orqali kino va seriallarni tez va oson yuklab olish',
                'Telegram orqali istalgan vaqtda offline tomosha qilish',
                'Telegram Super ilovasidan foydalanish'
            ].map(t => `<div class='feat'><i class=\"fa-solid fa-check\"></i>${t}</div>`).join('')}
          </div>
          <div class='plan-footer'><button class='btn ok' data-activate='${p.id}'>AKTIVLASHTIRISH</button></div>
        `;
        wrap.appendChild(el);
    });
}

function renderTopupMethods() {
    const wrap = $('#topupMethods');
    wrap.innerHTML = ['PAYNET', 'Payme', 'click', 'Plum'].map(n => `<div class='method'>${n}</div>`).join('') + `
        <div class='method'>NAQD PUL</div>
      `;
}

function renderHistory() {
    const tb = $('#historyTbody'); tb.innerHTML = '';
    if (!state.history.length) { tb.innerHTML = `<tr><td colspan=4 style='color:#94a3b8'>Hali yozuv yo'q</td></tr>`; return; }
    state.history.slice().reverse().forEach(h => {
        const tr = document.createElement('tr');
        tr.innerHTML = `<td>${new Date(h.time).toLocaleString('uz-UZ')}</td><td>${h.type}</td><td>${h.note}</td><td>${formatSom(h.amount)}</td>`;
        tb.appendChild(tr);
    });
}

function renderAll() { renderMy(); renderPlans(); renderTopupMethods(); renderHistory(); }

/* ===================== INIT ===================== */
function init() {
    renderAll();
    // Default open "Mening obunam"
    pages.forEach(s => s.style.display = (s.dataset.route === 'my') ? 'block' : 'none');
}

/* ===================== PLAN ACTIVATE / PAY MODAL ===================== */
let currentPlan = null, currentAmount = 0, discount = 0, currentProvider = null, currentOrderId = null;

document.addEventListener('click', e => {
    // Aktivlashtirish tugmasi
    const act = e.target.closest('[data-activate]');
    if (act) {
        const id = act.dataset.activate; currentPlan = PLANS.find(p => p.id === id);
        openPayModal(currentPlan);
    }
});

function openPayModal(plan) {
    $('#modalPlanInfo').innerHTML = `<div class='pill'><i class='fa-solid fa-crown'></i> Tarif: <b>${plan.title}</b></div>`;
    currentAmount = plan.price; discount = 0; currentProvider = null; currentOrderId = 'ORD-' + uid();
    updateAmount();
    $$('#providerList .provider').forEach(p => p.classList.remove('active'));
    $('#promoInput').value = ''; $('#promoMsg').textContent = ''; $('#qrBox').style.display = 'none';
    $('#payModal').classList.add('open');
}

$('[data-close]')?.addEventListener('click', () => $('.modal.open')?.classList.remove('open'));
$$('#payModal [data-close]').forEach(x => x.addEventListener('click', () => $('#payModal').classList.remove('open')));

$('#providerList').addEventListener('click', e => {
    const p = e.target.closest('.provider'); if (!p) return;
    $$('#providerList .provider').forEach(x => x.classList.remove('active'));
    p.classList.add('active'); currentProvider = p.dataset.provider;
});

$('#promoToggle').addEventListener('click', () => {
    const wrap = $('#promoInputWrap'); wrap.style.display = wrap.style.display === 'none' ? 'flex' : 'none';
});

$('#promoApply').addEventListener('click', () => {
    const code = $('#promoInput').value.trim().toLowerCase();
    if (!code) { $('#promoMsg').textContent = 'Promokod kiriting'; return; }
    if (code === 'aetherx') {
        discount = Math.round(currentAmount * 0.30);
        $('#promoMsg').innerHTML = `✅ <b>aetherx</b> promokodi qo'llandi (30% chegirma)`;
    } else {
        discount = 0; $('#promoMsg').innerHTML = `❌ Noto'g'ri promokod`;
    }
    updateAmount();
});

function updateAmount() {
    const total = Math.max(0, currentAmount - discount);
    $('#amountText').innerHTML = `${formatSom(currentAmount)} ${discount ? `→ <b>${formatSom(total)}</b>` : ''}`;
}

// QR demo (oddiy pattern)
function drawFakeQR(canvas, seed) {
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#000';
    const rng = (function (s) { return () => (s = (s * 9301 + 49297) % 233280) / 233280; })(seed.length);
    const size = 20, cell = Math.floor((canvas.width - 8) / size);
    for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) if (rng() > 0.5) ctx.fillRect(4 + x * cell, 4 + y * cell, cell - 2, cell - 2);
    // 3 finder squares
    const f = (x, y) => { ctx.fillStyle = '#000'; ctx.fillRect(x, y, cell * 4, cell * 4); ctx.fillStyle = '#fff'; ctx.fillRect(x + cell, y + cell, cell * 2, cell * 2) }
    f(4, 4); f(canvas.width - cell * 4 - 4, 4); f(4, canvas.height - cell * 4 - 4);
}

$('#showQr').addEventListener('click', () => {
    if (!currentProvider) { TOAST('To\'lov provayderini tanlang.'); return; }
    $('#qrBox').style.display = 'block';
    const payload = `${currentProvider}|${currentOrderId}|${Math.max(0, currentAmount - discount)}`;
    $('#qrText').textContent = payload;
    drawFakeQR($('#qrCanvas'), payload);
});

// To'lov qilish
$('#doPay').addEventListener('click', () => {
    if (!currentProvider) { TOAST('To\'lov provayderini tanlang.'); return; }
    const total = Math.max(0, currentAmount - discount);
    $('#payModal').classList.remove('open');
    $('#overlay').classList.add('open');
    const DURATION_MS = 8000; // DEMO: 8 soniya. Realda: 15*60*1000
    setTimeout(() => {
        $('#overlay').classList.remove('open');
        // 24 soatdan keyin aktiv bo'ladi
        const until = Date.now() + 24 * 60 * 60 * 1000;
        state.activeSub = { title: currentPlan.title, months: currentPlan.months, until, amount: total };
        state.history.push({ time: Date.now(), type: 'Obuna', note: `${currentPlan.title} (24 soatdan keyin aktiv)`, amount: total });
        persist();
        TOAST("Obuna tasdiqlandi. <b>24 soatdan keyin aktivlashadi</b> ✅");
    }, DURATION_MS);
});

/* ===================== BALANS TOP-UP ===================== */
$('#topupBtn').addEventListener('click', () => $('#topupModal').classList.add('open'));
$$('#topupModal [data-close]').forEach(x => x.addEventListener('click', () => $('#topupModal').classList.remove('open')));

let topupProvider = null;
$('#topupModal').addEventListener('click', e => {
    const p = e.target.closest('.provider'); if (!p) return;
    $$('#topupModal .provider').forEach(x => x.classList.remove('active'));
    p.classList.add('active'); topupProvider = p.dataset.provider;
});

$('#startTopup').addEventListener('click', () => {
    const amt = parseInt($('#topupAmount').value || '0', 10);
    if (!topupProvider) { TOAST('Bank/logoni tanlang.'); return; }
    if (!(amt > 0)) { TOAST('Summani kiriting.'); return; }
    $('#topupModal').classList.remove('open');
    $('#overlay').classList.add('open');
    const DURATION_MS = 4000; // demo
    setTimeout(() => {
        $('#overlay').classList.remove('open');
        state.balance += amt;
        state.history.push({ time: Date.now(), type: 'Balans', note: `${topupProvider} orqali to'ldirish`, amount: amt });
        persist();
        TOAST(`Balans to'ldirildi: <b>${formatSom(amt)}</b>`);
    }, DURATION_MS);
});

/* ===================== HISTORY — SUPPORT ===================== */
$('#helpBtn').addEventListener('click', () => { genCaptcha(); $('#helpModal').classList.add('open') });
$$('#helpModal [data-close]').forEach(x => x.addEventListener('click', () => $('#helpModal').classList.remove('open')));

function genCaptcha() { $('#captchaText').textContent = ('' + Math.floor(1000 + Math.random() * 9000)); }
$('#refreshCaptcha').addEventListener('click', genCaptcha);

$('#supportForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    if (fd.get('captcha') !== $('#captchaText').textContent) { TOAST('Captcha noto\'g\'ri'); return; }
    const name = fd.get('name'), email = fd.get('email'), message = fd.get('message');
    // mailto fallback
    const subj = encodeURIComponent('Texnik yordam so\'rovi — AetherX');
    const body = encodeURIComponent(`Ism: ${name}\nEmail: ${email}\n\nXabar:\n${message}`);
    window.location.href = `mailto:your-email@example.com?subject=${subj}&body=${body}`; // ← EMAILNI O'ZGARTIRING
    $('#helpModal').classList.remove('open');
    TOAST('Xabar tayyorlandi (pochta dasturi ochiladi).');
});

/* ===================== START ===================== */
init();