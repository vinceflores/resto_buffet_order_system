import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import { ReactQueryProvider } from "./CustomUseQueryProvider";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <ReactQueryProvider>{children}</ReactQueryProvider>
          {/* {children} */}
        </body>
      </html>
    </ClerkProvider>
  );
}
