import { Button } from "../ui/button";
import { TableCell, TableRow } from "../ui/table";
import { Pencil, Trash, Mail, PhoneCall, MessageCircle } from "lucide-react";
import { ILoan } from "@/domain/Loans";
import { format } from "date-fns";
import Link from "next/link";

type Props = {
  loan: ILoan;
  onDelete?: () => void;
  onEdit?: () => void;
};

function LoanRow({ loan, onDelete, onEdit }: Props) {
  return (
    <TableRow>
      <TableCell>{loan.name}</TableCell>
      <TableCell>{loan.filme}</TableCell>
      <TableCell>{loan.curp}</TableCell>
      <TableCell>{format(loan.date ?? new Date(), 'dd-MM-yyyy')}</TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <Link href={`https://wa.me/52${loan.phone}`} target="_blank">
              <MessageCircle className="h-4 w-4 text-green-600" />
            </Link>
          </Button>
          <Button variant="ghost" size="icon">
            <Link href={`mailto:${loan.email}`}>
              <Mail className="h-4 w-4 text-red-500" />
            </Link>
          </Button>
          <Button variant="ghost" size="icon">
            <Link href={`tel:${loan.phone}`}>
              <PhoneCall className="h-4 w-4 text-blue-900" />
            </Link>
          </Button>
          <Button onClick={onEdit} variant="ghost" size="icon">
            <Pencil className="h-4 w-4 text-orange-700" />
          </Button>
          <Button onClick={onDelete} variant="ghost" size="icon">
            <Trash className="h-4 w-4 text-red-700" />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
}

export default LoanRow;
