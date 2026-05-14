const i18n = window.appI18n;
const t = (key, vars) => i18n.t(key, vars);

const txtUrls = document.getElementById('txtUrls');
const txtFolder = document.getElementById('txtFolder');
const btnSelectFolder = document.getElementById('btnSelectFolder');
const btnFetchInfo = document.getElementById('btnFetchInfo');
const btnDownload = document.getElementById('btnDownload');
const btnCancelDownload = document.getElementById('btnCancelDownload');
const cmbLanguage = document.getElementById('cmbLanguage');
const cmbQuality = document.getElementById('cmbQuality');
const chkMp3 = document.getElementById('chkMp3');
const chkOpenFolderWhenDone = document.getElementById('chkOpenFolderWhenDone');
const imgThumbnail = document.getElementById('imgThumbnail');
const thumbPlaceholder = document.getElementById('thumbPlaceholder');
const lblVideoTitle = document.getElementById('lblVideoTitle');
const progressBar = document.getElementById('progressBar');
const lblStatus = document.getElementById('lblStatus');
const queuePanel = document.getElementById('queuePanel');
const urlQueueList = document.getElementById('urlQueueList');
const toastHost = document.getElementById('toastHost');

const SUPPORTED_UI_LANGS = ['tr', 'en', 'es', 'fr', 'it', 'de', 'ja', 'zh', 'ru'];

const infoCache = new Map();
let infoCacheSignature = '';

let lastStatusTemplate = { key: 'status.checking_engines', vars: {} };
let lastProgressSnapshot = null;

function setStatusLine(key, vars) {
    lastProgressSnapshot = null;
    lastStatusTemplate = { key, vars: vars || {} };
    lblStatus.textContent = t(key, lastStatusTemplate.vars);
}

function formatAndSetProgress(data) {
    let percent = data.percent || 0;
    if (percent > 100) percent = 100;
    if (percent < 0) percent = 0;

    lastProgressSnapshot = {
        percent,
        size: data.size,
        speed: data.speed,
        eta: data.eta
    };

    progressBar.style.width = `${percent}%`;

    const vars = {
        percent,
        size: data.size || t('progress.size_calculating'),
        speed: data.speed || '0 KiB/s',
        eta: data.eta || '--:--'
    };
    lastStatusTemplate = { key: 'progress.downloading', vars };
    lblStatus.textContent = t('progress.downloading', vars);
}

function refreshAfterLanguageChange() {
    i18n.applyStatic();
    cmbLanguage.value = i18n.getLang();

    if (lastStatusTemplate.key === '__raw__') {
        lblStatus.textContent = lastStatusTemplate.vars.raw;
    } else if (lastStatusTemplate.key === 'progress.downloading' && lastProgressSnapshot) {
        formatAndSetProgress(lastProgressSnapshot);
    } else {
        lblStatus.textContent = t(lastStatusTemplate.key, lastStatusTemplate.vars);
    }

    refreshQueueLabels();
}

function resolveErrorMessage(res) {
    if (res && res.code) {
        const key = `code.${res.code}`;
        const msg = t(key);
        if (msg !== key) return msg;
    }
    return (res && res.error) || t('error.unknown');
}

const bumpTitleAnimation = () => {
    lblVideoTitle.classList.remove('title-updated');
    void lblVideoTitle.offsetWidth;
    lblVideoTitle.classList.add('title-updated');
};

const applyVideoInfoToUi = (info) => {
    if (info && info.success) {
        thumbPlaceholder.classList.add('is-hidden');
        imgThumbnail.classList.remove('thumb-loaded');
        imgThumbnail.onload = async () => {
            try {
                await imgThumbnail.decode();
            } catch {
                /* optional */
            }
            imgThumbnail.classList.add('thumb-loaded');
        };
        imgThumbnail.removeAttribute('hidden');
        imgThumbnail.src = info.thumbnail;
        if (imgThumbnail.complete && imgThumbnail.naturalWidth > 0) {
            imgThumbnail.classList.add('thumb-loaded');
        }
        lblVideoTitle.textContent = info.title || '';
        bumpTitleAnimation();
        return;
    }

    imgThumbnail.onload = null;
    imgThumbnail.removeAttribute('src');
    imgThumbnail.setAttribute('hidden', '');
    imgThumbnail.classList.remove('thumb-loaded');
    thumbPlaceholder.classList.remove('is-hidden');
    lblVideoTitle.textContent = t('video.title_unavailable');
    bumpTitleAnimation();
};

