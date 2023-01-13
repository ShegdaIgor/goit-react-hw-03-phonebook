import PropTypes from 'prop-types';
import css from './FilterContact.module.css';

export const FilterContact = ({ handleFilterContact, filter }) => (
  <div className={css.inputWrapper}>
    <label className={css.formLabel}>Find contacts by Name</label>
    <input
      type="text"
      name="filter"
      onChange={handleFilterContact}
      value={filter}
    />
  </div>
);

FilterContact.propTypes = {
  handleFilterContact: PropTypes.func.isRequired,
  filter: PropTypes.string.isRequired,
};
