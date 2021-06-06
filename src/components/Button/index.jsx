import P from 'prop-types';
import './style.css';

export const Button = ({ text, onClick, disabled }) => (
  <button disabled={disabled} className="button" onClick={onClick}>
    {text}
  </button>
);

Button.defaulProps = {
  disabled: false,
};

Button.propTypes = {
  text: P.string.isRequired,
  onClick: P.func.isRequired,
  disabled: P.bool,
};
