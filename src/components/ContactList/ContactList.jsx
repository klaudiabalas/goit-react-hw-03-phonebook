import PropTypes from 'prop-types';
import css from './ContactList.module.css';

export const ContactList = ({ children, deleteContact, contacts }) => {
  return (
    <div className={css.contact_container}>
      <h2 className={css.contacts_header}>Contacts</h2>
      {children}
      <ul className={css.list_contacts}>
        {contacts.map(({ id, number, name }) => (
          <li className={css.contacts_list_item} key={id}>
            <p className={css.contact_paragraph}>{name}</p>
            <p className={css.contact_paragraph}>{number}</p>
            <button
              className={css.delete_button}
              onClick={() => {
                deleteContact(id);
              }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

ContactList.propTypes = {
  deleteContact: PropTypes.func.isRequired,
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
};
