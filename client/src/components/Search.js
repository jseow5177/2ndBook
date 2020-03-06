import React from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";

function Search(props) {

  let placeholder = `Search by ${props.searchBy}`; // Placeholder text for search bar

  return(
    <div>
      <Form.Row>

        <Form.Group style={{textAlign: "center"}} as={Col}>
          <Form.Control className="filter" as="select" value={props.searchBy} onChange={(event) => props.setSearchBy(event.target.value)}>
            <option value="Search by..." disabled>Search by...</option>
            <option value="Name">Name</option>
            <option value="Author">Author</option>
            <option value="Genre">Genre</option>
          </Form.Control>
          <Form.Control className="search-bar" type="text" placeholder={placeholder} value={props.search} onChange={(event) => props.setSearch(event.target.value)} />
        </Form.Group>

      </Form.Row>
    </div>
  )
}

export default Search;
