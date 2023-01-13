import { ContactsForm } from './ContactsForm/ContactsForm';
import { ContactsList } from './ContactsList/ContactsList';
import { FilterContact } from './FilterContact/FilterContact';
import css from './App.module.css';
import { nanoid } from 'nanoid';
import { useEffect, useState } from 'react';

const MY_CONTACTS = 'my-contacts';

export const App = () => {
  const [contacts, setContacts] = useState(
    JSON.parse(localStorage.getItem(MY_CONTACTS)) ?? []
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem(MY_CONTACTS, JSON.stringify(contacts));
  }, [contacts]);

  const handleSubmit = ({ name, number }) => {
    const contact = {
      id: nanoid(),
      name,
      number,
    };

    if (
      contacts.find(
        contact => contact.name.toLowerCase() === name.toLowerCase()
      )
    ) {
      return alert(`${name} is already in the list`);
    }

    setContacts(prevState => [...prevState, contact]);
  };

  const handleFilterContact = e => {
    const { value } = e.target;
    setFilter(value);
  };

  const showFilteredContacts = () => {
    const filterString = filter.toLocaleLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filterString)
    );
  };

  const handleDeleteContact = id => {
    setContacts(prev => prev.filter(contact => contact.id !== id));
  };

  return (
    <div className={css.contacts}>
      <h1>Phonebook</h1>
      <ContactsForm handleSubmit={handleSubmit} />
      <h2>Contacts</h2>
      <FilterContact
        filter={filter}
        handleFilterContact={handleFilterContact}
      />
      <ContactsList
        showFilteredContacts={showFilteredContacts()}
        handleDeleteContact={handleDeleteContact}
      />
    </div>
  );
};