function isValidUrl(raw) {
    try {
        const u = new URL(raw);
        return u.protocol === 'http:' || u.protocol === 'https:';
    } catch {
        return false;
    }
}

function parseUrlLines(text) {
    const lines = text.split('\n').map((l) => l.trim());
    const nonEmpty = lines.filter((l) => l !== '');
    const valid = [];
    const invalid = [];
    for (const line of nonEmpty) {
        if (isValidUrl(line)) {
            valid.push(line);
        } else {
            invalid.push(line);
        }
    }
    return { valid, invalid, nonEmptyCount: nonEmpty.length };
}

function showToast(message, type = 'info', durationMs = 5200) {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.setAttribute('role', 'status');

    const closeBtn = document.createElement('button');
    closeBtn.type = 'button';
    closeBtn.className = 'toast-close';
    closeBtn.setAttribute('aria-label', t('ui.close'));
    closeBtn.textContent = '×';

    const body = document.createElement('div');
    body.textContent = message;

    toast.appendChild(closeBtn);
    toast.appendChild(body);
    toastHost.appendChild(toast);

    let timer = setTimeout(() => removeToast(), durationMs);

    const removeToast = () => {
        clearTimeout(timer);
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(8px)';
        toast.style.transition = 'opacity 0.2s ease, transform 0.2s ease';
        setTimeout(() => toast.remove(), 220);
    };

    closeBtn.addEventListener('click', removeToast);
}

function setQueueRowState(row, state, errText, skipDatasetWrite) {
    if (!skipDatasetWrite) {
        row.dataset.queueState = state;
        if (errText) {
            row.dataset.queueError = errText;
        } else {
            delete row.dataset.queueError;
        }
    }

    row.classList.remove('is-running', 'is-done', 'is-error', 'is-skipped', 'is-cancelled');
    const pill = row.querySelector('.pill-status');
    const hint = row.querySelector('.err-hint');
    if (hint) {
        hint.remove();
    }

    const map = {
        pending: ['queue.pending', 'pending'],
        running: ['queue.running', 'running'],
        done: ['queue.done', 'done'],
        error: ['queue.error', 'error'],
        skipped: ['queue.skipped', 'skipped'],
        cancelled: ['queue.cancelled', 'cancelled']
    };
    const [labelKey, cls] = map[state] || map.pending;
    pill.textContent = t(labelKey);
    pill.className = `pill-status ${cls}`;

    if (state === 'running') row.classList.add('is-running');
    if (state === 'done') row.classList.add('is-done');
    if (state === 'error') row.classList.add('is-error');
    if (state === 'skipped') row.classList.add('is-skipped');
    if (state === 'cancelled') row.classList.add('is-cancelled');

    if (state === 'error' && errText) {
        const span = document.createElement('span');
        span.className = 'err-hint';
        span.textContent = errText;
        row.appendChild(span);
    }
}

function refreshQueueLabels() {
    urlQueueList.querySelectorAll('.url-queue-item').forEach((row) => {
        const state = row.dataset.queueState;
        if (!state) return;
        const err = row.dataset.queueError || '';
        setQueueRowState(row, state, err || undefined, true);
    });
}

function buildQueueUi(urls) {
    urlQueueList.innerHTML = '';
    const rows = [];
    for (const url of urls) {
        const li = document.createElement('li');
        li.className = 'url-queue-item';
        li.dataset.queueState = 'pending';

        const pill = document.createElement('span');
        pill.className = 'pill-status pending';
        pill.textContent = t('queue.pending');

        const urlSpan = document.createElement('span');
        urlSpan.className = 'url-text';
        urlSpan.textContent = url;

        li.appendChild(pill);
        li.appendChild(urlSpan);
        urlQueueList.appendChild(li);
        rows.push(li);
    }
    return rows;
}

