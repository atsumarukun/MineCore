import { StoragePathPage } from "@/features/storage/pages/StoragePathPage";
import { SelectedFileKeysProvider } from "@/features/storage/provides/SelectedFileKeysProvider";
import { ViewModeProvider } from "@/features/storage/provides/ViewModeProvider";
import { RefetchProvider } from "@/providers/RefetchProvider";
import { SelectModeProvider } from "@/providers/SelectModeProvider";

export default function StoragePath() {
  return (
    <ViewModeProvider>
      <RefetchProvider>
        <SelectModeProvider>
          <SelectedFileKeysProvider>
            <StoragePathPage />
          </SelectedFileKeysProvider>
        </SelectModeProvider>
      </RefetchProvider>
    </ViewModeProvider>
  );
}
