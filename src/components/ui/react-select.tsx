import Select from 'react-select';

export type Option = {
  label: string;
  value: string;
};

export type ReactSelectOptions = Option[];

function ReactSelect(props: React.ComponentProps<typeof Select>) {
  return (
    <Select
      noOptionsMessage={() => 'Ninguna coincidencia'}
      styles={{
        control: (styles) => ({
          ...styles,
          outline: 'none',
          ':hover': {
            borderColor: 'hsl(var(--primary))',
            outline: 'none',
          },
          ':focus': {
            borderColor: 'hsl(var(--primary))',
            boxShadow: '0 0 0 1px hsl(var(--primary))',
            outline: 'none',
          },
          ':focus-within': {
            borderColor: 'hsl(var(--primary))',
            boxShadow: '0 0 0 1px hsl(var(--primary))',
            outline: 'none',
          },
          ':focus-visible': {
            borderColor: 'hsl(var(--primary))',
            boxShadow: '0 0 0 1px hsl(var(--primary))',
            outline: 'none',
          },
        }),
      }}
      {...props}
    />
  );
}

export default ReactSelect;
