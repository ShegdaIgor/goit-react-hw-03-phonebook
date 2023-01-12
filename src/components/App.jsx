import React, { Component } from 'react';
import ContactsForm from './ContactsForm/ContactsForm';
import ContactsList from './ContactsList/ContactsList';
import FilterContact from './FilterContact/FilterContact';
import css from './App.module.css';
import { nanoid } from 'nanoid';

const MY_CONTACTS = 'my-contacts';

export default class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const myContactsFromList = JSON.parse(localStorage.getItem(MY_CONTACTS));
    if (myContactsFromList) {
      this.setState({ contacts: myContactsFromList });
    }
  }

  componentDidUpdate(_, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem(MY_CONTACTS, JSON.stringify(this.state.contacts));
    }
  }

  handleSubmitForm = ({ name, number }) => {
    const { contacts } = this.state;
    const id = nanoid();

    if (
      contacts.find(
        contact => contact.name.toLowerCase() === name.toLowerCase()
      )
    ) {
      return alert(`${name} is already in the list`);
    }

    const contactObj = { id, name, number };
    this.setState(prevState => ({
      contacts: [...prevState.contacts, contactObj],
    }));
  };

  handleFilterContact = e => {
    const { value } = e.target;
    this.setState({ filter: value });
  };

  showFilteredContacts = () => {
    const filterString = this.state.filter.toLocaleLowerCase();
    return this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(filterString)
    );
  };

  handleDeleteContact = id => {
    this.setState(prev => ({
      contacts: prev.contacts.filter(contact => contact.id !== id),
    }));
  };

  render() {
    const { filter } = this.state;
    const {
      handleSubmitForm,
      handleFilterContact,
      showFilteredContacts,
      handleDeleteContact,
    } = this;
    return (
      <div className={css.contacts}>
        <h1>Phonebook</h1>
        <ContactsForm handleSubmitForm={handleSubmitForm} />
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
  }
}
