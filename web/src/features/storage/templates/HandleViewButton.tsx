import { Button, Icon } from "@chakra-ui/react";
import { useContext } from "react";
import { BiSolidGridAlt } from "react-icons/bi";
import { ViewMode, ViewModeContext } from "../provides/ViewModeProvider";
import { BsList } from "react-icons/bs";

export function HandleViewButton() {
  const context = useContext(ViewModeContext);

  const onSetVieMode = () => {
    context.setViewMode(
      context.viewMode === ViewMode.tile ? ViewMode.list : ViewMode.tile
    );
  };

  return (
    <Button p={0} onClick={onSetVieMode}>
      <Icon
        as={context.viewMode === ViewMode.tile ? BsList : BiSolidGridAlt}
        boxSize={6}
      />
    </Button>
  );
}
