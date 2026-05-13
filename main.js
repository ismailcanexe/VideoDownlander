const { app, BrowserWindow, ipcMain, dialog, shell } = require('electron');
const { execFile } = require('child_process');
const path = require('path');
const fs = require('fs');
const YTDlpWrap = require('yt-dlp-wrap').default;
const ffmpegPath = require('ffmpeg-static');

let ytDlpWrap;
let mainWindow;

const ytDlpBinaryPath = path.join(app.getPath('userData'), 'yt-dlp.exe');
const settingsPath = path.join(app.getPath('userData'), 'app-settings.json');

let activeDownloadAbort = null;
let activeDownloadProcess = null;

let fPath = ffmpegPath;
if (fPath.includes('app.asar')) {
    fPath = fPath.replace('app.asar', 'app.asar.unpacked');
}

function loadSettings() {
    try {
        return JSON.parse(fs.readFileSync(settingsPath, 'utf8'));
    } catch {
        return {};
    }
}

function saveSettings(partial) {
    try {
        const next = { ...loadSettings(), ...partial };
        fs.writeFileSync(settingsPath, JSON.stringify(next), 'utf8');
        return next;
    } catch (e) {
        console.error('Ayar kaydedilemedi:', e);
        return null;
    }
}

const createWindow = () => {
    mainWindow = new BrowserWindow({
        width: 920,
        height: 760,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: false,
            contextIsolation: true
        }
    });

    mainWindow.loadFile('index.html');
};

app.whenReady().then(() => {
    createWindow();

    mainWindow.webContents.on('did-finish-load', async () => {
        try {
            if (!fs.existsSync(ytDlpBinaryPath)) {
                mainWindow.webContents.send('download-progress', {
                    type: 'status',
                    key: 'status.ytdlp_downloading'
                });

                await YTDlpWrap.downloadFromGithub(ytDlpBinaryPath);
            }

            ytDlpWrap = new YTDlpWrap(ytDlpBinaryPath);
            mainWindow.webContents.send('download-progress', {
                type: 'status',
                key: 'status.ready'
            });
        } catch (error) {
            console.error('Motor indirme hatası:', error);
            mainWindow.webContents.send('download-progress', {
                type: 'status',
                key: 'status.ytdlp_install_failed'
            });
        }
    });
});

ipcMain.handle('get-app-settings', () => loadSettings());

ipcMain.handle('save-app-settings', (event, partial) => {
    if (!partial || typeof partial !== 'object') return loadSettings();
    return saveSettings(partial) || loadSettings();
});

ipcMain.handle('select-folder', async () => {
    const result = await dialog.showOpenDialog(mainWindow, {
        properties: ['openDirectory']
    });
    return result.canceled ? null : result.filePaths[0];
});

ipcMain.handle('open-folder', async (event, folderPath) => {
    await shell.openPath(folderPath);
});

ipcMain.handle('cancel-download', () => {
    if (activeDownloadAbort) {
        activeDownloadAbort.cancelled = true;
    }
    const proc = activeDownloadProcess;
    if (!proc || proc.killed) {
        return { ok: false };
    }
    try {
        if (process.platform === 'win32') {
            // Tüm alt süreçleri (ffmpeg vb.) birlikte sonlandırır; yalnızca kill() bazen yetersiz kalır.
            execFile(
                'taskkill',
                ['/PID', String(proc.pid), '/T', '/F'],
                { windowsHide: true },
                () => {}
            );
        } else {
            proc.kill('SIGTERM');
        }
    } catch (e) {
        console.error('cancel-download:', e);
    }
    return { ok: true };
});

ipcMain.handle('get-video-info', async (event, url) => {
    if (!ytDlpWrap) {
        return { success: false, code: 'YT_DLP_NOT_READY_INFO' };
    }
    try {
        const metadata = await ytDlpWrap.getVideoInfo(url);

        const qualities = metadata.formats
            .filter((f) => f.vcodec !== 'none' && f.height)
            .map((f) => f.height)
            .filter((value, index, self) => self.indexOf(value) === index)
            .sort((a, b) => b - a);

        return {
            success: true,
            title: metadata.title,
            thumbnail: metadata.thumbnail,
            qualities
        };
    } catch (error) {
        return { success: false, error: error.message };
    }
});

ipcMain.handle('download-video', async (event, { url, format, folder, filenameTemplate, isMp3 }) => {
    if (!ytDlpWrap) {
        return { success: false, code: 'YT_DLP_NOT_READY_DL' };
    }

    return new Promise((resolve) => {
        let settled = false;
        const abortState = { cancelled: false };

        const done = (result) => {
            if (settled) return;
            settled = true;
            if (activeDownloadProcess === proc) {
                activeDownloadProcess = null;
                activeDownloadAbort = null;
            }
            resolve(result);
        };

        const ytDlpArgs = [url, '-o', path.join(folder, filenameTemplate), '--ffmpeg-location', fPath];
        if (isMp3) {
            ytDlpArgs.push('-x', '--audio-format', 'mp3');
        } else {
            ytDlpArgs.push('-f', format, '--merge-output-format', 'mp4');
        }

        const emitter = ytDlpWrap.exec(ytDlpArgs);
        const proc = emitter.ytDlpProcess;

        activeDownloadAbort = abortState;
        activeDownloadProcess = proc;

        emitter.on('progress', (progress) => {
            if (!mainWindow || mainWindow.isDestroyed()) return;
            mainWindow.webContents.send('download-progress', {
                type: 'progress',
                percent: progress.percent,
                size: progress.totalSize,
                speed: progress.currentSpeed,
                eta: progress.eta
            });
        });

        emitter.on('error', (error) => {
            const msg = error && error.message ? error.message : String(error);
            done({ success: false, error: msg });
        });

        emitter.on('close', () => {
            if (abortState.cancelled || proc.killed) {
                done({ success: false, cancelled: true, code: 'DOWNLOAD_CANCELLED' });
                return;
            }
            done({ success: true });
        });
    });
});
