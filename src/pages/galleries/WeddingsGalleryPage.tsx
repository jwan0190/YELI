import { GalleryPage } from "../../features/galleries/GalleryPage";
import { WEDDINGS_GALLERY } from "../../features/galleries/galleries.data";

export default function WeddingsGalleryPage() {
  return <GalleryPage data={WEDDINGS_GALLERY} />;
}
