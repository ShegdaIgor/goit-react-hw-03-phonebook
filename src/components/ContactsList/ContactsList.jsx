import PropTypes from 'prop-types';
import css from './ContactsList.module.css';
import { DeleteBtn } from 'components/DeleteBtn/DeleteBtn';

export const ContactsList = ({ showFilteredContacts, handleDeleteContact }) => {
  return (
    <ul className={css.contactList}>
      {showFilteredContacts.map(contact => (
        <li key={contact.id} className={css.contactItem}>
          <p className={css.contactInfoWrapper}>
            <span className={css.contactName}>{contact.name}:</span>&nbsp;
            <span className={css.contactNumber}>{contact.number}</span>
          </p>

          <DeleteBtn
            type="button"
            onDeleteContact={handleDeleteContact}
            id={contact.id}
            actionText=" Delete"
          ></DeleteBtn>
        </li>
      ))}
    </ul>
  );
};

ContactsList.propTypes = {
  showFilteredContacts: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
    })
  ),
  handleDeleteContact: PropTypes.func.isRequired,
};
