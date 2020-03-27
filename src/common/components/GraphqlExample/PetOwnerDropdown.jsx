import React from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

const USERS = gql`
  {
    users {
      id
      username
    }
  }
`;

export default function PetOwnerDropdown({
  onChange,
}) {
  const { data } = useQuery(USERS);

  return (
    <Form.Control as="select" onChange={onChange}>
      <option value="">Filter by Pet Owner</option>
      {!!data?.users && data.users.map(({ id, username }) => (
        <option key={id} value={id}>{username}</option>
      ))}
    </Form.Control>
  );
}

PetOwnerDropdown.propTypes = {
  onChange: PropTypes.func,
};

PetOwnerDropdown.defaultProps = {
  onChange: () => {},
};
