import { css } from '@/styled-system/css';

interface HamburgerButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

const buttonContainer = css({
  position: 'fixed',
  top: 4,
  right: 4,
  zIndex: 1001,
  width: '48px',
  height: '48px',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  bg: 'bg.primary',
  borderWidth: '2px',
  borderStyle: 'solid',
  borderColor: 'border.default',
  borderRadius: 'md',
  cursor: 'pointer',
  boxShadow: 'md',
});
const barBase = css({
  position: 'absolute',
  left: 0,
  width: '24px',
  height: '2px',
  bg: 'contents.primary',
  transition: 'all 0.3s ease',
});

export const HamburgerButton: React.FC<HamburgerButtonProps> = ({ isOpen, onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={isOpen ? '目次を閉じる' : '目次を開く'}
      aria-expanded={isOpen}
      className={buttonContainer}
    >
      <div
        style={{
          position: 'relative',
          width: '24px',
          height: '18px',
        }}
      >
        <span
          className={barBase}
          style={{
            top: isOpen ? '8px' : '0',
            transform: isOpen ? 'rotate(45deg)' : 'none',
          }}
        />
        <span
          className={barBase}
          style={{
            top: '8px',
            opacity: isOpen ? 0 : 1,
          }}
        />
        <span
          className={barBase}
          style={{
            top: isOpen ? '8px' : '16px',
            transform: isOpen ? 'rotate(-45deg)' : 'none',
          }}
        />
      </div>
    </button>
  );
};
