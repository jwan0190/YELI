import { GalleryPage } from "../../features/galleries/GalleryPage";
import { useGallery } from "../../hooks/useGalleries";

export default function PortraitsGalleryPage() {
  const data = useGallery("portraits");
  return <GalleryPage data={data} />;
}
