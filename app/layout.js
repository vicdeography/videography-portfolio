import './globals.css';

export const metadata = {
  title: 'Vic Deography | Cinematography Portfolio',
  description: 'Rough draft portfolio website for videography and cinematography work.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
