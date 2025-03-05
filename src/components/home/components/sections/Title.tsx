type Props = {
  title: string;
  bgType: 'tomato' | 'muted',
};

export function Title({ title, bgType }: Props) {
  return (
    <div className="flex w-full justify-center flex-col">
      <h1 className={`${bgType === 'tomato' ? 'text-red-900' : 'text-black'} text-center text-3xl font-bold`}>{title}</h1>
      <div className="flex justify-center items-center">
        <hr className="my-4 h-1 w-10/12 rounded-s-2xl border-none" style={{ backgroundColor: bgType === 'muted' ? 'tomato' : '#A4A4A4' }} />
      </div>
    </div>
  );
}
