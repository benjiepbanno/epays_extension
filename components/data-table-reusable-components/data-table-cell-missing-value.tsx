import { Badge } from "../ui/badge";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

export default function DataTableCellMissingValue() {
  return (
    <Tooltip>
      <TooltipTrigger>
        <Badge variant="destructive">Missing</Badge>
      </TooltipTrigger>
      <TooltipContent>
        <p>
          Please wait a moment and try refreshing the
          page.
        </p>
      </TooltipContent>
    </Tooltip>
  );
}
