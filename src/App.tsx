import { lazy, Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { SiteLayout } from "./layouts/SiteLayout";
import { ROUTES } from "./constants/navigation";

const HomePage = lazy(() => import("./pages/HomePage"));
const PortfolioPage = lazy(() => import("./pages/PortfolioPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const PrivacyPage = lazy(() => import("./pages/PrivacyPage"));
const FilmGalleryPage = lazy(() => import("./pages/galleries/FilmGalleryPage"));
const CollectionGalleryPage = lazy(() => import("./pages/galleries/CollectionGalleryPage"));

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div className="px-[40px] py-[200px]" aria-hidden />}>
        <Routes>
          <Route element={<SiteLayout />}>
            <Route path={ROUTES.home} element={<HomePage />} />
            <Route path={ROUTES.portfolio} element={<PortfolioPage />} />
            <Route path={ROUTES.videography} element={<FilmGalleryPage />} />
            <Route path={ROUTES.contact} element={<ContactPage />} />
            <Route path={ROUTES.privacy} element={<PrivacyPage />} />
            {/* Old URLs from before Studio was replaced by Videography. */}
            <Route path="/studio" element={<Navigate to={ROUTES.videography} replace />} />
            <Route path={`${ROUTES.portfolio}/film`} element={<Navigate to={ROUTES.videography} replace />} />
            <Route path={ROUTES.collectionPattern} element={<CollectionGalleryPage />} />
            <Route path="*" element={<Navigate to={ROUTES.home} replace />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
