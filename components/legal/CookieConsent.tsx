"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Consent = { ads: boolean; affiliate: boolean };
const STORAGE_KEY = "despegai_cookie_consent";

function loadConsent(): Consent | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function injectAdsense() {
  if (document.getElementById("adsbygoogle-script")) return;
  const s = document.createElement("script");
  s.id = "adsbygoogle-script";
  s.async = true;
  s.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1669085762524524";
  s.crossOrigin = "anonymous";
  document.head.appendChild(s);
}

function injectTravelpayoutsDrive() {
  if (document.getElementById("tp-drive-script")) return;
  const s = document.createElement("script");
  s.id = "tp-drive-script";
  s.async = true;
  s.src = "https://emrldtp.com/NTM2Mzkx.js?t=536391";
  document.head.appendChild(s);
}

// Banner de consentimiento de cookies (RGPD). Las cookies de afiliación
// (Travelpayouts) y publicidad (AdSense) no se cargan hasta que el usuario
// da su consentimiento explícito — antes solo se cargaban siempre, sin pedir permiso.
export function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [draft, setDraft] = useState<Consent>({ ads: false, affiliate: false });

  useEffect(() => {
    const stored = loadConsent();
    if (stored) {
      if (stored.ads) injectAdsense();
      if (stored.affiliate) injectTravelpayoutsDrive();
    } else {
      setVisible(true);
    }
  }, []);

  function save(c: Consent) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(c));
    setVisible(false);
    if (c.ads) injectAdsense();
    if (c.affiliate) injectTravelpayoutsDrive();
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-[200] p-4 sm:p-6">
      <div className="max-w-3xl mx-auto bg-white border border-slate-200 rounded-2xl shadow-2xl p-5">
        <p className="text-sm text-slate-700 mb-4">
          Usamos cookies necesarias para que la web funcione, y cookies opcionales de afiliación (para registrar tus reservas) y publicidad. Puedes leer más en nuestra{" "}
          <Link href="/politica-de-privacidad" className="text-sky-600 underline">política de privacidad</Link>.
        </p>

        {expanded && (
          <div className="space-y-3 mb-4 border-t border-slate-100 pt-4">
            <label className="flex items-center justify-between gap-4 text-sm cursor-pointer">
              <span>
                <span className="font-semibold text-slate-800">Afiliación (Travelpayouts)</span>
                <span className="block text-xs text-slate-400">Necesarias para que se registren tus reservas y podamos cobrar comisión por ellas.</span>
              </span>
              <input
                type="checkbox"
                checked={draft.affiliate}
                onChange={(e) => setDraft((d) => ({ ...d, affiliate: e.target.checked }))}
                className="h-4 w-4 flex-shrink-0"
              />
            </label>
            <label className="flex items-center justify-between gap-4 text-sm cursor-pointer">
              <span>
                <span className="font-semibold text-slate-800">Publicidad (Google AdSense)</span>
                <span className="block text-xs text-slate-400">Anuncios personalizados según tu navegación.</span>
              </span>
              <input
                type="checkbox"
                checked={draft.ads}
                onChange={(e) => setDraft((d) => ({ ...d, ads: e.target.checked }))}
                className="h-4 w-4 flex-shrink-0"
              />
            </label>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
          <button
            onClick={() => setExpanded((v) => !v)}
            className="text-xs font-semibold text-slate-500 hover:text-slate-700 underline text-left"
          >
            {expanded ? "Ocultar opciones" : "Personalizar"}
          </button>
          <div className="flex gap-2">
            {expanded ? (
              <button
                onClick={() => save(draft)}
                className="text-sm font-bold px-4 py-2 rounded-xl bg-slate-800 text-white hover:bg-slate-900 transition-colors"
              >
                Guardar selección
              </button>
            ) : (
              <button
                onClick={() => save({ ads: false, affiliate: false })}
                className="text-sm font-semibold px-4 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors"
              >
                Rechazar no esenciales
              </button>
            )}
            <button
              onClick={() => save({ ads: true, affiliate: true })}
              className="text-sm font-bold px-4 py-2 rounded-xl btn-cta"
            >
              Aceptar todas
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
