import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";

const siteUrl = "https://www.mikeslaptops.co.uk";
const siteTitle = "Mike's Laptop's & Custom PCs — Exeter | Refurbished Laptops, Gaming PCs & Repairs";
const siteDescription =
  "Independent, family-run computer shop in Exeter. Ex-corporate refurbished Dell & Lenovo laptops, bespoke gaming PCs, repairs and upgrades. 46+ years combined experience. 5.0★ Google rated.";
const siteImage = "https://www.mikeslaptops.co.uk/logo.avif";

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "ComputerStore",
  name: "Mike's Laptop's & Custom PCs",
  image: [siteImage],
  url: siteUrl,
  telephone: "+44 7888 257303",
  email: "info@mikeslaptops.co.uk",
  address: {
    "@type": "PostalAddress",
    streetAddress: "4 Southernhay West",
    addressLocality: "Exeter",
    postalCode: "EX1 1JG",
    addressCountry: "GB",
  },
  areaServed: "Exeter and surrounding areas",
  sameAs: [
    "https://www.facebook.com/mikeslaptops",
    "https://www.instagram.com/mikeslaptops/",
    "https://maps.app.goo.gl/N6UYv6WJ9uxwDudM9",
  ],
};

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: siteTitle },
      { name: "description", content: siteDescription },
      { name: "author", content: "Mike's Laptops & Custom PCs" },
      { name: "robots", content: "index,follow,max-image-preview:large" },
      { name: "theme-color", content: "#0b1220" },
      { name: "format-detection", content: "telephone=yes" },
      { property: "og:site_name", content: "Mike's Laptops & Custom PCs" },
      { property: "og:title", content: siteTitle },
      { property: "og:description", content: siteDescription },
      { property: "og:type", content: "website" },
      { property: "og:url", content: siteUrl },
      { property: "og:locale", content: "en_GB" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: siteTitle },
      { name: "twitter:description", content: siteDescription },
      { property: "og:image", content: siteImage },
      { name: "twitter:image", content: siteImage },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "canonical", href: siteUrl },
      { rel: "icon", href: "/logo.avif", type: "image/png" },
      { rel: "apple-touch-icon", href: "/logo.avif" },
      { rel: "manifest", href: "/site.webmanifest" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Montserrat:wght@500;700;900&family=Inter:wght@400;500;600;700&display=swap" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessSchema),
          }}
        />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}
