import React, { useState } from "react";
import {
  Sparkles,
  LayoutGrid,
  Compass,
  Radar,
  FolderOpen,
  PlusCircle,
  CheckCircle2,
  Moon,
  Sun,
  FileText,
  Image,
  Loader2,
} from "lucide-react";
import type { CanvasProject } from "../types/canvas";
import { exportCanvasToPDF, exportCanvasToPNG } from "../utils/exportCanvas";

interface HeaderProps {
  activeProject: CanvasProject | null;
  activeView: "wizard" | "board" | "radar";
  setActiveView: (view: "wizard" | "board" | "radar") => void;
  mobileViewMode: 'grid' | 'stacked' | 'tabs';
  setMobileViewMode: (mode: 'grid' | 'stacked' | 'tabs') => void;
  onOpenProjects: () => void;
  onNewProject: () => void;
  totalNotes: number;
  darkMode?: boolean;
  onToggleDarkMode?: () => void;
  onShowToast?: (text: string, type: 'success' | 'error') => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeProject,
  activeView,
  setActiveView,
  onOpenProjects,
  onNewProject,
  totalNotes,
  darkMode = false,
  onToggleDarkMode,
  onShowToast,
}) => {
  const [isExportingPDF, setIsExportingPDF] = useState(false);
  const [isExportingPNG, setIsExportingPNG] = useState(false);

  const handleExportPDF = async () => {
    if (activeView !== 'board') {
      setActiveView('board');
      // Wait for DOM view update
      await new Promise((resolve) => setTimeout(resolve, 150));
    }
    setIsExportingPDF(true);
    const success = await exportCanvasToPDF();
    setIsExportingPDF(false);
    if (success) {
      onShowToast?.("Canvas exportado a PDF correctamente", "success");
    } else {
      onShowToast?.("No se pudo exportar a PDF. Asegúrate de estar en el Canvas Visual.", "error");
    }
  };

  const handleExportPNG = async () => {
    if (activeView !== 'board') {
      setActiveView('board');
      // Wait for DOM view update
      await new Promise((resolve) => setTimeout(resolve, 150));
    }
    setIsExportingPNG(true);
    const success = await exportCanvasToPNG();
    setIsExportingPNG(false);
    if (success) {
      onShowToast?.("Imagen PNG descargada correctamente", "success");
    } else {
      onShowToast?.("No se pudo exportar a PNG. Asegúrate de estar en el Canvas Visual.", "error");
    }
  };

  return (
    <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-30 shadow-xs transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-3">
          {/* Brand & Project Info */}
          <div className="flex items-center gap-3 min-w-0">
            <div className="bg-gradient-to-tr from-indigo-600 to-violet-600 text-white p-2 rounded-xl shadow-xs flex-shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-900 dark:text-white truncate text-sm sm:text-base">
                  {activeProject ? activeProject.nombreProyecto : "Canvas de Negocios"}
                </span>
                <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                  <CheckCircle2 className="w-3 h-3" />
                  Guardado local
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 truncate hidden md:block">
                {activeProject?.descripcionBreve || "Modelo de negocios guiado paso a paso"} • {totalNotes} notas cargadas
              </p>
            </div>
          </div>

          {/* Navigation Modes */}
          <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
            <button
              onClick={() => setActiveView('wizard')}
              className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeView === 'wizard'
                  ? 'bg-white dark:bg-slate-700 text-indigo-700 dark:text-indigo-300 shadow-2xs font-bold'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
              title="Ir a guía paso a paso"
            >
              <Compass className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <span className="hidden sm:inline">Paso a paso</span>
            </button>
            <button
              onClick={() => setActiveView('board')}
              className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeView === 'board'
                  ? 'bg-white dark:bg-slate-700 text-indigo-700 dark:text-indigo-300 shadow-2xs font-bold'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
              title="Ir al Canvas Visual"
            >
              <LayoutGrid className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <span>Canvas Visual</span>
            </button>
            <button
              onClick={() => setActiveView('radar')}
              className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeView === 'radar'
                  ? 'bg-white dark:bg-slate-700 text-indigo-700 dark:text-indigo-300 shadow-2xs font-bold'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
              title="Ir al Radar & Experimentos"
            >
              <Radar className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <span className="hidden sm:inline">Radar & Experimentos</span>
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Dark Mode Toggle */}
            {onToggleDarkMode && (
              <button
                onClick={onToggleDarkMode}
                className="p-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors border border-slate-200 dark:border-slate-700 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-indigo-500"
                title={darkMode ? "Cambiar a Modo Claro" : "Cambiar a Modo Oscuro"}
                aria-label="Toggle Dark Mode"
              >
                {darkMode ? (
                  <Sun className="w-4 h-4 text-amber-400" />
                ) : (
                  <Moon className="w-4 h-4 text-slate-600" />
                )}
              </button>
            )}

            <button
              onClick={onOpenProjects}
              className="p-2 sm:px-3 sm:py-1.5 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors border border-slate-200 dark:border-slate-700 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-indigo-500"
              title="Mis Canvas Guardados"
            >
              <FolderOpen className="w-4 h-4 text-slate-600 dark:text-slate-400" />
              <span className="hidden md:inline">Mis Proyectos</span>
            </button>

            {/* PDF Export Button */}
            <button
              onClick={handleExportPDF}
              disabled={isExportingPDF}
              className="p-2 sm:px-3 sm:py-1.5 bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors border border-indigo-200 dark:border-indigo-800 disabled:opacity-50 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-indigo-500"
              title="Exportar Canvas a PDF"
            >
              {isExportingPDF ? (
                <Loader2 className="w-4 h-4 animate-spin text-indigo-600 dark:text-indigo-400" />
              ) : (
                <FileText className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              )}
              <span className="hidden sm:inline">PDF</span>
            </button>

            {/* PNG Export Button */}
            <button
              onClick={handleExportPNG}
              disabled={isExportingPNG}
              className="p-2 sm:px-3 sm:py-1.5 bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors border border-indigo-200 dark:border-indigo-800 disabled:opacity-50 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-indigo-500"
              title="Exportar Canvas a PNG"
            >
              {isExportingPNG ? (
                <Loader2 className="w-4 h-4 animate-spin text-indigo-600 dark:text-indigo-400" />
              ) : (
                <Image className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              )}
              <span className="hidden sm:inline">PNG</span>
            </button>

            {/* New Canvas Button */}
            <button
              onClick={onNewProject}
              className="p-2 sm:px-3 sm:py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors shadow-xs focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-indigo-500"
              title="Crear un nuevo Canvas"
            >
              <PlusCircle className="w-4 h-4" />
              <span className="hidden lg:inline">Nuevo Canvas</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
