type Variant = 'flat' | 'raised' | 'inset';

interface SurfaceProps extends React.HTMLAttributes<HTMLDivElement> {
  /** flat: 1px border, no shadow (default — dashboard cards)
   *  raised: 1px border + shadow — dropdowns, modals, popovers
   *  inset: bg-surface-2, no border — sub-sections within a card */
  variant?: Variant;
}

const variantClass: Record<Variant, string> = {
  flat:   'surface-flat',
  raised: 'surface-raised',
  inset:  'surface-inset',
};

export function Surface({
  variant = 'flat',
  className = '',
  children,
  ...props
}: SurfaceProps) {
  return (
    <div
      className={`${variantClass[variant]} rounded-lg ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
