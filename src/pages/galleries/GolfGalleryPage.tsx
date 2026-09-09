import { GalleryPage } from "../../features/galleries/GalleryPage";
import { useGallery } from "../../hooks/useGalleries";

export default function GolfGalleryPage() {
  const data = useGallery("golf");
  return <GalleryPage data={data} />;
}
