import { GalleryPage } from "../../features/galleries/GalleryPage";
import { EVENTS_GALLERY } from "../../features/galleries/galleries.data";

export default function EventsGalleryPage() {
  return <GalleryPage data={EVENTS_GALLERY} />;
}
