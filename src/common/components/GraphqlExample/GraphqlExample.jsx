import React, { useState, useCallback } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';
import Page from '../Page';
import PetOwnerDropdown from './PetOwnerDropdown';
import PetList from './PetList';

export default function GraphqlExample() {
  const [ownerId, setOwnerId] = useState(undefined);

  const handlePetOwnerChange = useCallback(({ target }) => {
    setOwnerId(target.value);
  }, []);

  return (
    <Page>
      <Row>
        <Col sm={{ offset: 1, span: 10 }} md={{ offset: 4, span: 4 }}>
          <PetOwnerDropdown onChange={handlePetOwnerChange} />
          <br />
          <br />
          <PetList ownerId={ownerId} />
          <br />
          <br />
          <p><Link to="/">View Homepage</Link></p>
        </Col>
      </Row>
    </Page>
  );
}
