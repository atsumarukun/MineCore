import { StoragePathPage } from "@/features/storage/pages/StoragePathPage";
import { ViewModeProvider } from "@/features/storage/provides/ViewModeProvider";
import { RefetchProvider } from "@/providers/RefetchProvider";

export default function StoragePath() {
  return (
    <ViewModeProvider>
      <RefetchProvider>
        <StoragePathPage />
      </RefetchProvider>
    </ViewModeProvider>
  );
}
