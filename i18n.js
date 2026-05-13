(function () {
    const STRINGS = {
        tr: {
            'ui.title': 'Video İndirici',
            'ui.section_links': 'Bağlantılar',
            'ui.section_details': 'Video Detayları',
            'ui.urls_placeholder': 'Her satıra bir YouTube linki yapıştırın...',
            'ui.audio_only_mp3': 'Sadece Ses (MP3)',
            'ui.fetch_info': 'Verileri Çek',
            'ui.video_waiting': 'Video bekleniyor...',
            'ui.quality': 'Çözünürlük',
            'ui.target_folder': 'Hedef Klasör',
            'ui.folder_placeholder': 'C:\\Users\\...',
            'ui.browse': 'Gözat',
            'ui.open_folder_when_done': 'İndirme bitince klasörü aç',
            'ui.start_download': 'İNDİRMEYİ BAŞLAT',
            'ui.cancel': 'İptal',
            'ui.queue_heading': 'İndirme sırası',
            'ui.queue_aria': 'İndirme sırası',
            'ui.language': 'Dil',
            'ui.close': 'Kapat',

            'status.checking_engines': 'Motorlar kontrol ediliyor...',
            'status.ytdlp_downloading': "İlk kurulum: yt-dlp GitHub'dan indiriliyor (Bu işlem boyut ve internete göre birkaç dakika sürebilir)...",
            'status.ready': 'Sistem hazır. Video linki yapıştırabilirsiniz.',
            'status.ytdlp_install_failed': 'Hata: yt-dlp indirilemedi! İnternet bağlantını veya GitHub erişimini kontrol et.',
            'status.fetch_info': 'Video bilgileri aranıyor...',
            'status.prefetch': 'Video bilgileri alınıyor... ({{current}}/{{total}})',
            'status.info_loaded': '{{title}} bilgileri alındı.',
            'status.no_video_data': 'Video verisi alınamadı.',
            'status.job_start': '[{{current}}/{{total}}] İşlem başlıyor...',
            'status.cancelled_user': 'İndirme kullanıcı tarafından iptal edildi.',
            'status.batch_done': 'İşlem bitti. Başarılı: {{ok}}, Hatalı: {{fail}}',

            'progress.downloading': 'İndiriliyor... %{{percent}} | Boyut: {{size}} | Hız: {{speed}} | Kalan: {{eta}}',
            'progress.size_calculating': 'Hesaplanıyor',

            'video.title_unavailable': 'Başlık alınamadı.',

            'queue.pending': 'Bekliyor',
            'queue.running': 'İndiriliyor',
            'queue.done': 'Tamamlandı',
            'queue.error': 'Hata',
            'queue.skipped': 'Atlandı',
            'queue.cancelled': 'İptal',

            'toast.no_valid_youtube': 'Geçerli bir YouTube linki yok. youtube.com/watch, youtu.be veya shorts formatını kullanın.',
            'toast.enter_url': 'Lütfen en az bir URL girin.',
            'toast.invalid_lines_fetch': '{{n}} satır geçersiz veya desteklenmeyen link olarak atlandı.',
            'toast.info_updated': 'Video bilgileri güncellendi.',
            'toast.fetch_failed': 'Veri alınamadı: {{msg}}',
            'toast.no_youtube_dl': 'Geçerli YouTube linki bulunamadı.',
            'toast.enter_valid_url': 'Lütfen en az bir geçerli URL girin.',
            'toast.invalid_lines_dl': '{{n}} satır atlandı (yalnızca YouTube linkleri desteklenir).',
            'toast.pick_folder': 'Lütfen indirme klasörü seçin.',
            'toast.download_cancelled': 'İndirme iptal edildi.',
            'toast.download_error': 'İndirme hatası: {{msg}}',
            'toast.batch_done': 'Tamamlandı. Başarılı: {{ok}}, Hatalı: {{fail}}.',

            'error.unknown': 'Bilinmeyen hata',
            'error.unknown_short': 'Bilinmeyen',

            'code.YT_DLP_NOT_READY_INFO': 'yt-dlp henüz hazır değil. Birkaç saniye sonra tekrar deneyin.',
            'code.YT_DLP_NOT_READY_DL': 'yt-dlp henüz hazır değil.',
            'code.DOWNLOAD_CANCELLED': 'İndirme iptal edildi.'
        },
        en: {
            'ui.title': 'Video Downloader',
            'ui.section_links': 'Links',
            'ui.section_details': 'Video details',
            'ui.urls_placeholder': 'Paste one YouTube link per line...',
            'ui.audio_only_mp3': 'Audio only (MP3)',
            'ui.fetch_info': 'Fetch info',
            'ui.video_waiting': 'Waiting for video...',
            'ui.quality': 'Resolution',
            'ui.target_folder': 'Destination folder',
            'ui.folder_placeholder': 'C:\\Users\\...',
            'ui.browse': 'Browse',
            'ui.open_folder_when_done': 'Open folder when finished',
            'ui.start_download': 'START DOWNLOAD',
            'ui.cancel': 'Cancel',
            'ui.queue_heading': 'Download queue',
            'ui.queue_aria': 'Download queue',
            'ui.language': 'Language',
            'ui.close': 'Close',

            'status.checking_engines': 'Checking engine...',
            'status.ytdlp_downloading': 'First run: downloading yt-dlp from GitHub (may take a few minutes depending on size and connection)...',
            'status.ready': 'Ready. You can paste a video link.',
            'status.ytdlp_install_failed': 'Error: yt-dlp could not be downloaded. Check your internet or GitHub access.',
            'status.fetch_info': 'Fetching video info...',
            'status.prefetch': 'Fetching video info... ({{current}}/{{total}})',
            'status.info_loaded': 'Loaded info: {{title}}.',
            'status.no_video_data': 'Could not load video data.',
            'status.job_start': '[{{current}}/{{total}}] Starting...',
            'status.cancelled_user': 'Download cancelled by user.',
            'status.batch_done': 'Done. Success: {{ok}}, Failed: {{fail}}',

            'progress.downloading': 'Downloading... {{percent}}% | Size: {{size}} | Speed: {{speed}} | ETA: {{eta}}',
            'progress.size_calculating': 'Calculating',

            'video.title_unavailable': 'Title unavailable.',

            'queue.pending': 'Queued',
            'queue.running': 'Downloading',
            'queue.done': 'Done',
            'queue.error': 'Error',
            'queue.skipped': 'Skipped',
            'queue.cancelled': 'Cancelled',

            'toast.no_valid_youtube': 'No valid YouTube link. Use youtube.com/watch, youtu.be, or /shorts URLs.',
            'toast.enter_url': 'Please enter at least one URL.',
            'toast.invalid_lines_fetch': '{{n}} line(s) skipped (invalid or unsupported URL).',
            'toast.info_updated': 'Video info updated.',
            'toast.fetch_failed': 'Could not fetch data: {{msg}}',
            'toast.no_youtube_dl': 'No valid YouTube link found.',
            'toast.enter_valid_url': 'Please enter at least one valid URL.',
            'toast.invalid_lines_dl': '{{n}} line(s) skipped (only YouTube links are supported).',
            'toast.pick_folder': 'Please choose a download folder.',
            'toast.download_cancelled': 'Download cancelled.',
            'toast.download_error': 'Download error: {{msg}}',
            'toast.batch_done': 'Finished. Success: {{ok}}, Failed: {{fail}}.',

            'error.unknown': 'Unknown error',
            'error.unknown_short': 'Unknown',

            'code.YT_DLP_NOT_READY_INFO': 'yt-dlp is not ready yet. Try again in a few seconds.',
            'code.YT_DLP_NOT_READY_DL': 'yt-dlp is not ready yet.',
            'code.DOWNLOAD_CANCELLED': 'Download cancelled.'
        },
        es: {
            'ui.title': 'Descargador de Videos',
            'ui.section_links': 'Enlaces',
            'ui.section_details': 'Detalles del video',
            'ui.urls_placeholder': 'Pega un enlace de YouTube por línea...',
            'ui.audio_only_mp3': 'Solo audio (MP3)',
            'ui.fetch_info': 'Obtener datos',
            'ui.video_waiting': 'Esperando video...',
            'ui.quality': 'Resolución',
            'ui.target_folder': 'Carpeta de destino',
            'ui.folder_placeholder': 'C:\\Users\\...',
            'ui.browse': 'Examinar',
            'ui.open_folder_when_done': 'Abrir carpeta al terminar',
            'ui.start_download': 'INICIAR DESCARGA',
            'ui.cancel': 'Cancelar',
            'ui.queue_heading': 'Cola de descarga',
            'ui.queue_aria': 'Cola de descarga',
            'ui.language': 'Idioma',
            'ui.close': 'Cerrar',

            'status.checking_engines': 'Comprobando motores...',
            'status.ytdlp_downloading': 'Primera ejecución: descargando yt-dlp de GitHub (puede tardar unos minutos)...',
            'status.ready': 'Listo. Puedes pegar un enlace de video.',
            'status.ytdlp_install_failed': 'Error: no se pudo descargar yt-dlp. Revisa tu conexión a internet.',
            'status.fetch_info': 'Obteniendo info del video...',
            'status.prefetch': 'Obteniendo info del video... ({{current}}/{{total}})',
            'status.info_loaded': 'Info cargada: {{title}}.',
            'status.no_video_data': 'No se pudieron obtener los datos del video.',
            'status.job_start': '[{{current}}/{{total}}] Iniciando proceso...',
            'status.cancelled_user': 'Descarga cancelada por el usuario.',
            'status.batch_done': 'Terminado. Éxito: {{ok}}, Fallos: {{fail}}',

            'progress.downloading': 'Descargando... {{percent}}% | Tamaño: {{size}} | Vel: {{speed}} | Faltan: {{eta}}',
            'progress.size_calculating': 'Calculando',

            'video.title_unavailable': 'Título no disponible.',

            'queue.pending': 'En espera',
            'queue.running': 'Descargando',
            'queue.done': 'Completado',
            'queue.error': 'Error',
            'queue.skipped': 'Omitido',
            'queue.cancelled': 'Cancelado',

            'toast.no_valid_youtube': 'No hay un enlace válido. Usa youtube.com/watch, youtu.be o shorts.',
            'toast.enter_url': 'Por favor ingresa al menos una URL.',
            'toast.invalid_lines_fetch': '{{n}} línea(s) omitida(s) por enlace no válido.',
            'toast.info_updated': 'Información del video actualizada.',
            'toast.fetch_failed': 'Error al obtener datos: {{msg}}',
            'toast.no_youtube_dl': 'No se encontró un enlace de YouTube válido.',
            'toast.enter_valid_url': 'Ingresa al menos una URL válida.',
            'toast.invalid_lines_dl': '{{n}} línea(s) omitida(s) (solo se admite YouTube).',
            'toast.pick_folder': 'Elige una carpeta de destino.',
            'toast.download_cancelled': 'Descarga cancelada.',
            'toast.download_error': 'Error de descarga: {{msg}}',
            'toast.batch_done': 'Terminado. Éxito: {{ok}}, Fallos: {{fail}}.',

            'error.unknown': 'Error desconocido',
            'error.unknown_short': 'Desconocido',

            'code.YT_DLP_NOT_READY_INFO': 'yt-dlp no está listo. Intenta de nuevo en unos segundos.',
            'code.YT_DLP_NOT_READY_DL': 'yt-dlp no está listo.',
            'code.DOWNLOAD_CANCELLED': 'Descarga cancelada.'
        },
        fr: {
            'ui.title': 'Téléchargeur de Vidéos',
            'ui.section_links': 'Liens',
            'ui.section_details': 'Détails de la vidéo',
            'ui.urls_placeholder': 'Collez un lien YouTube par ligne...',
            'ui.audio_only_mp3': 'Audio uniquement (MP3)',
            'ui.fetch_info': 'Obtenir les infos',
            'ui.video_waiting': 'En attente de la vidéo...',
            'ui.quality': 'Résolution',
            'ui.target_folder': 'Dossier de destination',
            'ui.folder_placeholder': 'C:\\Users\\...',
            'ui.browse': 'Parcourir',
            'ui.open_folder_when_done': 'Ouvrir le dossier une fois terminé',
            'ui.start_download': 'DÉMARRER LE TÉLÉCHARGEMENT',
            'ui.cancel': 'Annuler',
            'ui.queue_heading': 'File d\'attente',
            'ui.queue_aria': 'File d\'attente',
            'ui.language': 'Langue',
            'ui.close': 'Fermer',

            'status.checking_engines': 'Vérification des moteurs...',
            'status.ytdlp_downloading': 'Premier lancement: téléchargement de yt-dlp (cela peut prendre quelques minutes)...',
            'status.ready': 'Prêt. Vous pouvez coller un lien vidéo.',
            'status.ytdlp_install_failed': 'Erreur: impossible de télécharger yt-dlp. Vérifiez votre connexion.',
            'status.fetch_info': 'Récupération des infos...',
            'status.prefetch': 'Récupération des infos... ({{current}}/{{total}})',
            'status.info_loaded': 'Infos chargées: {{title}}.',
            'status.no_video_data': 'Impossible de charger les données de la vidéo.',
            'status.job_start': '[{{current}}/{{total}}] Démarrage...',
            'status.cancelled_user': 'Téléchargement annulé par l\'utilisateur.',
            'status.batch_done': 'Terminé. Succès: {{ok}}, Échecs: {{fail}}',

            'progress.downloading': 'Téléchargement... {{percent}}% | Taille: {{size}} | Vitesse: {{speed}} | Reste: {{eta}}',
            'progress.size_calculating': 'Calcul en cours',

            'video.title_unavailable': 'Titre indisponible.',

            'queue.pending': 'En attente',
            'queue.running': 'En cours',
            'queue.done': 'Terminé',
            'queue.error': 'Erreur',
            'queue.skipped': 'Ignoré',
            'queue.cancelled': 'Annulé',

            'toast.no_valid_youtube': 'Aucun lien YouTube valide. Utilisez youtube.com/watch, youtu.be ou shorts.',
            'toast.enter_url': 'Veuillez entrer au moins une URL.',
            'toast.invalid_lines_fetch': '{{n}} ligne(s) ignorée(s) (lien invalide ou non supporté).',
            'toast.info_updated': 'Informations de la vidéo mises à jour.',
            'toast.fetch_failed': 'Impossible de récupérer les données: {{msg}}',
            'toast.no_youtube_dl': 'Aucun lien YouTube valide trouvé.',
            'toast.enter_valid_url': 'Veuillez entrer une URL valide.',
            'toast.invalid_lines_dl': '{{n}} ligne(s) ignorée(s) (seul YouTube est supporté).',
            'toast.pick_folder': 'Veuillez choisir un dossier de destination.',
            'toast.download_cancelled': 'Téléchargement annulé.',
            'toast.download_error': 'Erreur de téléchargement: {{msg}}',
            'toast.batch_done': 'Terminé. Succès: {{ok}}, Échecs: {{fail}}.',

            'error.unknown': 'Erreur inconnue',
            'error.unknown_short': 'Inconnu',

            'code.YT_DLP_NOT_READY_INFO': 'yt-dlp n\'est pas encore prêt. Réessayez dans quelques secondes.',
            'code.YT_DLP_NOT_READY_DL': 'yt-dlp n\'est pas encore prêt.',
            'code.DOWNLOAD_CANCELLED': 'Téléchargement annulé.'
        },
        it: {
            'ui.title': 'Downloader Video',
            'ui.section_links': 'Collegamenti',
            'ui.section_details': 'Dettagli video',
            'ui.urls_placeholder': 'Incolla un link YouTube per riga...',
            'ui.audio_only_mp3': 'Solo audio (MP3)',
            'ui.fetch_info': 'Scarica info',
            'ui.video_waiting': 'In attesa del video...',
            'ui.quality': 'Risoluzione',
            'ui.target_folder': 'Cartella di destinazione',
            'ui.folder_placeholder': 'C:\\Users\\...',
            'ui.browse': 'Sfoglia',
            'ui.open_folder_when_done': 'Apri cartella al termine',
            'ui.start_download': 'AVVIA DOWNLOAD',
            'ui.cancel': 'Annulla',
            'ui.queue_heading': 'Coda download',
            'ui.queue_aria': 'Coda download',
            'ui.language': 'Lingua',
            'ui.close': 'Chiudi',

            'status.checking_engines': 'Verifica motori...',
            'status.ytdlp_downloading':
                'Primo avvio: download di yt-dlp da GitHub (potrebbero servire alcuni minuti)...',
            'status.ready': 'Pronto. Puoi incollare un link al video.',
            'status.ytdlp_install_failed':
                'Errore: impossibile scaricare yt-dlp. Controlla la connessione a Internet.',
            'status.fetch_info': 'Recupero informazioni video...',
            'status.prefetch': 'Recupero informazioni video... ({{current}}/{{total}})',
            'status.info_loaded': 'Info caricate: {{title}}.',
            'status.no_video_data': 'Impossibile caricare i dati del video.',
            'status.job_start': '[{{current}}/{{total}}] Avvio...',
            'status.cancelled_user': 'Download annullato dall\'utente.',
            'status.batch_done': 'Completato. Successi: {{ok}}, Errori: {{fail}}',

            'progress.downloading':
                'Download in corso... {{percent}}% | Dimensione: {{size}} | Velocità: {{speed}} | Rimanente: {{eta}}',
            'progress.size_calculating': 'Calcolo in corso',

            'video.title_unavailable': 'Titolo non disponibile.',

            'queue.pending': 'In coda',
            'queue.running': 'Download',
            'queue.done': 'Completato',
            'queue.error': 'Errore',
            'queue.skipped': 'Saltato',
            'queue.cancelled': 'Annullato',

            'toast.no_valid_youtube':
                'Nessun link YouTube valido. Usa youtube.com/watch, youtu.be o shorts.',
            'toast.enter_url': 'Inserisci almeno un URL.',
            'toast.invalid_lines_fetch': '{{n}} riga/e saltata/e (link non valido o non supportato).',
            'toast.info_updated': 'Informazioni video aggiornate.',
            'toast.fetch_failed': 'Impossibile recuperare i dati: {{msg}}',
            'toast.no_youtube_dl': 'Nessun link YouTube valido trovato.',
            'toast.enter_valid_url': 'Inserisci almeno un URL valido.',
            'toast.invalid_lines_dl': '{{n}} riga/e saltata/e (è supportato solo YouTube).',
            'toast.pick_folder': 'Scegli una cartella di destinazione.',
            'toast.download_cancelled': 'Download annullato.',
            'toast.download_error': 'Errore download: {{msg}}',
            'toast.batch_done': 'Completato. Successi: {{ok}}, Errori: {{fail}}.',

            'error.unknown': 'Errore sconosciuto',
            'error.unknown_short': 'Sconosciuto',

            'code.YT_DLP_NOT_READY_INFO': 'yt-dlp non è ancora pronto. Riprova tra qualche secondo.',
            'code.YT_DLP_NOT_READY_DL': 'yt-dlp non è ancora pronto.',
            'code.DOWNLOAD_CANCELLED': 'Download annullato.'
        },
        de: {
            'ui.title': 'Video-Downloader',
            'ui.section_links': 'Links',
            'ui.section_details': 'Videodetails',
            'ui.urls_placeholder': 'Füge einen YouTube-Link pro Zeile ein...',
            'ui.audio_only_mp3': 'Nur Audio (MP3)',
            'ui.fetch_info': 'Info abrufen',
            'ui.video_waiting': 'Warten auf Video...',
            'ui.quality': 'Auflösung',
            'ui.target_folder': 'Zielordner',
            'ui.folder_placeholder': 'C:\\Users\\...',
            'ui.browse': 'Durchsuchen',
            'ui.open_folder_when_done': 'Ordner nach Abschluss öffnen',
            'ui.start_download': 'DOWNLOAD STARTEN',
            'ui.cancel': 'Abbrechen',
            'ui.queue_heading': 'Warteschlange',
            'ui.queue_aria': 'Warteschlange',
            'ui.language': 'Sprache',
            'ui.close': 'Schließen',

            'status.checking_engines': 'Engines werden überprüft...',
            'status.ytdlp_downloading': 'Erster Start: yt-dlp wird von GitHub heruntergeladen (kann einige Minuten dauern)...',
            'status.ready': 'Bereit. Du kannst einen Videolink einfügen.',
            'status.ytdlp_install_failed': 'Fehler: yt-dlp konnte nicht heruntergeladen werden. Überprüfe deine Internetverbindung.',
            'status.fetch_info': 'Video-Infos werden abgerufen...',
            'status.prefetch': 'Video-Infos werden abgerufen... ({{current}}/{{total}})',
            'status.info_loaded': 'Infos geladen: {{title}}.',
            'status.no_video_data': 'Videodaten konnten nicht geladen werden.',
            'status.job_start': '[{{current}}/{{total}}] Startet...',
            'status.cancelled_user': 'Download vom Benutzer abgebrochen.',
            'status.batch_done': 'Fertig. Erfolgreich: {{ok}}, Fehlgeschlagen: {{fail}}',

            'progress.downloading': 'Herunterladen... {{percent}}% | Größe: {{size}} | Tempo: {{speed}} | ETA: {{eta}}',
            'progress.size_calculating': 'Wird berechnet',

            'video.title_unavailable': 'Titel nicht verfügbar.',

            'queue.pending': 'In der Warteschlange',
            'queue.running': 'Lädt herunter',
            'queue.done': 'Fertig',
            'queue.error': 'Fehler',
            'queue.skipped': 'Übersprungen',
            'queue.cancelled': 'Abgebrochen',

            'toast.no_valid_youtube': 'Kein gültiger YouTube-Link. Nutze youtube.com/watch, youtu.be oder shorts.',
            'toast.enter_url': 'Bitte gib mindestens eine URL ein.',
            'toast.invalid_lines_fetch': '{{n}} Zeile(n) übersprungen (ungültiger Link).',
            'toast.info_updated': 'Video-Infos aktualisiert.',
            'toast.fetch_failed': 'Daten konnten nicht abgerufen werden: {{msg}}',
            'toast.no_youtube_dl': 'Kein gültiger YouTube-Link gefunden.',
            'toast.enter_valid_url': 'Bitte gib eine gültige URL ein.',
            'toast.invalid_lines_dl': '{{n}} Zeile(n) übersprungen (nur YouTube wird unterstützt).',
            'toast.pick_folder': 'Bitte wähle einen Zielordner.',
            'toast.download_cancelled': 'Download abgebrochen.',
            'toast.download_error': 'Download-Fehler: {{msg}}',
            'toast.batch_done': 'Abgeschlossen. Erfolgreich: {{ok}}, Fehlgeschlagen: {{fail}}.',

            'error.unknown': 'Unbekannter Fehler',
            'error.unknown_short': 'Unbekannt',

            'code.YT_DLP_NOT_READY_INFO': 'yt-dlp ist noch nicht bereit. Versuche es in ein paar Sekunden erneut.',
            'code.YT_DLP_NOT_READY_DL': 'yt-dlp ist noch nicht bereit.',
            'code.DOWNLOAD_CANCELLED': 'Download abgebrochen.'
        },
        ja: {
            'ui.title': '動画ダウンローダー',
            'ui.section_links': 'リンク',
            'ui.section_details': '動画の詳細',
            'ui.urls_placeholder': '1行に1つのYouTubeリンクを貼り付けてください...',
            'ui.audio_only_mp3': '音声のみ (MP3)',
            'ui.fetch_info': '情報を取得',
            'ui.video_waiting': '動画を待機中...',
            'ui.quality': '解像度',
            'ui.target_folder': '保存先フォルダ',
            'ui.folder_placeholder': 'C:\\Users\\...',
            'ui.browse': '参照',
            'ui.open_folder_when_done': '完了時にフォルダを開く',
            'ui.start_download': 'ダウンロード開始',
            'ui.cancel': 'キャンセル',
            'ui.queue_heading': 'ダウンロードキュー',
            'ui.queue_aria': 'ダウンロードキュー',
            'ui.language': '言語',
            'ui.close': '閉じる',

            'status.checking_engines': 'エンジンを確認中...',
            'status.ytdlp_downloading': '初回起動: GitHubからyt-dlpをダウンロード中（数分かかる場合があります）...',
            'status.ready': '準備完了。動画リンクを貼り付けてください。',
            'status.ytdlp_install_failed': 'エラー: yt-dlpをダウンロードできませんでした。ネットワークを確認してください。',
            'status.fetch_info': '動画情報を取得中...',
            'status.prefetch': '動画情報を取得中... ({{current}}/{{total}})',
            'status.info_loaded': '情報取得完了: {{title}}.',
            'status.no_video_data': '動画データを取得できませんでした。',
            'status.job_start': '[{{current}}/{{total}}] 開始中...',
            'status.cancelled_user': 'ユーザーによってキャンセルされました。',
            'status.batch_done': '完了。成功: {{ok}}, 失敗: {{fail}}',

            'progress.downloading': 'ダウンロード中... {{percent}}% | サイズ: {{size}} | 速度: {{speed}} | 残り時間: {{eta}}',
            'progress.size_calculating': '計算中',

            'video.title_unavailable': 'タイトルを取得できません',

            'queue.pending': '待機中',
            'queue.running': 'ダウンロード中',
            'queue.done': '完了',
            'queue.error': 'エラー',
            'queue.skipped': 'スキップ',
            'queue.cancelled': 'キャンセル',

            'toast.no_valid_youtube': '無効なリンクです。youtube.com/watch, youtu.be, shortsのいずれかを使用してください。',
            'toast.enter_url': 'URLを1つ以上入力してください。',
            'toast.invalid_lines_fetch': '{{n}} 行がスキップされました（無効なリンク）。',
            'toast.info_updated': '動画情報を更新しました。',
            'toast.fetch_failed': 'データの取得に失敗: {{msg}}',
            'toast.no_youtube_dl': '有効なYouTubeリンクが見つかりません。',
            'toast.enter_valid_url': '有効なURLを入力してください。',
            'toast.invalid_lines_dl': '{{n}} 行がスキップされました（YouTubeのみサポート）。',
            'toast.pick_folder': '保存先フォルダを選択してください。',
            'toast.download_cancelled': 'ダウンロードをキャンセルしました。',
            'toast.download_error': 'ダウンロードエラー: {{msg}}',
            'toast.batch_done': '全処理完了。成功: {{ok}}, 失敗: {{fail}}.',

            'error.unknown': '不明なエラー',
            'error.unknown_short': '不明',

            'code.YT_DLP_NOT_READY_INFO': 'yt-dlpがまだ準備できていません。数秒後にお試しください。',
            'code.YT_DLP_NOT_READY_DL': 'yt-dlpの準備が完了していません。',
            'code.DOWNLOAD_CANCELLED': 'ダウンロードがキャンセルされました。'
        },
        zh: {
            'ui.title': '视频下载器',
            'ui.section_links': '链接',
            'ui.section_details': '视频详情',
            'ui.urls_placeholder': '每行粘贴一个 YouTube 链接...',
            'ui.audio_only_mp3': '仅音频 (MP3)',
            'ui.fetch_info': '获取信息',
            'ui.video_waiting': '等待视频...',
            'ui.quality': '分辨率',
            'ui.target_folder': '目标文件夹',
            'ui.folder_placeholder': 'C:\\Users\\...',
            'ui.browse': '浏览',
            'ui.open_folder_when_done': '完成后打开文件夹',
            'ui.start_download': '开始下载',
            'ui.cancel': '取消',
            'ui.queue_heading': '下载队列',
            'ui.queue_aria': '下载队列',
            'ui.language': '语言',
            'ui.close': '关闭',

            'status.checking_engines': '正在检查引擎...',
            'status.ytdlp_downloading': '首次运行：正在从 GitHub 下载 yt-dlp (可能需要几分钟)...',
            'status.ready': '准备就绪。您可以粘贴视频链接了。',
            'status.ytdlp_install_failed': '错误：无法下载 yt-dlp。请检查您的网络连接。',
            'status.fetch_info': '正在获取视频信息...',
            'status.prefetch': '正在获取视频信息... ({{current}}/{{total}})',
            'status.info_loaded': '信息已加载: {{title}}。',
            'status.no_video_data': '无法加载视频数据。',
            'status.job_start': '[{{current}}/{{total}}] 正在开始...',
            'status.cancelled_user': '下载被用户取消。',
            'status.batch_done': '完成。成功: {{ok}}, 失败: {{fail}}',

            'progress.downloading': '下载中... {{percent}}% | 大小: {{size}} | 速度: {{speed}} | 剩余时间: {{eta}}',
            'progress.size_calculating': '计算中',

            'video.title_unavailable': '标题不可用。',

            'queue.pending': '等待中',
            'queue.running': '下载中',
            'queue.done': '已完成',
            'queue.error': '错误',
            'queue.skipped': '已跳过',
            'queue.cancelled': '已取消',

            'toast.no_valid_youtube': '没有有效的 YouTube 链接。请使用 youtube.com/watch、youtu.be 或 shorts。',
            'toast.enter_url': '请输入至少一个网址。',
            'toast.invalid_lines_fetch': '跳过 {{n}} 行（无效或不支持的链接）。',
            'toast.info_updated': '视频信息已更新。',
            'toast.fetch_failed': '无法获取数据: {{msg}}',
            'toast.no_youtube_dl': '未找到有效的 YouTube 链接。',
            'toast.enter_valid_url': '请输入至少一个有效的网址。',
            'toast.invalid_lines_dl': '跳过 {{n}} 行（仅支持 YouTube 链接）。',
            'toast.pick_folder': '请选择下载文件夹。',
            'toast.download_cancelled': '下载已取消。',
            'toast.download_error': '下载错误: {{msg}}',
            'toast.batch_done': '全部完成。成功: {{ok}}, 失败: {{fail}}。',

            'error.unknown': '未知错误',
            'error.unknown_short': '未知',

            'code.YT_DLP_NOT_READY_INFO': 'yt-dlp 尚未准备好，请稍后再试。',
            'code.YT_DLP_NOT_READY_DL': 'yt-dlp 尚未准备好。',
            'code.DOWNLOAD_CANCELLED': '下载已取消。'
        },
        ru: {
            'ui.title': 'Загрузчик Видео',
            'ui.section_links': 'Ссылки',
            'ui.section_details': 'Детали видео',
            'ui.urls_placeholder': 'Вставьте по одной ссылке YouTube на строку...',
            'ui.audio_only_mp3': 'Только аудио (MP3)',
            'ui.fetch_info': 'Получить инфо',
            'ui.video_waiting': 'Ожидание видео...',
            'ui.quality': 'Разрешение',
            'ui.target_folder': 'Папка назначения',
            'ui.folder_placeholder': 'C:\\Users\\...',
            'ui.browse': 'Обзор',
            'ui.open_folder_when_done': 'Открыть папку по завершении',
            'ui.start_download': 'НАЧАТЬ ЗАГРУЗКУ',
            'ui.cancel': 'Отмена',
            'ui.queue_heading': 'Очередь загрузки',
            'ui.queue_aria': 'Очередь загрузки',
            'ui.language': 'Язык',
            'ui.close': 'Закрыть',

            'status.checking_engines': 'Проверка движка...',
            'status.ytdlp_downloading': 'Первый запуск: загрузка yt-dlp с GitHub (может занять несколько минут)...',
            'status.ready': 'Готово. Можно вставлять ссылки.',
            'status.ytdlp_install_failed': 'Ошибка: не удалось скачать yt-dlp. Проверьте интернет.',
            'status.fetch_info': 'Получение информации о видео...',
            'status.prefetch': 'Получение информации... ({{current}}/{{total}})',
            'status.info_loaded': 'Информация загружена: {{title}}.',
            'status.no_video_data': 'Не удалось получить данные видео.',
            'status.job_start': '[{{current}}/{{total}}] Запуск...',
            'status.cancelled_user': 'Загрузка отменена пользователем.',
            'status.batch_done': 'Готово. Успешно: {{ok}}, Ошибок: {{fail}}',

            'progress.downloading': 'Загрузка... {{percent}}% | Размер: {{size}} | Скорость: {{speed}} | Осталось: {{eta}}',
            'progress.size_calculating': 'Вычисление',

            'video.title_unavailable': 'Название недоступно.',

            'queue.pending': 'В очереди',
            'queue.running': 'Загружается',
            'queue.done': 'Готово',
            'queue.error': 'Ошибка',
            'queue.skipped': 'Пропущено',
            'queue.cancelled': 'Отменено',

            'toast.no_valid_youtube': 'Неверная ссылка. Используйте форматы youtube.com/watch, youtu.be или shorts.',
            'toast.enter_url': 'Пожалуйста, введите хотя бы один URL.',
            'toast.invalid_lines_fetch': '{{n}} строк пропущено (неверная ссылка).',
            'toast.info_updated': 'Информация обновлена.',
            'toast.fetch_failed': 'Не удалось получить данные: {{msg}}',
            'toast.no_youtube_dl': 'Не найдено валидных ссылок YouTube.',
            'toast.enter_valid_url': 'Введите хотя бы один валидный URL.',
            'toast.invalid_lines_dl': '{{n}} строк пропущено (поддерживается только YouTube).',
            'toast.pick_folder': 'Выберите папку для сохранения.',
            'toast.download_cancelled': 'Загрузка отменена.',
            'toast.download_error': 'Ошибка загрузки: {{msg}}',
            'toast.batch_done': 'Завершено. Успешно: {{ok}}, Ошибок: {{fail}}.',

            'error.unknown': 'Неизвестная ошибка',
            'error.unknown_short': 'Неизвестно',

            'code.YT_DLP_NOT_READY_INFO': 'yt-dlp еще не готов. Попробуйте через пару секунд.',
            'code.YT_DLP_NOT_READY_DL': 'yt-dlp еще не готов.',
            'code.DOWNLOAD_CANCELLED': 'Загрузка отменена.'
        }
    };

    let lang = 'tr';

    function interpolate(str, vars) {
        if (!vars) return str;
        return str.replace(/\{\{(\w+)\}\}/g, (_, k) =>
            vars[k] !== undefined && vars[k] !== null ? String(vars[k]) : ''
        );
    }

    function t(key, vars) {
        const table = STRINGS[lang] || STRINGS.tr;
        const fallback = STRINGS.en;
        const raw = table[key] || fallback[key] || key;
        return interpolate(raw, vars);
    }

    function setLang(code) {
        if (STRINGS[code]) {
            lang = code;
            return true;
        }
        return false;
    }

    function getLang() {
        return lang;
    }

    function applyStatic() {
        const htmlLangMap = {
            tr: 'tr',
            en: 'en',
            es: 'es',
            fr: 'fr',
            it: 'it',
            de: 'de',
            ja: 'ja',
            zh: 'zh-CN',
            ru: 'ru'
        };
        document.documentElement.lang = htmlLangMap[lang] || lang;
        document.title = t('ui.title');

        document.querySelectorAll('[data-i18n]').forEach((el) => {
            const key = el.getAttribute('data-i18n');
            if (key) el.textContent = t(key);
        });

        document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
            const key = el.getAttribute('data-i18n-placeholder');
            if (key) el.placeholder = t(key);
        });

        document.querySelectorAll('[data-i18n-aria]').forEach((el) => {
            const key = el.getAttribute('data-i18n-aria');
            if (key) el.setAttribute('aria-label', t(key));
        });
    }

    window.appI18n = { t, setLang, getLang, applyStatic, STRINGS };
})();