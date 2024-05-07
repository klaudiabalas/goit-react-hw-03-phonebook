import React from 'react';

import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';

export class App extends React.Component {
  constructor() {
    super();
    this.state = {
      contacts: [
        { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
        { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
        { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
        { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
      ],
      filter: '',
    };
  }

  componentDidMount() {
    try {
      const jsn = localStorage.getItem('contacts');
      const contact = JSON.parse(jsn);

      if (contact) {
        this.setState(() => ({ contacts: contact }));
      }
    } catch (err) {
      console.log(err);
    }
  }

  componentDidUpdate(prevState) {
    if (prevState.contact !== this.state.contact) {
      const jsn = JSON.stringify(this.state.contact);
      localStorage.setItem('contacts', jsn);
    }
  }

  addContact = evt => {
    const lowerCase = evt.name.toLowerCase().trim();
    const exists = this.state.contacts.some(
      contact => contact.name.toLowerCase().trim() === lowerCase
    );

    if (exists) {
      alert(`${evt.name} jest już w kontaktach!`);
    } else {
      this.setState(({ contacts }) => ({
        contacts: [...contacts, evt],
      }));
    }
  };

  addFilter = evt => {
    this.setState({ filter: evt.currentTarget.value });
  };

  filteredContacts = () => {
    const { filter, contacts } = this.state;

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  deleteContact = id =>
    this.setState(({ contacts }) => ({
      contacts: contacts.filter(contact => contact.id !== id),
    }));

  render() {
    const { filter } = this.state;

    return (
      <section>
        <div>
          <ContactForm addContact={this.addContact} />
          <ContactList
            contacts={this.filteredContacts()}
            deleteContact={this.deleteContact}
          >
            <Filter filter={filter} addFilter={this.addFilter} />
          </ContactList>
        </div>
      </section>
    );
  }
}
