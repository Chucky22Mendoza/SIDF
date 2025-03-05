import React from 'react';

type Props = {
  iconHead: React.ReactElement;
  sectionName: string;
  elementChildren?: React.ReactElement;
};

function HeaderSection({
  iconHead,
  sectionName,
  elementChildren,
}: Props) {
  return (
    <header className="flex justify-between items-center">
      <div className="flex items-center space-x-2">
        {iconHead}
        <h1 className="text-3xl font-bold">{sectionName}</h1>
      </div>
      {elementChildren}
    </header>
  );
}

export default HeaderSection;
