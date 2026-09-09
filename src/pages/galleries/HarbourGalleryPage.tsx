import { GalleryPage } from "../../features/galleries/GalleryPage";
import { useGallery } from "../../hooks/useGalleries";

export default function HarbourGalleryPage() {
  const data = useGallery("harbour");
  return <GalleryPage data={data} />;
}