function persistOpenFolderPref() {
    window.api.saveAppSettings({ openFolderWhenDone: chkOpenFolderWhenDone.checked });
}

function persistLastFolder(folderPath) {
    if (folderPath) {
        window.api.saveAppSettings({ lastDownloadFolder: folderPath });
    }
}

function persistLanguage() {
    window.api.saveAppSettings({ uiLanguage: cmbLanguage.value });
}

btnFetchInfo.disabled = true;
btnDownload.disabled = true;

i18n.applyStatic();
setStatusLine('status.checking_engines');

window.api.onProgress((data) => {
    if (data.type === 'status') {
        progressBar.classList.remove('is-active');
        if (data.key) {
            setStatusLine(data.key);
            if (data.key === 'status.ready') {
                btnFetchInfo.disabled = false;
                btnDownload.disabled = false;
            }
        } else if (data.text) {
            lastProgressSnapshot = null;
            lastStatusTemplate = { key: '__raw__', vars: { raw: data.text } };
            lblStatus.textContent = data.text;
        }
    } else if (data.type === 'progress') {
        progressBar.classList.add('is-active');
        formatAndSetProgress(data);
    }
});

cmbLanguage.addEventListener('change', () => {
    i18n.setLang(cmbLanguage.value);
    persistLanguage();
    refreshAfterLanguageChange();
});

btnSelectFolder.addEventListener('click', async () => {
    const folder = await window.api.selectFolder();
    if (folder) {
        txtFolder.value = folder;
        persistLastFolder(folder);
    }
});

chkOpenFolderWhenDone.addEventListener('change', persistOpenFolderPref);

btnCancelDownload.addEventListener('click', async () => {
    await window.api.cancelDownload();
});

const prefetchVideoInfos = async (urls) => {
    infoCache.clear();

    for (let i = 0; i < urls.length; i++) {
        const url = urls[i];
        setStatusLine('status.prefetch', { current: i + 1, total: urls.length });
        const res = await window.api.getVideoInfo(url);
        infoCache.set(url, res);
    }

    infoCacheSignature = urls.join('|');
};

const ensureVideoInfos = async (urls) => {
    const signature = urls.join('|');
    if (infoCacheSignature === signature && infoCache.size === urls.length) {
        return;
    }

    await prefetchVideoInfos(urls);
};

btnFetchInfo.addEventListener('click', async () => {
    const { valid: urls, invalid } = parseUrlLines(txtUrls.value);
    if (urls.length === 0) {
        showToast(
            invalid.length ? t('toast.no_valid_youtube') : t('toast.enter_url'),
            'error',
            6500
        );
        return;
    }
    if (invalid.length) {
        showToast(t('toast.invalid_lines_fetch', { n: invalid.length }), 'info', 6000);
    }

    document.body.classList.add('is-fetching');
    setStatusLine('status.fetch_info');
    btnFetchInfo.disabled = true;
    cmbQuality.innerHTML = '';

    try {
        await prefetchVideoInfos(urls);
        const firstInfo = infoCache.get(urls[0]);

        if (firstInfo && firstInfo.success) {
            applyVideoInfoToUi(firstInfo);
            setStatusLine('status.info_loaded', { title: firstInfo.title });
            showToast(t('toast.info_updated'), 'success', 4000);

            firstInfo.qualities.forEach((q) => {
                const option = document.createElement('option');
                option.value = q;
                option.text = `${q}p`;
                cmbQuality.appendChild(option);
            });
        } else {
            setStatusLine('status.no_video_data');
            const err = resolveErrorMessage(firstInfo || {});
            showToast(t('toast.fetch_failed', { msg: err }), 'error', 8000);
        }
    } finally {
        document.body.classList.remove('is-fetching');
        btnFetchInfo.disabled = false;
    }
});

