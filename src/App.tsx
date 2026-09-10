import { lazy, Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { SiteLayout } from "./layouts/SiteLayout";
import { ROUTES } from "./constants/navigation";

const HomePage = lazy(() => import("./pages/HomePage"));
const PortfolioPage = lazy(() => import("./pages/PortfolioPage"));
const StudioPage = lazy(() => import("./pages/StudioPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
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
            <Route path={ROUTES.studio} element={<StudioPage />} />
            <Route path={ROUTES.contact} element={<ContactPage />} />
            <Route path={ROUTES.film} element={<FilmGalleryPage />} />
            <Route path={ROUTES.collectionPattern} element={<CollectionGalleryPage />} />
            <Route path="*" element={<Navigate to={ROUTES.home} replace />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
