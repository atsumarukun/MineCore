import { StoragePathPage } from "@/features/storage/pages/StoragePathPage";
import { ViewModeProvider } from "@/features/storage/provides/ViewModeProvider";

export default function StoragePath() {
  return (
    <ViewModeProvider>
      <StoragePathPage />
    </ViewModeProvider>
  );
}
