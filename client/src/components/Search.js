import React from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";

function Search(props) {

  let placeholder = `Search by ${props.searchBy}`; // Placeholder text for search bar

  return(
    <div className="search-wrapper">
      <Form.Row>

        <Form.Group as={Col}>
          <Form.Control type="text" placeholder={placeholder} value={props.search} onChange={(event) => props.setSearch(event.target.value)} />
        </Form.Group>

        <Form.Group as={Col}>
          <Form.Control as="select" value={props.searchBy} onChange={(event) => props.setSearchBy(event.target.value)}>
            <option value="Search by..." disabled>Search by...</option>
            <option value="Name">Name</option>
            <option value="Author">Author</option>
            <option value="Genre">Genre</option>
          </Form.Control>
        </Form.Group>

      </Form.Row>
    </div>
  )
}

export default Search;
