import { PageHeader } from '../shared/page-header';
import { Button } from '../ui/button';
import Link from 'next/link';
import { Plus } from 'lucide-react';

type Props = {
  title: string;
  description: string;
  buttonText?: string;
  hrefButton?: string;
};

function Header({ title, description, buttonText, hrefButton }: Props) {
  return (
    <PageHeader
      title={title}
      description={description}
      action={
        buttonText && hrefButton
          ? (
            <Button asChild className="px-3 py-2 hover:bg-white">
              <Link href="/admin/records/create">
                <Plus className="mr-2 h-4 w-4" />
                {buttonText}
              </Link>
            </Button>
          ) : undefined
      }
    />
  );
}

export default Header;
