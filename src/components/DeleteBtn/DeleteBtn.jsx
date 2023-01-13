import PropTypes from 'prop-types';
import css from './DeleteBtn.module.css';

export const DeleteBtn = ({ id, actionText, onDeleteContact }) => {
  return (
    <button
      type="button"
      className={css.buttonOnDelete}
      onClick={() => onDeleteContact(id)}
    >
      {actionText}
    </button>
  );
};

DeleteBtn.propTypes = {
  actionText: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  id: PropTypes.string,
  onDeleteContact: PropTypes.func,
};
