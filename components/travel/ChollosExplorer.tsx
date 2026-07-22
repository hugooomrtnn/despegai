"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Bell, BadgeCheck, Info, Loader2, Sparkles, Trash2, TrendingDown } from "lucide-react";
import { useAuth } from "@/components/auth/AuthProvider";
import { TAG_COLORS, TAG_LABELS, FAMOUS_CITY_CODES } from "@/lib/data/destinationMeta";
import type { DestinationCard } from "@/components/travel/DestinationsExplorer";

function DealCard({ dest }: { dest: DestinationCard }) {
  const isFamous = FAMOUS_CITY_CODES.has(dest.code);
  return (
    <Link
      href={`/?q=${encodeURIComponent(`Vuelos baratos a ${dest.city}`)}`}
      className="card-premium rounded-2xl p-4 hover:shadow-md transition-all hover:border-sky-200 group block"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{dest.flag}</span>
          <div>
            <p className="font-bold text-slate-900 text-sm group-hover:text-sky-600 transition-colors">{dest.city}</p>
            <p className="text-xs text-slate-400">{dest.country}</p>
          </div>
        </div>
        <div className="flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg flex-shrink-0">
          <TrendingDown className="h-3 w-3" />
          desde {dest.price}€
        </div>
      </div>
      <div className="flex gap-1.5 flex-wrap">
        {isFamous && (
          <span className="flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-600">
            <Sparkles className="h-2.5 w-2.5" />
            Icónico
          </span>
        )}
        {dest.tags.map((tag) => (
          <span key={tag} className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${TAG_COLORS[tag] ?? "bg-slate-100 text-slate-500"}`}>
            {TAG_LABELS[tag] ?? tag}
          </span>
        ))}
      </div>
    </Link>
  );
}

type PriceAlert = {
  id: string;
  destination_city: string;
  destination_country: string;
  destination_airport_code: string;
  max_price: number;
};

function formatUpdatedAt(iso: string): string {
  return new Date(iso).toLocaleString("es-ES", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" });
}

interface ChollosExplorerProps {
  deals: DestinationCard[];
  isReal: boolean;
  lastUpdated: string | null;
}

export function ChollosExplorer({ deals, isReal, lastUpdated }: ChollosExplorerProps) {
  const { user, loading: authLoading } = useAuth();

  const [alerts, setAlerts] = useState<PriceAlert[]>([]);
  const [alertsLoading, setAlertsLoading] = useState(false);
  const [selectedCode, setSelectedCode] = useState(deals[0]?.code ?? "");
  const [maxPrice, setMaxPrice] = useState("");
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      setAlerts([]);
      return;
    }
    setAlertsLoading(true);
    fetch("/api/alerts")
      .then((r) => r.json())
      .then((data) => setAlerts(data.alerts ?? []))
      .finally(() => setAlertsLoading(false));
  }, [user]);

  async function handleCreateAlert(e: React.FormEvent) {
    e.preventDefault();
    setFormError(null);

    const dest = deals.find((d) => d.code === selectedCode);
    if (!dest || !maxPrice || Number(maxPrice) <= 0) {
      setFormError("Elige un destino y un precio máximo válido.");
      return;
    }

    setSaving(true);
    try {
      const res = await fetch("/api/alerts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          destinationCity: dest.city,
          destinationCountry: dest.country,
          destinationAirportCode: dest.code,
          maxPrice: Number(maxPrice),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "No se pudo crear la alerta");
      setAlerts((prev) => [data.alert, ...prev]);
      setMaxPrice("");
    } catch (err) {
      setFormError(err instanceof Error ? err.message : "Error al crear la alerta");
    } finally {
      setSaving(false);
    }
  }

  async function handleDeleteAlert(id: string) {
    setAlerts((prev) => prev.filter((a) => a.id !== id));
    await fetch(`/api/alerts?id=${id}`, { method: "DELETE" });
  }

  // Agrupados por continente en el orden en que llegan (ya vienen agrupados desde la página)
  // para que se vea claramente que hay chollos fuera de Europa, no solo los más baratos globales.
  const byContinent = useMemo(() => {
    const groups: Array<{ continent: string; deals: DestinationCard[] }> = [];
    for (const dest of deals) {
      const last = groups[groups.length - 1];
      if (last && last.continent === dest.continent) last.deals.push(dest);
      else groups.push({ continent: dest.continent, deals: [dest] });
    }
    return groups;
  }, [deals]);

  return (
    <div className="space-y-12">
      {/* Transparencia: si los precios son reales (Travelpayouts) o una estimación */}
      {isReal ? (
        <div className="flex items-center gap-2.5 bg-emerald-50 border border-emerald-100 rounded-xl px-4 py-2.5">
          <BadgeCheck className="h-4 w-4 text-emerald-600 flex-shrink-0" />
          <p className="text-xs text-emerald-800">
            <span className="font-semibold">Precios reales</span> detectados automáticamente.
            {lastUpdated && <> Última actualización: {formatUpdatedAt(lastUpdated)}.</>}
          </p>
        </div>
      ) : (
        <div className="flex items-center gap-2.5 bg-amber-50 border border-amber-100 rounded-xl px-4 py-2.5">
          <Info className="h-4 w-4 text-amber-600 flex-shrink-0" />
          <p className="text-xs text-amber-800">
            <span className="font-semibold">Precios estimados</span> — todavía no hay datos reales conectados para esta ruta. Al buscar el vuelo verás el precio real de la aerolínea.
          </p>
        </div>
      )}

      {/* Grid de chollos, agrupados por continente */}
      <div className="space-y-8">
        {byContinent.map((group) => (
          <div key={group.continent}>
            <h2 className="text-sm font-bold text-slate-700 mb-3 flex items-center gap-2">
              <span className="w-1 h-4 bg-sky-500 rounded-full inline-block" />
              {group.continent}
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {group.deals.map((dest) => (
                <DealCard key={dest.code} dest={dest} />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Alertas de precio */}
      <div className="card-premium rounded-3xl p-6 sm:p-8">
        <div className="flex items-center gap-2 mb-1">
          <Bell className="h-5 w-5 text-sky-500" />
          <h2 className="text-lg font-bold text-slate-900">Alertas de precio</h2>
        </div>
        <p className="text-sm text-slate-500 mb-6">
          Elige un destino internacional y un precio máximo. Te lo guardamos para que puedas revisarlo cuando quieras.
        </p>

        {authLoading ? (
          <div className="text-sm text-slate-400">Cargando…</div>
        ) : !user ? (
          <div className="bg-sky-50 border border-sky-100 rounded-2xl p-5 text-center">
            <p className="text-sm text-slate-600 mb-3">Inicia sesión para crear y guardar tus alertas de precio.</p>
            <div className="flex items-center justify-center gap-3">
              <Link href="/login" className="text-sm font-semibold text-sky-600 hover:text-sky-700">Iniciar sesión</Link>
              <span className="text-slate-300">·</span>
              <Link href="/registro" className="text-sm font-semibold text-sky-600 hover:text-sky-700">Crear cuenta</Link>
            </div>
          </div>
        ) : (
          <>
            <form onSubmit={handleCreateAlert} className="flex flex-col sm:flex-row gap-3 mb-6">
              <select
                value={selectedCode}
                onChange={(e) => setSelectedCode(e.target.value)}
                className="flex-1 border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-400"
              >
                {deals.map((d) => (
                  <option key={d.code} value={d.code}>
                    {d.flag} {d.city}, {d.country}
                  </option>
                ))}
              </select>
              <input
                type="number"
                min={1}
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                placeholder="Precio máx. (€)"
                className="w-full sm:w-40 border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-400"
              />
              <button
                type="submit"
                disabled={saving}
                className="btn-cta rounded-xl px-5 py-2.5 text-sm font-bold text-white disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Bell className="h-4 w-4" />}
                Crear alerta
              </button>
            </form>

            {formError && <p className="text-sm text-red-500 mb-4">{formError}</p>}

            {alertsLoading ? (
              <div className="text-sm text-slate-400">Cargando tus alertas…</div>
            ) : alerts.length === 0 ? (
              <p className="text-sm text-slate-400">Todavía no tienes alertas guardadas.</p>
            ) : (
              <ul className="space-y-2">
                {alerts.map((a) => (
                  <li key={a.id} className="flex items-center justify-between bg-slate-50 rounded-xl px-4 py-3">
                    <div className="text-sm">
                      <span className="font-semibold text-slate-800">{a.destination_city}</span>
                      <span className="text-slate-400"> · máx. {a.max_price}€</span>
                    </div>
                    <button
                      onClick={() => handleDeleteAlert(a.id)}
                      className="text-slate-400 hover:text-red-500 transition-colors"
                      aria-label="Eliminar alerta"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </>
        )}
      </div>
    </div>
  );
}
