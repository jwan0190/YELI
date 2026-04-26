import { GalleryPage } from "../../features/galleries/GalleryPage";
import { useGallery } from "../../hooks/useGalleries";

export default function WeddingsGalleryPage() {
  const data = useGallery("weddings");
  return <GalleryPage data={data} />;
}
