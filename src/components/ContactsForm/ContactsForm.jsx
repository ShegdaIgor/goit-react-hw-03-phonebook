import PropTypes from 'prop-types';
import { useState } from 'react';
import css from './ContactsForm.module.css';

export const ContactsForm = ({ handleSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    number: '',
  });

  const handleContactData = e => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const onSubmitForm = e => {
    e.preventDefault();
    handleSubmit(formData);

    setFormData({
      name: '',
      number: '',
    });
  };

  const { name, number } = formData;

  return (
    <form onSubmit={onSubmitForm} className={css.form}>
      <div className={css.inputWrapper}>
        <label className={css.formLabel}>Name</label>
        <input
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          value={name}
          onChange={handleContactData}
        />
      </div>

      <div className={css.inputWrapper}>
        <label className={css.formLabel}>Number</label>
        <input
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          onChange={handleContactData}
          value={number}
        />
      </div>

      <button type="submit" className={css.button}>
        Add contact
      </button>
    </form>
  );
};

ContactsForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};
