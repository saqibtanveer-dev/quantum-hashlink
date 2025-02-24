import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import "../../node_modules/react-modal-video/css/modal-video.css";
 
export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export const metadata = {
  title: "Quantum HashLink",
  description: "Quantum HashLink is a tech startup company which provides every kind a technology related service.",
  image: "https://quantum-hashlink-nine.vercel.app/qhl_logo.png",
  url: "https://quantum-hashlink-nine.com",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`font-sans antialiased bg-[#FCFCFC]`}
      >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
