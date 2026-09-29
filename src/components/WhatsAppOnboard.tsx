"use client";

import { useCallback, useEffect, useState } from "react";
import Script from "next/script";
import { primaryCtaClassName } from "@/components/PrimaryCtaButton";

const META_APP_ID = "1085723453969135";
const META_ES_CONFIG_ID = "9380278027";
const GRAPH_VERSION = "v23.0";

type SignupPayload = {
  type?: string;
  event?: string;
  data?: Record<string, unknown>;
};

declare global {
  interface Window {
    FB?: {
      init: (options: {
        appId: string;
        autoLogAppEvents: boolean;
        xfbml: boolean;
        version: string;
      }) => void;
      login: (
        callback: (response: { authResponse?: { code?: string } }) => void,
        options: Record<string, unknown>,
      ) => void;
    };
    fbAsyncInit?: () => void;
  }
}

function parseSignupMessage(raw: unknown): SignupPayload | null {
  if (typeof raw !== "string") return null;
  try {
    const data = JSON.parse(raw) as SignupPayload;
    if (data?.type === "WA_EMBEDDED_SIGNUP") return data;
  } catch {
    return null;
  }
  return null;
}

export default function WhatsAppOnboard() {
  const [sdkReady, setSdkReady] = useState(false);
  const [status, setStatus] = useState("Carga el SDK de Meta y pulsa conectar.");
  const [session, setSession] = useState<SignupPayload | null>(null);

  useEffect(() => {
    window.fbAsyncInit = () => {
      window.FB?.init({
        appId: META_APP_ID,
        autoLogAppEvents: true,
        xfbml: true,
        version: GRAPH_VERSION,
      });
      setSdkReady(true);
      setStatus("Listo. Entra con el Facebook de Mauricio, no el de Marco.");
    };

    const onMessage = (event: MessageEvent) => {
      if (
        typeof event.origin !== "string" ||
        (!event.origin.endsWith("facebook.com") &&
          !event.origin.endsWith("instagram.com"))
      ) {
        return;
      }
      const payload = parseSignupMessage(event.data);
      if (!payload) return;
      setSession(payload);
      if (
        payload.event === "FINISH_WHATSAPP_BUSINESS_APP_ONBOARDING" ||
        payload.event === "FINISH"
      ) {
        setStatus(
          "WhatsApp Business quedó conectado. No cierres; avísame y seguimos con el token.",
        );
      } else if (payload.event === "CANCEL") {
        setStatus("Cancelaste el flujo. Puedes intentar otra vez.");
      }
    };

    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  const launch = useCallback(() => {
    if (!window.FB) {
      setStatus("El SDK aún no carga. Recarga la página.");
      return;
    }
    setStatus("Abriendo Meta… elige Corman Sports y conectar WhatsApp Business.");
    window.FB.login(
      (response) => {
        if (!response.authResponse) {
          setStatus("No se completó el login. Intenta otra vez.");
        }
      },
      {
        config_id: META_ES_CONFIG_ID,
        response_type: "code",
        override_default_response_type: true,
        extras: {
          setup: {},
          featureType: "whatsapp_business_app_onboarding",
          sessionInfoVersion: "3",
        },
      },
    );
  }, []);

  return (
    <main className="px-5 pb-20 pt-28 sm:px-6 sm:pb-24 sm:pt-32">
      <div className="mx-auto max-w-xl">
        <span className="label text-primary">WhatsApp · Tech Provider</span>
        <h1 className="mt-5 text-[1.75rem] leading-[1.15] text-ink sm:text-4xl">
          Conectar WhatsApp Business
        </h1>
        <p className="prose-mono mt-6">
          Esto une el número que ya está en WhatsApp Business (el chip) con
          Breakaway Tech Provider. No desconectes el número. No uses la cuenta
          de Marco.
        </p>
        <ol className="prose-mono mt-6 list-decimal space-y-2 pl-5">
          <li>WhatsApp Business abierto en el celular viejo.</li>
          <li>Facebook de Mauricio (Corman Sports).</li>
          <li>
            En Meta: conectar la app de WhatsApp Business, no “crear número
            nuevo”.
          </li>
        </ol>
        <button
          type="button"
          className={`${primaryCtaClassName} mt-10`}
          onClick={launch}
          disabled={!sdkReady}
        >
          {sdkReady ? "Conectar WhatsApp Business" : "Cargando Meta…"}
        </button>
        <p className="mt-6 font-mono text-[12px] text-ink-dim">{status}</p>
        {session ? (
          <pre className="mt-6 overflow-x-auto rounded-2xl bg-ink/5 p-4 font-mono text-[11px] text-ink">
            {JSON.stringify(session, null, 2)}
          </pre>
        ) : null}
      </div>
      <Script
        src="https://connect.facebook.net/en_US/sdk.js"
        strategy="afterInteractive"
      />
    </main>
  );
}
