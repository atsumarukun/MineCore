import { StoragePathPage } from "@/features/storage/pages/StoragePathPage";
import { SelectedFileKeysProvider } from "@/features/storage/provides/SelectedFileKeysProvider";
import { ViewModeProvider } from "@/features/storage/provides/ViewModeProvider";
import { SelectModeProvider } from "@/providers/SelectModeProvider";

export default function StoragePath() {
  return (
    <ViewModeProvider>
      <SelectModeProvider>
        <SelectedFileKeysProvider>
          <StoragePathPage />
        </SelectedFileKeysProvider>
      </SelectModeProvider>
    </ViewModeProvider>
  );
}
