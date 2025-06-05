import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';

i18n
  .use(HttpApi) // Carga traducciones usando http backend (ej. de /public/locales)
  .use(LanguageDetector) // Detecta el idioma del usuario
  .use(initReactI18next) // Pasa la instancia de i18n a react-i18next.
  .init({
    lng: undefined, // Permite que i18next detecte automáticamente
    supportedLngs: ['en', 'es', 'it', 'pt'],
    fallbackLng: 'es', // Idioma por defecto si el detectado no está disponible
    debug: import.meta.env.DEV, // Logs en consola en desarrollo
    
    // Configuración mejorada para detección automática
    detection: {
      // Orden de prioridad para detectar el idioma:
      // 1. querystring (?lng=en)
      // 2. localStorage (para recordar selección manual)
      // 3. navigator (idioma del navegador/sistema operativo)
      // 4. cookie
      // 5. sessionStorage  
      // 6. htmlTag
      order: ['querystring', 'localStorage', 'navigator', 'cookie', 'sessionStorage', 'htmlTag'],
      
      // Donde guardar la preferencia del usuario
      caches: ['localStorage', 'cookie'],
      
      // Configuraciones del detector de navegador
      lookupQuerystring: 'lng',
      lookupCookie: 'i18next',
      lookupLocalStorage: 'i18nextLng',
      lookupSessionStorage: 'i18nextLng',
      
      // Mapeo de códigos de idioma (por si el navegador devuelve códigos diferentes)
      convertDetectedLanguage: (lng: string) => {
        // Convierte códigos de idioma largos a cortos
        // ej: 'es-ES' -> 'es', 'en-US' -> 'en', 'it-IT' -> 'it', 'pt-BR' -> 'pt'
        const shortLng = lng.split('-')[0];
        
        // Si el idioma detectado está soportado, úsalo
        if (['en', 'es', 'it', 'pt'].includes(shortLng)) {
          return shortLng;
        }
        
        // Si no está soportado, devuelve el fallback
        return 'es';
      },
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

// Actualiza el atributo lang del HTML cuando cambie el idioma
i18n.on('languageChanged', (lng) => {
  document.documentElement.setAttribute('lang', lng);
  console.log('Idioma cambiado a:', lng);
});

// Log del idioma detectado inicialmente
i18n.on('initialized', () => {
  console.log('Idioma inicial detectado:', i18n.language);
});

export default i18n; 