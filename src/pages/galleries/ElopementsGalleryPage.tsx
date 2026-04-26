import { GalleryPage } from "../../features/galleries/GalleryPage";
import { useGallery } from "../../hooks/useGalleries";

export default function ElopementsGalleryPage() {
  const data = useGallery("elopements");
  return <GalleryPage data={data} />;
}
