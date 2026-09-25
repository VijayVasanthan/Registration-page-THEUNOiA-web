interface LogoProps {
  variant?: 'primary' | 'secondary' | 'monochrome-navy' | 'monochrome-ivory';
  className?: string;
}

export default function Logo({ variant = 'secondary', className = '' }: LogoProps) {
  const baseStyle = "font-head text-[28px] sm:text-[34px] font-bold tracking-[1px] inline-flex items-center select-none";
  
  const getThemeStyles = () => {
    switch (variant) {
      case 'primary':
        return { text: 'text-navy', oia: 'bg-[linear-gradient(269.2deg,#C16C3E_2.69%,#F0D197_124.67%)] bg-clip-text text-transparent' };
      case 'secondary':
        return { text: 'text-white', oia: 'bg-[linear-gradient(269.2deg,#a855f7_2.69%,#f0abfc_124.67%)] bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(168,85,247,0.4)]' };
      case 'monochrome-navy':
        return { text: 'text-navy', oia: 'text-navy' };
      case 'monochrome-ivory':
        return { text: 'text-ivory', oia: 'text-ivory' };
    }
  };

  const styles = getThemeStyles();

  return (
    <div className={`${baseStyle} ${className}`}>
      <span className={styles.text}>THEUN</span>
      <span className={styles.oia}>OiA</span>
    </div>
  );
}
