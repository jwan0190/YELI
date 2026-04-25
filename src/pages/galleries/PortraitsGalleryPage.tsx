import { GalleryPage } from "../../features/galleries/GalleryPage";
import { PORTRAITS_GALLERY } from "../../features/galleries/galleries.data";

export default function PortraitsGalleryPage() {
  return <GalleryPage data={PORTRAITS_GALLERY} />;
}
