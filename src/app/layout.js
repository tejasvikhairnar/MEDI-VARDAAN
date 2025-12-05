
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { AppProviders } from "./providers";
import AppLayout from "./app-layout";
import RouteTransitionLoader from "./RouteTransitionLoader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

 export const metadata = {
  title: "MEDIVARDAAN",
  description: "Healthcare Management System",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
};


// const queryClient = new QueryClient();

export default function RootLayout({ children }) {
//     const [region, setRegion] = useState("0");
//     const [period, setPeriod] = useState("All");



//      const periods = [
//         { id: "D1", label: "Yesterday" },
//         { id: "W1", label: "Last 7 Days" },
//         { id: "M1", label: "30 Days" },
//         { id: "Q1", label: "90 Days" },
//         { id: "Y1", label: "365 Days" },
//         { id: "All", label: "Grouped" },
//       ];
//          const handleLogout = () => {
//   // Example logic — adjust for your app
//   localStorage.removeItem("token");
//     router.push("/"); 
// };

  return (
      <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-background text-foreground antialiased`}
      >
           <AppProviders>
           <AppLayout>
                    <RouteTransitionLoader />

        {children}
        </AppLayout>
        <ReactQueryDevtools initialIsOpen={false} />
     </AppProviders>

      </body>
    </html>
  );
}