btnDownload.addEventListener('click', async () => {
    const { valid: urls, invalid } = parseUrlLines(txtUrls.value);
    const folder = txtFolder.value;

    if (urls.length === 0) {
        showToast(invalid.length ? t('toast.no_youtube_dl') : t('toast.enter_valid_url'), 'error', 6500);
        return;
    }
    if (invalid.length) {
        showToast(t('toast.invalid_lines_dl', { n: invalid.length }), 'info', 6000);
    }
    if (!folder) {
        showToast(t('toast.pick_folder'), 'error', 5000);
        return;
    }

    const queueRows = buildQueueUi(urls);
    queuePanel.removeAttribute('hidden');

    document.body.classList.add('is-downloading');
    btnDownload.disabled = true;
    btnFetchInfo.disabled = true;
    btnCancelDownload.hidden = false;

    let basarili = 0;
    let hatali = 0;
    let cancelledBatch = false;

    try {
        await ensureVideoInfos(urls);

        for (let i = 0; i < urls.length; i++) {
            const url = urls[i];
            const row = queueRows[i];
            const info = infoCache.get(url);
            applyVideoInfoToUi(info);

            setQueueRowState(row, 'running');
            setStatusLine('status.job_start', { current: i + 1, total: urls.length });
            progressBar.style.width = '0%';
            progressBar.classList.remove('is-active');

            let formatKodu = 'bestvideo[ext=mp4]+bestaudio[ext=m4a]/best[ext=mp4]/best';
            if (cmbQuality.value) {
                formatKodu = `bestvideo[height<=${cmbQuality.value}][ext=mp4]+bestaudio[ext=m4a]/best[ext=mp4]/best`;
            }

            const isMp3 = chkMp3.checked;

            const res = await window.api.downloadVideo({
                url,
                format: formatKodu,
                folder,
                filenameTemplate: '%(title)s.%(ext)s',
                isMp3
            });

            if (res.cancelled) {
                cancelledBatch = true;
                setQueueRowState(row, 'cancelled');
                for (let j = i + 1; j < urls.length; j++) {
                    setQueueRowState(queueRows[j], 'skipped');
                }
                progressBar.classList.remove('is-active');
                setStatusLine('status.cancelled_user');
                showToast(t('toast.download_cancelled'), 'info', 5000);
                break;
            }

            if (res.success) {
                basarili++;
                setQueueRowState(row, 'done');
            } else {
                hatali++;
                const errMsg = resolveErrorMessage(res);
                setQueueRowState(row, 'error', errMsg);
                console.error('İndirme hatası:', res.error || res.code);
                showToast(t('toast.download_error', { msg: errMsg }), 'error', 9000);
            }
        }

        if (!cancelledBatch) {
            progressBar.style.width = '100%';
            progressBar.classList.remove('is-active');
            setStatusLine('status.batch_done', { ok: basarili, fail: hatali });
            showToast(
                t('toast.batch_done', { ok: basarili, fail: hatali }),
                basarili > 0 && hatali === 0 ? 'success' : 'info',
                7000
            );
            if (chkOpenFolderWhenDone.checked) {
                window.api.openFolder(folder);
            }
        } else if (basarili > 0 && chkOpenFolderWhenDone.checked) {
            window.api.openFolder(folder);
        }
    } finally {
        document.body.classList.remove('is-downloading');
        btnDownload.disabled = false;
        btnFetchInfo.disabled = false;
        btnCancelDownload.hidden = true;
    }
});

(async function initSettings() {
    try {
        const s = await window.api.getAppSettings();
        if (s.lastDownloadFolder) {
            txtFolder.value = s.lastDownloadFolder;
        }
        if (typeof s.openFolderWhenDone === 'boolean') {
            chkOpenFolderWhenDone.checked = s.openFolderWhenDone;
        }
        if (s.uiLanguage && SUPPORTED_UI_LANGS.includes(s.uiLanguage)) {
            i18n.setLang(s.uiLanguage);
            cmbLanguage.value = s.uiLanguage;
        }
        refreshAfterLanguageChange();
    } catch (e) {
        console.error('Ayarlar yüklenemedi:', e);
    }
})();
