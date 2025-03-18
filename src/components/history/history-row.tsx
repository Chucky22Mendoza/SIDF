import { Button } from "../ui/button";
import { TableCell, TableRow } from "../ui/table";
import { Eye } from "lucide-react";
import { LoanHistoryType } from "@/domain/Loans";
import { format } from "date-fns";

type Props = {
  loan: LoanHistoryType;
  onViewInfo?: () => void;
};

function HistoryRow({ loan, onViewInfo }: Props) {
  return (
    <TableRow>
      <TableCell>{loan.filme}</TableCell>
      <TableCell>{format(loan.loanDate ?? new Date(), 'dd-MM-yyyy')}</TableCell>
      <TableCell>{loan.returnDate ? format(loan.returnDate, 'dd-MM-yyyy') : ''}</TableCell>
      <TableCell className={loan.returnDate ? 'text-green-600' : 'text-red-600'}>{loan.status}</TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={onViewInfo}>
            <Eye className="h-4 w-4 text-green-600" />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
}

export default HistoryRow;
