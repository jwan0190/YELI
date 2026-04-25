import { lazy, Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { SiteLayout } from "./layouts/SiteLayout";
import { ROUTES } from "./constants/navigation";

const HomePage = lazy(() => import("./pages/HomePage"));
const PortfolioPage = lazy(() => import("./pages/PortfolioPage"));
const StudioPage = lazy(() => import("./pages/StudioPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const WeddingsGalleryPage = lazy(() => import("./pages/galleries/WeddingsGalleryPage"));
const EventsGalleryPage = lazy(() => import("./pages/galleries/EventsGalleryPage"));
const ElopementsGalleryPage = lazy(() => import("./pages/galleries/ElopementsGalleryPage"));
const PortraitsGalleryPage = lazy(() => import("./pages/galleries/PortraitsGalleryPage"));
const FilmGalleryPage = lazy(() => import("./pages/galleries/FilmGalleryPage"));

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
            <Route path={ROUTES.galleries.weddings} element={<WeddingsGalleryPage />} />
            <Route path={ROUTES.galleries.events} element={<EventsGalleryPage />} />
            <Route path={ROUTES.galleries.elopements} element={<ElopementsGalleryPage />} />
            <Route path={ROUTES.galleries.portraits} element={<PortraitsGalleryPage />} />
            <Route path={ROUTES.galleries.film} element={<FilmGalleryPage />} />
            <Route path="*" element={<Navigate to={ROUTES.home} replace />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
