'use client';
import "./globals.css";
import { Provider } from 'react-redux';
import store from '../store/store'

// export const metadata = {
//   title: "Basic AI apps",
//   description: "This is meant for learning how to build simple AI apps.",
// };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
      <Provider store={store}>
        {children}
      </Provider>
      </body>
    </html>
  );
}
