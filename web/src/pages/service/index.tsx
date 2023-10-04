import { ServiceIndexPage } from "@/features/service/pages/ServiceIndexPage";
import { RefetchProvider } from "@/providers/RefetchProvider";

export default function Service() {
  return (
    <RefetchProvider>
      <ServiceIndexPage />
    </RefetchProvider>
  );
}
