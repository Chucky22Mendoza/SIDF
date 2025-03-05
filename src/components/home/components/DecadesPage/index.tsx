import Image from "next/image";
import { DecadesImages } from "../../domain/data";
import React from "react";

type Props = {
  decade: 1930 | 1940 | 1950 | 1960 | 1970 | 1980;
};

export function DecadesPage({ decade }: Props) {
  const data = DecadesImages.find((value) => value.decade === decade);
  if (!data) return;
  const { path, paragraph } = data;

  return (
    <div className="pt-24 pb-10 max-w-6xl w-full self-center px-5">
      <h1 className="text-5xl font-bold mb-4 text-center">{`DECADA DE LOS ${String(decade).replace('19', '')}'s`}</h1>
      <Image className="ml-4" src={path} alt={`Decada de ${decade}`} style={{ float: 'right', height: 'auto' }} width={600} loading="lazy" height={0} />
      {paragraph?.map((p, index) => (
        <React.Fragment key={`${decade}-paragraph-${index}`}>
          <p>{p}</p>
          <br />
        </React.Fragment>
      ))}
    </div>
  );
}
