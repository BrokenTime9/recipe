import "./globals.css";
export const metadata = {
  title: "Recipe",
  description: "Find Recipes with ingredients",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
