"use client";

import { Sun, Sunset, Moon, Lightbulb, Clock, DollarSign, Calendar } from "lucide-react";
import type { TripPlan } from "@/types/travel";

interface TripPlanPanelProps {
  plan: TripPlan;
}

export function TripPlanPanel({ plan }: TripPlanPanelProps) {
  return (
    <div className="space-y-6">
      {/* Header info */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="flex items-start gap-3 bg-white rounded-xl border border-gray-100 p-4">
          <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
            <Calendar className="h-4 w-4 text-blue-600" />
          </div>
          <div>
            <p className="text-xs text-gray-400 mb-0.5">Mejor época</p>
            <p className="text-xs text-gray-700 leading-relaxed">{plan.bestTimeToVisit}</p>
          </div>
        </div>
        <div className="flex items-start gap-3 bg-white rounded-xl border border-gray-100 p-4">
          <div className="w-8 h-8 bg-emerald-50 rounded-lg flex items-center justify-center flex-shrink-0">
            <DollarSign className="h-4 w-4 text-emerald-600" />
          </div>
          <div>
            <p className="text-xs text-gray-400 mb-0.5">Presupuesto diario</p>
            <p className="text-xs text-gray-700 leading-relaxed">{plan.estimatedDailyBudget}</p>
          </div>
        </div>
        <div className="flex items-start gap-3 bg-white rounded-xl border border-gray-100 p-4">
          <div className="w-8 h-8 bg-amber-50 rounded-lg flex items-center justify-center flex-shrink-0">
            <Clock className="h-4 w-4 text-amber-600" />
          </div>
          <div>
            <p className="text-xs text-gray-400 mb-0.5">Duración</p>
            <p className="text-xs text-gray-700">{plan.durationDays} días en {plan.destination}</p>
          </div>
        </div>
      </div>

      {/* Day by day */}
      <div className="space-y-4">
        {plan.days.map((day) => (
          <div key={day.day} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-5 py-3 bg-gradient-to-r from-violet-50 to-blue-50 border-b border-gray-100 flex items-center gap-2">
              <span className="w-6 h-6 bg-violet-600 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0">
                {day.day}
              </span>
              <h4 className="font-semibold text-gray-900 text-sm">{day.title}</h4>
            </div>
            <div className="p-5 space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-amber-50 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Sun className="h-3.5 w-3.5 text-amber-500" />
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-0.5">Mañana</p>
                  <p className="text-sm text-gray-700">{day.morning}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-orange-50 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Sunset className="h-3.5 w-3.5 text-orange-500" />
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-0.5">Tarde</p>
                  <p className="text-sm text-gray-700">{day.afternoon}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-indigo-50 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Moon className="h-3.5 w-3.5 text-indigo-500" />
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-0.5">Noche</p>
                  <p className="text-sm text-gray-700">{day.evening}</p>
                </div>
              </div>
              <div className="flex items-start gap-3 pt-1 border-t border-gray-50">
                <div className="w-6 h-6 bg-green-50 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Lightbulb className="h-3.5 w-3.5 text-green-500" />
                </div>
                <p className="text-xs text-gray-500 italic">{day.tip}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* General tips */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <h4 className="font-semibold text-gray-900 text-sm mb-3 flex items-center gap-2">
          <Lightbulb className="h-4 w-4 text-amber-500" />
          Consejos generales para {plan.destination}
        </h4>
        <ul className="space-y-2">
          {plan.generalTips.map((tip, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
              <span className="w-1.5 h-1.5 bg-violet-400 rounded-full mt-1.5 flex-shrink-0" />
              {tip}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
