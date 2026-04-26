import { GalleryPage } from "../../features/galleries/GalleryPage";
import { useGallery } from "../../hooks/useGalleries";

export default function EventsGalleryPage() {
  const data = useGallery("events");
  return <GalleryPage data={data} />;
}
