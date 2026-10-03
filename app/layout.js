app/layout.js
```jsx
import './globals.css';

export const metadata = {
  title: 'Vic Deography | Cinematography Portfolio',
  description: 'Modern videography and cinematography portfolio',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
