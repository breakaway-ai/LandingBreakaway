import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';

i18n
  .use(HttpApi) // Carga traducciones usando http backend (ej. de /public/locales)
  .use(LanguageDetector) // Detecta el idioma del usuario
  .use(initReactI18next) // Pasa la instancia de i18n a react-i18next.
  .init({
    supportedLngs: ['en', 'es'],
    fallbackLng: 'es', // Idioma por defecto si el detectado no está disponible
    debug: import.meta.env.DEV, // Logs en consola en desarrollo
    detection: {
      order: ['querystring', 'cookie', 'localStorage', 'sessionStorage', 'navigator', 'htmlTag'],
      caches: ['cookie', 'localStorage'],
      htmlTag: document.documentElement, // Para que i18next actualice el lang del <html>
    },
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json', // Ruta a tus archivos de traducción
    },
    interpolation: {
      escapeValue: false, // React ya escapa por defecto
    },
    react: {
      useSuspense: true, // Usa Suspense para cargar las traducciones
    },
  });

i18n.on('languageChanged', (lng) => {
  document.documentElement.setAttribute('lang', lng);
});

export default i18n; 