// // import { StrictMode } from 'react'
// // import { createRoot } from 'react-dom/client'
// // import App from './App.jsx'
// // import './index.css'

// // createRoot(document.getElementById('root')).render(
// //   <StrictMode>
// //     <App />
// //   </StrictMode>,
// // )
// import { StrictMode } from 'react';
// import { createRoot } from 'react-dom/client';
// import { Toaster } from 'react-hot-toast';
// import App from './App.jsx';
// import './index.css';

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <>
//       <Toaster
//         position="top-right"
//         toastOptions={{
//           duration: 3000,
//         }}
//       />
//       <App />
//     </>
//   </StrictMode>
// );
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Toaster } from 'react-hot-toast';
import App from './App.jsx';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <>
      <Toaster position="top-right" />
      <App />
    </>
  </StrictMode>
);