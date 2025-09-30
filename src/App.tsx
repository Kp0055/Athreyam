import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../src/app/store";
import { Toaster } from 'react-hot-toast';

// Lazy loaded route components
const UserRoutes = React.lazy(() => import("./Routers/userRoutes"));
const DoctorRoutes = React.lazy(() => import("./Routers/doctorRouter"));
const NotFound = React.lazy(() => import("./pages/User/notFound"));
const Loading = React.lazy(() => import("./components/Reusable/loader"));

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Toaster position="top-right" reverseOrder={false} />
        <Suspense fallback={<Loading />}>
          <Routes>
            {/* Doctor Routes first - more specific */}
            <Route path="/doctor/*" element={<DoctorRoutes />} />

            {/* User Routes */}
            <Route path="/*" element={<UserRoutes />} />

            {/* Optional catch-all fallback */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </Provider>
  );
}


export default App;
